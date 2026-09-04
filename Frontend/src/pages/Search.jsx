import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { SearchIcon } from "../components/Icons";
import { EmptyState, ErrorState, ProductGridSkeleton } from "../components/StateBlocks";
import { Link, useNavigate, useSearchParams } from "../lib/router";
import { CATEGORIES } from "../data/products";
import { searchProducts } from "../services/products";
import useAsync from "../hooks/useAsync";

/**
 * /search?q=…
 *
 * The query string is the source of truth so a search can be shared and the
 * back button steps through previous searches.
 */
export default function Search() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q") ?? "";
  const [draft, setDraft] = useState(query);

  // Keep the field in step when the query changes from outside (nav, back button).
  useEffect(() => setDraft(query), [query]);

  const { status, data, error, reload } = useAsync(
    () => (query.trim().length >= 2 ? searchProducts(query) : Promise.resolve([])),
    [query],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = draft.trim();
    if (!term) {
      setParams(new URLSearchParams(), { replace: true });
      return;
    }
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const results = data ?? [];
  const hasQuery = query.trim().length >= 2;

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", to: "/" }, { label: "Search" }]}
        eyebrow="Search"
        title={hasQuery ? `“${query}”` : "What are you looking for?"}
        meta={
          hasQuery && status === "success"
            ? `${results.length} ${results.length === 1 ? "result" : "results"}`
            : null
        }
      >
        <form role="search" onSubmit={handleSubmit} className="mt-9 max-w-xl">
          <label htmlFor="search-field" className="sr-only">
            Search for a piece
          </label>

          <div className="flex items-center gap-4 border-b border-espresso-200 pb-3 focus-within:border-champagne">
            <SearchIcon className="h-4 w-4 shrink-0 text-taupe" />

            <input
              id="search-field"
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Rings, gold hoops, pearl…"
              autoComplete="off"
              className="w-full bg-transparent text-lg text-espresso-800 placeholder:text-taupe focus:outline-none"
            />

            <button
              type="submit"
              className="shrink-0 text-2xs uppercase tracking-label text-espresso-700 transition-colors duration-400 hover:text-champagne-dark"
            >
              Search
            </button>
          </div>
        </form>
      </PageHeader>

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          {!hasQuery ? (
            <div className="mx-auto max-w-xl text-center">
              <p className="text-base leading-loose text-espresso-500">
                Type at least two letters, or start from a collection.
              </p>

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/collections/${category.slug}`}
                      className="inline-block border border-espresso-100 px-5 py-2.5 text-2xs uppercase tracking-label text-espresso-600 transition-colors duration-400 hover:border-champagne hover:text-espresso-800"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasQuery && status === "loading" ? <ProductGridSkeleton count={6} /> : null}

          {hasQuery && status === "error" ? (
            <ErrorState
              title="Unable to search right now."
              description={error?.message ?? "Something interrupted the request."}
              onRetry={reload}
            />
          ) : null}

          {hasQuery && status === "success" && results.length === 0 ? (
            <EmptyState
              title="No products found."
              description={`Nothing matched “${query}”. Try a shorter word, a metal, or browse the collections.`}
              actionLabel="View all collections"
              actionTo="/collections"
            />
          ) : null}

          {hasQuery && status === "success" && results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
              {results.map((product, index) => (
                <ScrollReveal key={product.id} delay={(index % 3) * 90}>
                  <ProductCard product={product} priority={index < 3} />
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
