/** Formatting helpers shared across the storefront. */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 48500 -> "₹48,500" */
export function formatINR(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return inr.format(value);
}

/** Compact form for filter labels: 48500 -> "₹48.5K", 145000 -> "₹1.45L" */
export function formatINRShort(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  if (value >= 100000) return `₹${(value / 100000).toFixed(2).replace(/\.00$/, "")}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `₹${value}`;
}

/** "Aarohi Gold Hoops" -> "AG" — used for the account avatar. */
export function initialsFrom(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
