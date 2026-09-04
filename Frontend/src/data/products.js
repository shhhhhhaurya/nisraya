/**
 * NISRAYA catalogue
 * ---------------------------------------------------------------------------
 * The storefront reads its catalogue through `services/products.js`, never from
 * this file directly. When the backend grows product endpoints, that service is
 * the only place that changes — this module can then be deleted or kept as a
 * seed script.
 *
 * REPLACING THE PHOTOGRAPHY
 * Every image in the site resolves through the IMAGES map below. Swap an entry
 * for your own file (e.g. `import aranya from "../assets/aranya.jpg"`) and it
 * updates everywhere that piece appears.
 */

/* ------------------------------------------------------------------ imagery */
import bagImage from "../assets/bag-image.jpg";
import accessoriesImage from "../assets/accessories.png";
import apparelImage from "../assets/apparel.jpg";
import jewelleryImage from "../assets/jwellery.png";

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
import bag41 from "../assets/bag41.jpg";
import bag42 from "../assets/bag42.jpg";
import bag43 from "../assets/bag43.jpg";
import bag44 from "../assets/bag44.jpg";
import bag31 from "../assets/bag31.jpg";
import bag32 from "../assets/bag32.jpg";
import bag33 from "../assets/bag33.jpg";
import bag34 from "../assets/bag34.jpg";
import bag35 from "../assets/bag35.jpg";
import bag51 from "../assets/bag51.jpg";
import bag52 from "../assets/bag52.jpg";
import bag53 from "../assets/bag53.jpg";
import bag54 from "../assets/bag54.jpg";
import bag55 from "../assets/bag55.jpg";
import bag61 from "../assets/bag61.jpg";
import bag62 from "../assets/bag62.jpg";
import bag63 from "../assets/bag63.jpg";
import bag64 from "../assets/bag64.jpg";
import bag65 from "../assets/bag65.jpg";

import bag71 from "../assets/bag71.jpg";
import bag72 from "../assets/bag72.jpg";
import bag73 from "../assets/bag73.jpg";
import bag74 from "../assets/bag74.jpg";


import bag81 from "../assets/bag81.jpg";
import bag82 from "../assets/bag82.jpg";
import bag83 from "../assets/bag83.jpg";
import bag84 from "../assets/bag84.jpg";

import bag91 from "../assets/bag91.jpg";
import bag92 from "../assets/bag92.jpg";
import bag93 from "../assets/bag93.jpg";
import bag94 from "../assets/bag94.jpg";

import bag101 from "../assets/bag101.jpg";
import bag102 from "../assets/bag102.jpg";
import bag103 from "../assets/bag103.jpg";
import bag104 from "../assets/bag104.jpg";
import bag105 from "../assets/bag105.jpg";

import bag201 from "../assets/bag201.jpg";
import bag202 from "../assets/bag202.jpg";
import bag203 from "../assets/bag203.jpg";

import bag301 from "../assets/bag301.jpg";
import bag302 from "../assets/bag302.jpg";
import bag303 from "../assets/bag303.jpg";
import bag304 from "../assets/bag304.jpg";
import bag305 from "../assets/bag305.jpg";

import bag401 from "../assets/bag401.jpg";
import bag402 from "../assets/bag402.jpg";
import bag403 from "../assets/bag403.jpg";
import bag404 from "../assets/bag404.jpg";
import bag405 from "../assets/bag405.jpg";

import bag501 from "../assets/bag501.jpg";
import bag502 from "../assets/bag502.jpg";
import bag503 from "../assets/bag503.jpg";
import bag504 from "../assets/bag504.jpg";


import bag601 from "../assets/bag601.jpg";
import bag602 from "../assets/bag602.jpg";
import bag603 from "../assets/bag603.jpg";
import bag604 from "../assets/bag604.jpg";
import bag605 from "../assets/bag605.jpg";

import bag701 from "../assets/bag701.jpg";
import bag702 from "../assets/bag702.jpg";
import bag703 from "../assets/bag703.jpg";
import bag704 from "../assets/bag704.jpg";

import bag801 from "../assets/bag801.jpg";
import bag802 from "../assets/bag802.jpg";
import bag803 from "../assets/bag803.jpg";
import bag804 from "../assets/bag804.jpg";

