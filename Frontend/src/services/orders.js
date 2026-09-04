/**
 * Orders & payment.
 *
 * The Express backend exposes authentication only — there is no orders
 * collection, no order route and no Razorpay integration yet. Rather than
 * simulate a successful purchase, every function here reports honestly that the
 * capability is missing, and the UI renders that state.
 *
 * WIRING THIS UP LATER
 * 1. Backend: add `POST /api/orders` (protected by authMiddleware) to persist an
 *    order and create a Razorpay order, returning { order, razorpayOrderId }.
 * 2. Backend: add `GET /api/orders` for the account page and
 *    `POST /api/orders/:id/verify` for the Razorpay signature check.
 * 3. Frontend: flip the flags below and replace the throwing bodies with the
 *    commented `api` calls. No component needs to change.
 */

import api from "./api";

export const ORDERS_ENDPOINT_AVAILABLE = false;
export const PAYMENT_GATEWAY_AVAILABLE = false;

export const PAYMENT_METHODS = [
  {
    id: "razorpay",
    label: "Card, UPI, Netbanking",
    detail: "Secured by Razorpay. Requires the payment backend to be connected.",
    requiresGateway: true,
  },
  {
    id: "cod",
    label: "Cash on delivery",
    detail: "Available on orders under ₹50,000. Requires the orders endpoint.",
    requiresGateway: true,
  },
];

/** Thrown so the UI can distinguish "not built yet" from a genuine failure. */
export class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotImplementedError";
    this.isNotImplemented = true;
  }
}

export async function listOrders() {
  // return (await api.get("/orders")).data.orders;
  throw new NotImplementedError(
    "Order history will appear here once the backend exposes an orders endpoint.",
  );
}

export async function createOrder(payload) {
  // return (await api.post("/orders", payload)).data;
  void payload;
  throw new NotImplementedError(
    "Checkout cannot be completed yet — the backend has no orders or payment route.",
  );
}

export async function verifyPayment() {
  // return (await api.post(`/orders/${orderId}/verify`, signature)).data;
  throw new NotImplementedError("Payment verification requires the Razorpay backend route.");
}

/**
 * Kept so the checkout page's integration point is obvious. Loads the Razorpay
 * SDK on demand — never called while PAYMENT_GATEWAY_AVAILABLE is false.
 */
export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Could not load the Razorpay checkout script."));
    document.body.appendChild(script);
  });
}

export { api };
