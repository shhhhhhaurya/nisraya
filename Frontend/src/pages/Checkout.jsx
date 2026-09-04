import { useEffect, useState } from "react";
import Image from "../components/Image";
import PageHeader from "../components/PageHeader";
import { Field, FormMessage } from "../components/AuthShell";
import { ButtonSpinner, EmptyState } from "../components/StateBlocks";
import { CheckIcon } from "../components/Icons";
import { Link, useNavigate } from "../lib/router";
import { formatINR, isValidEmail } from "../lib/format";
import {
  ORDERS_ENDPOINT_AVAILABLE,
  PAYMENT_GATEWAY_AVAILABLE,
  PAYMENT_METHODS,
  createOrder,
} from "../services/orders";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

/**
 * Checkout.
 *
 * The form, validation and order payload are complete. The final submit calls
 * `createOrder()`, which reports that the backend has no orders or payment
 * route — so this page never claims a purchase succeeded. Once those routes
 * exist, flipping the flags in services/orders.js is the only change needed.
 */
const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

export default function Checkout() {
  const { items, count, subtotal, shipping, total, isEmpty } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [method, setMethod] = useState(PAYMENT_METHODS[0].id);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  // Prefill from the signed-in account rather than making them retype it.
  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      email: current.email || user.email || "",
      name: current.name || user.name || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  const setField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFormError("");
  };

  const validate = () => {
    const next = {};

    if (!form.email.trim()) next.email = "Enter an email for the order confirmation.";
    else if (!isValidEmail(form.email)) next.email = "That does not look like an email address.";

    if (!form.phone.trim()) next.phone = "Enter a phone number for delivery.";
    else if (!/^[\d+\s-]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";

    if (!form.name.trim()) next.name = "Enter the recipient's name.";
    if (!form.line1.trim()) next.line1 = "Enter the street address.";
    if (!form.city.trim()) next.city = "Enter the city.";
    if (!form.state) next.state = "Choose a state.";

    if (!form.pincode.trim()) next.pincode = "Enter the PIN code.";
    else if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = "A PIN code is six digits.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    if (!validate()) return;

    setIsPlacing(true);

    /* The payload the backend will receive once POST /api/orders exists. */
    const payload = {
      contact: { email: form.email.trim(), phone: form.phone.trim() },
      shippingAddress: {
        name: form.name.trim(),
        line1: form.line1.trim(),
        line2: form.line2.trim(),
        city: form.city.trim(),
        state: form.state,
        pincode: form.pincode.trim(),
        country: "India",
      },
      notes: form.notes.trim(),
      paymentMethod: method,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      amounts: { subtotal, shipping, total, currency: "INR" },
    };

    try {
      await createOrder(payload);
      // Reached only once the backend route exists.
      navigate("/account", { replace: true });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsPlacing(false);
    }
  };

  if (isEmpty) {
    return (
      <>
        <PageHeader
          trail={[{ label: "Home", to: "/" }, { label: "Checkout" }]}
          eyebrow="Checkout"
          title="Checkout."
        />

        <section className="bg-ivory pb-section">
          <div className="shell">
            <EmptyState
              title="Your bag is empty."
              description="Add a piece before checking out."
              actionLabel="Explore the collection"
              actionTo="/collections"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        trail={[
          { label: "Home", to: "/" },
          { label: "Bag", to: "/cart" },
          { label: "Checkout" },
        ]}
        eyebrow="Checkout"
        title="Almost yours."
        meta={`${count} ${count === 1 ? "piece" : "pieces"}`}
      />

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          {!isAuthenticated ? (
            <p className="mb-12 border-l-2 border-champagne bg-champagne/10 py-3 pl-5 text-xs leading-relaxed text-espresso-600">
              Checking out as a guest.{" "}
              <Link to="/login?redirect=%2Fcheckout" className="link-draw text-espresso-800">
                Sign in
              </Link>{" "}
              to save these details for next time.
            </p>
          ) : null}

          <form onSubmit={handleSubmit} noValidate className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-14 lg:col-span-7">
              {/* Contact */}
              <fieldset>
                <Legend step="01" title="Contact" />

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    error={errors.email}
                    autoComplete="email"
                  />

                  <Field
                    id="phone"
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={setField("phone")}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                </div>
              </fieldset>

              {/* Address */}
              <fieldset>
                <Legend step="02" title="Shipping address" />

                <div className="mt-8 space-y-6">
                  <Field
                    id="name"
                    label="Recipient's full name"
                    value={form.name}
                    onChange={setField("name")}
                    error={errors.name}
                    autoComplete="name"
                  />

                  <Field
                    id="line1"
                    label="Address"
                    value={form.line1}
                    onChange={setField("line1")}
                    error={errors.line1}
                    autoComplete="address-line1"
                  />

                  <Field
                    id="line2"
                    label="Apartment, landmark"
                    value={form.line2}
                    onChange={setField("line2")}
                    autoComplete="address-line2"
                    required={false}
                  />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="city"
                      label="City"
                      value={form.city}
                      onChange={setField("city")}
                      error={errors.city}
                      autoComplete="address-level2"
                    />

                    <div>
                      <label htmlFor="state" className="field-label">
                        State
                      </label>

                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={setField("state")}
                        aria-invalid={errors.state ? "true" : undefined}
                        className={`field cursor-pointer ${errors.state ? "field-error" : ""}`}
                      >
                        <option value="">Choose a state</option>
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                      {errors.state ? (
                        <p role="alert" className="mt-2 text-xs text-wine">
                          {errors.state}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="pincode"
                      label="PIN code"
                      value={form.pincode}
                      onChange={setField("pincode")}
                      error={errors.pincode}
                      autoComplete="postal-code"
                    />
                  </div>

                  <Field
                    id="notes"
                    label="Delivery notes"
                    value={form.notes}
                    onChange={setField("notes")}
                    required={false}
                    hint="Gate codes, preferred delivery window, gift instructions."
                  />
                </div>
              </fieldset>

              {/* Payment */}
              <fieldset>
                <Legend step="03" title="Payment" />

                <div className="mt-8 space-y-3">
                  {PAYMENT_METHODS.map((option) => {
                    const isSelected = method === option.id;

                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-4 border px-6 py-5 transition-colors duration-400 ${
                          isSelected
                            ? "border-champagne bg-champagne/5"
                            : "border-espresso-100 hover:border-espresso-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={option.id}
                          checked={isSelected}
                          onChange={() => setMethod(option.id)}
                          className="peer sr-only"
                        />

                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-400 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne ${
                            isSelected ? "border-champagne-dark" : "border-espresso-200"
                          }`}
                        >
                          {isSelected ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-champagne-dark" />
                          ) : null}
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm text-espresso-800">{option.label}</span>
                          <span className="mt-1.5 block text-xs leading-relaxed text-espresso-500">
                            {option.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Stated plainly rather than implying a working gateway. */}
                {!PAYMENT_GATEWAY_AVAILABLE || !ORDERS_ENDPOINT_AVAILABLE ? (
                  <p className="mt-6 border-l-2 border-espresso-200 py-3 pl-5 text-xs leading-relaxed text-espresso-500">
                    Payment is not live yet. This form is complete and validated, but the backend
                    has no orders or Razorpay route, so submitting will tell you that rather than
                    confirm an order you did not place. Everything you have entered is kept.
                  </p>
                ) : null}
              </fieldset>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 lg:col-start-9">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <div className="border border-espresso-100 bg-cream/50 px-7 py-8 sm:px-9">
                  <h2 className="text-2xs uppercase tracking-label text-espresso-700">
                    Order summary
                  </h2>

                  <ul className="mt-7 space-y-5">
                    {items.map((item) => (
                      <li key={item.lineId} className="flex gap-4">
                        <div className="w-16 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            ratio="aspect-editorial"
                            sizes="64px"
                          />
                        </div>

                        <div className="flex flex-1 items-start justify-between gap-3">
                          <div>
                            <p className="text-sm leading-snug text-espresso-800">{item.name}</p>
                            <p className="mt-1.5 text-xs text-taupe">
                              {item.size ? `Size ${item.size} · ` : ""}Qty {item.quantity}
                            </p>
                          </div>

                          <p className="shrink-0 text-xs tabular-nums text-espresso-700">
                            {formatINR(item.price * item.quantity)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-8 space-y-4 border-t border-espresso-100 pt-6 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-espresso-500">Subtotal</dt>
                      <dd className="tabular-nums text-espresso-800">{formatINR(subtotal)}</dd>
                    </div>

                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-espresso-500">Shipping</dt>
                      <dd className="tabular-nums text-espresso-800">
                        {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                      </dd>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 border-t border-espresso-100 pt-5">
                      <dt className="text-2xs uppercase tracking-label text-espresso-700">Total</dt>
                      <dd className="text-lg tabular-nums text-espresso-800">{formatINR(total)}</dd>
                    </div>
                  </dl>

                  <div className="mt-8 space-y-4">
                    <FormMessage tone="error">{formError}</FormMessage>

                    <button type="submit" disabled={isPlacing} className="btn btn-dark w-full">
                      {isPlacing ? <ButtonSpinner label="Placing order" /> : "Place order"}
                    </button>

                    <Link
                      to="/cart"
                      className="block text-center text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-espresso-700"
                    >
                      Back to bag
                    </Link>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {[
                    "Made to order — dispatched in 10–14 days",
                    "Insured shipping, signature on delivery",
                    "15-day returns on unworn pieces",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-xs text-espresso-500">
                      <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-champagne-dark" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Legend({ step, title }) {
  return (
    <legend className="flex w-full items-baseline gap-4 border-b border-espresso-100 pb-4">
      <span className="text-2xs tabular-nums tracking-label text-champagne-dark">{step}</span>
      <span className="text-2xs uppercase tracking-label text-espresso-700">{title}</span>
    </legend>
  );
}
