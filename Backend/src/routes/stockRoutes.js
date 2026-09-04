const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getStock,
  updateStock,
} = require("../controllers/stockController");

const router = express.Router();

/*
 * Anyone can read product availability.
 */
router.get("/", getStock);

/*
 * Only authenticated admins can change availability.
 */
router.put(
  "/:productId",
  protect,
  admin,
  updateStock,
);

module.exports = router;