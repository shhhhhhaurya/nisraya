import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchOverlay from "./SearchOverlay";
import { useLocation } from "../lib/router";

/**
 * Page shell. The homepage is the only route with a dark full-bleed hero, so it
 * is the only one where the navbar starts transparent and the main element runs
 * under it; everywhere else the content begins below the bar.
 */
const TRANSPARENT_NAV_ROUTES = ["/"];

export default function Layout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();

  const hasTransparentNav = TRANSPARENT_NAV_ROUTES.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso-800 focus:px-5 focus:py-3 focus:text-2xs focus:uppercase focus:tracking-label focus:text-ivory"
      >
        Skip to content
      </a>

      <Navbar transparent={hasTransparentNav} onOpenSearch={() => setIsSearchOpen(true)} />

      <main id="main" className={`flex-1 ${hasTransparentNav ? "" : "pt-nav"}`}>
        {children}
      </main>

      <Footer />

      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
