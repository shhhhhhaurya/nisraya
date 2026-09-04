/*
 * NISRAYA Accessories catalogue
 * -------------------------------------------------------------
 * These products are kept separately so the existing catalogue
 * remains untouched.
 */

import acc1 from "../assets/acc1.jpg";
import acc2 from "../assets/acc2.jpg";
import acc3 from "../assets/acc3.jpg";

import acc5 from "../assets/acc5.jpg";
import acc6 from "../assets/acc6.jpg";

import acc11 from "../assets/acc11.jpg";
import acc12 from "../assets/acc12.jpg";
import acc13 from "../assets/acc13.jpg";
import acc14 from "../assets/acc14.jpg";

import acc21 from "../assets/acc21.jpg";
import acc22 from "../assets/acc22.jpg";
import acc23 from "../assets/acc23.jpg";

import acc31 from "../assets/acc31.jpg";
import acc32 from "../assets/acc32.jpg";
import acc33 from "../assets/acc33.jpg";
import acc34 from "../assets/acc34.jpg";

import acc41 from "../assets/acc41.jpg";
import acc42 from "../assets/acc42.jpg";
import acc43 from "../assets/acc43.jpg";
import acc44 from "../assets/acc44.jpg";

/* -------------------------------------------------------------
 * Product 1
 * Regal Kundan Pearl Choker
 * ------------------------------------------------------------- */



/* -------------------------------------------------------------
 * Product 2
 * Timeless Elegance
 * ------------------------------------------------------------- */

const TIMELESS_ELEGANCE_IMAGES = [
  acc11,
  acc12,
  acc13,
  acc14,
];

/* -------------------------------------------------------------
 * Product 3
 * Pearl Kundan Jhumkas
 * ------------------------------------------------------------- */

const PEARL_KUNDAN_JHUMKAS_IMAGES = [
  acc21,
  acc22,
  acc23,
];

/* -------------------------------------------------------------
 * Product 4
 * Elegance Redefined
 * ------------------------------------------------------------- */

const ELEGANCE_REDEFINED_IMAGES = [
  acc31,
  acc32,
  acc33,
  acc34,
];

/* -------------------------------------------------------------
 * Product 5
 * Gulnar Pearl Necklace
 * ------------------------------------------------------------- */

const GULNAR_PEARL_NECKLACE_IMAGES = [
  acc41,
  acc42,
  acc43,
  acc44,
];

/* -------------------------------------------------------------
 * Accessories
 * ------------------------------------------------------------- */

