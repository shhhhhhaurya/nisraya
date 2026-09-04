import Image from "./Image";
import { ArrowRightIcon } from "./Icons";
import { Link } from "../lib/router";

/**
 * Collection tile. On hover the photograph drifts in, the espresso veil lifts,
 * the type steps up and an arrow arrives — four small movements timed together
 * so it reads as one gesture rather than four effects.
 */
export default function CategoryCard({ category, index, priority = false, className = "" }) {
  return (
    <Link
      to={`/collections/${category.slug}`}
      className={`group relative block overflow-hidden ${className}`}
      aria-label={`${category.name} — ${category.tagline}`}
    >
      <Image
        src={category.image}
        alt={category.name}
        ratio="aspect-portrait"
        eager={priority}
        hoverZoom
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />

      {/* Veil — lightens on hover so the photograph comes forward */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-800/85 via-espresso-800/25 to-transparent transition-opacity duration-800 ease-editorial group-hover:opacity-75" />

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        {typeof index === "number" ? (
          <span className="text-2xs tabular-nums tracking-label text-champagne-light/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}

        <div className="mt-2 transition-transform duration-800 ease-editorial group-hover:-translate-y-1">
          <h3 className="font-display text-2xl leading-tight text-ivory lg:text-[1.6rem]">
            {category.name}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-ivory/65">{category.tagline}</p>
        </div>

        <span className="mt-4 flex items-center gap-2 text-2xs uppercase tracking-label text-champagne-light opacity-0 transition-all duration-600 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100">
          Explore
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-600 ease-editorial group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
