/**
 * The NISRAYA lotus — redrawn from the brand mark.
 *
 * This is the site's signature device: a three-petal lotus with twin sparkles
 * and a pendant drop. It appears in the navbar, the footer, as the divider
 * glyph between editorial sections, and as the fallback watermark on images —
 * so the brand's own artwork does the decorative work instead of generic rules.
 */

export function LotusMark({ className = "h-8 w-8", strokeWidth = 4 }) {
  return (
    <svg
      viewBox="0 0 120 108"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* twin sparkles */}
      <path
        d="M40 6 L42.6 13.4 L50 16 L42.6 18.6 L40 26 L37.4 18.6 L30 16 L37.4 13.4 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M80 6 L82.6 13.4 L90 16 L82.6 18.6 L80 26 L77.4 18.6 L70 16 L77.4 13.4 Z"
        fill="currentColor"
        stroke="none"
      />

      {/* outer petals */}
      <path d="M57 77 C 38 77 24 63 24 44 C 43 44 57 58 57 77 Z" />
      <path d="M63 77 C 82 77 96 63 96 44 C 77 44 63 58 63 77 Z" />

      {/* centre petal + inner leaf */}
      <path d="M60 26 C 69 40 69 62 60 76 C 51 62 51 40 60 26 Z" />
      <path d="M60 41 C 64 49 64 60 60 68 C 56 60 56 49 60 41 Z" />

      {/* pendant */}
      <path d="M60 78 L60 86" />
      <circle cx="60" cy="93.5" r="5.5" />
    </svg>
  );
}

/**
 * Lotus + wordmark lockup.
 * `stacked` matches the logo (mark above the name); `inline` is for tight bars.
 */
export default function BrandMark({
  variant = "stacked",
  className = "",
  markClassName = "",
  showTagline = true,
}) {
  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <LotusMark className={markClassName || "h-7 w-7 shrink-0"} />
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wordmark">NISRAYA</span>
          {showTagline ? (
            <span className="mt-0.5 text-2xs tracking-label opacity-70">BY NIYATI</span>
          ) : null}
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <LotusMark className={markClassName || "h-9 w-9"} />
      <span className="mt-2 font-display text-xl leading-none tracking-wordmark">NISRAYA</span>
      {showTagline ? (
        <span className="mt-1.5 text-2xs tracking-label opacity-70">BY NIYATI</span>
      ) : null}
    </span>
  );
}
