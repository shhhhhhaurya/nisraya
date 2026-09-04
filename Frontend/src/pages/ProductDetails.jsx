import { useEffect, useMemo, useState } from "react";
import Accordion, { AccordionItem, AccordionList } from "../components/Accordion";
import Breadcrumb from "../components/Breadcrumb";
import Image from "../components/Image";
import ProductCard from "../components/ProductCard";
import QuantitySelector from "../components/QuantitySelector";
import ScrollReveal from "../components/ScrollReveal";
import {
  ArrowRightIcon,
  CertificateIcon,
  HeartIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "../components/Icons";
import { EmptyState, LoadingState } from "../components/StateBlocks";
import { Link, useNavigate, useParams } from "../lib/router";
import { formatINR } from "../lib/format";
import { getProduct, getRelated } from "../services/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import useAsync from "../hooks/useAsync";
import { API_BASE_URL } from "../services/api";

/* ---------------------------------------------------------------
   BAG GALLERY
   These files are inside: src/assets/
---------------------------------------------------------------- */

import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";
import bag12 from "../assets/bag12.jpg";
import bag13 from "../assets/bag13.jpg";
import bag14 from "../assets/bag14.jpg";
import bag15 from "../assets/bag15.jpg";
import bag16 from "../assets/bag16.jpg";
import bag21 from "../assets/bag21.jpg";
import bag22 from "../assets/bag22.jpg";
import bag23 from "../assets/bag23.jpg";
import bag24 from "../assets/bag24.jpg";
import bag25 from "../assets/bag25.jpg";

const PEARL_MAJESTY_IMAGES = [bag1, bag2, bag3, bag4, bag5];
const ECLIPSE_CLUTCH_IMAGES = [bag12, bag13, bag14, bag15, bag16];
const MIRROR_MAZE_IMAGES = [bag21, bag22, bag23, bag24, bag25];

export default function ProductDetails() {
  const { slug } = useParams();
  const { status, data: product, error } = useAsync(
    () => getProduct(slug),
    [slug],
  );

  if (status === "loading") {
    return (
      <LoadingState
        className="min-h-[60vh]"
        label="Loading piece"
      />
    );
  }

  if (status === "error") {
    return (
      <div className="shell py-section">
        <EmptyState
          title={error?.message ?? "We could not find that piece."}
          description="It may have sold out or been renamed. Browse the collections to find something close."
          actionLabel="View all collections"
          actionTo="/collections"
        />
      </div>
    );
  }

  return <ProductView key={product.id} product={product} />;
}

/* ------------------------------------------------------------------ the view */

function ProductView({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [liveInStock, setLiveInStock] = useState(null);

  const { addItem } = useCart();
  const wishlist = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();

  const related = useAsync(
    () => getRelated(product, 4),
    [product.id],
  );

  const isSaved = wishlist.has(product.id);
  const needsSize = product.sizes.length > 0;

  /*
   * Stock is controlled by MongoDB. Load the live status for this
   * product so the detail page always matches the collection page.
   */
  useEffect(() => {
    let cancelled = false;

    const loadStock = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stock`);

        if (!response.ok) {
          throw new Error("Failed to load product stock.");
        }

        const data = await response.json();

        if (!cancelled) {
          const stockMap = data?.stock ?? {};

          if (
            Object.prototype.hasOwnProperty.call(
              stockMap,
              product.id,
            )
          ) {
            setLiveInStock(Boolean(stockMap[product.id]));
          } else {
            setLiveInStock(Boolean(product.inStock));
          }
        }
      } catch (error) {
        console.error("Product stock load error:", error);

        if (!cancelled) {
          /*
           * If the stock service is temporarily unavailable,
           * keep the catalogue's existing product status.
           */
          setLiveInStock(Boolean(product.inStock));
        }
      }
    };

    loadStock();

    return () => {
      cancelled = true;
    };
  }, [product.id, product.inStock]);

  const isProductInStock =
    liveInStock === null
      ? Boolean(product.inStock)
      : liveInStock;

  /*
   * These three products use their dedicated five-image bag galleries.
   * Every other product continues using its original product images.
   */
  const galleryImages =
    product.slug === "pearl-majesty"
      ? PEARL_MAJESTY_IMAGES
      : product.slug === "Eclipse Clutch"
        ? ECLIPSE_CLUTCH_IMAGES
        : product.slug === "Mirror Maze"
          ? MIRROR_MAZE_IMAGES
          : product.images;

  useEffect(() => {
    setSize(null);
    setActiveImage(0);
  }, [product.id]);

  /* Automatic slideshow for the dedicated five-image galleries. */
  useEffect(() => {
    if (galleryImages.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [product.id, galleryImages]);

  const specs = useMemo(
    () =>
      [
        product.stone
          ? {
              label: "Stone",
              value: product.stone.replace(/^A /, ""),
            }
          : null,
        {
          label: "Collection",
          value: product.categoryLabel,
        },
      ].filter(Boolean),
    [product],
  );

  /*
   * Pearl Majesty uses its own bag-specific detail copy.
   * Every other product keeps the original details unchanged.
   */
  const detailItems =
    product.slug === "pearl-majesty"
      ? [
          "Silver-tone metal frame adorned with faux pearls and crystal detailing.",
          "Intricately embellished by hand for a refined, statement finish.",
          "Crafted with delicate detailing, where slight variations reflect its handcrafted character.",
        ]
      : product.details;

  const validate = () => {
    if (needsSize && !size) {
      setSizeError(true);
      toast.error("Please choose a size first.");
      return false;
    }

    return true;
  };

  const handleAddToBag = () => {
    if (!isProductInStock) {
      toast.error("This piece is currently sold out.");
      return;
    }

    if (!validate()) return;

    addItem(product, {
      size,
      quantity,
    });

    toast.success(
      `${product.name} added to your bag.`,
    );
  };

  const handleBuyNow = () => {
    if (!isProductInStock) {
      toast.error("This piece is currently sold out.");
      return;
    }

    if (!validate()) return;

    addItem(product, {
      size,
      quantity,
    });

    navigate("/checkout");
  };

  const handleWishlist = () => {
    const added = wishlist.toggle(product.id);

    toast.push(
      added
        ? `${product.name} saved to your wishlist.`
        : `${product.name} removed from your wishlist.`,
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="shell pt-10">
        <Breadcrumb
          trail={[
            {
              label: "Home",
              to: "/",
            },
            {
              label: "Collections",
              to: "/collections",
            },
            {
              label: product.categoryLabel,
              to: `/collections/${product.category}`,
            },
            {
              label: product.name,
            },
          ]}
        />
      </div>

      {/* Product */}
      <section className="shell pb-section pt-9 lg:pt-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* =========================================================
              GALLERY
          ========================================================= */}

          <div className="lg:col-span-7">

            {/* Main image */}
            <div className="relative">
              <Image
                src={galleryImages[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                ratio="aspect-editorial"
                eager
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>

            {/* =====================================================
                THUMBNAILS
            ===================================================== */}

            {galleryImages.length > 1 ? (
              <div
                className={`mt-4 grid gap-3 sm:gap-4 ${
                  galleryImages.length === 5
                    ? "grid-cols-5"
                    : "grid-cols-4"
                }`}
              >
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${
                      index + 1
                    } of ${galleryImages.length}`}
                    aria-current={
                      index === activeImage
                        ? "true"
                        : undefined
                    }
                    className={`group transition-opacity duration-500 ${
                      index === activeImage
                        ? "opacity-100 ring-1 ring-champagne ring-offset-2 ring-offset-ivory"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      ratio="aspect-square"
                      sizes="140px"
                    />
                  </button>
                ))}
              </div>
            ) : null}

            {/* =====================================================
                BAG IMAGE INDICATORS
            ===================================================== */}

            {galleryImages.length === 5 ? (
              <div className="mt-5 flex items-center justify-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show bag view ${
                      index + 1
                    }`}
                    className={`h-px transition-all duration-500 ${
                      index === activeImage
                        ? "w-10 bg-espresso-700"
                        : "w-5 bg-espresso-200 hover:bg-espresso-500"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* =========================================================
              PRODUCT DETAILS
          ========================================================= */}

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">

              <p className="text-2xs uppercase tracking-label text-taupe">
                {product.categoryLabel}
              </p>

              <h1 className="mt-3.5 font-display text-display-sm text-espresso-800">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="flex items-center gap-0.5"
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3, 4].map((index) => (
                    <StarIcon
                      key={index}
                      className={`h-3 w-3 ${
                        index <
                        Math.round(product.rating)
                          ? "text-champagne"
                          : "text-espresso-100"
                      }`}
                      filled={
                        index <
                        Math.round(product.rating)
                      }
                    />
                  ))}
                </span>

                <span className="text-xs tabular-nums text-espresso-500">
                  {product.rating.toFixed(1)}
                  <span className="text-taupe">
                    {" "}
                    · {product.reviewCount} reviews
                  </span>
                </span>
              </div>

              {/* Price */}
              <p className="mt-7 text-xl tabular-nums text-espresso-800">
                {formatINR(product.price)}
              </p>

              <p className="mt-1.5 text-xs text-taupe">
                Inclusive of all taxes
              </p>

              {/* Description */}
              <p className="mt-7 max-w-md text-base leading-loose text-espresso-500">
                {product.shortDescription}
              </p>

              {/* Specification */}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-espresso-100 py-6">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-2xs uppercase tracking-label text-taupe">
                      {spec.label}
                    </dt>

                    <dd className="mt-1.5 text-sm text-espresso-700">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Size */}
              {needsSize ? (
                <fieldset className="mt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <legend className="text-2xs uppercase tracking-label text-espresso-700">
                      Size
                    </legend>

                    <Link
                      to="/info/care-guide"
                      className="text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-espresso-700"
                    >
                      Size guide
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {product.sizes.map((option) => (
                      <label
                        key={option}
                        className={`cursor-pointer border px-4 py-2.5 text-sm tabular-nums transition-all duration-400 ${
                          size === option
                            ? "border-espresso-700 bg-espresso-700 text-ivory"
                            : "border-espresso-100 text-espresso-600 hover:border-espresso-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={option}
                          checked={size === option}
                          onChange={() => {
                            setSize(option);
                            setSizeError(false);
                          }}
                          className="sr-only"
                        />

                        {option}
                      </label>
                    ))}
                  </div>

                  {sizeError ? (
                    <p
                      role="alert"
                      className="mt-3 text-xs text-wine"
                    >
                      Please choose a size.
                    </p>
                  ) : null}
                </fieldset>
              ) : null}

              {/* Quantity */}
              <div className="mt-8">
                <p className="text-2xs uppercase tracking-label text-espresso-700">
                  Quantity
                </p>

                <div className="mt-4">
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                  />
                </div>
              </div>

              {/* Actions */}
              {isProductInStock ? (
                <div className="mt-9 space-y-3">
                  <button
                    type="button"
                    onClick={handleAddToBag}
                    className="btn btn-dark w-full"
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn btn-gold w-full"
                  >
                    Buy now
                  </button>

                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-pressed={isSaved}
                    className="btn btn-outline w-full"
                  >
                    <HeartIcon
                      filled={isSaved}
                      className="h-3.5 w-3.5"
                    />

                    {isSaved
                      ? "Saved to wishlist"
                      : "Add to wishlist"}
                  </button>
                </div>
              ) : (
                <div className="mt-9">
                  <div className="border border-espresso-100 bg-cream/60 px-6 py-5">
                    <p className="text-2xs uppercase tracking-label text-espresso-700">
                      Currently unavailable
                    </p>

                    <p className="mt-2.5 text-base leading-relaxed text-espresso-500">
                      This piece is between production runs.
                      Write to the atelier and we will tell you
                      the moment it is back.
                  
                    </p>
                  </div>

                  <Link
                    to="/info/contact"
                    className="btn btn-dark mt-4 w-full"
                  >
                    Join the waitlist
                  </Link>

                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-pressed={isSaved}
                    className="btn btn-outline mt-3 w-full"
                  >
                    <HeartIcon
                      filled={isSaved}
                      className="h-3.5 w-3.5"
                    />

                    {isSaved
                      ? "Saved to wishlist"
                      : "Add to wishlist"}
                  </button>
                </div>
              )}

              {/* Assurances */}
              <ul className="mt-9 space-y-3.5">
                {[
                  {
                    Icon: TruckIcon,
                    text: "Complimentary insured shipping across India",
                  },
                  {
                    Icon: CertificateIcon,
                    text: "Hallmarked with a certificate of authenticity",
                  },
                  {
                    Icon: ShieldIcon,
                    text: "15-day returns on unworn pieces",
                  },
                ].map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3.5 text-xs text-espresso-500"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-champagne-dark" />
                    {text}
                  </li>
                ))}
              </ul>

              {/* Accordions */}
              <Accordion className="mt-10">
                <AccordionItem
                  title="Details"
                  defaultOpen
                >
                  <p className="mb-4">
                    {product.description}
                  </p>

                  <AccordionList
                    items={detailItems}
                  />
                </AccordionItem>

                <AccordionItem title="Shipping & Returns">
                  <AccordionList
                    items={product.shipping}
                  />
                </AccordionItem>

                <AccordionItem title="Care">
                  <AccordionList
                    items={product.care}
                  />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================
          RELATED PRODUCTS
      ============================================================= */}

      {related.status === "success" &&
      related.data.length > 0 ? (
        <section className="bg-cream py-section">
          <div className="shell">
            <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">
                  You may also like
                </p>

                <h2 className="mt-5 font-display text-display-sm text-espresso-800">
                  Pieces that sit well together.
                </h2>
              </div>

              <Link
                to={`/collections/${product.category}`}
                className="group inline-flex items-center gap-3 text-2xs uppercase tracking-label text-espresso-700"
              >
                <span className="link-draw">
                  All{" "}
                  {product.categoryLabel.toLowerCase()}
                </span>

                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-600 ease-editorial group-hover:translate-x-1.5" />
              </Link>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-6">
              {related.data.map((item, index) => (
                <ScrollReveal
                  key={item.id}
                  delay={(index % 4) * 90}
                >
                  <ProductCard product={item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}