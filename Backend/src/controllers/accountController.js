const User = require("../models/User");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  address: user.address,
});

const normaliseCart = (items) =>
  Array.isArray(items)
    ? items
        .filter((item) => item && typeof item.productId === "string")
        .map((item) => ({
          lineId: String(item.lineId || `${item.productId}::${item.size ?? "one-size"}`),
          productId: String(item.productId),
          slug: typeof item.slug === "string" ? item.slug : "",
          name: typeof item.name === "string" ? item.name : "",
          categoryLabel: typeof item.categoryLabel === "string" ? item.categoryLabel : "",
          metal: typeof item.metal === "string" ? item.metal : "",
          price: Number.isFinite(Number(item.price)) ? Number(item.price) : 0,
          image: typeof item.image === "string" ? item.image : "",
          size: item.size == null ? null : String(item.size),
          quantity: Math.max(1, Math.min(Number(item.quantity) || 1, 10)),
        }))
    : [];

const normaliseWishlist = (ids) =>
  Array.isArray(ids)
    ? [...new Set(ids.filter((id) => typeof id === "string"))]
    : [];

const getAccount = async (req, res) => {
  res.json({
    success: true,
    user: publicUser(req.user),
    cart: req.user.cartItems ?? [],
    wishlist: req.user.wishlist ?? [],
  });
};

const getCart = async (req, res) => {
  res.json({ success: true, items: req.user.cartItems ?? [] });
};

const replaceCart = async (req, res) => {
  const items = normaliseCart(req.body.items);
  req.user.cartItems = items;
  await req.user.save();
  res.json({ success: true, items: req.user.cartItems });
};

const getWishlist = async (req, res) => {
  res.json({ success: true, ids: req.user.wishlist ?? [] });
};

const replaceWishlist = async (req, res) => {
  const ids = normaliseWishlist(req.body.ids);
  req.user.wishlist = ids;
  await req.user.save();
  res.json({ success: true, ids: req.user.wishlist });
};

module.exports = {
  getAccount,
  getCart,
  replaceCart,
  getWishlist,
  replaceWishlist,
};
