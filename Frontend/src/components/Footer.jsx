import { useEffect, useState } from "react";
import nisrayaLogo from "../assets/nisraya logo.png";
import { InstagramIcon, PinterestIcon } from "./Icons";
import { Link } from "../lib/router";
import { PRODUCTS } from "../data/products";

/**
 * Five NISRAYA pieces featured in the footer showcase.
 */
const FEATURED_FOOTER_IDS = [
  "b-01",
  "b-12",
  "b-15",
  "b-16",
  "b-17",
];

const FOOTER_PRODUCTS = FEATURED_FOOTER_IDS
  .map((id) =>
    PRODUCTS.find((product) => product.id === id),
  )
  .filter(Boolean);

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Bags", to: "/collections/bags" },
      { label: "Accessories", to: "/collections/Accessories" },
      { label: "Jwellery", to: "/collections/Jwellery" },
      { label: "Apparel", to: "/collections/Apparel" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Craftsmanship", to: "/info/craftsmanship" },
      { label: "Journal", to: "/info/journal" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact", to: "/info/contact" },
      { label: "Shipping", to: "/info/shipping" },
      { label: "Returns", to: "/info/returns" },
      { label: "Care Guide", to: "/info/care-guide" },
      { label: "FAQs", to: "/info/faqs" },
    ],
  },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    Icon: PinterestIcon,
  },
];

function ArrowLeftIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M19 12H5"
        strokeLinecap="round"
      />
      <path
        d="M10 6L4 12L10 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        strokeLinecap="round"
      />
      <path
        d="M14 6L20 12L14 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeProduct =
    FOOTER_PRODUCTS[activeIndex] ??
    FOOTER_PRODUCTS[0];

  const totalProducts = FOOTER_PRODUCTS.length;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? totalProducts - 1
        : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === totalProducts - 1
        ? 0
        : current + 1,
    );
  };

  useEffect(() => {
    if (isPaused || totalProducts <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === totalProducts - 1
          ? 0
          : current + 1,
      );
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, totalProducts]);

  return (
    <footer className="bg-espresso-800 text-ivory">
      {/* ---------------------------------------------------------------
          PRODUCT SHOWCASE
      ---------------------------------------------------------------- */}
      <div
        className="border-b border-ivory/10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="shell py-14 lg:py-16">
          {/* Heading */}
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-champagne-light">
                The NISRAYA Edit
              </p>

              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl lg:text-5xl">
                Pieces made to be remembered.
              </h2>
            </div>

            <Link
              to="/collections/bags"
              className="text-2xs uppercase tracking-label text-champagne-light transition-colors duration-500 hover:text-ivory"
            >
              Explore the collection
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            {/* ---------------------------------------------------------
                PRODUCT IMAGE
            ---------------------------------------------------------- */}
            <div className="relative flex min-h-0 items-center justify-center overflow-hidden bg-espresso-700">
              <Link
                to={`/product/${encodeURIComponent(
                  activeProduct.slug.trim(),
                )}`}
                aria-label={`View ${activeProduct.name}`}
                className="group flex w-full items-center justify-center"
              >
                <img
                  key={activeProduct.id}
                  src={activeProduct.images?.[0]}
                  alt={activeProduct.name}
                  className="block h-auto max-h-[340px] w-auto max-w-full object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02] sm:max-h-[380px] lg:max-h-[420px]"
                />

                {/* Image caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
                  <p className="text-2xs uppercase tracking-label text-champagne-light">
                    NISRAYA
                  </p>

                  <p className="mt-1.5 font-display text-lg text-ivory sm:text-xl">
                    {activeProduct.name.trim()}
                  </p>
                </div>
              </Link>

              {/* Slide counter */}
              <div className="absolute right-4 top-4 bg-espresso-800/75 px-2.5 py-1.5 backdrop-blur-sm">
                <span className="text-[9px] uppercase tracking-label text-ivory/70">
                  {String(activeIndex + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span className="mx-1 text-ivory/30">
                  /
                </span>

                <span className="text-[9px] uppercase tracking-label text-ivory/70">
                  {String(totalProducts).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>
            </div>

            {/* ---------------------------------------------------------
                PRODUCT INFORMATION
            ---------------------------------------------------------- */}
            <div className="flex flex-col justify-between py-2 lg:py-4">
              <div>
                <p className="text-2xs uppercase tracking-label text-champagne-light">
                  Featured Piece
                </p>

                <h3 className="mt-4 max-w-md font-display text-2xl leading-tight text-ivory sm:text-3xl lg:text-4xl">
                  {activeProduct.name.trim()}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/60">
                  {activeProduct.shortDescription}
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <span className="text-sm text-ivory">
                    ₹
                    {Number(
                      activeProduct.price,
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="h-px w-7 bg-ivory/20" />

                  <span className="text-[9px] uppercase tracking-label text-ivory/45">
                    {activeProduct.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                {/* Controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous product"
                    className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-500 hover:border-champagne-light hover:text-champagne-light"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next product"
                    className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-500 hover:border-champagne-light hover:text-champagne-light"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </button>

                  <Link
                    to={`/product/${encodeURIComponent(
                      activeProduct.slug.trim(),
                    )}`}
                    className="btn btn-outline-light ml-2"
                  >
                    View the piece
                  </Link>
                </div>

                {/* Slide indicators */}
                <div
                  className="mt-6 flex items-center gap-2"
                  aria-label="Product slides"
                >
                  {FOOTER_PRODUCTS.map(
                    (product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() =>
                          setActiveIndex(index)
                        }
                        aria-label={`Show ${product.name.trim()}`}
                        aria-current={
                          index === activeIndex
                            ? "true"
                            : undefined
                        }
                        className={`h-px transition-all duration-500 ${
                          index === activeIndex
                            ? "w-9 bg-champagne-light"
                            : "w-4 bg-ivory/20 hover:bg-ivory/50"
                        }`}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          DIRECTORY
      ---------------------------------------------------------------- */}
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,1fr)_auto] lg:gap-10">
          <div>
            <Link
              to="/"
              aria-label="NISRAYA by Niyati — home"
              className="inline-block text-ivory transition-opacity duration-500 hover:opacity-80"
            >
              <img
                src={nisrayaLogo}
                alt="NISRAYA by Niyati"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-7 max-w-xs text-xs leading-loose text-ivory/45">
              Contemporary heirlooms shaped by Indian sensibility.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
            >
              <h2 className="text-2xs uppercase tracking-label text-champagne-light">
                {column.heading}
              </h2>

              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ivory/60 transition-colors duration-500 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-2xs uppercase tracking-label text-champagne-light">
              Social
            </h2>

            <ul className="mt-6 space-y-3.5">
              {SOCIAL.map(
                ({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 text-sm text-ivory/60 transition-colors duration-500 hover:text-ivory"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          BASELINE
      ---------------------------------------------------------------- */}
      <div className="shell border-t border-ivory/10 py-7">
        <div className="flex flex-col gap-4 text-2xs uppercase tracking-label text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NISRAYA by Niyati
          </p>

          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/info/shipping"
              className="transition-colors duration-500 hover:text-ivory/70"
            >
              Shipping
            </Link>

            <Link
              to="/info/returns"
              className="transition-colors duration-500 hover:text-ivory/70"
            >
              Returns
            </Link>

            <span className="not-italic">
              Made in India
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}