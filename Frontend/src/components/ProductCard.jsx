import { useEffect, useState } from "react";
import Image from "./Image";
import { HeartIcon } from "./Icons";
import { Link } from "../lib/router";
import { formatINR } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

/**
 * Product card.
 *
 * Normal products:
 *   - First image normally
 *   - Second image crossfades on hover
 *
 * Bags:
 *   - Continue using slideshowImages supplied by the page
 *
 * Accessories:
 *   - Automatically cycles through every image
 *     stored in product.images
 */

export default function ProductCard({
  product,
  priority = false,
  className = "",
  slideshowImages = [],
}) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const toast = useToast();

  /*
   * Accessories automatically use all of their
   * images as a slideshow.
   *
   * Explicit slideshowImages still take priority,
   * preserving the existing Bag behaviour.
   */
  const accessorySlideshow =
    product.category === "Accessories"
      ? product.images
      : [];

  const activeSlideshowImages =
    slideshowImages.length > 0
      ? slideshowImages
      : accessorySlideshow;

  const [slideIndex, setSlideIndex] =
    useState(0);

  const isSaved = wishlist.has(
    product.id,
  );

  const needsSize =
    product.sizes.length > 0;

  const hasSlideshow =
    activeSlideshowImages.length > 0;

  /*
   * Automatic slideshow.
   *
   * No synchronous setState effect here.
   * This avoids the React lint error shown
   * in your screenshot.
   */
  useEffect(() => {
    if (!hasSlideshow) {
      return undefined;
    }

    if (
      activeSlideshowImages.length <= 1
    ) {
      return undefined;
    }

    const timer =
      window.setInterval(() => {
        setSlideIndex(
          (current) =>
            (current + 1) %
            activeSlideshowImages.length,
        );
      }, 2800);

    return () =>
      window.clearInterval(timer);
  }, [
    hasSlideshow,
    activeSlideshowImages.length,
  ]);

  const secondImage =
    product.images[1];

  const handleWishlist = () => {
    const added =
      wishlist.toggle(product.id);

    toast.push(
      added
        ? `${product.name} saved to your wishlist.`
        : `${product.name} removed from your wishlist.`,
    );
  };

  const handleAddToBag = () => {
    addItem(product, {
      quantity: 1,
    });

    toast.success(
      `${product.name} added to your bag.`,
    );
  };

  return (
    <article
      className={`group relative ${className}`}
    >
      <div className="relative">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`${product.name}, ${formatINR(
            product.price,
          )}`}
        >
          {hasSlideshow ? (
            <div className="relative overflow-hidden">
              {activeSlideshowImages.map(
                (image, index) => (
                  <div
                    key={image}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-editorial ${
                      index === slideIndex
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={
                        index === slideIndex
                          ? product.name
                          : ""
                      }
                      ratio="aspect-editorial"
                      eager={
                        priority &&
                        index === 0
                      }
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      hoverZoom
                      className={
                        !product.inStock
                          ? "opacity-70"
                          : ""
                      }
                    />
                  </div>
                ),
              )}

              {/* Keeps card height stable */}
              <Image
                src={
                  activeSlideshowImages[0]
                }
                alt=""
                ratio="aspect-editorial"
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="opacity-0"
              />

              {/* Slideshow indicators */}
              {activeSlideshowImages.length >
              1 ? (
                <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                  {activeSlideshowImages.map(
                    (image, index) => (
                      <span
                        key={image}
                        className={`h-px transition-all duration-500 ${
                          index === slideIndex
                            ? "w-7 bg-ivory"
                            : "w-3 bg-ivory/50"
                        }`}
                      />
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Image
                src={product.images[0]}
                alt={product.name}
                ratio="aspect-editorial"
                eager={priority}
                hoverZoom={!secondImage}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className={
                  !product.inStock
                    ? "opacity-70"
                    : ""
                }
              />

              {secondImage ? (
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-800 ease-editorial group-hover:opacity-100">
                  <Image
                    src={secondImage}
                    alt=""
                    ratio="aspect-editorial"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </div>
              ) : null}
            </>
          )}

          {/* Badges */}
          <div className="pointer-events-none absolute left-0 top-0 flex flex-col items-start gap-2 p-3">
            {product.isNew &&
            product.inStock ? (
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

          {/* Wishlist */}
          <button
            type="button"
            onClick={
              handleWishlist
            }
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

          {/* Desktop bag action */}
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
                onClick={
                  handleAddToBag
                }
                className="btn btn-gold w-full"
              >
                Add to bag
              </button>
            )}
          </div>
        </Link>
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
            onClick={
              handleAddToBag
            }
            className="btn btn-outline w-full"
          >
            Add to bag
          </button>
        )}
      </div>
    </article>
  );
}