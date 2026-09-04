import { useEffect, useState } from "react";
import AuthShell, {
  Field,
  FormMessage,
  RevealButton,
} from "../components/AuthShell";
import { ButtonSpinner } from "../components/StateBlocks";
import { Link, useNavigate, useSearchParams } from "../lib/router";
import { isValidEmail } from "../lib/format";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { API_BASE_URL } from "../services/api";

// Login page background image
import loginPageBack from "../assets/loginpageback.png";

export default function Login() {
  const {
    login,
    isSubmitting,
    isAuthenticated,
    isRestoring,
  } = useAuth();

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const redirectTo = params.get("redirect") || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /*
   * If someone is already logged in,
   * send them to their account.
   */
  useEffect(() => {
    if (!isRestoring && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [
    isRestoring,
    isAuthenticated,
    navigate,
    redirectTo,
  ]);

  const setField = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));

    setFormError("");
  };

  const validate = () => {
    const next = {};

    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!isValidEmail(form.email)) {
      next.email =
        "That does not look like an email address.";
    }

    if (!form.password) {
      next.password = "Enter your password.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    const result = await login({
      email: form.email.trim(),
      password: form.password,
    });

    if (!result.ok) {
      setFormError(
        result.status === 401 || result.status === 400
          ? "Invalid email or password."
          : result.message,
      );

      return;
    }

    toast.success(
      `Welcome back${
        result.user?.name
          ? `, ${result.user.name.split(" ")[0]}`
          : ""
      }.`,
    );

    navigate(redirectTo, { replace: true });
  };

  /*
   * Start Google OAuth.
   *
   * The browser goes to our Express backend.
   * Express then sends the user to Google.
   */
  const handleGoogleLogin = () => {
    const googleLoginUrl =
      `${API_BASE_URL}/auth/google`;

    window.location.href = googleLoginUrl;
  };

  return (
    <AuthShell
      eyebrow="Account"
      title="Welcome back."
      intro="Sign in to see your saved pieces and your details."
      image={loginPageBack}
      imageAlt=""
      caption="For moments that deserve to linger."
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 space-y-6"
      >
        <FormMessage tone="error">
          {formError}
        </FormMessage>

        <Field
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={setField("email")}
          error={errors.email}
          autoComplete="email"
        />

        <Field
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={setField("password")}
          error={errors.password}
          autoComplete="current-password"
        >
          <RevealButton
            shown={showPassword}
            controls="password"
            onToggle={() =>
              setShowPassword((shown) => !shown)
            }
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-dark w-full"
        >
          {isSubmitting ? (
            <ButtonSpinner label="Signing in" />
          ) : (
            "Sign in"
          )}
        </button>

        <div className="mt-3 text-right">
          <Link
            to="/forgot-password"
            className="link-draw text-xs text-espresso-600"
          >
            Forgot your password?
          </Link>
        </div>
      </form>

      {/* Google Login */}
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-espresso-200" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-taupe">
            Or
          </span>

          <div className="h-px flex-1 bg-espresso-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-5 flex w-full items-center justify-center gap-3 border border-espresso-200 bg-white px-5 py-3 text-xs uppercase tracking-[0.16em] text-espresso-800 transition hover:bg-espresso-50"
        >
          {/* Google G */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.22l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.97A5.86 5.86 0 0 1 6.23 12c0-.68.12-1.34.31-1.97V7.5H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.5l3.24-2.53Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.99c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.08 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.5l3.24 2.53C7.31 7.71 9.46 5.99 12 5.99Z"
            />
          </svg>

          Continue with Google
        </button>
      </div>

      <p className="mt-9 text-xs text-espresso-500">
        New here?{" "}
        <Link
          to={`/signup${
            redirectTo !== "/account"
              ? `?redirect=${encodeURIComponent(
                  redirectTo,
                )}`
              : ""
          }`}
          className="link-draw text-espresso-800"
        >
          Create an account
        </Link>
      </p>

    </AuthShell>
  );
}