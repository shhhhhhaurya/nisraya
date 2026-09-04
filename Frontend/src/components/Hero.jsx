import { useCallback, useEffect, useRef, useState } from "react";
import Image from "./Image";
import { ArrowRightIcon } from "./Icons";
import { Link } from "../lib/router";

/*
 * Automatically finds product-1, product-2, product-3 and product-4
 * regardless of their image extension (.jpg, .jpeg, .png, .webp, etc.).
 */
const productImages = import.meta.glob(
  "../assets/product-*.*",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getProductImage = (number) => {
  const match = Object.entries(productImages).find(([path]) =>
    path.toLowerCase().includes(`product-${number}.`)
  );

  return match ? match[1] : "";
};

/**
 * Homepage hero.
 *
 * The photograph holds the right two-thirds of the frame and an espresso veil
 * runs in from the left so the type has ground to sit on without a box.
 *
 * On load, seven things arrive in sequence — image, veil, eyebrow, then the
 * three lines of the headline, then the supporting copy and controls. The ladder
 * below is the whole animation: one duration, one easing, staggered delays.
 */
const SLIDE_MS = 6500;

const SLIDES = [
  {
    image: getProductImage(1),
    caption: "NISRAYA — The New Collection",
    to: "/collections",
    position: "68% 42%",
  },
  {
    image: getProductImage(2),
    caption: "NISRAYA — Signature Jewelry",
    to: "/collections",
    position: "72% 50%",
  },
  {
    image: getProductImage(3),
    caption: "NISRAYA — Made for Your Moments",
    to: "/collections",
    position: "60% 50%",
  },
  {
    image: getProductImage(4),
    caption: "NISRAYA — The Signature Edit",
    to: "/collections",
    position: "60% 50%",
  },
];

/* Step:            1     2     3      4      5      6      7 */
const STEP_DELAY = [120, 320, 620, 820, 980, 1140, 1400];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // A frame's delay lets the browser paint the initial state first, so the
    // transition actually runs instead of being skipped.
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reducedMotion.current || isPaused) return undefined;

    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % SLIDES.length),
      SLIDE_MS
    );

    return () => window.clearTimeout(timer);
  }, [active, isPaused]);

  const stage = useCallback(
    (step, extra = "") => ({
      className: `transition-all duration-1200 ease-editorial ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${extra}`,
      style: { transitionDelay: `${STEP_DELAY[step - 1]}ms` },
    }),
    [mounted]
  );

  // Headline lines rise out of a mask rather than fading.
  const line = (step) => ({
    className: "line-mask pb-[0.14em] -mb-[0.14em]",
    inner: {
      className: `block transition-transform duration-1200 ease-editorial ${
        mounted ? "translate-y-0" : "translate-y-full"
      }`,
      style: { transitionDelay: `${STEP_DELAY[step - 1]}ms` },
    },
  });

  const l1 = line(4);
  const l2 = line(5);
  const l3 = line(6);

  return (
    <section
      aria-label="NISRAYA — the new Indian luxury"
      className="relative isolate min-h-[100svh] overflow-hidden bg-espresso-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Photography */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.image || index}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1600 ease-editorial ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt={
                index === active
                  ? `${slide.caption} photographed for NISRAYA`
                  : ""
              }
              ratio="h-full w-full"
              position={slide.position}
              eager={index === 0}
              sizes="100vw"
              imgClassName={index === active ? "animate-kenburns" : ""}
            />
          ) : null}
        </div>
      ))}

      {/* Veil — left-weighted on desktop, bottom-weighted on mobile.
          Opacity only: sliding a gradient would drag the whole frame. */}
      <div
        aria-hidden="true"
        style={{ transitionDelay: `${STEP_DELAY[1]}ms` }}
        className={`absolute inset-0 transition-opacity duration-1600 ease-editorial ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10 lg:bg-gradient-to-r lg:from-ink/95 lg:via-espresso-900/55 lg:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[100svh] flex-col justify-end pb-32 pt-nav sm:pb-36 lg:justify-center lg:pb-0">
        <div className="shell">
          <div className="max-w-xl lg:max-w-2xl">
            <p {...stage(3, "eyebrow eyebrow-light")}>
              The New Indian Luxury
            </p>

            <h1 className="mt-6 font-display text-display-xl font-light text-ivory sm:mt-8">
              <span className={l1.className}>
                <span {...l1.inner}>Tradition</span>
              </span>

              <span className={l2.className}>
                <span {...l2.inner}>meets</span>
              </span>

              <span className={l3.className}>
                <span {...l3.inner}>
                  <em className="text-champagne">Luxury.</em>
                </span>
              </span>
            </h1>

            <div {...stage(7)}>
              <p className="mt-8 max-w-md text-base leading-loose text-ivory/70 sm:mt-10">
                Timeless handcrafted pieces thatcelebrate India's rich heritage <br>
                </br>with a modern elegance.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-12">
                <Link to="/collections" className="btn btn-gold">
                  Explore the collection
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to={SLIDES[active].to}
                  className="group flex items-center gap-3 text-2xs uppercase tracking-label text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  <span className="link-draw">Shop this look</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div
          {...stage(
            7,
            "shell absolute inset-x-0 bottom-8 sm:bottom-10"
          )}
        >
          <div className="flex items-end justify-between gap-8">
            {/* Scroll cue */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="hidden h-14 w-px overflow-hidden bg-ivory/20 sm:block"
              >
                <span className="block h-full w-px bg-champagne-light animate-scroll-cue" />
              </span>

              <span className="hidden text-2xs uppercase tracking-label text-ivory/45 sm:block">
                Scroll
              </span>
            </div>

            {/* Slide count and navigation */}
            <div className="flex items-center gap-5">
              <p className="text-2xs tabular-nums tracking-label text-ivory/70">
                <span className="text-champagne-light">
                  {String(active + 1).padStart(2, "0")}
                </span>

                <span className="text-ivory/35">
                  {" "}
                  / {String(SLIDES.length).padStart(2, "0")}
                </span>
              </p>

              <div className="flex items-center gap-2.5">
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.image || index}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${slide.caption}`}
                    aria-current={index === active ? "true" : undefined}
                    className="group relative flex h-11 items-center"
                  >
                    <span
                      className={`block h-px transition-all duration-800 ease-editorial ${
                        index === active
                          ? "w-14 bg-ivory/25 sm:w-20"
                          : "w-6 bg-ivory/25 group-hover:bg-ivory/60 sm:w-8"
                      }`}
                    >
                      {index === active ? (
                        <span
                          key={`${active}-${isPaused}`}
                          style={{ "--hero-ms": `${SLIDE_MS}ms` }}
                          className={`block h-px bg-champagne-light ${
                            isPaused ? "" : "hero-progress"
                          }`}
                        />
                      ) : null}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-right text-2xs uppercase tracking-label text-ivory/40 sm:mt-5">
            {SLIDES[active].caption}
          </p>
        </div>
      </div>
    </section>
  );
}