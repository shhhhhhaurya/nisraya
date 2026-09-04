/**
 * Journal subscription.
 *
 * The backend currently exposes only /api/auth/signup and /api/auth/login, so
 * there is no route to POST a subscriber to. Rather than show a success message
 * for a request that was never made, this stores the address in localStorage and
 * tells the customer the truth: they are on the list, we will confirm by email.
 *
 * TO CONNECT FOR REAL:
 *   1. Add `POST /api/newsletter` to the backend (body: { email }).
 *   2. Set ENDPOINT_AVAILABLE below to true.
 *   That is the only change needed here.
 */
import api from "./api";

export const ENDPOINT_AVAILABLE = false;

const STORAGE_KEY = "nisraya.journal";

function readPending() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function subscribeToJournal(email) {
  const address = email.trim().toLowerCase();

  if (ENDPOINT_AVAILABLE) {
    return api
      .post("/newsletter", { email: address })
      .then(() => ({
        ok: true,
        message: "You're on the list. Look out for the next Journal.",
      }))
      .catch((error) => ({
        ok: false,
        message: error.message || "We couldn't save your email. Please try again.",
      }));
  }

  const pending = readPending();

  if (pending.includes(address)) {
    return Promise.resolve({
      ok: true,
      message: "This email is already saved on this device.",
    });
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...pending, address]));
  } catch {
    // Private browsing — nothing to persist to, and nothing worth failing over.
  }

  return Promise.resolve({
    ok: true,
    message: "Saved on this device. The Journal mailing list goes live shortly and we'll confirm by email.",
  });
}

/** Exposed so the account page can show what this device has requested. */
export function listPendingSubscriptions() {
  return readPending();
}
