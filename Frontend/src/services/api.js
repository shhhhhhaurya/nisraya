import axios from "axios";

/**
 * Single axios instance for every backend call.
 *
 * Base URL resolves from VITE_API_URL when present, otherwise the local
 * Express server. The backend mounts everything under /api (see Backend/app.js),
 * so that prefix belongs here rather than in each service.
 */
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const productionApiUrl =
  "https://nisraya-backend.onrender.com/api";

const isGitHubPages =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith("github.io");

export const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/$/, "")
  : isGitHubPages
    ? productionApiUrl
    : "http://localhost:5000/api";

export const TOKEN_STORAGE_KEY = "nisraya.token";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/* Attach the JWT the backend issued at signup/login. */
api.interceptors.request.use((config) => {
  const token = readToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Normalise every failure into an Error carrying the backend's own message.
 * The auth controller responds with `{ message }`, so that is what we surface —
 * "Invalid email or password" reaches the user exactly as the server phrased it.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? null;

    let message = error.response?.data?.message;

    if (!message) {
      if (error.code === "ECONNABORTED") {
        message = "The server took too long to respond. Please try again.";
      } else if (!error.response) {
        message = `Cannot reach the NISRAYA server at ${API_BASE_URL}. Is the backend running?`;
      } else {
        message = "Something went wrong. Please try again.";
      }
    }

    const normalised = new Error(message);
    normalised.status = status;
    normalised.isNetworkError = !error.response;
    return Promise.reject(normalised);
  },
);

export function readToken() {
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeToken(token) {
  try {
    if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    /* Storage can be unavailable in private modes — auth still works in-memory. */
  }
}

/** GET /api/health — used by the account page to report backend reachability. */
export async function checkHealth() {
  const { data } = await api.get("/health");
  return data;
}

export default api;
