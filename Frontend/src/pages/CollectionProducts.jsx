import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";
import nisrayaLogo from "../assets/nisraya logo.png";

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

import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";

import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
} from "../components/Icons";

import {
  EmptyState,
  ErrorState,
  ProductGridSkeleton,
} from "../components/StateBlocks";

import {
  Link,
  useParams,
  useSearchParams,
} from "../lib/router";

import { CATEGORIES } from "../data/products";

import {
  SORT_OPTIONS,
  getCollection,
  listProducts,
} from "../services/products";

import useAsync from "../hooks/useAsync";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../services/api";

/* -------------------------------------------------------------------------- */
/* Product slideshow images                                                   */
/* -------------------------------------------------------------------------- */

const PEARL_MAJESTY_SLIDES = [
  bag1,
  bag2,
  bag3,
  bag4,
  bag5,
];

const ECLIPSE_CLUTCH_SLIDES = [
  bag12,
  bag13,
  bag14,
  bag15,
  bag16,
];

const MIRROR_MAZE_SLIDES = [
  bag21,
  bag22,
  bag23,
  bag24,
  bag25,
];

/* -------------------------------------------------------------------------- */
/* Price filters                                                              */
/* -------------------------------------------------------------------------- */

const PRICE_BANDS = [
  {
    value: "0-1999",
    label: "Under ₹2,000",
    min: 0,
    max: 1999,
  },
  {
    value: "1500-2000",
    label: "₹1,500 – ₹2,000",
    min: 1500,
    max: 2000,
  },
  {
    value: "1000-1499",
    label: "₹1,000 – ₹1,500",
    min: 1000,
    max: 1499,
  },
  {
    value: "500-999",
    label: "₹500 – ₹1,000",
    min: 500,
    max: 999,
  },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export default function CollectionProducts() {
  const { category: slug } = useParams();
  const [params, setParams] = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stockStatus, setStockStatus] = useState({});
  const [stockUpdating, setStockUpdating] = useState(null);

  const { user, token } = useAuth();
  const isAdmin = user?.role === "admin";

  const sort =
    params.get("sort") ?? "featured";

  const priceBand =
    PRICE_BANDS.find(
      (band) =>
        band.value === params.get("price"),
    ) ?? null;

  const inStockOnly =
    params.get("stock") === "in";

  const activeFilterCount =
    (priceBand ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  /* ------------------------------------------------------------------------ */
  /* Collection                                                               */
  /* ------------------------------------------------------------------------ */

  const collection = useAsync(
    () => getCollection(slug),
    [slug],
  );

  /* ------------------------------------------------------------------------ */
  /* Products                                                                 */
  /* ------------------------------------------------------------------------ */

  const products = useAsync(
    () =>
      listProducts({
        category: slug,

        /* Metal filter removed */
        metals: [],

        minPrice: priceBand
          ? priceBand.min
          : null,

        maxPrice: priceBand
          ? priceBand.max
          : null,

        /*
         * Stock is controlled by MongoDB now, so we do the
         * availability filtering below using the live stock map.
         */
        inStockOnly: false,

        sort,
      }),
    [
      slug,
      priceBand?.value ?? "",
      sort,
    ],
  );

  /* ------------------------------------------------------------------------ */
  /* Live stock                                                               */
  /* ------------------------------------------------------------------------ */

 useEffect(() => {
  let cancelled = false;

  const loadStock = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stock`);

      if (!response.ok) {
        throw new Error("Failed to load stock status.");
      }

      const data = await response.json();

      if (!cancelled) {
        setStockStatus(data?.stock ?? {});
      }
    } catch (error) {
      console.error("Stock load error:", error);

      if (!cancelled) {
        /*
         * Keep the catalogue's existing inStock values if the
         * stock service is temporarily unavailable.
         */
        setStockStatus({});
      }
    }
  };

  loadStock();

  return () => {
    cancelled = true;
  };
}, []);

  const updateProductStock = async (productId, inStock) => {
    if (!isAdmin) return;

    if (!token) {
      window.alert("Your admin session has expired. Please log in again.");
      return;
    }

    setStockUpdating(productId);

    try {
      const response = await fetch(
        `${API_BASE_URL}/stock/${encodeURIComponent(productId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inStock }),
        },
      );

      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `The stock server returned an invalid response (HTTP ${response.status}).`,
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ?? `Unable to update product stock (HTTP ${response.status}).`,
        );
      }

      setStockStatus((current) => ({
        ...current,
        [productId]: Boolean(data.inStock),
      }));
    } catch (error) {
      console.error("Stock update error:", error);
      window.alert(
        error?.message ?? "Unable to update product stock.",
      );
    } finally {
      setStockUpdating(null);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Mobile drawer scroll lock                                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isFilterOpen]);

  /* ------------------------------------------------------------------------ */
  /* Update URL                                                               */
  /* ------------------------------------------------------------------------ */

  const update = (mutate) => {
    const next =
      new URLSearchParams(params);

    mutate(next);

    /* Remove old metal filter */
    next.delete("metal");

    setParams(next, {
      replace: true,
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Price                                                                    */
  /* ------------------------------------------------------------------------ */

  const setPriceBand = (value) =>
    update((next) => {
      if (
        !value ||
        next.get("price") === value
      ) {
        next.delete("price");
      } else {
        next.set("price", value);
      }
    });

  /* ------------------------------------------------------------------------ */
  /* Stock                                                                    */
  /* ------------------------------------------------------------------------ */

  const toggleStock = () =>
    update((next) => {
      if (next.get("stock") === "in") {
        next.delete("stock");
      } else {
        next.set("stock", "in");
      }
    });

  /* ------------------------------------------------------------------------ */
  /* Sort                                                                     */
  /* ------------------------------------------------------------------------ */

  const setSort = (value) =>
    update((next) => {
      if (value === "featured") {
        next.delete("sort");
      } else {
        next.set("sort", value);
      }
    });

  /* ------------------------------------------------------------------------ */
  /* Clear filters                                                            */
  /* ------------------------------------------------------------------------ */

  const clearFilters = () =>
    update((next) => {
      next.delete("price");
      next.delete("stock");
      next.delete("metal");
    });

  /* ------------------------------------------------------------------------ */
  /* Collection error                                                         */
  /* ------------------------------------------------------------------------ */

  if (collection.status === "error") {
    return (
      <div className="shell py-section">
        <EmptyState
          title="We could not find that collection."
          description="It may have been renamed. All four collections are listed on the collections page."
          actionLabel="View all collections"
          actionTo="/collections"
        />
      </div>
    );
  }

  const category = collection.data;

  /* ------------------------------------------------------------------------ */
  /* Defensive client-side price filtering                                    */
  /* ------------------------------------------------------------------------ */

  let filteredProducts =
    (products.data ?? []).map((product) => {
      if (
        Object.prototype.hasOwnProperty.call(
          stockStatus,
          product.id,
        )
      ) {
        return {
          ...product,
          inStock: Boolean(stockStatus[product.id]),
        };
      }

      return product;
    });

  if (
    products.status === "success" &&
    inStockOnly
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) => product.inStock,
      );
  }

  if (
    products.status === "success" &&
    priceBand
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) => {
          const price = Number(
            product?.price,
          );

          if (
            !Number.isFinite(price)
          ) {
            return false;
          }

          return (
            price >= priceBand.min &&
            price <= priceBand.max
          );
        },
      );
  }

  const count =
    filteredProducts.length;

  /* ------------------------------------------------------------------------ */
  /* Filter controls                                                          */
  /* ------------------------------------------------------------------------ */

  const filterControls = (
    <FilterControls
      priceBand={priceBand}
      inStockOnly={inStockOnly}
      activeFilterCount={
        activeFilterCount
      }
      currentSlug={slug}
      onSetPriceBand={
        setPriceBand
      }
      onToggleStock={
        toggleStock
      }
      onClear={clearFilters}
    />
  );

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <PageHeader
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
            label:
              category?.name ??
              "Collection",
          },
        ]}
        eyebrow={
          category?.tagline ??
          "Collection"
        }
        title={
          category?.name ??
          "Collection"
        }
        intro={category?.intro}
      />

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

            {/* ============================================================ */}
            {/* Desktop filters                                               */}
            {/* ============================================================ */}

            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-[calc(var(--nav-h)+2rem)]">
                {filterControls}
              </div>
            </aside>

            {/* ============================================================ */}
            {/* Products                                                      */}
            {/* ============================================================ */}

            <div className="lg:col-span-9">

              {/* ---------------------------------------------------------- */}
              {/* Toolbar                                                     */}
              {/* ---------------------------------------------------------- */}

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso-100 pb-5">

                <p
                  className="text-2xs uppercase tracking-label text-taupe"
                  aria-live="polite"
                >
                  {products.status ===
                  "success"
                    ? `${count} ${
                        count === 1
                          ? "piece"
                          : "pieces"
                      }`
                    : " "}
                </p>

                <div className="flex items-center gap-3">

                  {/* Mobile filter */}

                  <button
                    type="button"
                    onClick={() =>
                      setIsFilterOpen(
                        true,
                      )
                    }
                    className="flex items-center gap-2.5 border border-espresso-100 px-4 py-2.5 text-2xs uppercase tracking-label text-espresso-700 lg:hidden"
                  >
                    <FilterIcon className="h-3.5 w-3.5" />

                    Filter

                    {activeFilterCount >
                    0 ? (
                      <span className="tabular-nums text-champagne-dark">
                        (
                        {
                          activeFilterCount
                        }
                        )
                      </span>
                    ) : null}
                  </button>

                  {/* Sort */}

                  <div className="relative">

                    <label
                      htmlFor="sort"
                      className="sr-only"
                    >
                      Sort products
                    </label>

                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) =>
                        setSort(
                          event.target
                            .value,
                        )
                      }
                      className="cursor-pointer appearance-none border border-espresso-100 bg-transparent py-2.5 pl-4 pr-10 text-2xs uppercase tracking-label text-espresso-700 focus:border-champagne focus:outline-none"
                    >
                      {SORT_OPTIONS.map(
                        (option) => (
                          <option
                            key={
                              option.value
                            }
                            value={
                              option.value
                            }
                          >
                            {
                              option.label
                            }
                          </option>
                        ),
                      )}
                    </select>

                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-espresso-400" />

                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* Product grid                                                */}
              {/* ---------------------------------------------------------- */}

              <div className="mt-12">

                {products.status ===
                "loading" ? (
                  <ProductGridSkeleton
                    count={6}
                  />
                ) : null}

                {products.status ===
                "error" ? (
                  <ErrorState
                    title="Unable to load products."
                    description={
                      products.error
                        ?.message ??
                      "Something interrupted the request."
                    }
                    onRetry={
                      products.reload
                    }
                  />
                ) : null}

               {products.status === "success" &&
count === 0 ? (
  slug === "Jwellery" ||
  slug === "Apparel" ? (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <img
  src={nisrayaLogo}
  alt="NISRAYA by Niyati"
  className="mb-7 h-20 w-auto object-contain"
/>

      <h2 className="mt-5 font-display text-4xl text-espresso-800 sm:text-5xl">
        Coming Soon...
      </h2>

      <p className="mt-5 max-w-md text-sm leading-loose text-espresso-500">
        Something beautiful is being crafted.
        <br />
        It will be worth the wait.
      </p>

      <div className="mt-8 h-px w-12 bg-champagne-dark/40" />
    </div>
  ) : (
    <EmptyState
      title="No products found."
      description="No pieces in this collection match those filters. Try removing one."
      actionLabel="Clear filters"
      onAction={clearFilters}
    />
  )
) : null}

                {products.status ===
                  "success" &&
                count > 0 ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">

                    {filteredProducts.map(
                      (
                        product,
                        index,
                      ) => (
                        <ScrollReveal
                          key={
                            product.id
                          }
                          delay={
                            (index % 3) *
                            90
                          }
                        >

                          {product.name ===
                          "Pearl Majesty" ? (
                            <ProductCard
                              product={product}
                              slideshowImages={
                                PEARL_MAJESTY_SLIDES
                              }
                              priority={
                                index < 3
                              }
                            />
                          ) : product.name ===
                            "Eclipse Clutch" ? (
                            <ProductCard
                              product={product}
                              slideshowImages={
                                ECLIPSE_CLUTCH_SLIDES
                              }
                              priority={
                                index < 3
                              }
                            />
                          ) : product.name ===
                            "Mirror Maze" ? (
                            <ProductCard
                              product={product}
                              slideshowImages={
                                MIRROR_MAZE_SLIDES
                              }
                              priority={
                                index < 3
                              }
                            />
                          ) : (
                            <ProductCard
                              product={product}
                              priority={
                                index < 3
                              }
                            />
                          )}

                          {isAdmin ? (
                            <AdminStockControl
                              product={product}
                              loading={
                                stockUpdating ===
                                product.id
                              }
                              onChange={
                                updateProductStock
                              }
                            />
                          ) : null}

                        </ScrollReveal>
                      ),
                    )}

                  </div>
                ) : null}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Mobile filter drawer                                               */}
      {/* ================================================================== */}

      <div
        role="dialog"
        aria-modal={
          isFilterOpen
            ? "true"
            : undefined
        }
        aria-label="Filter products"
        aria-hidden={
          !isFilterOpen
        }
        className={`fixed inset-0 z-[85] lg:hidden ${
          isFilterOpen
            ? ""
            : "pointer-events-none"
        }`}
      >

        {/* Background */}

        <button
          type="button"
          tabIndex={
            isFilterOpen ? 0 : -1
          }
          aria-label="Close filters"
          onClick={() =>
            setIsFilterOpen(false)
          }
          className={`absolute inset-0 h-full w-full cursor-default bg-espresso-900/50 transition-opacity duration-600 ${
            isFilterOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* Drawer */}

        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-ivory transition-transform duration-600 ease-editorial ${
            isFilterOpen
              ? "translate-y-0"
              : "translate-y-full"
          }`}
        >

          <div className="flex items-center justify-between border-b border-espresso-100 px-gutter py-5">

            <p className="eyebrow">
              Filter
            </p>

            <button
              type="button"
              tabIndex={
                isFilterOpen
                  ? 0
                  : -1
              }
              onClick={() =>
                setIsFilterOpen(false)
              }
              aria-label="Close filters"
              className="flex h-11 w-11 items-center justify-center text-espresso-700"
            >
              <CloseIcon />
            </button>

          </div>

          <div className="px-gutter py-8">
            {filterControls}
          </div>

          <div className="sticky bottom-0 border-t border-espresso-100 bg-ivory px-gutter py-4">

            <button
              type="button"
              tabIndex={
                isFilterOpen
                  ? 0
                  : -1
              }
              onClick={() =>
                setIsFilterOpen(false)
              }
              className="btn btn-dark w-full"
            >
              Show {count}{" "}
              {count === 1
                ? "piece"
                : "pieces"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

/* ========================================================================== */
/* ADMIN STOCK CONTROL                                                        */
/* ========================================================================== */

function AdminStockControl({
  product,
  loading,
  onChange,
}) {
  return (
    <div className="mt-4 border border-espresso-100 bg-cream/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-taupe">
          Admin stock
        </p>

        <span
          className={`text-[10px] uppercase tracking-[0.16em] ${
            product.inStock
              ? "text-champagne-dark"
              : "text-wine"
          }`}
        >
          {product.inStock ? "In stock" : "Sold out"}
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={loading || product.inStock}
          onClick={() => onChange(product.id, true)}
          className={`border px-2.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${
            product.inStock
              ? "border-champagne-dark bg-champagne-dark text-ivory"
              : "border-espresso-200 text-espresso-600 hover:border-champagne-dark"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          In stock
        </button>

        <button
          type="button"
          disabled={loading || !product.inStock}
          onClick={() => onChange(product.id, false)}
          className={`border px-2.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${
            !product.inStock
              ? "border-espresso-700 bg-espresso-700 text-ivory"
              : "border-espresso-200 text-espresso-600 hover:border-espresso-700"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          Sold out
        </button>
      </div>

      {loading ? (
        <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-taupe">
          Saving…
        </p>
      ) : null}
    </div>
  );
}

/* ========================================================================== */
/* FILTER GROUP                                                               */
/* ========================================================================== */

function FilterGroup({
  title,
  children,
}) {
  return (
    <div className="border-t border-espresso-100 py-7 first:border-t-0 first:pt-0">

      <h2 className="text-2xs uppercase tracking-label text-espresso-700">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}

/* ========================================================================== */
/* CHECKBOX ROW                                                               */
/* ========================================================================== */

function CheckRow({
  checked,
  onChange,
  label,
  name,
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3.5 py-2">

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-400 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne ${
          checked
            ? "border-champagne-dark bg-champagne-dark text-ivory"
            : "border-espresso-200 group-hover:border-espresso-400"
        }`}
      >
        {checked ? (
          <CheckIcon className="h-2.5 w-2.5" />
        ) : null}
      </span>

      <span
        className={`text-sm transition-colors duration-400 ${
          checked
            ? "text-espresso-800"
            : "text-espresso-500 group-hover:text-espresso-700"
        }`}
      >
        {label}
      </span>

    </label>
  );
}

/* ========================================================================== */
/* FILTER CONTROLS                                                            */
/* ========================================================================== */

function FilterControls({
  priceBand,
  inStockOnly,
  activeFilterCount,
  currentSlug,
  onSetPriceBand,
  onToggleStock,
  onClear,
}) {
  return (
    <div>

      {/* ------------------------------------------------------------------ */}
      {/* Refine                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex items-center justify-between pb-6">

        <h2 className="text-2xs uppercase tracking-label text-espresso-700">

          Refine

          {activeFilterCount >
          0 ? (
            <span className="ml-2 tabular-nums text-champagne-dark">
              (
              {
                activeFilterCount
              }
              )
            </span>
          ) : null}

        </h2>

        {activeFilterCount >
        0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-espresso-700"
          >
            Clear
          </button>
        ) : null}

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Category                                                            */}
      {/* ------------------------------------------------------------------ */}

      <FilterGroup title="Category">

        <ul className="space-y-1">

          {CATEGORIES.map(
            (category) => {
              const isCurrent =
                category.slug ===
                currentSlug;

              return (
                <li
                  key={
                    category.slug
                  }
                >

                  <Link
                    to={`/collections/${category.slug}`}
                    aria-current={
                      isCurrent
                        ? "page"
                        : undefined
                    }
                    className={`block py-2 text-sm transition-colors duration-400 ${
                      isCurrent
                        ? "text-champagne-dark"
                        : "text-espresso-500 hover:text-espresso-800"
                    }`}
                  >
                    {
                      category.name
                    }
                  </Link>

                </li>
              );
            },
          )}

        </ul>

      </FilterGroup>

      {/* ------------------------------------------------------------------ */}
      {/* Price                                                               */}
      {/* ------------------------------------------------------------------ */}

      <FilterGroup title="Price">

        <div className="space-y-1">

          {PRICE_BANDS.map(
            (band) => (
              <CheckRow
                key={
                  band.value
                }
                name="price"
                label={
                  band.label
                }
                checked={
                  priceBand?.value ===
                  band.value
                }
                onChange={() =>
                  onSetPriceBand(
                    band.value,
                  )
                }
              />
            ),
          )}

        </div>

      </FilterGroup>

      {/* ------------------------------------------------------------------ */}
      {/* Availability                                                        */}
      {/* ------------------------------------------------------------------ */}

      <FilterGroup title="Availability">

        <CheckRow
          name="stock"
          label="Ready to ship"
          checked={
            inStockOnly
          }
          onChange={
            onToggleStock
          }
        />

      </FilterGroup>

    </div>
  );
}
