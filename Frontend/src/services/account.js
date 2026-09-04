import api from "./api";

export async function fetchAccount() {
  const { data } = await api.get("/account/me");
  return data;
}

export async function fetchCart() {
  const { data } = await api.get("/account/cart");
  return data.items ?? [];
}

export async function saveCart(items) {
  const { data } = await api.put("/account/cart", { items });
  return data.items ?? [];
}

export async function fetchWishlist() {
  const { data } = await api.get("/account/wishlist");
  return data.ids ?? [];
}

export async function saveWishlist(ids) {
  const { data } = await api.put("/account/wishlist", { ids });
  return data.ids ?? [];
}
