import api from "./api";

/**
 * Authentication — wired to the real Express endpoints.
 *
 * Backend:
 *   POST /api/auth/signup
 *   POST /api/auth/login
 *   GET  /api/auth/me
 *
 * Google OAuth:
 *   GET /api/auth/google
 *   GET /api/auth/google/callback
 *
 * The Google callback returns a JWT to the frontend.
 * When fetching /me after Google login, we explicitly send
 * that JWT as a Bearer token so the request cannot depend on
 * the axios interceptor/localStorage timing.
 */

export async function signup({ name, email, password, phone }) {
  const { data } = await api.post("/auth/signup", {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    ...(phone?.trim() ? { phone: phone.trim() } : {}),
  });

  return {
    token: data.token,
    user: data.user,
    message: data.message ?? "Account created successfully",
  };
}

export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });

  return {
    token: data.token,
    user: data.user,
    message: data.message ?? "Login successful",
  };
}

/**
 * Fetch the currently authenticated user.
 *
 * If a token is supplied (Google OAuth flow), explicitly attach it
 * to this request.
 *
 * For normal session restoration, the existing api interceptor can
 * continue attaching the stored token automatically.
 */
export async function fetchCurrentUser(token = null) {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;

  const { data } = await api.get("/auth/me", config);

  return data.user;
}

export const SESSION_ENDPOINT_AVAILABLE = true;