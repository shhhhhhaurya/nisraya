import Image from "./Image";
import { LotusMark } from "./BrandMark";
import { Link } from "../lib/router";
import { IMAGES } from "../data/products";
import nisrayaLogo from "../assets/nisraya logo.png";

/**
 * Shared frame for /login and /signup — a full-height editorial split so the
 * forms feel like part of the shop rather than a bolted-on account system.
 */
export default function AuthShell({ eyebrow, title, intro, image, imageAlt, caption, children }) {
  return (
    <section className="grid min-h-[calc(100vh-var(--nav-h))] lg:grid-cols-2">
      {/* Photography — decorative, so it is hidden from small screens rather
          than squeezed into a strip. */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0">
          <Image
            src={image ?? IMAGES.philosophy}
            alt={imageAlt ?? ""}
            ratio="h-full w-full"
            position="center"
            eager
            sizes="50vw"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
        />

        {caption ? (
          <p className="absolute bottom-12 left-12 right-12 max-w-xs font-display text-2xl italic leading-snug text-ivory">
            {caption}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-center bg-ivory px-gutter py-20">
        <div className="w-full max-w-sm">
          <Link to="/" aria-label="NISRAYA — home" className="inline-block">
  <img
    src={nisrayaLogo}
    alt="NISRAYA by Niyati"
    className="h-16 w-auto object-contain"
  />
</Link>

          <p className="eyebrow mt-10">{eyebrow}</p>

          <h1 className="mt-5 font-display text-display-sm text-espresso-800">{title}</h1>

          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-espresso-500">{intro}</p>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
}

/** Labelled text input used by both auth forms. */
export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  required = true,
  hint,
  children,
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {!required ? <span className="ml-2 normal-case text-taupe">optional</span> : null}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`field ${error ? "field-error" : ""} ${children ? "pr-16" : ""}`}
        />

        {children}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-wine">
          {error}
        </p>
      ) : null}

      {!error && hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-taupe">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Reveal toggle for password fields — user-initiated, never on by default. */
export function RevealButton({ shown, onToggle, controls }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={shown}
      aria-controls={controls}
      className="absolute right-0 top-1/2 -translate-y-1/2 px-1 text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-espresso-700"
    >
      {shown ? "Hide" : "Show"}
    </button>
  );
}

/** Inline form-level message — replaces window.alert for auth feedback. */
export function FormMessage({ tone = "error", children }) {
  if (!children) return null;

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`border-l-2 py-2.5 pl-4 text-xs leading-relaxed ${
        tone === "error"
          ? "border-wine bg-wine/5 text-wine"
          : "border-champagne bg-champagne/10 text-espresso-700"
      }`}
    >
      {children}
    </p>
  );
}
