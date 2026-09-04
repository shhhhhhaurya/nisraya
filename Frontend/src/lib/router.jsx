/**
 * NISRAYA — minimal client-side router
 * ---------------------------------------------------------------------------
 * Supports GitHub Pages deployment under /nisraya/
 * while keeping the rest of the application routes unchanged.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ context */

const LocationContext = createContext(null);
const ParamsContext = createContext({});

/* ------------------------------------------------------------------ GitHub Pages base path */

/*
 * Vite gives us:
 *
 *   local development  -> "/"
 *   GitHub Pages       -> "/nisraya/"
 *
 * The application itself should continue thinking in terms of:
 *
 *   /
 *   /collections
 *   /product/...
 *   /login
 *
 * This router automatically adds/removes the deployment base.
 */

const BASE_PATH = (() => {
  const configuredBase = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

  // Vite should provide /nisraya/ on GitHub Pages. The pathname fallback
  // also makes the router resilient if the site is opened from an existing
  // GitHub Pages deployment whose generated assets were built with /.
  if (configuredBase && configuredBase !== "/") {
    return configuredBase;
  }

  if (typeof window !== "undefined") {
    const pathname = window.location.pathname || "/";
    if (pathname === "/nisraya" || pathname.startsWith("/nisraya/")) {
      return "/nisraya";
    }
  }

  return "";
})();

function stripBasePath(pathname) {
  if (!BASE_PATH) {
    return pathname || "/";
  }

  if (pathname === BASE_PATH) {
    return "/";
  }

  if (pathname.startsWith(`${BASE_PATH}/`)) {
    return pathname.slice(BASE_PATH.length) || "/";
  }

  return pathname || "/";
}

function addBasePath(path) {
  if (!BASE_PATH) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  return `${BASE_PATH}${path}`;
}

/* ------------------------------------------------------------------ location */

function readLocation() {
  const { pathname, search, hash } = window.location;

  return {
    pathname: stripBasePath(pathname),
    search,
    hash,
    state: window.history.state?.usr ?? null,
  };
}

/* ------------------------------------------------------------- path matching */

/**
 * Match a route pattern against a pathname.
 * Supports ":param" segments and a trailing "*" catch-all.
 * Returns { params, score } or null.
 */
export function matchPath(pattern, pathname) {
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  const isCatchAll =
    patternSegments[patternSegments.length - 1] === "*";

  const comparable = isCatchAll
    ? patternSegments.slice(0, -1)
    : patternSegments;

  if (isCatchAll) {
    if (pathSegments.length < comparable.length) {
      return null;
    }
  } else if (pathSegments.length !== comparable.length) {
    return null;
  }

  const params = {};
  let score = isCatchAll ? 0 : 1;

  for (let i = 0; i < comparable.length; i += 1) {
    const patternSegment = comparable[i];
    const pathSegment = pathSegments[i];

    if (patternSegment.startsWith(":")) {
      params[patternSegment.slice(1)] = safeDecode(pathSegment);
      score += 2;
    } else if (
      patternSegment.toLowerCase() ===
      pathSegment.toLowerCase()
    ) {
      score += 3;
    } else {
      return null;
    }
  }

  if (isCatchAll) {
    params["*"] = pathSegments
      .slice(comparable.length)
      .join("/");
  }

  return { params, score };
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/* ------------------------------------------------------------------ provider */

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(readLocation());
    };

    window.addEventListener("popstate", handlePopState);

    return () =>
      window.removeEventListener(
        "popstate",
        handlePopState,
      );
  }, []);

  const navigate = useCallback(
    (to, options = {}) => {
      /* ------------------------------------------------------------
       * Browser history navigation
       * ---------------------------------------------------------- */

      if (typeof to === "number") {
        window.history.go(to);
        return;
      }

      const target = String(to);

      /*
       * Keep external URLs untouched.
       */
      if (
        target.startsWith("http://") ||
        target.startsWith("https://") ||
        target.startsWith("//") ||
        target.startsWith("mailto:") ||
        target.startsWith("tel:")
      ) {
        window.location.href = target;
        return;
      }

      /*
       * Split pathname/search/hash so the deployment base is only
       * applied to the pathname.
       */
      const hashIndex = target.indexOf("#");

      const targetWithoutHash =
        hashIndex >= 0
          ? target.slice(0, hashIndex)
          : target;

      const hash =
        hashIndex >= 0
          ? target.slice(hashIndex)
          : "";

      const queryIndex =
        targetWithoutHash.indexOf("?");

      const targetPath =
        queryIndex >= 0
          ? targetWithoutHash.slice(0, queryIndex)
          : targetWithoutHash;

      const query =
        queryIndex >= 0
          ? targetWithoutHash.slice(queryIndex)
          : "";

      const logicalPath =
        targetPath || "/";

      const physicalPath =
        addBasePath(logicalPath);

      const physicalTarget =
        `${physicalPath}${query}${hash}`;

      const current =
        window.location.pathname +
        window.location.search +
        window.location.hash;

      if (
        physicalTarget === current &&
        !options.replace
      ) {
        return;
      }

      const historyState = {
        usr: options.state ?? null,
      };

      if (options.replace) {
        window.history.replaceState(
          historyState,
          "",
          physicalTarget,
        );
      } else {
        window.history.pushState(
          historyState,
          "",
          physicalTarget,
        );
      }

      setLocation(readLocation());
    },
    [],
  );

  const value = useMemo(
    () => ({
      location,
      navigate,
    }),
    [location, navigate],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

/* ------------------------------------------------------------------ context */

function useRouterContext(hookName) {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      `${hookName} must be used inside <BrowserRouter>.`,
    );
  }

  return context;
}