import bag21 from "../assets/bag21.jpg";
import bag22 from "../assets/bag22.jpg";
import bag23 from "../assets/bag23.jpg";
import bag24 from "../assets/bag24.jpg";
import bag25 from "../assets/bag25.jpg";
const LOCAL_IMAGES = {
  bag1,
  bag2,
  bag3,
  bag4,
  bag5,
  bag12,
  bag13,
  bag14,
  bag15,
  bag16,
  bag21,
bag22,
bag23,
bag24,
bag25,
  bag31,
bag32,
bag33,
bag34,
bag35,
  bag41,
  bag42,
  bag43,
  bag44,
  bag51,
bag52,
bag53,
bag54,
bag55,
  bag61,
  bag62,
  bag63,
  bag64,
  bag65,

  bag71,
  bag72,
  bag73,
  bag74,


  bag81,
  bag82,
  bag83,
  bag84, 
  
  bag91,
  bag92,
  bag93,
  bag94,

  bag101,
  bag102,
  bag103,
  bag104,
  bag105,

  bag201,
  bag202,
  bag203,

  bag301,
bag302,
bag303,
bag304,
bag305,

bag401,
bag402,
bag403,
bag404,
bag405,

bag501,
bag502,
bag503,
bag504,


bag601,
bag602,
bag603,
bag604,
bag605,

bag701,
bag702,
bag703,
bag704,

bag801,
bag802,
bag803,
bag804,
};



const UNSPLASH_IDS = {
  ringSolitaire: "photo-1605100804763-247f67b3557e",
  necklaceGold: "photo-1599643478518-a784e5dc4c8f",
  earringsDrop: "photo-1535632066927-ab7c9ab60908",
  heroEditorial: "photo-1617038260897-41a1f14a8ca0",
  craftBench: "photo-1611652022419-a9419f74343d",
  ringStack: "photo-1515562141207-7a88fb7ce338",
  necklaceLayered: "photo-1602751584552-8ba73aad10e1",
  earringsStud: "photo-1573408301185-9146fe634ad0",
  braceletGold: "photo-1596944924616-7b38e7cfac36",
  flatlay: "photo-1611591437281-460bfbe1220a",
  goldDetail: "photo-1610694955371-d4a3e0ce4b52",
  bangles: "photo-1621784563330-caee0b138a00",
};

/** Build a sized Unsplash URL. Replace this helper to point at your own CDN. */
function photo(key, width = 1200) {
  const id = UNSPLASH_IDS[key];
  if (!id) return "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

export const IMAGES = {
  hero: [photo("heroEditorial", 2200), photo("goldDetail", 2200), photo("flatlay", 2200)],
  philosophy: photo("craftBench", 1400),
  campaign: photo("goldDetail", 2200),
  signatureLarge: photo("necklaceGold", 1400),
  signatureSmall: photo("ringSolitaire", 800),
  storyHero: photo("flatlay", 2200),
  storyCraft: photo("craftBench", 1400),
  storyValues: photo("goldDetail", 1400),
};

/* -------------------------------------------------------------- collections */

export const CATEGORIES = [
  {
  slug: "bags",
  name: "Bags",
  label: "Bags",
  tagline: "Vibrant Elegance",
  image: bagImage,
  intro:
    "Handcrafted bags shaped by texture, colour and character- made to be carried, noticed, and remembered.",
},
  {
    slug: "Accessories",
    name: "Accessories",
    label: "Accessories",
    tagline: "Light, refined, effortless",
    image: accessoriesImage,
    intro:
      "From barely-there studs to jhumkas built on traditional silhouettes, drawn in cleaner lines and lighter weights.",
  },
  {
    slug: "Jwellery",
    name: "Jwellery",
    label: "Jwellery",
    tagline: "Made to be remembered",
    image: jewelleryImage,
    intro:
      "Chains, pendants and collars designed to layer with each other — and with the pieces you already own.",
  },
  {
    slug: "Apparel",
    name: "Apparel",
    label: "Apparel",
    tagline: "Heirlooms, reconsidered",
    image: apparelImage,
    intro:
      "Kadas, cuffs and slim chain bracelets — the most traditional part of an Indian jewellery box, redrawn with restraint.",
  },
];

export const METALS = [
  "18K Yellow Gold",
  "18K Rose Gold",
  "Platinum",
  "Sterling Silver",
  "Pearl & Gold",
];

/* ------------------------------------------------------------ shared copy */

const CARE_GOLD = [
  "Store each piece separately in the pouch it arrived in, away from direct sunlight.",
  "Remove before swimming, bathing or applying perfume and lotion.",
  "Clean with the NISRAYA polishing cloth. Avoid chemical cleaners entirely.",
];

const CARE_SILVER = [
  "Silver naturally darkens with air. Polish gently to bring back the shine.",
  "Keep in the anti-tarnish pouch provided when not being worn.",
  "Remove before swimming or using household cleaners.",
];

const CARE_PEARL = [
  "Pearls are porous — always the last thing on, and the first thing off.",
  "Wipe with a soft dry cloth after wear. Never submerge in water.",
  "Store flat and separately; pearls scratch against metal.",
];

const SHIPPING = [
  "Complimentary insured shipping across India, delivered in 6-7 working days.",
  "Each order arrives in a NISRAYA box with its certificate of authenticity.",
  "Returns and exchanges accepted within 15 days, unworn and in original packaging.",
  "Made-to-order and engraved pieces are final sale.",
];

/* ------------------------------------------------------------------ helpers */

const RING_SIZES = ["10", "12", "14", "16", "18", "20"];
const NECK_SIZES = ['16"', '18"', '20"'];
const BANGLE_SIZES = ["2.4", "2.6", "2.8"];

function careFor(metal) {
  if (metal === "Sterling Silver") return CARE_SILVER;
  if (metal === "Pearl & Gold") return CARE_PEARL;
  return CARE_GOLD;
}

/**
 * Expand a compact record into a full product.
 * Keeping the source rows terse makes the catalogue readable and keeps the
 * repeated boilerplate (care, shipping, gallery) in exactly one place.
 */
function build(row) {
  const category = CATEGORIES.find((entry) => entry.slug === row.category);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryLabel: category?.label ?? row.category,
    price: row.price,
    metal: row.metal,
    stone: row.stone ?? null,
    weight: row.weight,
    shortDescription: row.short,
    description: row.long,
    details: [
      `${row.metal}${row.stone ? ` set with ${row.stone.toLowerCase()}` : ""}.`,
      
      ...(row.details ?? []),
      "Handcrafted in our Lucknow atelier. Slight variation is the signature of hand work.",
    ],
    care: careFor(row.metal),
    shipping: SHIPPING,
    sizes: row.sizes ?? [],
    images: row.images.map((key) => LOCAL_IMAGES[key] ?? photo(key, 1200)),
    inStock: row.inStock !== false,
    isNew: row.isNew === true,
    featured: row.featured === true,
    rating: row.rating,
    reviewCount: row.reviews,
    // Drives the "Newest" sort. Newer pieces carry a higher number.
    releasedAt: row.released,
  };
}

