import { useEffect, useState } from "react";
import AuthShell, { Field, FormMessage, RevealButton } from "../components/AuthShell";
import { ButtonSpinner } from "../components/StateBlocks";
import { Link, useNavigate, useSearchParams } from "../lib/router";
import { IMAGES } from "../data/products";
import { isValidEmail } from "../lib/format";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import packagingImage from "../assets/packaging.png";

const MIN_PASSWORD = 8;

export default function Signup() {
  const { signup, isSubmitting, isAuthenticated, isRestoring } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const redirectTo = params.get("redirect") || "/account";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isRestoring && isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isRestoring, isAuthenticated, navigate, redirectTo]);

  const setField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFormError("");
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Enter your name.";
    else if (form.name.trim().length < 2) next.name = "Enter your full name.";

    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!isValidEmail(form.email)) next.email = "That does not look like an email address.";

    if (form.phone.trim() && !/^[\d+\s-]{7,15}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number, or leave it blank.";
    }

    if (!form.password) next.password = "Choose a password.";
    else if (form.password.length < MIN_PASSWORD) {
      next.password = `Use at least ${MIN_PASSWORD} characters.`;
    }

    if (form.confirm !== form.password) next.confirm = "The two passwords do not match.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    if (!validate()) return;

    const result = await signup({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim() || undefined,
    });

    if (!result.ok) {
      // 409 is the API's "already registered" response.
      if (result.status === 409) {
        setErrors((current) => ({ ...current, email: "That email is already registered." }));
        setFormError("An account with that email already exists. Sign in instead.");
      } else {
        setFormError(result.message);
      }
      return;
    }

    toast.success("Your account is ready.");
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Join NISRAYA."
      intro="Save the pieces you like, keep your details for checkout, and hear first when a collection lands."
      image={packagingImage}
      imageAlt=""
      caption="Distinctive pieces, shaped by the art of making."
    >
      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
        <FormMessage tone="error">{formError}</FormMessage>

        <Field
          id="name"
          label="Full name"
          value={form.name}
          onChange={setField("name")}
          error={errors.name}
          autoComplete="name"
        />

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
          id="phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={setField("phone")}
          error={errors.phone}
          autoComplete="tel"
          required={false}
          hint="Used only for delivery updates."
        />

        <Field
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={setField("password")}
          error={errors.password}
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD} characters.`}
        >
          <RevealButton
            shown={showPassword}
            controls="password"
            onToggle={() => setShowPassword((shown) => !shown)}
          />
        </Field>

        <Field
          id="confirm"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          value={form.confirm}
          onChange={setField("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <button type="submit" disabled={isSubmitting} className="btn btn-dark w-full">
          {isSubmitting ? <ButtonSpinner label="Creating account" /> : "Create account"}
        </button>
      </form>

      <p className="mt-9 text-xs text-espresso-500">
        Already have an account?{" "}
        <Link
          to={`/login${redirectTo !== "/account" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="link-draw text-espresso-800"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
