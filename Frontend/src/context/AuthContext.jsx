/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  fetchCurrentUser,
  login as loginRequest,
  signup as signupRequest,
} from "../services/auth";

import { readToken, writeToken } from "../services/api";

const AuthContext = createContext(null);

const USER_STORAGE_KEY = "nisraya.user";

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  try {
    if (user) {
      window.localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(user),
      );
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch {
    /* private browsing — session simply will not persist */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [token, setToken] = useState(() => readToken());

  /*
   * If a token and user already exist, we need to verify them.
   * Otherwise there is nothing to restore.
   */
  const [isRestoring, setIsRestoring] = useState(() => {
    const storedToken = readToken();
    const storedUser = readStoredUser();

    return Boolean(storedToken && storedUser);
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Restore and verify previous session.
   */
  useEffect(() => {
    const storedToken = readToken();
    const storedUser = readStoredUser();

    /*
     * Existing session:
     * verify it with the backend.
     */
    if (storedToken && storedUser) {
      fetchCurrentUser()
        .then((currentUser) => {
          writeStoredUser(currentUser);
          setUser(currentUser);
        })
        .catch(() => {
          writeToken(null);
          writeStoredUser(null);

          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsRestoring(false);
        });

      return;
    }

    /*
     * If only one half of the session exists,
     * clear it.
     *
     * We DON'T call setIsRestoring(false) here because
     * the initial state is already false in this situation.
     */
    if (storedToken || storedUser) {
      writeToken(null);
      writeStoredUser(null);
    }
  }, []);

  /*
   * Save or clear authentication session.
   */
  const persistSession = useCallback((nextToken, nextUser) => {
    writeToken(nextToken);
    writeStoredUser(nextUser);

    setToken(nextToken);
    setUser(nextUser);
  }, []);

  /*
   * Email/password signup.
   */
  const signup = useCallback(
    async (payload) => {
      setIsSubmitting(true);

      try {
        const result = await signupRequest(payload);

        persistSession(result.token, result.user);

        return {
          ok: true,
          message: result.message,
          user: result.user,
        };
      } catch (error) {
        return {
          ok: false,
          message: error.message,
          status: error.status ?? null,
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [persistSession],
  );

  /*
   * Email/password login.
   */
  const login = useCallback(
    async (payload) => {
      setIsSubmitting(true);

      try {
        const result = await loginRequest(payload);

        persistSession(result.token, result.user);

        return {
          ok: true,
          message: result.message,
          user: result.user,
        };
      } catch (error) {
        return {
          ok: false,
          message: error.message,
          status: error.status ?? null,
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [persistSession],
  );

  /*
   * Complete Google OAuth login.
   */
  const completeGoogleLogin = useCallback(
    async (googleToken) => {
      if (!googleToken) {
        return {
          ok: false,
          message: "Google login token is missing.",
        };
      }

      setIsSubmitting(true);

      try {
        /*
         * Save Google's JWT.
         */
        writeToken(googleToken);
        setToken(googleToken);

        /*
         * Get the matching MongoDB user.
         */
        const currentUser = await fetchCurrentUser(googleToken);

        writeStoredUser(currentUser);
        setUser(currentUser);

        return {
          ok: true,
          message: "Google login successful.",
          user: currentUser,
        };
      } catch (error) {
        writeToken(null);
        writeStoredUser(null);

        setToken(null);
        setUser(null);

        return {
          ok: false,
          message:
            error?.message ??
            "Unable to complete Google login.",
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  /*
   * Logout.
   */
  const logout = useCallback(() => {
    persistSession(null, null);
  }, [persistSession]);

  /*
   * Context value.
   */
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isRestoring,
      isSubmitting,

      signup,
      login,
      completeGoogleLogin,
      logout,
    }),
    [
      user,
      token,
      isRestoring,
      isSubmitting,
      signup,
      login,
      completeGoogleLogin,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside <AuthProvider>.",
    );
  }

  return context;
}