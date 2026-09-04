import { LotusMark } from "./BrandMark";
import { SpinnerIcon } from "./Icons";
import { Link } from "../lib/router";

/**
 * The three states every data-driven view needs, styled once so loading,
 * emptiness and failure all feel like part of the same shop.
 */

/** Quiet inline spinner for buttons. */
export function ButtonSpinner({ label = "Working" }) {
  return (
    <>
      <SpinnerIcon className="h-3.5 w-3.5" />
      <span className="sr-only">{label}</span>
    </>
  );
}

export function LoadingState({ label = "Loading", className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-24 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <LotusMark className="h-9 w-9 animate-pulse text-champagne/50" />
      <p className="eyebrow">{label}</p>
    </div>
  );
}

/** Skeleton grid used while a collection resolves — keeps layout from jumping. */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-editorial w-full bg-cream" />
          <div className="mt-5 h-2.5 w-1/3 bg-cream" />
          <div className="mt-3 h-3 w-3/4 bg-cream" />
          <div className="mt-3 h-2.5 w-1/4 bg-cream" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-24 text-center ${className}`}>
      <LotusMark className="h-10 w-10 text-espresso-200" />

      <h2 className="mt-8 font-display text-display-sm text-espresso-700">{title}</h2>

      {description ? (
        <p className="mt-4 max-w-sm text-base leading-relaxed text-espresso-500">{description}</p>
      ) : null}

      {actionTo ? (
        <Link to={actionTo} className="btn btn-dark mt-10">
          {actionLabel}
        </Link>
      ) : null}

      {!actionTo && onAction ? (
        <button type="button" onClick={onAction} className="btn btn-dark mt-10">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Unable to load this page. Please try again.",
  onRetry,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-24 text-center ${className}`}>
      <p className="eyebrow text-wine">Error</p>

      <h2 className="mt-6 font-display text-display-sm text-espresso-700">{title}</h2>

      <p className="mt-4 max-w-sm text-base leading-relaxed text-espresso-500">{description}</p>

      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn btn-outline mt-10">
          Try again
        </button>
      ) : null}
    </div>
  );
}

/**
 * Used where a feature depends on a backend route that does not exist yet.
 * It states the gap plainly instead of showing an empty list that implies
 * a successful fetch.
 */
export function NotConnectedState({ title, description, className = "" }) {
  return (
    <div className={`border border-espresso-100 bg-cream/50 px-8 py-14 text-center ${className}`}>
      <p className="eyebrow">Not connected</p>

      <h3 className="mt-5 font-display text-2xl text-espresso-700">{title}</h3>

      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-espresso-500">
        {description}
      </p>
    </div>
  );
}
