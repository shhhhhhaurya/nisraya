const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/authRoutes");
const accountRoutes = require("./src/routes/accountRoutes");
const stockRoutes = require("./src/routes/stockRoutes");

const passport = require("./src/config/passport");

const app = express();

/* -------------------------------------------------------------------------- */
/* Middleware                                                                 */
/* -------------------------------------------------------------------------- */

const FRONTEND_URL = (
  process.env.FRONTEND_URL ||
  "https://shhhhhhaurya.github.io/nisraya"
).replace(/\/$/, "");

const FRONTEND_ORIGIN = new URL(FRONTEND_URL).origin;

const allowedOrigins = new Set([
  FRONTEND_ORIGIN,
  "http://localhost:5173",
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (health checks, server-to-server calls).
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(passport.initialize());

/* -------------------------------------------------------------------------- */
/* Health check                                                               */
/* -------------------------------------------------------------------------- */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NISRAYA API is running",
  });
});

/* -------------------------------------------------------------------------- */
/* Routes                                                                     */
/* -------------------------------------------------------------------------- */

app.use("/api/auth", authRoutes);

app.use("/api/account", accountRoutes);

/*
 * Product stock
 *
 * GET  /api/stock
 *      Anyone can read product stock.
 *
 * PUT  /api/stock/:productId
 *      Only authenticated admins can change stock.
 */
app.use("/api/stock", stockRoutes);

/* -------------------------------------------------------------------------- */
/* Export app                                                                 */
/* -------------------------------------------------------------------------- */

module.exports = app;