import { useEffect, useRef, useState } from "react";
import Image from "./Image";
import { CloseIcon, SearchIcon, ArrowRightIcon } from "./Icons";
import { Link, useNavigate } from "../lib/router";
import { formatINR } from "../lib/format";
import { searchProducts } from "../services/products";

const SUGGESTIONS = ["Mirror Maze", "Gulnar Pearl Necklace", "Pearl Kundan Jhumkas", "Everyday",];
const PREVIEW_COUNT = 5;

/**
 * Search panel. Drops from the top of the page over an espresso scrim so the
 * navbar stays put and the transition reads as the page opening rather than a
 * modal appearing.
 */
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const term = query.trim();
  const hasQuery = term.length >= 2;

  // Debounced so a fast typist does not queue a lookup per keystroke. The
  // service is async because it will become an API call.
  useEffect(() => {
    if (term.length < 2) {
      setResults([]);
      setTotalMatches(0);
      return undefined;
    }

    let cancelled = false;

    const timer = window.setTimeout(() => {
      searchProducts(term)
        .then((matches) => {
          if (cancelled) return;
          setResults(matches.slice(0, PREVIEW_COUNT));
          setTotalMatches(matches.length);
        })
        .catch(() => {
          if (cancelled) return;
          setResults([]);
          setTotalMatches(0);
        });
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [term]);

  // Focus the field once the panel has finished travelling.
  useEffect(() => {
    if (!open) return undefined;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Escape closes; the page behind must not scroll while the panel is open.
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Clear the field after the closing animation so it doesn't flash empty.
  useEffect(() => {
    if (open) return undefined;

    const timer = window.setTimeout(() => setQuery(""), 500);
    return () => window.clearTimeout(timer);
  }, [open]);

  const submit = (event) => {
    event.preventDefault();
    if (!term) return;

    onClose();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div
      className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close search"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-espresso-900/55 backdrop-blur-[2px] transition-opacity duration-700 ease-editorial ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Search NISRAYA"
        className={`relative max-h-full overflow-y-auto bg-ivory transition-transform duration-700 ease-editorial ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="shell py-7 sm:py-9">
          <div className="flex items-center justify-between gap-6">
            <p className="eyebrow">Search</p>

            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
              className="group flex items-center gap-2.5 text-2xs uppercase tracking-label text-espresso-600 transition-colors duration-400 hover:text-espresso-800"
            >
              Close
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <form onSubmit={submit} className="mt-7">
            <label htmlFor="search-field" className="sr-only">
              Search for a piece, a collection or a material
            </label>

            <div className="flex items-center gap-4 border-b border-espresso-200 pb-4 focus-within:border-champagne">
              <SearchIcon className="h-5 w-5 shrink-0 text-taupe" />

              <input
                id="search-field"
                ref={inputRef}
                type="search"
                tabIndex={open ? 0 : -1}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search bags, accessories, jwellery, apparel.."
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent font-display text-2xl text-espresso-800 placeholder:text-espresso-200 focus:outline-none sm:text-3xl"
              />
            </div>
          </form>

          {/* Suggestions before anything is typed */}
          {!hasQuery ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
              <span className="text-2xs uppercase tracking-label text-taupe">Try</span>

              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setQuery(suggestion)}
                  className="border border-espresso-100 px-4 py-2 text-xs text-espresso-600 transition-colors duration-400 hover:border-champagne hover:text-espresso-800"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {/* Results */}
          {hasQuery ? (
            <div className="mt-8 pb-4">
              <p className="text-2xs uppercase tracking-label text-taupe" role="status" aria-live="polite">
                {totalMatches === 0
                  ? "No matches"
                  : `${totalMatches} ${totalMatches === 1 ? "piece" : "pieces"}`}
              </p>

              {results.length === 0 ? (
                <p className="mt-6 max-w-md text-base leading-relaxed text-espresso-500">
                  No products found. Try a name, a metal such as{" "}
                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setQuery("gold")}
                    className="link-draw text-espresso-700"
                  >
                    gold
                  </button>
                  , or browse{" "}
                  <Link to="/collections" onClick={onClose} className="link-draw text-espresso-700">
                    all collections
                  </Link>
                  .
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-espresso-100">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        tabIndex={open ? 0 : -1}
                        className="group flex items-center gap-5 py-4"
                      >
                        <div className="w-16 shrink-0 sm:w-20">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            ratio="aspect-square"
                            sizes="80px"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-lg text-espresso-800">
                            {product.name}
                          </p>
                          <p className="mt-1 text-2xs uppercase tracking-label text-taupe">
                            {product.categoryLabel}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm tabular-nums text-espresso-600">
                          {formatINR(product.price)}
                        </span>

                        <ArrowRightIcon className="hidden h-4 w-4 shrink-0 text-espresso-300 transition-transform duration-600 ease-editorial group-hover:translate-x-1 sm:block" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {totalMatches > results.length ? (
                <Link
                  to={`/search?q=${encodeURIComponent(term)}`}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="btn btn-outline mt-8"
                >
                  View all {totalMatches} results
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
