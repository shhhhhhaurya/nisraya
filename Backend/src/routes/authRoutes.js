const express = require("express");

const {
  signup,
  login,
  me,
  requestPasswordReset,
  verifyPasswordResetOtp,
  resetPassword,
  googleCallback,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const passport = require("../config/passport");

const router = express.Router();

const FRONTEND_URL = (
  process.env.FRONTEND_URL ||
  "https://shhhhhhaurya.github.io/nisraya"
).replace(/\/$/, "");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);

router.post("/forgot-password/request", requestPasswordReset);
router.post("/forgot-password/verify", verifyPasswordResetOtp);
router.post("/forgot-password/reset", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  googleCallback,
);

module.exports = router;
