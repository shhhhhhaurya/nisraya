import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { EmptyState, NotConnectedState, ProductGridSkeleton } from "../components/StateBlocks";
import { Link, useNavigate } from "../lib/router";
import { initialsFrom } from "../lib/format";
import { getProductsByIds } from "../services/products";
import { ORDERS_ENDPOINT_AVAILABLE } from "../services/orders";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import useAsync from "../hooks/useAsync";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
];

export default function Account() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("profile");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.push("You have been signed out.");
    navigate("/", { replace: true });
  };

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", to: "/" }, { label: "Account" }]}
        eyebrow="Account"
        title={user?.name ? user.name : "Your account"}
        meta={user?.email}
      />

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Rail */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <div className="flex items-center gap-4 border-b border-espresso-100 pb-7">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-espresso-700 text-xs tracking-wide text-ivory"
                  >
                    {initialsFrom(user?.name ?? "") || "N"}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm text-espresso-800">{user?.name}</p>
                    <p className="truncate text-xs text-taupe">{user?.email}</p>
                  </div>
                </div>

                {/* Horizontal on mobile, vertical from lg — a shrunken sidebar
                    would be unusable on a phone. */}
                <nav aria-label="Account sections" className="mt-7">
                  <ul className="no-scrollbar -mx-gutter flex gap-2 overflow-x-auto px-gutter lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
                    {TABS.map((item) => {
                      const isActive = tab === item.id;

                      return (
                        <li key={item.id} className="shrink-0">
                          <button
                            type="button"
                            onClick={() => setTab(item.id)}
                            aria-current={isActive ? "true" : undefined}
                            className={`whitespace-nowrap border px-5 py-3 text-2xs uppercase tracking-label transition-colors duration-400 lg:w-full lg:border-0 lg:border-l lg:px-4 lg:text-left ${
                              isActive
                                ? "border-espresso-700 text-espresso-800 lg:border-champagne"
                                : "border-espresso-100 text-taupe hover:text-espresso-700"
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-8 border-t border-espresso-100 pt-7 text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-wine"
                >
                  Log out
                </button>
              </div>
            </aside>

            {/* Panel */}
            <div className="lg:col-span-8 lg:col-start-5">
              {tab === "profile" ? <ProfilePanel user={user} /> : null}
              {tab === "orders" ? <OrdersPanel /> : null}
              {tab === "wishlist" ? <WishlistPanel /> : null}
              {tab === "addresses" ? <AddressesPanel /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------- panels */

function PanelHeading({ title, description }) {
  return (
    <div className="border-b border-espresso-100 pb-6">
      <h2 className="font-display text-display-sm text-espresso-800">{title}</h2>

      {description ? (
        <p className="mt-3 max-w-lg text-base leading-relaxed text-espresso-500">{description}</p>
      ) : null}
    </div>
  );
}

function ProfilePanel({ user }) {
  /* Only fields the API actually returns are shown — nothing is invented. */
  const rows = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
  ].filter((row) => row.value);

  return (
    <div>
      <PanelHeading title="Your details" description="These came from your account when you signed in." />

      <dl className="mt-8 divide-y divide-espresso-100">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-2xs uppercase tracking-label text-taupe">{row.label}</dt>
            <dd className="text-sm text-espresso-700">{row.value}</dd>
          </div>
        ))}
      </dl>

      <NotConnectedState
        className="mt-12"
        title="Editing your details is not available yet"
        description="The backend exposes sign-up and sign-in only — there is no update-profile route, so there is nothing to save to. Write to hello@nisraya.com and we will change it by hand."
      />
    </div>
  );
}

function OrdersPanel() {
  /* No orders endpoint exists. Rather than render an empty list — which would
     read as "you have no orders" — the gap is stated. */
  return (
    <div>
      <PanelHeading title="Orders" />

      {ORDERS_ENDPOINT_AVAILABLE ? null : (
        <NotConnectedState
          className="mt-8"
          title="Order history is not connected"
          description="The backend has no orders collection yet, so we cannot show a history — and we are not going to show an empty one and let you assume it is accurate. Once GET /api/orders exists, this panel will list every order."
        />
      )}
    </div>
  );
}

function WishlistPanel() {
  const { ids, count } = useWishlist();
  const { status, data } = useAsync(() => getProductsByIds(ids), [ids.join("|")]);

  return (
    <div>
      <PanelHeading
        title="Wishlist"
        description={count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"} saved.` : undefined}
      />

      <div className="mt-8">
        {count === 0 ? (
          <EmptyState
            title="Your wishlist is empty."
            description="Tap the heart on any piece to keep it here."
            actionLabel="Explore the collection"
            actionTo="/collections"
          />
        ) : null}

        {count > 0 && status === "loading" ? <ProductGridSkeleton count={Math.min(count, 3)} /> : null}

        {count > 0 && status === "success" ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
              {(data ?? []).slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {count > 6 ? (
              <Link
                to="/wishlist"
                className="mt-10 inline-block text-2xs uppercase tracking-label text-espresso-700"
              >
                <span className="link-draw">View all {count} saved pieces</span>
              </Link>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

function AddressesPanel() {
  return (
    <div>
      <PanelHeading title="Addresses" />

      <NotConnectedState
        className="mt-8"
        title="Saved addresses are not connected"
        description="There is no address collection on the backend, so nothing can be stored against your account yet. Your delivery address is entered at checkout each time, and is never kept anywhere else."
      />

      <Link to="/checkout" className="btn btn-outline mt-8">
        Go to checkout
      </Link>
    </div>
  );
}
