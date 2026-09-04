import Image from "../components/Image";
import ScrollReveal from "../components/ScrollReveal";
import { Link } from "../lib/router";
import { CATEGORIES, IMAGES } from "../data/products";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-var(--nav-h))] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.campaign}
          alt=""
          ratio="h-full w-full"
          position="center"
          eager
          sizes="100vw"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />

      <div className="relative shell flex min-h-[calc(100vh-var(--nav-h))] flex-col justify-center py-24">
        <ScrollReveal className="max-w-2xl">
          <p className="eyebrow eyebrow-light">Error 404</p>

          <h1 className="mt-7 font-display text-display-lg text-ivory">
            This page has <em className="text-champagne">gone missing.</em>
          </h1>

          <p className="mt-7 max-w-md text-base leading-loose text-sand">
            The link may be out of date, or we may have moved something. Everything is one step
            away.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link to="/collections" className="btn btn-gold">
              Explore the collection
            </Link>

            <Link to="/" className="btn btn-outline-light">
              Back to home
            </Link>
          </div>

          <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory/15 pt-8">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/collections/${category.slug}`}
                  className="text-2xs uppercase tracking-label text-sand transition-colors duration-400 hover:text-champagne"
                >
                  {category.name}
                </Link>
              </li>
            ))}

            <li>
              <Link
                to="/search"
                className="text-2xs uppercase tracking-label text-sand transition-colors duration-400 hover:text-champagne"
              >
                Search
              </Link>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
