import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Image from "../components/Image";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";

import { ArrowRightIcon, HeartIcon } from "../components/Icons";
import { ErrorState, ProductGridSkeleton } from "../components/StateBlocks";
import { Link } from "../lib/router";
import { CATEGORIES, IMAGES } from "../data/products";
import { getFeatured } from "../services/products";
import useAsync from "../hooks/useAsync";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { formatINR } from "../lib/format";
import allbags from "../assets/allbags.jpeg";
import bag51 from "../assets/bag51.jpg";
import nisrayaLogo from "../assets/nisraya logo.png";

/* Your existing About Us image */
import jewellery1Image from "../assets/jwellery1.jpg";

/* Five bag views for the homepage slideshow */
import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";

/* Five views for the Eclipse Clutch homepage slideshow */
import bag12 from "../assets/bag12.jpg";
import bag13 from "../assets/bag13.jpg";
import bag14 from "../assets/bag14.jpg";
import bag15 from "../assets/bag15.jpg";
import bag16 from "../assets/bag16.jpg";

/* Five views for the Mirror Maze homepage slideshow */
import bag21 from "../assets/bag21.jpg";
import bag22 from "../assets/bag22.jpg";
import bag23 from "../assets/bag23.jpg";
import bag24 from "../assets/bag24.jpg";
import bag25 from "../assets/bag25.jpg";

/* Five views for the Ishira Pendant homepage slideshow */
import bag31 from "../assets/bag31.jpg";
import bag32 from "../assets/bag32.jpg";
import bag33 from "../assets/bag33.jpg";
import bag34 from "../assets/bag34.jpg";
import bag35 from "../assets/bag35.jpg";

import goodbackground from "../assets/goodbackground.png";



const BAG_SLIDES = [bag1, bag2, bag3, bag4, bag5];
const ECLIPSE_SLIDES = [bag12, bag13, bag14, bag15, bag16];
const MIRROR_SLIDES = [bag21, bag22, bag23, bag24, bag25];
const ISHIRA_SLIDES = [bag31, bag32, bag33, bag34, bag35];


export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Collections />
      <TheEdit />
      <Campaign />
      <SignatureSpread />
    </>
  );
}

/* ---------------------------------------------------------- 02 · about us */

