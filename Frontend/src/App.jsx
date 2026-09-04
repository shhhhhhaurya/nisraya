import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { LoadingState } from "./components/StateBlocks";
import {
  Route,
  Routes,
  ScrollToTop,
  useNavigate,
  useSearchParams,
} from "./lib/router";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";

/**
 * Route table.
 *
 * The homepage is imported eagerly because it is the first paint; every other
 * view is code-split, so a visitor who only reads the homepage never downloads
 * the checkout. `lib/router` mirrors react-router's API.
 */

const Collections = lazy(() => import("./pages/Collections"));
const CollectionProducts = lazy(() => import("./pages/CollectionProducts"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

/* NISRAYA About page */
const About = lazy(() => import("./pages/About"));

const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Signup = lazy(() => import("./pages/Signup"));
const Account = lazy(() => import("./pages/Account"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Info = lazy(() => import("./pages/Info"));
const NotFound = lazy(() => import("./pages/NotFound"));

/*
 * Google OAuth callback page.
 *
 * Google -> Backend -> this page
 *
 * The backend redirects here with:
 *
 * /auth/google/success?token=JWT
 *
 * We take that token, give it to AuthContext, and AuthContext:
 * 1. stores the JWT
 * 2. calls /api/auth/me
 * 3. gets the MongoDB user
 * 4. stores the user
 * 5. marks the user as authenticated
 *
 * IMPORTANT:
 * After successful Google authentication we send the customer
 * to the NISRAYA HOME PAGE, not the account page.
 */
function GoogleAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const {
    completeGoogleLogin,
    isSubmitting,
  } = useAuth();

  useEffect(() => {
    const googleToken = params.get("token");

    if (!googleToken) {
      navigate("/login", { replace: true });
      return;
    }

    let cancelled = false;

    const finishLogin = async () => {
      const result = await completeGoogleLogin(googleToken);

      if (cancelled) return;

      if (result.ok) {
        /*
         * Google login succeeded.
         *
         * DO NOT redirect to /account here.
         * The customer should land on the NISRAYA homepage.
         */
        navigate("/", { replace: true });
      } else {
        console.error("Google login failed:", result.message);
        navigate("/login", { replace: true });
      }
    };

    finishLogin();

    return () => {
      cancelled = true;
    };
  }, [params, completeGoogleLogin, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-ivory">
      <div className="text-center">
        <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-espresso-200 border-t-espresso-800" />

        <p className="text-xs uppercase tracking-[0.2em] text-espresso-500">
          {isSubmitting
            ? "Signing you in"
            : "Completing sign in"}
        </p>

        <p className="mt-2 text-sm text-taupe">
          Please wait...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />

      <Suspense
        fallback={
          <LoadingState
            label="Loading"
            className="min-h-[60vh]"
          />
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/collections"
            element={<Collections />}
          />

          <Route
            path="/collections/:category"
            element={<CollectionProducts />}
          />

          <Route
            path="/product/:slug"
            element={<ProductDetails />}
          />

          {/* NISRAYA — About Us */}
          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Google OAuth callback */}
          <Route
            path="/auth/google/success"
            element={<GoogleAuthSuccess />}
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/info/:topic"
            element={<Info />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}