import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  METALS,
  PRICE_BOUNDS,
  PRODUCTS,
  getCategory,
  getProductBySlug,
} from "../data/products";

import { ACCESSORY_PRODUCTS } from "../data/accessories";

/**
 * Catalogue access layer.
 *
 * Existing NISRAYA products remain in data/products.js.
 * Accessories are added from data/accessories.js.
 *
 * Accessories are available throughout the Accessories collection,
 * but they are NOT automatically added to the existing homepage
 * featured/The Edit products.
 */

export const CATALOGUE_SOURCE = "local";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export { METALS, PRICE_BOUNDS };

/* -------------------------------------------------------------------------- */
/* Combined catalogue                                                        */
/* -------------------------------------------------------------------------- */

const CATALOGUE = [
  ...PRODUCTS,
  ...ACCESSORY_PRODUCTS,
];

/* -------------------------------------------------------------------------- */
/* Sorting                                                                    */
/* -------------------------------------------------------------------------- */

function sortProducts(items, sort) {
  const sorted = [...items];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) => b.releasedAt - a.releasedAt,
      );

    case "price-asc":
      return sorted.sort(
        (a, b) => a.price - b.price,
      );

    case "price-desc":
      return sorted.sort(
        (a, b) => b.price - a.price,
      );

    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }

        return (
          (b.rating ?? 0) -
          (a.rating ?? 0)
        );
      });
  }
}

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

export async function listCategories() {
  return CATEGORIES;
}

/* -------------------------------------------------------------------------- */
/* Products                                                                   */
/* -------------------------------------------------------------------------- */

export async function listProducts({
  category = null,
  metals = [],
  minPrice = null,
  maxPrice = null,
  inStockOnly = false,
  sort = "featured",
  limit = null,
} = {}) {
  let items = CATALOGUE;

  if (category) {
    items = items.filter(
      (product) =>
        product.category === category,
    );
  }

  if (metals.length) {
    items = items.filter(
      (product) =>
        metals.includes(product.metal),
    );
  }

  if (typeof minPrice === "number") {
    items = items.filter(
      (product) =>
        product.price >= minPrice,
    );
  }

  if (typeof maxPrice === "number") {
    items = items.filter(
      (product) =>
        product.price <= maxPrice,
    );
  }

  if (inStockOnly) {
    items = items.filter(
      (product) => product.inStock,
    );
  }

  const sorted = sortProducts(
    items,
    sort,
  );

  return limit
    ? sorted.slice(0, limit)
    : sorted;
}

/* -------------------------------------------------------------------------- */
/* Single product                                                             */
/* -------------------------------------------------------------------------- */

export async function getProduct(slug) {
  const existingProduct =
    getProductBySlug(slug);

  const accessoryProduct =
    ACCESSORY_PRODUCTS.find(
      (product) =>
        product.slug === slug,
    );

  const product =
    existingProduct ??
    accessoryProduct ??
    null;

  if (!product) {
    const error = new Error(
      "We could not find that piece.",
    );

    error.status = 404;

    throw error;
  }

  return product;
}

/* -------------------------------------------------------------------------- */
/* Collection                                                                 */
/* -------------------------------------------------------------------------- */

export async function getCollection(slug) {
  const category = getCategory(slug);

  if (!category) {
    const error = new Error(
      "We could not find that collection.",
    );

    error.status = 404;

    throw error;
  }

  return category;
}

/* -------------------------------------------------------------------------- */
/* Featured / Homepage The Edit                                               */
/* -------------------------------------------------------------------------- */

/*
 * IMPORTANT:
 *
 * Keep the existing homepage featured products exactly as they were.
 *
 * FEATURED_PRODUCTS comes from the original data/products.js catalogue,
 * so the newly-added Accessories do NOT get inserted into the homepage.
 *
 * Accessories still remain fully available through listProducts()
 * when the Accessories collection is opened.
 */

export async function getFeatured(
  limit = 6,
) {
  return sortProducts(
    FEATURED_PRODUCTS,
    "featured",
  ).slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Wishlist products                                                          */
/* -------------------------------------------------------------------------- */

export async function getProductsByIds(
  ids = [],
) {
  const byId = new Map(
    CATALOGUE.map((product) => [
      product.id,
      product,
    ]),
  );

  return ids
    .map((id) => byId.get(id))
    .filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/* Related products                                                           */
/* -------------------------------------------------------------------------- */

export async function getRelated(
  product,
  limit = 4,
) {
  const sameCategory =
    CATALOGUE.filter(
      (item) =>
        item.category ===
          product.category &&
        item.id !== product.id,
    );

  const pool =
    sameCategory.length >= limit
      ? sameCategory
      : [
          ...sameCategory,
          ...CATALOGUE.filter(
            (item) =>
              item.category !==
                product.category &&
              item.featured &&
              item.id !== product.id,
          ),
        ];

  return pool.slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

export async function searchProducts(
  query,
) {
  const term = query
    .trim()
    .toLowerCase();

  if (!term) {
    return [];
  }

  const words = term.split(/\s+/);

  const scored = CATALOGUE.map(
    (product) => {
      const name =
        product.name.toLowerCase();

      const haystack = [
        product.name,
        product.categoryLabel,
        product.metal,
        product.stone ?? "",
        product.shortDescription,
        product.description,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;

      if (name.startsWith(term)) {
        score += 100;
      }

      if (name.includes(term)) {
        score += 60;
      }

      if (
        product.categoryLabel
          .toLowerCase()
          .includes(term)
      ) {
        score += 40;
      }

      if (
        product.metal
          .toLowerCase()
          .includes(term)
      ) {
        score += 25;
      }

      words.forEach((word) => {
        if (name.includes(word)) {
          score += 12;
        } else if (
          haystack.includes(word)
        ) {
          score += 4;
        }
      });

      return {
        product,
        score,
      };
    },
  ).filter(
    (entry) => entry.score > 0,
  );

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.product.rating ?? 0) -
          (a.product.rating ?? 0),
    )
    .map(
      (entry) => entry.product,
    );
}