/* --------------------------------------------------------------------- hooks */

export function useLocation() {
  return useRouterContext("useLocation").location;
}

export function useNavigate() {
  return useRouterContext("useNavigate").navigate;
}

export function useParams() {
  return useContext(ParamsContext);
}

/** Read/write the query string. */
export function useSearchParams() {
  const { location, navigate } =
    useRouterContext("useSearchParams");

  const searchParams = useMemo(
    () =>
      new URLSearchParams(
        location.search,
      ),
    [location.search],
  );

  const setSearchParams = useCallback(
    (next, options = {}) => {
      const resolved =
        typeof next === "function"
          ? next(
              new URLSearchParams(
                location.search,
              ),
            )
          : next;

      const params =
        resolved instanceof URLSearchParams
          ? resolved
          : new URLSearchParams(resolved);

      const query = params.toString();

      navigate(
        `${location.pathname}${
          query ? `?${query}` : ""
        }`,
        {
          replace:
            options.replace ?? false,
        },
      );
    },
    [
      location.pathname,
      location.search,
      navigate,
    ],
  );

  return [
    searchParams,
    setSearchParams,
  ];
}

/* ---------------------------------------------------------------- components */

export function Route() {
  /*
   * Routes are declarative configuration;
   * <Routes> reads their props directly.
   */
  return null;
}

export function Routes({ children }) {
  const location = useLocation();

  const routes = useMemo(() => {
    const collected = [];

    const walk = (nodes) => {
      const list = Array.isArray(nodes)
        ? nodes
        : [nodes];

      list.forEach((node) => {
        if (!node) return;

        if (Array.isArray(node)) {
          walk(node);
          return;
        }

        if (
          node.props?.path !== undefined
        ) {
          collected.push(node.props);
        }
      });
    };

    walk(
      Array.isArray(children)
        ? children
        : [children],
    );

    return collected;
  }, [children]);

  const matched = useMemo(() => {
    let best = null;

    routes.forEach((route) => {
      const result = matchPath(
        route.path,
        location.pathname,
      );

      if (
        result &&
        (!best ||
          result.score >
            best.result.score)
      ) {
        best = {
          route,
          result,
        };
      }
    });

    return best;
  }, [routes, location.pathname]);

  if (!matched) {
    return null;
  }

  return (
    <ParamsContext.Provider
      value={matched.result.params}
    >
      {matched.route.element}
    </ParamsContext.Provider>
  );
}

/* --------------------------------------------------------------------- Link */

function isModifiedEvent(event) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function resolveLinkHref(to) {
  const target = String(to);

  if (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("//") ||
    target.startsWith("mailto:") ||
    target.startsWith("tel:")
  ) {
    return target;
  }

  /*
   * Hash-only links such as "#about-us".
   */
  if (target.startsWith("#")) {
    return `${window.location.pathname}${target}`;
  }

  /*
   * Query-only links.
   */
  if (target.startsWith("?")) {
    return `${window.location.pathname}${target}`;
  }

  /*
   * Internal application route.
   */
  if (target.startsWith("/")) {
    return addBasePath(target);
  }

  return target;
}

export function Link({
  to,
  replace = false,
  state = null,
  onClick,
  target,
  children,
  ...rest
}) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    /*
     * Let the browser handle:
     * - new tabs
     * - downloads
     * - modified clicks
     */
    if (
      event.button !== 0 ||
      isModifiedEvent(event) ||
      (target && target !== "_self")
    ) {
      return;
    }

    /*
     * External links should remain browser-controlled.
     */
    const targetString = String(to);

    if (
      targetString.startsWith("http://") ||
      targetString.startsWith("https://") ||
      targetString.startsWith("//") ||
      targetString.startsWith("mailto:") ||
      targetString.startsWith("tel:")
    ) {
      return;
    }

    event.preventDefault();

    navigate(to, {
      replace,
      state,
    });
  };

  return (
    <a
      href={resolveLinkHref(to)}
      target={target}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ NavLink */

export function NavLink({
  to,
  className,
  children,
  end = false,
  ...rest
}) {
  const { pathname } = useLocation();

  const isActive = end
    ? pathname === to
    : pathname === to ||
      (to !== "/" &&
        pathname.startsWith(`${to}/`));

  const resolvedClassName =
    typeof className === "function"
      ? className({ isActive })
      : className;

  return (
    <Link
      to={to}
      className={resolvedClassName}
      aria-current={
        isActive ? "page" : undefined
      }
      {...rest}
    >
      {typeof children === "function"
        ? children({ isActive })
        : children}
    </Link>
  );
}

/* ---------------------------------------------------------------- Navigate */

export function Navigate({
  to,
  replace = true,
  state = null,
}) {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) {
      return;
    }

    hasNavigated.current = true;

    navigate(to, {
      replace,
      state,
    });
  }, [
    navigate,
    to,
    replace,
    state,
  ]);

  return null;
}

/* --------------------------------------------------------------- ScrollToTop */

export function ScrollToTop() {
  const { pathname, search } =
    useLocation();

  const previous = useRef(
    `${pathname}${search}`,
  );

  useEffect(() => {
    const key = `${pathname}${search}`;

    if (previous.current === key) {
      return;
    }

    previous.current = key;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior:
        prefersReducedMotion
          ? "auto"
          : "smooth",
    });
  }, [pathname, search]);

  return null;
}