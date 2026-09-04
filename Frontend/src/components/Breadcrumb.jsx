import { Link } from "../lib/router";
import { ChevronRightIcon } from "./Icons";

/**
 * Breadcrumb. `trail` is an array of { label, to }; the final entry is rendered
 * as plain text because you do not link to the page you are already on.
 */
export default function Breadcrumb({ trail, tone = "dark", className = "" }) {
  const isLight = tone === "light";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-2xs uppercase tracking-label">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2.5">
              {isLast || !crumb.to ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLight ? "text-ivory/70" : "text-espresso-600"}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className={`transition-colors duration-400 ${
                    isLight ? "text-ivory/45 hover:text-ivory" : "text-taupe hover:text-espresso-700"
                  }`}
                >
                  {crumb.label}
                </Link>
              )}

              {!isLast ? (
                <ChevronRightIcon
                  className={`h-2.5 w-2.5 ${isLight ? "text-ivory/30" : "text-espresso-200"}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
