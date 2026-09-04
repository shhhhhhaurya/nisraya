/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import {
  fetchWishlist,
  saveWishlist,
} from "../services/account";

const WishlistContext = createContext(null);

const GUEST_STORAGE_KEY = "nisraya.wishlist.guest";
const USER_STORAGE_PREFIX = "nisraya.wishlist.user.";

/* -----------------------------------------------------------
   Guest wishlist
----------------------------------------------------------- */

function readGuestWishlist() {
  try {
    const raw = window.localStorage.getItem(
      GUEST_STORAGE_KEY,
    );

    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed.filter(
          (id) => typeof id === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function writeGuestWishlist(ids) {
  try {
    window.localStorage.setItem(
      GUEST_STORAGE_KEY,
      JSON.stringify(ids),
    );
  } catch {
    /* ignore storage failures */
  }
}

function clearGuestWishlist() {
  try {
    window.localStorage.removeItem(
      GUEST_STORAGE_KEY,
    );
  } catch {
    /* ignore storage failures */
  }
}

/* -----------------------------------------------------------
   Account-specific wishlist backup
----------------------------------------------------------- */

function userWishlistKey(userId) {
  return `${USER_STORAGE_PREFIX}${userId}`;
}

function readUserWishlist(userId) {
  if (!userId) return [];

  try {
    const raw = window.localStorage.getItem(
      userWishlistKey(userId),
    );

    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed.filter(
          (id) => typeof id === "string",
        )
      : [];
  } catch {
    return [];
  }
}

function writeUserWishlist(userId, ids) {
  if (!userId) return;

  try {
    window.localStorage.setItem(
      userWishlistKey(userId),
      JSON.stringify(ids),
    );
  } catch {
    /* ignore storage failures */
  }
}

/* -----------------------------------------------------------
   Merge wishlist IDs
----------------------------------------------------------- */

function mergeWishlists(...lists) {
  return [
    ...new Set(
      lists.flatMap((list) =>
        Array.isArray(list)
          ? list.filter(
              (id) => typeof id === "string",
            )
          : [],
      ),
    ),
  ];
}

/* -----------------------------------------------------------
   Provider
----------------------------------------------------------- */

export function WishlistProvider({
  children,
}) {
  const { user, isRestoring } = useAuth();

  const [ids, setIds] = useState(
    readGuestWishlist,
  );

  /*
   * Ref instead of state.
   * This prevents the React setState-in-effect
   * warning we were fixing earlier.
   */
  const accountReady = useRef(false);

  /*
   * Used to determine whether this login is a
   * fresh transition from guest -> authenticated.
   */
  const previousUserId = useRef(null);

  /*
   * Serialize MongoDB writes.
   *
   * This is important because:
   * - user clicks heart
   * - another heart is clicked
   * - logout happens
   *
   * Older writes must never overwrite newer ones.
   */
  const saveQueue = useRef(
    Promise.resolve(),
  );

  /* ---------------------------------------------------------
     Restore wishlist after authentication
  --------------------------------------------------------- */

  useEffect(() => {
    if (isRestoring) {
      return undefined;
    }

    let cancelled = false;

    const userId = user?.id ?? null;

    /* -------------------------------------------------------
       USER LOGGED OUT
    ------------------------------------------------------- */

    if (!userId) {
      previousUserId.current = null;

      accountReady.current = false;

      /*
       * Clear only the active in-memory wishlist.
       *
       * IMPORTANT:
       * Do NOT delete the account-specific backup.
       */
      setIds([]);

      clearGuestWishlist();

      return undefined;
    }

    /* -------------------------------------------------------
       USER LOGGED IN
    ------------------------------------------------------- */

    accountReady.current = false;

    /*
     * Guest wishlist should only be transferred
     * during the first login transition.
     */
    const guestIds =
      previousUserId.current === null
        ? readGuestWishlist()
        : [];

    /*
     * Restore this exact account's browser backup.
     */
    const cachedUserIds =
      readUserWishlist(userId);

    previousUserId.current = userId;

    (async () => {
      try {
        /*
         * MongoDB is the primary source.
         */
        const remoteIds =
          await fetchWishlist();

        /*
         * Combine:
         *
         * MongoDB wishlist
         * +
         * account-specific local backup
         * +
         * guest wishlist
         */
        const mergedIds =
          mergeWishlists(
            remoteIds,
            cachedUserIds,
            guestIds,
          );

        if (cancelled) return;

        /*
         * Update UI.
         */
        setIds(mergedIds);

        /*
         * Keep account-specific browser
         * backup synchronized.
         */
        writeUserWishlist(
          userId,
          mergedIds,
        );

        /*
         * Mark the account as ready only AFTER
         * the initial wishlist has been restored.
         */
        accountReady.current = true;

        /*
         * Guest wishlist has now been transferred
         * to the authenticated account.
         */
        if (guestIds.length > 0) {
          clearGuestWishlist();
        }

        /*
         * If the local backup or guest wishlist
         * contained items that MongoDB didn't have,
         * immediately synchronize the merged result.
         */
        if (
          guestIds.length > 0 ||
          cachedUserIds.length > 0
        ) {
          saveQueue.current =
            saveQueue.current
              .catch(() => {})
              .then(() =>
                saveWishlist(
                  mergedIds,
                ),
              )
              .catch((error) => {
                console.error(
                  "Unable to sync restored wishlist:",
                  error,
                );
              });
        }
      } catch (error) {
        console.error(
          "Unable to restore wishlist:",
          error,
        );

        if (!cancelled) {
          /*
           * MongoDB unavailable.
           *
           * Use this exact account's browser
           * backup instead of showing an empty
           * wishlist.
           */
          const fallbackIds =
            cachedUserIds.length > 0
              ? cachedUserIds
              : guestIds;

          setIds(fallbackIds);

          writeUserWishlist(
            userId,
            fallbackIds,
          );

          accountReady.current = true;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    user?.id,
    isRestoring,
  ]);

  /* ---------------------------------------------------------
     Persist wishlist changes
  --------------------------------------------------------- */

  useEffect(() => {
    if (isRestoring) return;

    const userId = user?.id ?? null;

    /* -------------------------------------------------------
       GUEST
    ------------------------------------------------------- */

    if (!userId) {
      writeGuestWishlist(ids);
      return;
    }

    /*
     * Don't overwrite MongoDB while the initial
     * account wishlist is still being restored.
     */
    if (!accountReady.current) {
      return;
    }

    /* -------------------------------------------------------
       ACCOUNT-SPECIFIC LOCAL BACKUP
    ------------------------------------------------------- */

    writeUserWishlist(
      userId,
      ids,
    );

    /* -------------------------------------------------------
       MONGODB
    ------------------------------------------------------- */

    /*
     * No debounce.
     *
     * Every wishlist change is queued.
     */
    saveQueue.current =
      saveQueue.current
        .catch(() => {})
        .then(() =>
          saveWishlist(ids),
        )
        .catch((error) => {
          console.error(
            "Unable to save wishlist:",
            error,
          );
        });
  }, [
    ids,
    user?.id,
    isRestoring,
  ]);

  /* ---------------------------------------------------------
     Has
  --------------------------------------------------------- */

  const has = useCallback(
    (productId) =>
      ids.includes(productId),
    [ids],
  );

  /* ---------------------------------------------------------
     Add
  --------------------------------------------------------- */

  const add = useCallback(
    (productId) => {
      setIds((current) =>
        current.includes(productId)
          ? current
          : [
              productId,
              ...current,
            ],
      );
    },
    [],
  );

  /* ---------------------------------------------------------
     Remove
  --------------------------------------------------------- */

  const remove = useCallback(
    (productId) => {
      setIds((current) =>
        current.filter(
          (id) =>
            id !== productId,
        ),
      );
    },
    [],
  );

  /* ---------------------------------------------------------
     Toggle
  --------------------------------------------------------- */

  const toggle = useCallback(
    (productId) => {
      const willAdd =
        !ids.includes(productId);

      setIds((current) =>
        current.includes(productId)
          ? current.filter(
              (id) =>
                id !== productId,
            )
          : [
              productId,
              ...current,
            ],
      );

      return willAdd;
    },
    [ids],
  );

  /* ---------------------------------------------------------
     Clear
  --------------------------------------------------------- */

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  /* ---------------------------------------------------------
     Context value
  --------------------------------------------------------- */

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isEmpty:
        ids.length === 0,
      has,
      add,
      remove,
      toggle,
      clear,
    }),
    [
      ids,
      has,
      add,
      remove,
      toggle,
      clear,
    ],
  );

  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/* -----------------------------------------------------------
   Hook
----------------------------------------------------------- */

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside <WishlistProvider>.",
    );
  }

  return context;
}