const ProductStock = require("../models/ProductStock");

/*
 * These are the bags you marked as SOLD OUT initially.
 *
 * IMPORTANT:
 * These are only the starting values.
 * Once an admin changes one of them, the MongoDB value
 * becomes the source of truth.
 */
const DEFAULT_SOLD_OUT_IDS = [
  "n-01", // Pearl Majesty
  "n-03", // Pearl Éclat
  "b-01", // The Regal Bloom Clutch
  "r-02", // The Ivory Elegance Clutch
  "b-18", // Elegant Beige Handbag
  "b-12", // Pearl Embellished Mini Clutch
  "b-15", // Royal Radiance Crystal Sling Bag
  "b-07", // Vibrant Elegance
  "b-08", // A timeless statement of elegance
  "b-10", // Boho Mosaic Clutch
  "b-11", // Bohemian Beaded Mosaic Clutch
  "b-14", // The Maharani Clutch
];

/*
 * Public endpoint.
 *
 * Anyone can read stock status.
 * Only the admin endpoint below can change it.
 */
const getStock = async (req, res) => {
  try {
    const records = await ProductStock.find().lean();

    /*
     * Start with our initial sold-out products.
     */
    const stock = {};

    DEFAULT_SOLD_OUT_IDS.forEach((productId) => {
      stock[productId] = false;
    });

    /*
     * MongoDB records override the defaults.
     *
     * This means if an admin changes a bag from
     * Sold Out -> In Stock, it stays In Stock permanently.
     */
    records.forEach((record) => {
      stock[record.productId] = record.inStock;
    });

    res.status(200).json({
      success: true,
      stock,
    });
  } catch (error) {
    console.error(
      "Get Stock Error:",
      error.message,
    );

    res.status(500).json({
      message: "Unable to load product stock.",
    });
  }
};

/*
 * Admin-only stock update.
 */
const updateStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { inStock } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required.",
      });
    }

    if (typeof inStock !== "boolean") {
      return res.status(400).json({
        message: "inStock must be true or false.",
      });
    }

    const record =
      await ProductStock.findOneAndUpdate(
        { productId },

        {
          $set: {
            inStock,
            updatedBy: req.user._id,
          },
        },

        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      ).lean();

    res.status(200).json({
      success: true,
      productId: record.productId,
      inStock: record.inStock,
      message: record.inStock
        ? "Product marked as in stock."
        : "Product marked as sold out.",
    });
  } catch (error) {
    console.error(
      "Update Stock Error:",
      error.message,
    );

    res.status(500).json({
      message: "Unable to update product stock.",
    });
  }
};

module.exports = {
  getStock,
  updateStock,
};