import Breadcrumb from "./Breadcrumb";
import ScrollReveal from "./ScrollReveal";

/**
 * The masthead every inner page opens with. Keeping it in one component is what
 * makes /collections, /search and /info/* feel like the same publication.
 */
export default function PageHeader({
  trail,
  eyebrow,
  title,
  intro,
  meta,
  children,
  tone = "cream",
  className = "",
}) {
  const ground = tone === "ivory" ? "bg-ivory" : "bg-cream";

  return (
    <header className={`${ground} pb-14 pt-10 lg:pb-20 lg:pt-14 ${className}`}>
      <div className="shell">
        {trail ? <Breadcrumb trail={trail} /> : null}

        <ScrollReveal className={trail ? "mt-9" : ""} y={18}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h1 className="max-w-2xl font-display text-display-md text-espresso-800">{title}</h1>

            {meta ? <div className="shrink-0 lg:pb-2">{meta}</div> : null}
          </div>

          {intro ? (
            <p className="mt-7 max-w-prose text-base leading-loose text-espresso-500">
              {intro}
            </p>
          ) : null}

          {children}
        </ScrollReveal>
      </div>
    </header>
  );
}