export const ACCESSORY_PRODUCTS = [
 {
  id: "acc-01",
  slug: "regal-kundan-pearl-choker",
  name: "Regal Kundan Pearl Choker",
  category: "Accessories",
  categoryLabel: "Accessories",
  price: 399,
  metal: "Pearl & Gold",
  stone: "Kundan-inspired detailing",
  weight: "Approx. 45 g",

  shortDescription:
    "A regal pearl choker inspired by traditional Indian kundan craftsmanship.",

  description:
    "Regal Kundan Pearl Choker brings together luminous pearls, intricate kundan-inspired detailing, and a richly traditional silhouette. Designed to feel regal while remaining effortless enough for contemporary occasion dressing.",

  details: [
    "Layered pearl detailing with ornate kundan-inspired elements.",
    "Designed as a statement accessory for festive and occasion wear.",
    "Hand-finished detailing gives every piece its own character.",
  ],

  care: [
    "Store separately in the pouch it arrived in, away from direct sunlight.",
    "Remove before swimming, bathing or applying perfume and lotion.",
    "Wipe gently with a soft dry cloth after wear.",
  ],

  shipping: [
    "Complimentary insured shipping across India, delivered in 6-7 working days.",
    "Each order arrives in a NISRAYA box with its certificate of authenticity.",
    "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
    "Made-to-order and engraved pieces are final sale.",
  ],

  sizes: [],

  images: [
    acc1,
    acc2,
    acc3,
    acc5,
    acc6,
  ],

  inStock: true,
  isNew: true,
  featured: true,
  rating: 4.9,
  reviewCount: 42,
  releasedAt: 310,
},
  {
    id: "acc-02",
    slug: "timeless-elegance",
    name: "Timeless Elegance",
    category: "Accessories",
    categoryLabel: "Accessories",
    price: 399,
    metal: "Pearl & Gold",
    stone: "Kundan-inspired detailing",
    weight: "Approx. 38 g",
    shortDescription:
      "A graceful statement accessory balancing traditional detail with modern elegance.",
    description:
      "Timeless Elegance is designed around the quiet richness of Indian jewellery traditions. Fine detailing, pearls, and warm metallic accents create a sophisticated accessory that transitions naturally from festive celebrations to evening occasions.",
    details: [
      "Pearl-led design with intricate traditional-inspired detailing.",
      "Balanced silhouette designed for both Indian and contemporary looks.",
      "Hand-finished character throughout the piece.",
    ],
    care: [
      "Store separately in the pouch it arrived in, away from direct sunlight.",
      "Remove before swimming, bathing or applying perfume and lotion.",
      "Wipe gently with a soft dry cloth after wear.",
    ],
    shipping: [
      "Complimentary insured shipping across India, delivered in 6-7 working days.",
      "Each order arrives in a NISRAYA box with its certificate of authenticity.",
      "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
      "Made-to-order and engraved pieces are final sale.",
    ],
    sizes: [],
    images: TIMELESS_ELEGANCE_IMAGES,
    inStock: true,
    isNew: true,
    featured: true,
    rating: 4.8,
    reviewCount: 36,
    releasedAt: 305,
  },

  {
    id: "acc-03",
    slug: "pearl-kundan-jhumkas",
    name: "Pearl Kundan Jhumkas",
    category: "Accessories",
    categoryLabel: "Accessories",
    price: 149,
    metal: "Pearl & Gold",
    stone: "Kundan-inspired detailing",
    weight: "Approx. 32 g",
    shortDescription:
      "Traditional jhumkas elevated with pearls and intricate kundan-inspired detailing.",
    description:
      "Pearl Kundan Jhumkas reinterpret a familiar Indian silhouette through delicate pearl work and ornate detailing. The result is a statement pair that feels rooted in tradition while remaining beautifully versatile.",
    details: [
      "Classic jhumka silhouette with layered pearl detailing.",
      "Kundan-inspired decorative elements add depth and brilliance.",
      "Designed for festive occasions, weddings, and evening wear.",
    ],
    care: [
      "Store each earring separately in the pouch it arrived in.",
      "Remove before swimming, bathing or applying perfume and lotion.",
      "Clean gently with a soft dry cloth after wear.",
    ],
    shipping: [
      "Complimentary insured shipping across India, delivered in 6-7 working days.",
      "Each order arrives in a NISRAYA box with its certificate of authenticity.",
      "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
      "Made-to-order and engraved pieces are final sale.",
    ],
    sizes: [],
    images: PEARL_KUNDAN_JHUMKAS_IMAGES,
    inStock: true,
    isNew: true,
    featured: true,
    rating: 4.9,
    reviewCount: 51,
    releasedAt: 300,
  },

  {
    id: "acc-04",
    slug: "elegance-redefined",
    name: "Elegance Redefined",
    category: "Accessories",
    categoryLabel: "Accessories",
    price: 399,
    metal: "Pearl & Gold",
    stone: "Traditional-inspired detailing",
    weight: "Approx. 40 g",
    shortDescription:
      "A refined accessory combining intricate Indian-inspired detailing with contemporary elegance.",
    description:
      "Elegance Redefined brings together ornate craftsmanship and a cleaner modern sensibility. Designed to complement both traditional and contemporary wardrobes, it adds a sophisticated finishing touch without overwhelming the look.",
    details: [
      "Intricate decorative detailing inspired by Indian jewellery traditions.",
      "Pearl accents create a soft luminous finish.",
      "Designed for celebrations, dinners, and elevated everyday styling.",
    ],
    care: [
      "Store separately in the pouch it arrived in, away from direct sunlight.",
      "Remove before swimming, bathing or applying perfume and lotion.",
      "Wipe gently with a soft dry cloth after wear.",
    ],
    shipping: [
      "Complimentary insured shipping across India, delivered in 6-7 working days.",
      "Each order arrives in a NISRAYA box with its certificate of authenticity.",
      "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
      "Made-to-order and engraved pieces are final sale.",
    ],
    sizes: [],
    images: ELEGANCE_REDEFINED_IMAGES,
    inStock: true,
    isNew: true,
    featured: true,
    rating: 4.8,
    reviewCount: 39,
    releasedAt: 295,
  },

  {
    id: "acc-05",
    slug: "gulnar-pearl-necklace",
    name: "Gulnar Pearl Necklace",
    category: "Accessories",
    categoryLabel: "Accessories",
    price: 399,
    metal: "Pearl & Gold",
    stone: "Freshwater pearls",
    weight: "Approx. 48 g",
    shortDescription:
      "A luminous pearl necklace with a graceful silhouette and Indian-inspired character.",
    description:
      "Gulnar Pearl Necklace is built around the timeless appeal of pearls, finished with ornate detailing that gives the piece its distinctly Indian character. Soft, luminous and richly detailed, it is designed to become the centre of an occasion look.",
    details: [
      "Luminous pearl detailing arranged into an elegant necklace silhouette.",
      "Traditional-inspired accents add a rich handcrafted character.",
      "Designed to pair beautifully with both festive and contemporary dressing.",
    ],
    care: [
      "Pearls are porous — always the last thing on, and the first thing off.",
      "Wipe with a soft dry cloth after wear. Never submerge in water.",
      "Store flat and separately; pearls scratch against metal.",
    ],
    shipping: [
      "Complimentary insured shipping across India, delivered in 6-7 working days.",
      "Each order arrives in a NISRAYA box with its certificate of authenticity.",
      "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
      "Made-to-order and engraved pieces are final sale.",
    ],
    sizes: [],
    images: GULNAR_PEARL_NECKLACE_IMAGES,
    inStock: true,
    isNew: true,
    featured: true,
    rating: 4.9,
    reviewCount: 47,
    releasedAt: 290,
  },
];

export default ACCESSORY_PRODUCTS;