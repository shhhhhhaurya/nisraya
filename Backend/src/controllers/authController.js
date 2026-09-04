const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendPasswordResetOtp } = require("../services/emailService");

const FRONTEND_URL = (
  process.env.FRONTEND_URL ||
  "https://shhhhhhaurya.github.io/nisraya"
).replace(/\/$/, "");
const RESET_OTP_MINUTES = 10;
const RESET_TOKEN_MINUTES = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) return res.status(400).json({ message: "Name, email and password are required" });
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return res.status(409).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword, phone, authProvider: "local" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Account created successfully", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) return res.status(400).json({ message: "Email and password are required" });
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    if (!user.password) return res.status(401).json({ message: "This account uses Google login. Please continue with Google." });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const me = async (req, res) => {
  res.status(200).json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, role: req.user.role, address: req.user.address } });
};

const requestPasswordReset = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    if (!normalizedEmail) return res.status(400).json({ message: "Email address is required." });
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(200).json({ success: true, message: "If an account exists for that email, a verification code has been sent." });

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.resetOtpHash = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetOtpExpires = new Date(Date.now() + RESET_OTP_MINUTES * 60 * 1000);
    user.resetTokenHash = null;
    user.resetTokenExpires = null;
    await user.save();
    await sendPasswordResetOtp({ to: user.email, otp });

    res.status(200).json({ success: true, message: "If an account exists for that email, a verification code has been sent." });
  } catch (error) {
    console.error("Password Reset Request Error:", error.message);
    res.status(500).json({ message: "We could not send the verification code right now. Please try again." });
  }
};

const verifyPasswordResetOtp = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    const otp = String(req.body.otp || "").trim();
    if (!normalizedEmail || !/^\d{6}$/.test(otp)) return res.status(400).json({ message: "Enter the 6-digit verification code." });

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !user.resetOtpHash || !user.resetOtpExpires) return res.status(400).json({ message: "That verification code is invalid or expired." });
    if (user.resetOtpExpires.getTime() < Date.now()) {
      user.resetOtpHash = null;
      user.resetOtpExpires = null;
      await user.save();
      return res.status(400).json({ message: "That verification code has expired. Request a new one." });
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    if (otpHash !== user.resetOtpHash) return res.status(400).json({ message: "That verification code is incorrect." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetTokenExpires = new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000);
    user.resetOtpHash = null;
    user.resetOtpExpires = null;
    await user.save();

    res.status(200).json({ success: true, resetToken, message: "Email verified. You can now create a new password." });
  } catch (error) {
    console.error("Password Reset OTP Verification Error:", error.message);
    res.status(500).json({ message: "Unable to verify the code right now." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    const resetToken = String(req.body.resetToken || "").trim();
    const password = String(req.body.password || "");
    if (!normalizedEmail || !resetToken || !password) return res.status(400).json({ message: "Email, verification and new password are required." });
    if (password.length < 8) return res.status(400).json({ message: "Your new password must be at least 8 characters." });

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    const user = await User.findOne({ email: normalizedEmail, resetTokenHash });
    if (!user || !user.resetTokenExpires || user.resetTokenExpires.getTime() < Date.now()) return res.status(400).json({ message: "Your password reset session has expired. Please start again." });

    user.password = await bcrypt.hash(password, 12);
    user.authProvider = "local";
    user.resetTokenHash = null;
    user.resetTokenExpires = null;
    user.resetOtpHash = null;
    user.resetOtpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully. You can now sign in." });
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    res.status(500).json({ message: "Unable to reset your password right now." });
  }
};

const googleCallback = async (req, res) => {
  try {
    const googleUser = req.user;
    if (!googleUser) return res.status(401).send("Google authentication failed");
    const token = jwt.sign({ id: googleUser._id, role: googleUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`${FRONTEND_URL}/auth/google/success?token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error("Google Callback Error:", error.message);
    res.status(500).send("Google login failed");
  }
};

module.exports = { signup, login, me, requestPasswordReset, verifyPasswordResetOtp, resetPassword, googleCallback };
