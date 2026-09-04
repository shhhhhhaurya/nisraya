import CategoryCard from "../components/CategoryCard";
import Image from "../components/Image";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { ErrorState, ProductGridSkeleton } from "../components/StateBlocks";
import { Link } from "../lib/router";
import { CATEGORIES, IMAGES } from "../data/products";
import { getFeatured } from "../services/products";
import useAsync from "../hooks/useAsync";
import bagggImage from "../assets/baggg.png";
import nisrayaLogo from "../assets/nisraya logo.png";
/* ================================================================
   PEARL MAJESTY
   Automatic slideshow: bag1 → bag5
================================================================ */
import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";

const PEARL_MAJESTY_SLIDES = [
  bag1,
  bag2,
  bag3,
  bag4,
  bag5,
];

/* ================================================================
   ECLIPSE CLUTCH
   Automatic slideshow: bag12 → bag16
================================================================ */
import bag12 from "../assets/bag12.jpg";
import bag13 from "../assets/bag13.jpg";
import bag14 from "../assets/bag14.jpg";
import bag15 from "../assets/bag15.jpg";
import bag16 from "../assets/bag16.jpg";

const ECLIPSE_CLUTCH_SLIDES = [
  bag12,
  bag13,
  bag14,
  bag15,
  bag16,
];

/* ================================================================
   MIRROR MAZE
   Normal: bag21
   Hover:  bag22
================================================================ */
import bag21 from "../assets/bag21.jpg";
import bag22 from "../assets/bag22.jpg";

const MIRROR_MAZE_IMAGES = [
  bag21,
  bag22,
];

/**
 * /collections — the shop index. Four collections, then the edit, so a customer
 * who does not know what they want still lands on something specific.
 */
export default function Collections() {
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
    <>
      <PageHeader
        trail={[
          { label: "Home", to: "/" },
          { label: "Collections" },
        ]}
        eyebrow="The Collections"
        title="Small collections, made properly."
        intro="Four collections, refined with intention and made to order. Every piece is thoughtfully crafted and finished by hand in our Lucknow atelier."
      />

      <section className="bg-cream pb-section">
        <div className="shell">
          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5">
            {CATEGORIES.map((category, index) => (
              <ScrollReveal
                key={category.slug}
                delay={index * 100}
              >
                <CategoryCard
                  category={category}
                  index={index}
                  priority={index < 4}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial break */}
      <section className="bg-ivory py-section">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-6">
              <Image
  src={bagggImage}
  alt="NISRAYA bag"
  ratio="aspect-campaign"
  sizes="(min-width: 1024px) 50vw, 100vw"
/>
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              className="lg:col-span-5 lg:col-start-8"
            >
              <img
  src={nisrayaLogo}
  alt="NISRAYA"
  className="h-12
   w-auto object-contain"
/>

              <h2 className="mt-7 font-display text-display-sm text-espresso-800">
                Not sure where to begin?
              </h2>

              <p className="mt-6 max-w-md text-base leading-loose text-espresso-500">
                Tell us the occasion, the budget and whether it is for you or
                for someone else. We will send three options with photographs,
                usually the same day.
              </p>

              <Link
                to="/info/contact"
                className="btn btn-outline mt-9"
              >
                Ask the atelier
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          THE EDIT
      ================================================================= */}
      <section className="bg-cream py-section">
        <div className="shell">
          <ScrollReveal>
            <p className="eyebrow">The Edit</p>

            <h2 className="mt-5 font-display text-display-sm text-espresso-800">
              Start with these.
            </h2>
          </ScrollReveal>

          <div className="mt-12 lg:mt-16">
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
                    delay={(index % 3) * 100}
                  >
                    {/* =================================================
                        PEARL MAJESTY
                        bag1 → bag5 automatic slideshow
                    ================================================= */}
                    {product.name === "Pearl Majesty" ? (
                      <ProductCard
                        product={product}
                        slideshowImages={PEARL_MAJESTY_SLIDES}
                      />

                    /* =================================================
                       ECLIPSE CLUTCH
                       bag12 → bag16 automatic slideshow
                    ================================================= */
                    ) : product.name === "Eclipse Clutch" ? (
                      <ProductCard
                        product={product}
                        slideshowImages={ECLIPSE_CLUTCH_SLIDES}
                      />

                    /* =================================================
                       MIRROR MAZE
                       bag21 normal → bag22 hover
                    ================================================= */
                    ) : product.name === "Mirror Maze" ? (
                      <ProductCard
                        product={{
                          ...product,
                          images: MIRROR_MAZE_IMAGES,
                        }}
                      />

                    /* =================================================
                       EVERY OTHER PRODUCT
                       Completely unchanged
                    ================================================= */
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
    </>
  );
}