function AboutUs() {
  return (
    <section
      id="about-us"
      className="scroll-mt-nav bg-ivory py-section"
    >
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5 lg:mt-24">
            <Image
              src={jewellery1Image}
              alt="NISRAYA jewellery"
              ratio="aspect-portrait"
              sizes="(min-width: 1024px) 40vw, 100vw"
              position="55% 50%"
            />

            <p className="mt-5 max-w-xs text-xs leading-relaxed text-taupe">
              A vibrant celebration of color, intricate beadwork, and timeless
              Indian craftsmanship.
            </p>
          </ScrollReveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <ScrollReveal>
              <p className="eyebrow">About NISRAYA</p>

              <h2 className="mt-6 font-display text-display-md text-espresso-800">
                Jewelry that speaks softly,
                <br />
                <em className="text-champagne-dark">
                  and stays with you.
                </em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div className="mt-9 max-w-prose space-y-6 text-base leading-loose text-espresso-500">
                <p>
                  NISRAYA was created from a simple belief — jewelry should
                  feel personal, effortless, and meaningful. Each piece is
                  designed to become part of the moments you remember and the
                  stories you carry forward.
                </p>

                <p>
                  Rooted in Indian sensibility and shaped with a contemporary
                  eye, our pieces bring together thoughtful design,
                  craftsmanship, and quiet luxury. From everyday heirlooms to
                  pieces made for celebrations, everything is created to be
                  worn, loved, and kept.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240} className="mt-12">
              <div className="grid gap-8 border-t border-espresso-100 pt-10 sm:grid-cols-3">
                {[
                  {
                    value: "Artisan Crafted",
                    label: "Thoughtfully made, beautifully detailed",
                  },
                  {
                    value: "Made to order",
                    label: "Never mass-produced",
                  },
                  {
                    value: "India",
                    label: "Rooted in Indian craft",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-2xl text-espresso-800">
                      {item.value}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-taupe">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#about-us"
                className="group mt-11 inline-flex items-center gap-3 text-espresso-700"
              >
                <span className="link-draw">
                  Discover NISRAYA
                </span>

                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-600 ease-editorial group-hover:translate-x-1.5" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 03 · collections */

function Collections() {
  return (
    <section className="bg-cream py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="The Collections"
          title="Where tradition meets modern elegance."
          intro="Each collection is small on purpose — a considered set of pieces rather than an endless catalogue."
          linkTo="/collections"
          linkLabel="View all collections"
          align="between"
        />

        <div className="mt-14 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-5">
          {CATEGORIES.map((category, index) => (
            <ScrollReveal
              key={category.slug}
              delay={index * 110}
            >
              <CategoryCard
                category={category}
                index={index}
                priority={index < 2}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 04 · the edit */

function TheEdit() {
  const {
    data: products,
    status,
    error,
    reload,
  } = useAsync(
    () => getFeatured(6),
    []
  );

  return (
    <section className="bg-ivory py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="The Edit"
          title="The art of carrying beautifully."
          intro="Pieces designed to elevate the everyday, with detail in every finish."
          linkTo="/collections/bags"
          linkLabel="View more collection"
          align="between"
        />

        <div className="mt-14 lg:mt-20">
          {status === "loading" ? (
            <ProductGridSkeleton count={6} />
          ) : null}

          {status === "error" ? (
            <ErrorState
              title="Unable to load products."
              description={
                error?.message ??
                "Something interrupted the request."
              }
              onRetry={reload}
            />
          ) : null}

          {status === "success" ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
              {products.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  delay={(index % 3) * 110}
                >
                  {product.slug === "pearl-majesty" ? (
                    <BagSlideshowCard
                      product={product}
                      slides={BAG_SLIDES}
                    />
                  ) : product.slug === "eclipse-clutch" ? (
                    <BagSlideshowCard
                      product={product}
                      slides={ECLIPSE_SLIDES}
                    />
                  ) : product.slug === "mirror-maze" ? (
                    <BagSlideshowCard
                      product={product}
                      slides={MIRROR_SLIDES}
                    />
                  ) : product.slug === "ishira-pendant" ? (
                    <IshiraSlideshowCard product={product} />
                  ) : product.images?.length > 1 ? (
                    <BagSlideshowCard
                      product={product}
                      slides={product.images}
                    />
                  ) : (
                    <ProductCard product={product} />
                  )}
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Ishira slideshow card */

function IshiraSlideshowCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();
  const wishlist = useWishlist();
  const toast = useToast();

  const isSaved = wishlist.has(product.id);
  const needsSize = product.sizes.length > 0;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % ISHIRA_SLIDES.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const handleWishlist = () => {
    const added = wishlist.toggle(product.id);

    toast.push(
      added
        ? `${product.name} saved to your wishlist.`
        : `${product.name} removed from your wishlist.`,
    );
  };

  const handleAddToBag = () => {
    addItem(product, { quantity: 1 });
    toast.success(`${product.name} added to your bag.`);
  };

  return (
    <article className="group relative">
      <div className="relative overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`${product.name}, ${formatINR(product.price)}`}
        >
          <div className="relative aspect-editorial overflow-hidden bg-cream">
            {ISHIRA_SLIDES.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={index === activeImage ? product.name : ""}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-editorial ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 flex flex-col items-start gap-2 p-3">
            {product.isNew && product.inStock ? (
              <span className="bg-espresso-700/90 px-3 py-1.5 text-2xs uppercase tracking-label text-ivory">
                New
              </span>
            ) : null}

            {!product.inStock ? (
              <span className="bg-ivory/95 px-3 py-1.5 text-2xs uppercase tracking-label text-espresso-600">
                Waitlist
              </span>
            ) : null}
          </div>
        </Link>

        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={[
            "absolute right-2 top-2 flex h-11 w-11 items-center justify-center transition-all duration-500 ease-editorial",
            "sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
            isSaved
              ? "text-champagne-dark sm:opacity-100"
              : "text-espresso-600 hover:text-espresso-700",
          ].join(" ")}
        >
          <HeartIcon
            filled={isSaved}
            className="h-[1.15rem] w-[1.15rem]"
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 p-3 opacity-0 transition-all duration-600 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          {!product.inStock ? (
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-outline-light w-full bg-espresso-700/85"
            >
              Join the waitlist
            </Link>
          ) : needsSize ? (
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-gold w-full"
            >
              Select a size
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToBag}
              className="btn btn-gold w-full"
            >
              Add to bag
            </button>
          )}
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {ISHIRA_SLIDES.map((_, index) => (
            <span
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeImage
                  ? "w-5 bg-ivory"
                  : "w-1.5 bg-ivory/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-2xs uppercase tracking-label text-taupe">
          {product.categoryLabel}
        </p>

        <h3 className="mt-2 font-display text-lg leading-snug text-espresso-700">
          <Link to={`/product/${product.slug}`} className="link-quiet">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm tabular-nums text-espresso-600">
          {formatINR(product.price)}
        </p>
      </div>

      <div className="mt-4 sm:hidden">
        {!product.inStock ? (
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-outline w-full"
          >
            Join the waitlist
          </Link>
        ) : needsSize ? (
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-outline w-full"
          >
            Select a size
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddToBag}
            className="btn btn-outline w-full"
          >
            Add to bag
          </button>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------- bag slideshow card */

function BagSlideshowCard({ product, slides }) {
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();
  const wishlist = useWishlist();
  const toast = useToast();

  const isSaved = wishlist.has(product.id);
  const needsSize = product.sizes.length > 0;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const handleWishlist = () => {
    const added = wishlist.toggle(product.id);

    toast.push(
      added
        ? `${product.name} saved to your wishlist.`
        : `${product.name} removed from your wishlist.`,
    );
  };

  const handleAddToBag = () => {
    addItem(product, { quantity: 1 });
    toast.success(`${product.name} added to your bag.`);
  };

  return (
    <article className="group relative">
      <div className="relative overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`${product.name}, ${formatINR(product.price)}`}
        >
          <div className="relative aspect-editorial overflow-hidden bg-cream">
            {slides.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={
                  index === activeImage
                    ? product.name
                    : ""
                }
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-editorial ${
                  index === activeImage
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* New badge */}
          <div className="pointer-events-none absolute left-0 top-0 flex flex-col items-start gap-2 p-3">
            {product.isNew && product.inStock ? (
              <span className="bg-espresso-700/90 px-3 py-1.5 text-2xs uppercase tracking-label text-ivory">
                New
              </span>
            ) : null}

            {!product.inStock ? (
              <span className="bg-ivory/95 px-3 py-1.5 text-2xs uppercase tracking-label text-espresso-600">
                Waitlist
              </span>
            ) : null}
          </div>
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={[
            "absolute right-2 top-2 flex h-11 w-11 items-center justify-center transition-all duration-500 ease-editorial",
            "sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
            isSaved
              ? "text-champagne-dark sm:opacity-100"
              : "text-espresso-600 hover:text-espresso-700",
          ].join(" ")}
        >
          <HeartIcon
            filled={isSaved}
            className="h-[1.15rem] w-[1.15rem]"
          />
        </button>

        {/* Add to bag */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 p-3 opacity-0 transition-all duration-600 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          {!product.inStock ? (
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-outline-light w-full bg-espresso-700/85"
            >
              Join the waitlist
            </Link>
          ) : needsSize ? (
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-gold w-full"
            >
              Select a size
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToBag}
              className="btn btn-gold w-full"
            >
              Add to bag
            </button>
          )}
        </div>

        {/* Slideshow indicators */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeImage
                  ? "w-5 bg-ivory"
                  : "w-1.5 bg-ivory/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product information */}
      <div className="mt-5">
        <p className="text-2xs uppercase tracking-label text-taupe">
          {product.categoryLabel}
        </p>

        <h3 className="mt-2 font-display text-lg leading-snug text-espresso-700">
          <Link
            to={`/product/${product.slug}`}
            className="link-quiet"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm tabular-nums text-espresso-600">
          {formatINR(product.price)}
        </p>
      </div>

      {/* Mobile bag action */}
      <div className="mt-4 sm:hidden">
        {!product.inStock ? (
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-outline w-full"
          >
            Join the waitlist
          </Link>
        ) : needsSize ? (
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-outline w-full"
          >
            Select a size
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddToBag}
            className="btn btn-outline w-full"
          >
            Add to bag
          </button>
        )}
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- 05 · campaign */

function Campaign() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso-900">
      <div className="absolute inset-0">
        <Image
          src={goodbackground}
          alt="Gold detail from the NISRAYA campaign"
          ratio="h-full w-full"
          position="50% 40%"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/65"
      />

      <div className="relative shell py-section">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <img
  src={nisrayaLogo}
  alt="NISRAYA by Niyati"
  className="mx-auto h-16 w-auto object-contain"
/>

          <p className="eyebrow eyebrow-light mt-9">
            Made for your moments
          </p>

          <h2 className="mt-7 font-display text-display-md text-balance text-ivory">
            Jewelry designed to become part of the stories you keep.
          </h2>

          <a
            href="#about-us"
            className="group mt-11 inline-flex items-center gap-3 text-champagne-light"
          >
            <span className="link-draw">
              About NISRAYA
            </span>

            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-600 ease-editorial group-hover:translate-x-1.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ 06 · signature spread */

function SignatureSpread() {
  return (
    <section className="bg-ivory py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-7">
            <Image
              src={allbags}
              alt="The Meher sculpted necklace worn open-collared"
              ratio="aspect-portrait"
              sizes="(min-width: 1024px) 58vw, 100vw"
              position="50% 35%"
            />
          </ScrollReveal>

          <div className="lg:col-span-5 lg:pl-8">
            <ScrollReveal
              delay={120}
              className="lg:pt-16"
            >
              <p className="eyebrow">
                The Signature Collection
              </p>

              <h2 className="mt-6 font-display text-display-sm text-espresso-800">
                The Pearl Edit —
                <br/>
                 delicate craft,  
                <br />
                timeless character.
              </h2>

              <p className="mt-7 max-w-md text-base leading-loose text-espresso-500">
                A celebration of texture, colour and Indian craftsmanship. Delicate pearls,
                 intricate beadwork and traditional-inspired detailing come together slowly
                  by hand, creating pieces with a character that only grows richer with time.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
  to="/product/The%20Ivory%20Elegance%20Clutch"
  className="btn btn-dark"
>
  View the piece
</Link>

                <Link
                  to="/collections/bags"
                  className="text-2xs uppercase tracking-label text-espresso-600"
                >
                  <span className="link-draw">
                    All bags
                  </span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={220}
              className="mt-10 lg:mt-16"
            >
              <Image
                src={bag51}
                alt="The Aranya solitaire ring resting on stone"
                ratio="aspect-square"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />

              <p className="mt-5 max-w-xs text-xs leading-relaxed text-taupe">
                
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}