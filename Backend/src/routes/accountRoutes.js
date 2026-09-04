const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getAccount,
  getCart,
  replaceCart,
  getWishlist,
  replaceWishlist,
} = require("../controllers/accountController");

const router = express.Router();

router.use(protect);

router.get("/me", getAccount);
router.get("/cart", getCart);
router.put("/cart", replaceCart);
router.get("/wishlist", getWishlist);
router.put("/wishlist", replaceWishlist);

module.exports = router;
