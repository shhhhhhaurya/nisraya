import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { EmptyState, ErrorState, ProductGridSkeleton } from "../components/StateBlocks";
import { getProductsByIds } from "../services/products";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import useAsync from "../hooks/useAsync";

export default function Wishlist() {
  const { ids, count, clear } = useWishlist();
  const toast = useToast();

  // Keyed on the id list so removing a piece re-resolves immediately.
  const { status, data, error, reload } = useAsync(() => getProductsByIds(ids), [ids.join("|")]);

  const products = data ?? [];

  const handleClear = () => {
    clear();
    toast.push("Wishlist cleared.");
  };

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", to: "/" }, { label: "Wishlist" }]}
        eyebrow="Saved"
        title="Your wishlist."
        intro={
          count > 0
            ? "Saved pieces always show current pricing and availability."
            : undefined
        }
        meta={count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"}` : null}
      />

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          {count === 0 ? (
            <EmptyState
              title="Your wishlist is empty."
              description="Tap the heart on any piece to keep it here while you decide."
              actionLabel="Explore the collection"
              actionTo="/collections"
            />
          ) : null}

          {count > 0 && status === "loading" ? <ProductGridSkeleton count={Math.min(count, 6)} /> : null}

          {count > 0 && status === "error" ? (
            <ErrorState
              title="Unable to load your saved pieces."
              description={error?.message ?? "Something interrupted the request."}
              onRetry={reload}
            />
          ) : null}

          {count > 0 && status === "success" ? (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
                {products.map((product, index) => (
                  <ScrollReveal key={product.id} delay={(index % 3) * 90}>
                    <ProductCard product={product} priority={index < 3} />
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-16 border-t border-espresso-100 pt-8 text-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-wine"
                >
                  Clear wishlist
                </button>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
