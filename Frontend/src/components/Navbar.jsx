import { useEffect, useRef, useState } from "react";
import Image from "./Image";
import nisrayaLogo from "../assets/nisraya logo.png";

import {
  BagIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./Icons";

import { Link, NavLink, useLocation } from "../lib/router";
import { CATEGORIES } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

/**
 * NISRAYA Navbar
 *
 * Transparent over the homepage hero and ivory/solid after scrolling.
 * Uses the real NISRAYA BY NIYATI logo from /assets.
 */
export default function Navbar({ onOpenSearch, transparent = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJewelryOpen, setIsJewelryOpen] = useState(false);

  const closeTimer = useRef(null);

  const { pathname } = useLocation();
  const { count } = useCart();
  const { isAuthenticated, user } = useAuth();
  const wishlist = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const isOverHero =
    transparent && !isScrolled && !isMenuOpen;

  const openJewelry = () => {
    window.clearTimeout(closeTimer.current);
    setIsJewelryOpen(true);
  };

  const closeJewelry = () => {
    window.clearTimeout(closeTimer.current);

    closeTimer.current = window.setTimeout(() => {
      setIsJewelryOpen(false);
    }, 140);
  };

  const iconButton = `
    flex h-11 w-11
    items-center justify-center
    transition-colors duration-500
    ${
      isOverHero
        ? "text-ivory hover:text-champagne-light"
        : "text-espresso-700 hover:text-champagne-dark"
    }
  `;

  const navLinkClass = ({ isActive }) =>
    [
      "relative py-2 text-2xs uppercase tracking-nav transition-colors duration-500",

      isOverHero
        ? isActive
          ? "text-champagne-light"
          : "text-ivory/85 hover:text-ivory"
        : isActive
          ? "text-champagne-dark"
          : "text-espresso-600 hover:text-espresso-800",
    ].join(" ");

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-700 ease-editorial",

          isOverHero
            ? "bg-transparent"
            : "border-b border-espresso-100/70 bg-ivory/95 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="shell">
          <div className="flex h-nav items-center justify-between gap-6">

            {/* =====================================================
                LOGO
            ====================================================== */}

            <div className="flex flex-1 items-center">
              <Link
                to="/"
                aria-label="NISRAYA by Niyati — home"
                className="flex items-center gap-3 transition-opacity duration-500 hover:opacity-90"
              >
                <img
                  src={nisrayaLogo}
                  alt="NISRAYA by Niyati"
                  className="h-[52px] w-[52px] shrink-0 object-contain"
                />

                <div className="flex flex-col justify-center leading-none">
                  <span
                    className={[
                      "font-display text-[24px] tracking-[0.28em]",
                      "transition-colors duration-500",
                      isOverHero
                        ? "text-ivory"
                        : "text-espresso-800",
                    ].join(" ")}
                  >
                    NISRAYA
                  </span>

                  <span
                    className={[
                      "mt-2 pl-[2px] text-[9px] uppercase tracking-[0.3em]",
                      "transition-colors duration-500",
                      isOverHero
                        ? "text-ivory/80"
                        : "text-espresso-500",
                    ].join(" ")}
                  >
                    BY NIYATI
                  </span>
                </div>
              </Link>
            </div>

            {/* =====================================================
                PRIMARY NAVIGATION
            ====================================================== */}

            <nav
              aria-label="Primary"
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-11">

                {/* Collections */}
                <li>
                  <NavLink
                    to="/collections"
                    className={navLinkClass}
                  >
                    Shop
                  </NavLink>
                </li>

                {/* Jewelry dropdown */}
                <li
                  className="relative"
                  onMouseEnter={openJewelry}
                  onMouseLeave={closeJewelry}
                >
                  <button
                    type="button"
                    aria-expanded={isJewelryOpen}
                    aria-controls="jewelry-menu"
                    onClick={() =>
                      setIsJewelryOpen(
                        (open) => !open
                      )
                    }
                    className={`${navLinkClass({
                      isActive:
                        pathname.startsWith(
                          "/collections/"
                        ),
                    })} flex items-center gap-2`}
                  >
                    Collections

                    <ChevronDownIcon
                      className={`
                        h-3 w-3
                        transition-transform duration-500
                        ease-editorial
                        ${
                          isJewelryOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {/* Category panel */}
                  <div
                    id="jewelry-menu"
                    className={[
                      "absolute left-1/2 top-full z-10 w-[46rem] -translate-x-1/2 pt-6 transition-all duration-600 ease-editorial",

                      isJewelryOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1.5 opacity-0",
                    ].join(" ")}
                  >
                    <div className="border border-espresso-100 bg-ivory p-6 shadow-[0_24px_60px_-40px_rgba(21,17,14,0.45)]">
                      <ul className="grid grid-cols-4 gap-5">

                        {CATEGORIES.map(
                          (category) => (
                            <li
                              key={
                                category.slug
                              }
                            >
                              <Link
                                to={`/collections/${category.slug}`}
                                tabIndex={
                                  isJewelryOpen
                                    ? 0
                                    : -1
                                }
                                className="group block"
                              >
                                <Image
                                  src={
                                    category.image
                                  }
                                  alt={
                                    category.name
                                  }
                                  ratio="aspect-square"
                                  hoverZoom
                                  sizes="180px"
                                />

                                <p className="mt-3 font-display text-base text-espresso-800">
                                  {
                                    category.name
                                  }
                                </p>

                                <p className="mt-1 text-2xs uppercase tracking-label text-taupe">
                                  {
                                    category.tagline
                                  }
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 text-2xs uppercase tracking-label text-espresso-700 transition-colors duration-500 group-hover:text-champagne-dark">
                                  Shop Now
                                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                                    →
                                  </span>
                                </span>
                              </Link>
                            </li>
                          )
                        )}

                      </ul>
                    </div>
                  </div>
                </li>

                {/* About Us */}
                <li>
                  <NavLink
                    to="/about"
                    className={navLinkClass}
                  >
                    About Us
                  </NavLink>
                </li>

              </ul>
            </nav>

            {/* =====================================================
                RIGHT SIDE ICONS
            ====================================================== */}

            <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">

              {/* Search */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className={iconButton}
              >
                <SearchIcon />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${wishlist.count} saved`}
                className={`relative hidden sm:flex ${iconButton}`}
              >
                <HeartIcon />

                {wishlist.count > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-2 h-1.5 w-1.5 rounded-full bg-champagne"
                  />
                ) : null}
              </Link>

              {/* Account */}
              <Link
                to={
                  isAuthenticated
                    ? "/account"
                    : "/login"
                }
                aria-label={
                  isAuthenticated
                    ? `Account — ${
                        user?.name ??
                        "signed in"
                      }`
                    : "Sign in"
                }
                className={`hidden sm:flex ${iconButton}`}
              >
                <UserIcon />
              </Link>

              {/* Bag */}
              <Link
                to="/cart"
                className={[
                  "flex items-center gap-2.5 py-2 pl-2 transition-colors duration-500 sm:pl-3",

                  isOverHero
                    ? "text-ivory hover:text-champagne-light"
                    : "text-espresso-700 hover:text-champagne-dark",
                ].join(" ")}
                aria-label={`Bag, ${count} ${
                  count === 1
                    ? "item"
                    : "items"
                }`}
              >
                <BagIcon />

                <span className="hidden text-2xs uppercase tracking-nav tabular-nums lg:inline">
                  Bag ({count})
                </span>

                <span
                  aria-hidden="true"
                  className="text-2xs tabular-nums tracking-label lg:hidden"
                >
                  ({count})
                </span>
              </Link>

              {/* Mobile menu */}
              <button
                type="button"
                onClick={() =>
                  setIsMenuOpen(true)
                }
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className={`${iconButton} lg:hidden`}
              >
                <MenuIcon />
              </button>

            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={isMenuOpen}
        onClose={() =>
          setIsMenuOpen(false)
        }
        onOpenSearch={onOpenSearch}
      />
    </>
  );
}

