import { useState } from "react";
import { ButtonSpinner } from "./StateBlocks";
import { isValidEmail } from "../lib/format";
import { subscribeToJournal } from "../services/newsletter";
import nisrayaLogo from "../assets/nisraya logo.png";

/**
 * Journal sign-up.
 *
 * There is no newsletter route on the API yet, so the service records the
 * address locally and says so plainly — the form validates and responds
 * honestly rather than claiming a subscription that nothing received.
 */
export default function Newsletter({ tone = "dark", className = "" }) {
  const isLight = tone === "light";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const result = await subscribeToJournal(email);

    setStatus(result.ok ? "done" : "error");
    setMessage(result.message);

    if (result.ok) setEmail("");
  };

  return (
    <div className={className}>
      <img
        src={nisrayaLogo}
        alt="NISRAYA"
        className="h-12 w-auto object-contain"
      />

      <h2
        className={`mt-7 font-display text-2xl leading-tight sm:text-3xl ${
          isLight ? "text-espresso-800" : "text-ivory"
        }`}
      >
        Join the NISRAYA Journal
      </h2>

      <p
        className={`mt-4 max-w-md text-base leading-relaxed ${
          isLight ? "text-espresso-500" : "text-ivory/60"
        }`}
      >
        New pieces, private previews and notes from the atelier. Sent seldom, never sold.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-9 max-w-md">
        <label htmlFor="journal-email" className="sr-only">
          Email address
        </label>

        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0 sm:border-b ${
            isLight ? "sm:border-espresso-200" : "sm:border-ivory/25"
          }`}
        >
          <input
            id="journal-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);

              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            aria-invalid={status === "error"}
            aria-describedby={message ? "journal-message" : undefined}
            className={[
              "min-w-0 flex-1 bg-transparent py-3 text-sm focus:outline-none",
              isLight
                ? "border-b border-espresso-200 text-espresso-700 placeholder:text-taupe sm:border-0"
                : "border-b border-ivory/25 text-ivory placeholder:text-ivory/45 sm:border-0",
            ].join(" ")}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className={[
              "flex shrink-0 items-center justify-center gap-2.5 text-2xs uppercase tracking-label transition-colors duration-500",
              "py-3 sm:pl-8",
              isLight
                ? "text-espresso-700 hover:text-champagne-dark"
                : "text-champagne-light hover:text-ivory",
              status === "submitting" ? "opacity-60" : "",
            ].join(" ")}
          >
            {status === "submitting" ? (
              <ButtonSpinner label="Subscribing" />
            ) : null}

            Subscribe
          </button>
        </div>

        {message ? (
          <p
            id="journal-message"
            role="status"
            aria-live="polite"
            className={[
              "mt-4 text-xs leading-relaxed",
              status === "error"
                ? isLight
                  ? "text-wine"
                  : "text-[#E9A9A0]"
                : isLight
                  ? "text-espresso-500"
                  : "text-ivory/65",
            ].join(" ")}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}