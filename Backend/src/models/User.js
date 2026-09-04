const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    lineId: { type: String, required: true },
    productId: { type: String, required: true },
    slug: { type: String, default: "" },
    name: { type: String, default: "" },
    categoryLabel: { type: String, default: "" },
    metal: { type: String, default: "" },
    price: { type: Number, default: 0 },
    image: { type: String, default: "" },
    size: { type: String, default: null },
    quantity: { type: Number, min: 1, max: 10, default: 1 },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

   password: {
  type: String,
  minlength: 6,
  default: null,
},

authProvider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},

googleId: {
  type: String,
  default: null,
  sparse: true,
},

resetOtpHash: {
      type: String,
      default: null,
    },

    resetOtpExpires: {
      type: Date,
      default: null,
    },

    resetTokenHash: {
      type: String,
      default: null,
    },

    resetTokenExpires: {
      type: Date,
      default: null,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    // Account-specific shopping data. Passwords are never stored here.
    cartItems: {
      type: [cartItemSchema],
      default: [],
    },

    wishlist: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