/* ----------------------------------------------------------------- products */

const ROWS = [
  /* ------------------------------ RINGS ------------------------------ */
  {
  id: "r-01",
  slug: "Eclipse Clutch",
  name: "Eclipse Clutch",
  category: "bags",
  price: 1499,
  metal: "Intricately crafted with a distinctive geometric pattern.",
  
  weight: "3.2 g",
  short: "Where intricate craftsmanship meets effortless glamour.",
  long:
    "Eclipse is defined by its intricate geometric surface and luminous detailing, creating a striking play of texture and light. Designed to move effortlessly from evening occasions to elevated gatherings, it is a statement piece made to be remembered.",
  
  images: ["bag12", "bag13", "bag14", "bag15", "bag16"],
  rating: 4.9,
  reviews: 68,
  featured: true,
  isNew: true,
  released: 240,
},
  {
    id: "r-02",
    slug: "The Ivory Elegance Clutch",
    name: "The Ivory Elegance Clutch",
    category: "bags",
    price: 899,
    metal: "Quiet luxury, finished with a touch of sparkle.",
  
    
    short: "Elegance in every detail, made to shine after dark.",
    long:
      "A sophisticated ivory clutch featuring a clean envelope silhouette and an intricately embellished flap. Delicate silver-toned beadwork creates a geometric pattern across the front, adding subtle sparkle without overpowering the minimal design.",
    
    images: ["bag51", "bag52", "bag53", "bag54", "bag55"],
    rating: 4.8,
    reviews: 112,
    featured: true,
    released: 180,
  },
  {
    id: "r-03",
    slug: "mira-stacking-band",
    name: "Mira Stacking Band",
    category: "rings",
    price: 18900,
    metal: "18K Yellow Gold",
    weight: "1.8 g",
    short: "A slim hand-hammered band, made to be worn in twos and threes.",
    long:
      "Mira is the quietest thing we make. Hammered by hand so each band catches light differently, which is precisely why they look best stacked.",
    sizes: RING_SIZES,
    images: ["ringStack", "flatlay"],
    rating: 4.7,
    reviews: 94,
    released: 120,
  },
  {
    id: "r-04",
    slug: "saanjh-cocktail-ring",
    name: "Saanjh Cocktail Ring",
    category: "rings",
    price: 67500,
    metal: "18K Yellow Gold",
    stone: "A cabochon emerald",
    weight: "6.4 g",
    short: "An unfaceted emerald in a plain gold collar — colour, and nothing else.",
    long:
      "Named for the hour just after sunset. The emerald is left as a smooth cabochon rather than faceted, so it reads as deep colour instead of sparkle, held in a collar with no ornament at all.",
    sizes: RING_SIZES,
    images: ["goldDetail", "ringSolitaire"],
    rating: 4.9,
    reviews: 41,
    released: 200,
  },
  {
    id: "r-05",
    slug: "ahana-twin-stone-ring",
    name: "Ahana Twin-Stone Ring",
    category: "rings",
    price: 74000,
    metal: "Platinum",
    stone: "Two brilliant-cut diamonds",
    weight: "4.8 g",
    short: "Two stones on an open band — a toi et moi, drawn in a straighter line.",
    long:
      "The two-stone ring has always meant two people. Ahana keeps the sentiment and loses the flourish: an open platinum band, the stones set close but never touching.",
    sizes: RING_SIZES,
    images: ["ringSolitaire", "ringStack"],
    inStock: false,
    rating: 4.8,
    reviews: 27,
    released: 150,
  },
  {
    id: "r-06",
    slug: "nira-pearl-ring",
    name: "Nira Pearl Ring",
    category: "rings",
    price: 22400,
    metal: "18K Rose Gold",
    stone: "A freshwater pearl",
    weight: "2.6 g",
    short: "One pearl, off-centre, on a fine rose gold band.",
    long:
      "The pearl sits slightly off the centre line — a small deliberate imbalance that keeps the ring from feeling formal.",
    sizes: RING_SIZES,
    images: ["flatlay", "ringStack"],
    rating: 4.6,
    reviews: 53,
    released: 95,
  },

  /* ----------------------------- EARRINGS ---------------------------- */
  {
  id: "bag-03",
  slug: "mirror-maze",
  name: "Mirror Maze",
  category: "bags",
  price: 1399,
  metal: "Sculpted to shine, designed to make an entrance.",
  weight: "5.2 g",
  short: "Bold in form. Refined in every detail.",
  long:
    "A sculptural statement defined by fluid curves and a polished, mirror-like finish. Designed to catch the light from every angle, this piece brings a bold, contemporary edge to any look.",
  images: ["bag21", "bag22", "bag23", "bag24", "bag25"],
  rating: 4.9,
  reviews: 156,
  featured: true,
  isNew: true,
  released: 235,
},
  {
    id: "e-02",
    slug: "ira-pearl-drop-earrings",
    name: "Ira Pearl Drop Earrings",
    category: "earrings",
    price: 29500,
    metal: "Pearl & Gold",
    stone: "Baroque freshwater pearls",
    weight: "4.4 g",
    short: "Baroque pearls that swing from a fine gold thread.",
    long:
      "No two pairs are alike — baroque pearls refuse to match, which is the point. Hung from a thread so fine the pearl appears to float.",
    images: ["earringsStud", "earringsDrop"],
    rating: 4.8,
    reviews: 88,
    featured: true,
    released: 190,
  },
  {
    id: "e-03",
    slug: "meenakshi-jhumka",
    name: "Meenakshi Jhumka",
    category: "earrings",
    price: 58000,
    metal: "18K Yellow Gold",
    stone: "Hand-painted meenakari enamel",
    weight: "8.9 g",
    short: "A temple jhumka, stripped back to its silhouette.",
    long:
      "The jhumka is the most recognisable earring in India. Ours keeps the dome and the fall but removes the fringe, leaving a single band of meenakari enamel inside the bell where only the wearer sees it.",
    details: ["Enamel is applied and fired by hand; colour depth varies slightly between pairs."],
    images: ["earringsDrop", "goldDetail"],
    rating: 5.0,
    reviews: 74,
    released: 210,
  },
  {
    id: "e-04",
    slug: "suhani-studs",
    name: "Suhani Studs",
    category: "earrings",
    price: 14500,
    metal: "18K Rose Gold",
    stone: "Brilliant-cut diamonds",
    weight: "1.4 g",
    short: "The pair you forget you are wearing.",
    long:
      "Small, flush-set and screw-backed. Made for people who put earrings in once and leave them there.",
    images: ["earringsStud", "flatlay"],
    rating: 4.7,
    reviews: 203,
    released: 80,
  },
  {
    id: "e-05",
    slug: "vaanya-ear-cuff",
    name: "Vaanya Ear Cuff",
    category: "earrings",
    price: 9800,
    metal: "Sterling Silver",
    weight: "1.1 g",
    short: "A single cuff that needs no piercing.",
    long:
      "Shaped to hold the upper ear without pressure, and finished with a soft satin polish. Worn alone, or above a stud.",
    images: ["earringsStud", "ringStack"],
    rating: 4.5,
    reviews: 61,
    released: 60,
  },
  {
    id: "e-06",
    slug: "roshni-chandelier-earrings",
    name: "Roshni Chandelier Earrings",
    category: "earrings",
    price: 86000,
    metal: "18K Yellow Gold",
    stone: "Rose-cut diamonds",
    weight: "12.6 g",
    short: "A long, articulated fall of rose-cut stones.",
    long:
      "Every link is hinged, so the earring moves continuously and quietly. Rose-cut stones return a softer, older light than modern brilliants — closer to candlelight.",
    images: ["earringsDrop", "necklaceGold"],
    rating: 4.9,
    reviews: 33,
    released: 205,
  },

  /* ---------------------------- NECKLACES ---------------------------- */
 {
  id: "n-01",
  slug: "Pearl Majesty",
  name: "Pearl Majesty",
  category: "bags",
  price: 799,
  metal: "Silver-tone metal",
  weight: "Approx. 520 g",
  short:
    "A richly embellished statement bag designed to bring Indian-inspired detail into a contemporary silhouette.",
  long:
    "Pearl Majesty is a distinctive handcrafted bag designed to bring Indian-inspired detail into a contemporary silhouette. Every detail is created to feel refined, distinctive, and made to be remembered.",
  details: [
    "Silver-tone metal frame adorned with faux pearls and crystal detailing.",
    "Intricately embellished by hand for a refined, statement finish.",
    "Crafted with delicate detailing, where slight variations reflect its handcrafted character.",
  ],
  images: ["bag1", "bag2", "bag3", "bag4", "bag5"],
  rating: 5.0,
  reviews: 47,
  featured: true,
  isNew: true,
  released: 245,
},
  {
    id: "n-02",
    slug: "anaya-layered-chain",
    name: "Anaya Layered Chain",
    category: "necklaces",
    price: 41200,
    metal: "18K Yellow Gold",
    weight: "9.7 g",
    short: "Two chains, two lengths, one clasp — so they never tangle.",
    long:
      "The layered look without the morning argument. Both chains meet at a single clasp, holding their spacing all day.",
    sizes: NECK_SIZES,
    images: ["necklaceLayered", "necklaceGold"],
    rating: 4.8,
    reviews: 129,
    released: 165,
  },
  {
  id: "n-03",
  slug: "Pearl Éclat",
  name: "Pearl Éclat",
  category: "bags",
  price: 799,
  metal: "Pearls, poise, and a little bit of luxury.",

  
  short: "Where delicate pearls meet timeless elegance.",
  long:
    "A refined statement shoulder bag adorned with an all-over pearl embellishment, framed by intricate metallic beadwork for a rich, luminous finish. The structured silhouette, softly curved flap, and delicate chain strap give it an elegant evening appeal, while the neutral pearl tone makes it easy to pair with both Indian and contemporary outfits.",


  images: ["bag31", "bag32", "bag33", "bag34", "bag35"],

  rating: 4.9,
  reviews: 174,
  featured: true,
  released: 140,
},
  {
    id: "n-04",
    slug: "kaveri-collar",
    name: "Kaveri Collar",
    category: "necklaces",
    price: 124000,
    metal: "18K Yellow Gold",
    weight: "31.2 g",
    short: "A hand-raised collar with a hammered inner face.",
    long:
      "Raised from a single sheet over three days. The outer surface is mirror-polished and the inner face left hammered — a detail for the wearer, not the room.",
    sizes: NECK_SIZES,
    images: ["bag31", "bag32", "bag33", "bag34", "bag35"],
    rating: 4.9,
    reviews: 22,
    released: 215,
  },
  {
    id: "n-05",
    slug: "netra-pendant",
    name: "Netra Pendant",
    category: "necklaces",
    price: 27500,
    metal: "18K Yellow Gold",
    stone: "Hand-set enamel",
    weight: "3.8 g",
    short: "A protective eye, drawn in two colours of enamel.",
    long:
      "The nazar, reduced to its simplest reading: a fired enamel disc, no border, no filigree. Traditionally a gift — most of these leave us wrapped for someone else.",
    sizes: NECK_SIZES,
    images: ["flatlay", "necklaceLayered"],
    rating: 4.7,
    reviews: 97,
    released: 110,
  },
  {
    id: "n-06",
    slug: "saanvi-pearl-strand",
    name: "Saanvi Pearl Strand",
    category: "necklaces",
    price: 64000,
    metal: "Pearl & Gold",
    stone: "Hand-knotted Akoya pearls",
    weight: "26.0 g",
    short: "A knotted strand with a gold clasp meant to be worn at the front.",
    long:
      "Knotted by hand between every pearl, as it should be. The clasp is finished as carefully as the front of the necklace, because we expect you to turn it around.",
    sizes: NECK_SIZES,
    images: ["necklaceLayered", "flatlay"],
    inStock: false,
    rating: 4.8,
    reviews: 36,
    released: 125,
  },

  /* ---------------------- BANGLES & BRACELETS ------------------------ */
  {
  id: "b-01",
  slug: "The Regal Bloom Clutch",
  name: "The Regal Bloom Clutch",
  category: "bags",
  price: 1250,
  metal: "Where timeless Lucknowi artistry meets modern luxury.",
 
  short: "Embroidered by hand, designed to be remembered.",
  long:
    "A statement clutch inspired by the rich embroidery traditions of Lucknow. The deep black base is covered in intricate floral hand embroidery, highlighted with antique-gold and silver-toned detailing and subtle red accents.",
  
  images: ["bag41", "bag42", "bag43", "bag44"],
  rating: 4.9,
  reviews: 58,
  featured: true,
  released: 220,
},
  {
    id: "b-02",
    slug: "riya-tennis-bracelet",
    name: "Riya Tennis Bracelet",
    category: "bangles-bracelets",
    price: 145000,
    metal: "Platinum",
    stone: "Brilliant-cut diamonds",
    weight: "14.2 g",
    short: "A continuous line of stones on a hinged platinum track.",
    long:
      "Each stone sits in its own setting on a hinged track, so the bracelet lies flat around the wrist instead of rolling. The clasp is doubled — a tennis bracelet should never be lost.",
    images: ["braceletGold", "ringSolitaire"],
    rating: 5.0,
    reviews: 19,
    isNew: true,
    released: 250,
  },
  {
    id: "b-03",
    slug: "kiara-bangle",
    name: "Kiara Bangle",
    category: "bangles-bracelets",
    price: 39600,
    metal: "18K Rose Gold",
    weight: "11.4 g",
    short: "A closed bangle with a flattened inner edge, so it stays put.",
    long:
      "Round on the outside, flat on the inside. A small correction to a very old form that stops the bangle spinning on the wrist.",
    sizes: BANGLE_SIZES,
    images: ["bangles", "braceletGold"],
    rating: 4.7,
    reviews: 84,
    released: 130,
  },
  {
    id: "b-04",
    slug: "ojas-textured-kada",
    name: "Ojas Textured Kada",
    category: "bangles-bracelets",
    price: 108000,
    metal: "18K Yellow Gold",
    weight: "28.6 g",
    short: "A weighted kada, its surface chased entirely by hand.",
    long:
      "The kada has always been about weight and presence. This one keeps both, and replaces engraved pattern with a chased surface that reads as texture from a distance and as tool marks up close.",
    sizes: BANGLE_SIZES,
    images: ["bangles", "craftBench"],
    rating: 4.9,
    reviews: 31,
    released: 225,
  },
  {
    id: "b-05",
    slug: "tanvi-chain-bracelet",
    name: "Tanvi Chain Bracelet",
    category: "bangles-bracelets",
    price: 11900,
    metal: "Sterling Silver",
    weight: "6.2 g",
    short: "A fine silver chain with a lotus tag at the clasp.",
    long:
      "Light enough to be forgotten, with the NISRAYA lotus stamped into a small tag beside the clasp.",
    images: ["braceletGold", "ringStack"],
    rating: 4.6,
    reviews: 142,
    released: 70,
  },
  {
    id: "b-06",
    slug: "amrita-paired-bangles",
    name: "Amrita Paired Bangles",
    category: "bangles-bracelets",
    price: 92000,
    metal: "18K Yellow Gold",
    weight: "24.0 g",
    short: "A pair, sold together — one polished, one brushed.",
    long:
      "Bangles are rarely worn alone, so these are made and sold as two. Identical in form, opposite in finish, and quietly different in sound when they meet.",
    sizes: BANGLE_SIZES,
    images: ["bangles", "flatlay"],
    rating: 4.8,
    reviews: 45,
    released: 175,
    },

  // NEW BAG 1
  {
    id: "b-07",
    slug: "Vibrant Elegance",
    name: "Vibrant Elegance",
    category: "bags",
    price: 2499,
    metal: "Boldly handcrafted. Beautifully unforgettable.",
    
    short: "A celebration of colour, craft, and timeless artistry.",
    long:
      "A striking handcrafted clutch adorned with intricate multicoloured beadwork, vibrant stones, and antique-gold detailing. Its ornate floral-inspired motifs and structured silhouette create a rich, artisanal character, while the delicate chain adds versatility for evening and occasion wear.",
    images: ["bag61", "bag62", "bag63", "bag64", "bag65"],
    rating: 4.8,
    reviews: 42,
    featured: true,
    isNew: true,
    released: 260,
  },

  // NEW BAG 2
  {
    id: "b-08",
    slug: "A timeless statement of elegance",
    name: "A timeless statement of elegance",
    category: "bags",
    price: 2199,
    metal: "Carved with character, crafted to be remembered.",
  
    short: "Traditional artistry reimagined into a contemporary statement clutch.",
    long:
      "A distinctive handcrafted clutch combining rich brown carved wood with intricate floral detailing and a refined statement finish. The embossed “SHRIP” motif gives the piece a bold artisanal character, while the structured form and chain strap make it ideal for occasion wear.",
    images: ["bag71", "bag72", "bag73", "bag74"],
    rating: 4.8,
    reviews: 36,
    featured: true,
    isNew: true,
    released: 255,
  },

  // NEW BAG 3
  {
    id: "b-09",
    slug: "Bohemian Elegance",
    name: "Bohemian Elegance",
    category: "bags",
    price: 1899,
    metal: "A burst of colour, crafted into art.",
   
    short: "An elegant ivory clutch finished with delicate statement detailing.",
    long:
      "A vibrant handcrafted statement bag featuring intricate multicoloured beadwork and bold geometric stone embellishments. Rich shades of blue, teal, mustard, ivory, and pink create a playful mosaic effect, framed with antique-gold detailing and finished with a delicate chain strap.",
    images: ["bag81", "bag82", "bag83", "bag84"],
    rating: 4.7,
    reviews: 31,
    featured: true,
    isNew: true,
    released: 250,
  },
 {
    id: "b-10",
    slug: "Boho Mosaic Clutch",
    name: "Boho Mosaic Clutch",
    category: "bags",
    price: 2499,
    metal: "Bold details. Artisanal soul. Unmistakably unique.",
    
    short: "A mosaic of colour, crafted to make a statement.",
    long: "A bold handcrafted statement bag featuring an intricate mosaic of metallic studs and vibrant multicoloured accents. Its curved silhouette, layered detailing, and delicate chain strap give it a distinctive artisanal character, while the combination of jewel tones and antique metallic finishes makes it an eye-catching occasion piece.",
    images: ["bag91", "bag92", "bag93", "bag94"],
    rating: 4.8,
    reviews: 40,
    featured: true,
    released: 240,
  },

  {
    id: "b-11",
    slug: "Bohemian Beaded Mosaic Clutch",
    name: "Bohemian Beaded Mosaic Clutch",
    category: "bags",
    price: 2299,
    metal: "A tapestry of colour, crafted by hand.",
    
    short: "Intricate artistry, made for unforgettable occasions.",
    long: "A richly handcrafted statement clutch featuring intricate multicoloured beadwork arranged in flowing floral and geometric patterns. Deep teal, burgundy, pink, and blue accents are framed by antique-gold detailing, creating a vibrant yet sophisticated finish.",
    images: ["bag101", "bag102", "bag103", "bag104", "bag105"],
    rating: 4.8,
    reviews: 38,
    featured: true,
    released: 235,
  },

  {
    id: "b-12",
    slug: "Pearl Embellished Mini Clutch",
    name: "Pearl Embellished Mini Clutch",
    category: "bags",
    price: 1999,
    metal: "Pearls woven into timeless elegance.",
    
    short: "A sophisticated clutch designed for effortless elegance.",
    long: "A luxurious pearl-embellished clutch featuring an all-over arrangement of soft ivory pearls framed by intricate silver-toned floral and filigree detailing. The structured silhouette and ornate metallic borders create a regal, handcrafted finish, while the delicate chain adds effortless versatility.",
    images: ["bag201", "bag202", "bag203"],
    rating: 4.7,
    reviews: 32,
    featured: true,
    released: 230,
  },

    // NEW BAG 13
  {
    id: "b-13",
    slug: "Radiant Elegance",
    name: "Radiant Elegance",
    category: "bags",
    price: 2499,
    metal: "Golden details, timeless artistry.",
    
    short: "A bloom of brilliance, crafted for the extraordinary.",
    long:
      "A luxurious handcrafted clutch adorned with intricate floral patterns, shimmering beads, and faceted golden embellishments. The warm brown base creates a rich, regal canvas for the champagne-gold and crystal-toned detailing, while the structured envelope silhouette and delicate chain add an elegant finishing touch",
    images: ["bag301", "bag302", "bag303", "bag304", "bag305"],
    rating: 4.8,
    reviews: 34,
    featured: true,
    isNew: true,
    released: 225,
  },

  // NEW BAG 14
  {
    id: "b-14",
    slug: "The Maharani Clutch",
    name: "The Maharani Clutch",
    category: "bags",
    price: 2299,
    metal: "Crafted in detail, defined by character.",
    
    short: "An intricately detailed clutch with a timeless evening finish.",
    long:
      "A sophisticated handcrafted clutch featuring layered metallic detailing, intricate circular motifs, and an earthy abstract pattern at its centre. The antique-gold frame beautifully contrasts with the warm brown and muted tones, while the structured envelope silhouette and fine chain strap add a polished finish.",
    images: ["bag401", "bag402", "bag403", "bag404", "bag405"],
    rating: 4.8,
    reviews: 29,
    featured: true,
    isNew: true,
    released: 220,
  },

  // NEW BAG 15
  {
    id: "b-15",
    slug: "Royal Radiance Crystal Sling Bag",
    name: "Royal Radiance Crystal Sling Bag",
    category: "bags",
    price: 1799,
    metal: "A little sparkle, a lasting impression.",
    
    short: "A statement clutch crafted with intricate decorative detailing.",
    long:
      "A dazzling silver-toned statement bag covered in a dense, crystal-like mesh that catches the light from every angle. Its clean rectangular silhouette is balanced by an elegant embellished handle, creating a sophisticated blend of glamour and modern minimalism.",
    images: ["bag501", "bag502", "bag503", "bag504"],
    rating: 4.7,
    reviews: 31,
    featured: true,
    isNew: true,
    released: 215,
  },

  // NEW BAG 16
  {
    id: "b-16",
    slug: "Dazzle Luxe ",
    name: "Dazzle Luxe ",
    category: "bags",
    price: 1699,
    metal: "A constellation of crystals, made to catch the light.",
  
    short: "A beautifully embellished clutch made to stand apart.",
    long:
      "A glamorous rectangular clutch featuring an intricate grid of shimmering crystal embellishments framed by a sleek metallic structure. The densely set stones create a striking reflective finish, giving the piece a luxurious evening presence.",
    images: ["bag601", "bag602", "bag603", "bag604", "bag605"],
    rating: 4.8,
    reviews: 27,
    featured: true,
    isNew: true,
    released: 210,
  },

  // NEW BAG 17
  {
    id: "b-17",
    slug: "The BÉLLEZA Bag",
    name: "The BÉLLEZA Bag",
    category: "bags",
    price: 999,
    metal: "Sculpted simplicity, unmistakable elegance.",
    
    short: "A graceful statement bag with refined handcrafted detailing.",
    long:
      "A sleek contemporary handbag in a soft ivory finish, defined by its sculptural silhouette and distinctive polished-metal handle. The subtle embossed monogram adds a refined signature detail, while the clean lines and minimalist palette give it a sophisticated, modern character.",
    images: ["bag701", "bag702", "bag703", "bag704"],
    rating: 4.7,
    reviews: 25,
    featured: true,
    isNew: true,
    released: 205,
  },

  // NEW BAG 18
  {
    id: "b-18",
    slug: "Elegant Beige Handbag ",
    name: "Elegant Beige Handbag ",
    category: "bags",
    price: 999,
    metal: "Modern form, timeless allure.",
    
    short: "A sophisticated clutch finished with distinctive handcrafted detail.",
    long:
      "A refined structured handbag in a warm taupe finish, featuring a sculptural polished-metal top handle and a distinctive rounded clasp. The softly curved flap adds a touch of elegance to its clean silhouette, while the neutral tone makes it an effortlessly versatile accessory.",
    images: ["bag801", "bag802", "bag803", "bag804"],
    rating: 4.8,
    reviews: 28,
    featured: true,
    isNew: true,
    released: 200,
  },
  
];

export const PRODUCTS = ROWS.map(build);

/* ------------------------------------------------------------------- lookups */

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) ?? null;
}

export function getCategory(slug) {
  return CATEGORIES.find((category) => category.slug === slug) ?? null;
}

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export const PRICE_BOUNDS = {
  min: 0,
  max: Math.max(...PRODUCTS.map((product) => product.price)),
};
