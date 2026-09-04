import { Link } from "../lib/router";
import { ArrowRightIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";

/**
 * Section header used across the homepage and editorial pages.
 * `align="between"` puts the link on the baseline of the heading on wide screens,
 * which keeps the long horizontal sections from feeling top-heavy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  linkTo,
  linkLabel,
  align = "left",
  tone = "dark",
  className = "",
}) {
  const isLight = tone === "light";

  return (
    <ScrollReveal
      className={[
        "flex flex-col gap-8",
        align === "between" ? "lg:flex-row lg:items-end lg:justify-between lg:gap-16" : "",
        align === "center" ? "items-center text-center" : "",
        className,
      ].join(" ")}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow ? (
          <p className={`eyebrow ${isLight ? "text-champagne-light" : ""}`}>{eyebrow}</p>
        ) : null}

        <h2
          className={`mt-5 font-display text-display-md ${
            isLight ? "text-ivory" : "text-espresso-800"
          }`}
        >
          {title}
        </h2>

        {intro ? (
          <p
            className={`mt-6 max-w-lg text-base leading-loose ${
              isLight ? "text-ivory/70" : "text-espresso-500"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        ) : null}
      </div>

      {linkTo ? (
        <Link
          to={linkTo}
          className={`group inline-flex shrink-0 items-center gap-3 text-2xs uppercase tracking-label ${
            isLight ? "text-champagne-light" : "text-espresso-700"
          }`}
        >
          <span className="link-draw">{linkLabel}</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-600 ease-editorial group-hover:translate-x-1.5" />
        </Link>
      ) : null}
    </ScrollReveal>
  );
}