/* ================================================================
   MOBILE MENU
================================================================ */

const MOBILE_LINKS = [
  {
    to: "/collections",
    label: "Collections",
  },

  ...CATEGORIES.map((category) => ({
    to: `/collections/${category.slug}`,
    label: category.name,
    indent: true,
  })),

  {
  to: "/about",
  label: "About Us",
},
];

function MobileMenu({
  open,
  onClose,
  onOpenSearch,
}) {
  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const wishlist = useWishlist();

  return (
    <div
      role="dialog"
      aria-modal={
        open ? "true" : undefined
      }
      aria-label="Menu"
      aria-hidden={!open}
      className={[
        "fixed inset-0 z-[90] flex flex-col bg-ivory transition-all duration-700 ease-editorial lg:hidden",

        open
          ? "visible opacity-100"
          : "invisible opacity-0",
      ].join(" ")}
    >

      {/* Mobile header */}
      <div className="shell flex h-nav shrink-0 items-center justify-between">

        <Link
          to="/"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="flex items-center gap-3 transition-opacity duration-500 hover:opacity-90"
        >
          <img
            src={nisrayaLogo}
            alt="NISRAYA by Niyati"
            className="h-12 w-12 shrink-0 object-contain"
          />

          <div className="flex flex-col justify-center leading-none">
            <span className="font-display text-[22px] tracking-[0.28em] text-espresso-800">
              NISRAYA
            </span>

            <span className="mt-2 pl-[2px] text-[8px] uppercase tracking-[0.3em] text-espresso-500">
              BY NIYATI
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-espresso-700"
        >
          <CloseIcon />
        </button>

      </div>

      {/* Mobile content */}
      <div className="flex-1 overflow-y-auto">

        <nav
          aria-label="Mobile"
          className="shell pt-6"
        >
          <ul>

            {MOBILE_LINKS.map(
              (link, index) => (
                <li
                  key={link.to}
                  style={{
                    transitionDelay:
                      open
                        ? `${
                            140 +
                            index * 55
                          }ms`
                        : "0ms",
                  }}
                  className={[
                    "border-b border-espresso-100/80 transition-all duration-700 ease-editorial",

                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  ].join(" ")}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    tabIndex={
                      open ? 0 : -1
                    }
                    className={[
                      "block py-4",

                      link.indent
                        ? "pl-5 text-sm text-espresso-500"
                        : "font-display text-2xl text-espresso-800",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}

          </ul>
        </nav>

        {/* Mobile utilities */}
        <div className="shell mt-9 space-y-1 pb-12">

          {/* Search */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            tabIndex={open ? 0 : -1}
            className="flex w-full items-center gap-3.5 py-3 text-2xs uppercase tracking-label text-espresso-600"
          >
            <SearchIcon className="h-4 w-4" />
            Search
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3.5 py-3 text-2xs uppercase tracking-label text-espresso-600"
          >
            <HeartIcon className="h-4 w-4" />
            Wishlist ({wishlist.count})
          </Link>

          {/* Account */}
          <Link
            to={
              isAuthenticated
                ? "/account"
                : "/login"
            }
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3.5 py-3 text-2xs uppercase tracking-label text-espresso-600"
          >
            <UserIcon className="h-4 w-4" />

            {isAuthenticated
              ? `Account — ${
                  user?.name?.split(
                    " "
                  )[0] ?? "You"
                }`
              : "Sign in"}
          </Link>

          {/* Logout / Signup */}
          {isAuthenticated ? (
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => {
                logout();
                onClose();
              }}
              className="py-3 text-2xs uppercase tracking-label text-espresso-400"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/signup"
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              className="btn btn-dark mt-6 w-full"
            >
              Create an account
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}