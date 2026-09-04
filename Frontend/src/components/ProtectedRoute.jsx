import { Navigate, useLocation } from "../lib/router";
import { LoadingState } from "./StateBlocks";
import { useAuth } from "../context/AuthContext";

/**
 * Gate for /account. While the stored session is being read back we render a
 * holding state rather than redirecting — bouncing a signed-in customer to the
 * login screen for a frame is worse than a brief pause.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isRestoring } = useAuth();
  const { pathname, search } = useLocation();

  if (isRestoring) return <LoadingState label="One moment" />;

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(`${pathname}${search}`);
    return <Navigate to={`/login?redirect=${redirect}`} />;
  }

  return children;
}
