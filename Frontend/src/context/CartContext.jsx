/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

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
import { fetchCart, saveCart } from "../services/account";

const CartContext = createContext(null);

export const SHIPPING_FLAT_RATE = 0;

const GUEST_STORAGE_KEY = "nisraya.cart.guest";
const USER_STORAGE_PREFIX = "nisraya.cart.user.";

function lineIdFor(productId, size) {
  return `${productId}::${size ?? "one-size"}`;
}

/* -----------------------------------------------------------
   Guest cart
----------------------------------------------------------- */

function readGuestCart() {
  try {
    const raw = window.localStorage.getItem(GUEST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items) {
  try {
    window.localStorage.setItem(
      GUEST_STORAGE_KEY,
      JSON.stringify(items),
    );
  } catch {
    /* ignore storage failures */
  }
}

function clearGuestCart() {
  try {
    window.localStorage.removeItem(GUEST_STORAGE_KEY);
  } catch {
    /* ignore storage failures */
  }
}

/* -----------------------------------------------------------
   Account-specific local backup
----------------------------------------------------------- */

function userStorageKey(userId) {
  return `${USER_STORAGE_PREFIX}${userId}`;
}

function readUserCart(userId) {
  if (!userId) return [];

  try {
    const raw = window.localStorage.getItem(
      userStorageKey(userId),
    );

    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUserCart(userId, items) {
  if (!userId) return;

  try {
    window.localStorage.setItem(
      userStorageKey(userId),
      JSON.stringify(items),
    );
  } catch {
    /* ignore storage failures */
  }
}

/* -----------------------------------------------------------
   Merge carts
----------------------------------------------------------- */

function mergeCarts(...carts) {
  const merged = [];

  for (const cart of carts) {
    if (!Array.isArray(cart)) continue;

    for (const item of cart) {
      if (!item || typeof item.productId !== "string") {
        continue;
      }

      const existing = merged.find(
        (current) => current.lineId === item.lineId,
      );

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + (Number(item.quantity) || 1),
          10,
        );
      } else {
        merged.push({
          ...item,
          quantity: Math.max(
            1,
            Math.min(Number(item.quantity) || 1, 10),
          ),
        });
      }
    }
  }

  return merged;
}

/* -----------------------------------------------------------
   Cart Provider
----------------------------------------------------------- */

export function CartProvider({ children }) {
  const { user, isRestoring } = useAuth();

  const [items, setItems] = useState(() => readGuestCart());

  /*
   * Internal synchronization flags.
   * Refs are used intentionally because these values
   * should not trigger renders.
   */
  const accountReady = useRef(false);
  const previousUserId = useRef(null);

  /*
   * Serialize MongoDB writes so an older request
   * cannot overwrite a newer cart state.
   */
  const saveQueue = useRef(Promise.resolve());

  /* ---------------------------------------------------------
     Restore cart when authentication finishes
  --------------------------------------------------------- */

  useEffect(() => {
    if (isRestoring) {
      return undefined;
    }

    let cancelled = false;

    const userId = user?.id ?? null;

    /*
     * User logged out.
     */
    if (!userId) {
      previousUserId.current = null;
      accountReady.current = true;

      setItems([]);
      clearGuestCart();

      return undefined;
    }

    /*
     * User logged in.
     */
    accountReady.current = false;

    /*
     * Guest cart is only considered during the transition
     * into an authenticated session.
     */
    const guestCart =
      previousUserId.current === null
        ? readGuestCart()
        : [];

    /*
     * Browser backup for this exact account.
     */
    const cachedUserCart = readUserCart(userId);

    previousUserId.current = userId;

    (async () => {
      try {
        /*
         * MongoDB is the primary source.
         */
        const remoteCart = await fetchCart();

        /*
         * Merge:
         *
         * MongoDB
         * + browser account backup
         * + guest cart
         */
        const merged = mergeCarts(
          remoteCart,
          cachedUserCart,
          guestCart,
        );

        if (cancelled) return;

        setItems(merged);

        /*
         * Always update browser backup.
         */
        writeUserCart(userId, merged);

        /*
         * If browser data contains items MongoDB didn't have,
         * push the merged cart back to MongoDB.
         */
        if (
          guestCart.length > 0 ||
          cachedUserCart.length > 0
        ) {
          try {
            await saveCart(merged);
          } catch (error) {
            console.error(
              "Unable to sync restored cart:",
              error,
            );
          }
        }

        /*
         * Guest cart has now been transferred.
         */
        if (guestCart.length > 0) {
          clearGuestCart();
        }

        if (!cancelled) {
          accountReady.current = true;
        }
      } catch (error) {
        console.error(
          "Unable to restore cart:",
          error,
        );

        /*
         * MongoDB unavailable:
         * use the account-specific browser backup.
         */
        if (!cancelled) {
          const fallbackCart =
            cachedUserCart.length > 0
              ? cachedUserCart
              : guestCart;

          setItems(fallbackCart);

          /*
           * Mark account as ready so future cart
           * changes can be saved normally.
           */
          accountReady.current = true;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, isRestoring]);

  /* ---------------------------------------------------------
     Persist cart changes
  --------------------------------------------------------- */

  useEffect(() => {
    if (isRestoring) return;

    const userId = user?.id ?? null;

    /*
     * Guest cart.
     */
    if (!userId) {
      writeGuestCart(items);
      return;
    }

    /*
     * Don't save until initial account restoration finishes.
     */
    if (!accountReady.current) return;

    /*
     * Browser backup.
     */
    writeUserCart(userId, items);

    /*
     * MongoDB save queue.
     */
    saveQueue.current = saveQueue.current
      .catch(() => {
        /* keep queue alive */
      })
      .then(() => saveCart(items))
      .catch((error) => {
        console.error(
          "Unable to save cart:",
          error,
        );
      });
  }, [
    items,
    user?.id,
    isRestoring,
  ]);

  /* ---------------------------------------------------------
     Add product
  --------------------------------------------------------- */

  const addItem = useCallback(
    (
      product,
      {
        size = null,
        quantity = 1,
      } = {},
    ) => {
      const lineId = lineIdFor(
        product.id,
        size,
      );

      setItems((current) => {
        const existing = current.find(
          (item) => item.lineId === lineId,
        );

        if (existing) {
          return current.map((item) =>
            item.lineId === lineId
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    10,
                  ),
                }
              : item,
          );
        }

        return [
          ...current,
          {
            lineId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            categoryLabel: product.categoryLabel,
            metal: product.metal,
            price: product.price,
            image:
              product.images?.[0] ?? "",
            size,
            quantity: Math.min(
              quantity,
              10,
            ),
          },
        ];
      });
    },
    [],
  );

  /* ---------------------------------------------------------
     Remove product
  --------------------------------------------------------- */

  const removeItem = useCallback(
    (lineId) => {
      setItems((current) =>
        current.filter(
          (item) => item.lineId !== lineId,
        ),
      );
    },
    [],
  );

  /* ---------------------------------------------------------
     Update quantity
  --------------------------------------------------------- */

  const updateQuantity = useCallback(
    (lineId, quantity) => {
      const next = Math.max(
        1,
        Math.min(
          Number(quantity) || 1,
          10,
        ),
      );

      setItems((current) =>
        current.map((item) =>
          item.lineId === lineId
            ? {
                ...item,
                quantity: next,
              }
            : item,
        ),
      );
    },
    [],
  );

  /* ---------------------------------------------------------
     Clear cart
  --------------------------------------------------------- */

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  /* ---------------------------------------------------------
     Totals
  --------------------------------------------------------- */

  const { count, subtotal } = useMemo(
    () =>
      items.reduce(
        (totals, item) => ({
          count:
            totals.count +
            item.quantity,

          subtotal:
            totals.subtotal +
            item.price *
              item.quantity,
        }),
        {
          count: 0,
          subtotal: 0,
        },
      ),
    [items],
  );

  /* ---------------------------------------------------------
     Context value
  --------------------------------------------------------- */

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      shipping: SHIPPING_FLAT_RATE,
      total:
        subtotal +
        SHIPPING_FLAT_RATE,
      isEmpty:
        items.length === 0,

      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* -----------------------------------------------------------
   Cart hook
----------------------------------------------------------- */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside <CartProvider>.",
    );
  }

  return context;
}