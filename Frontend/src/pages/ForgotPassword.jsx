import { useState } from "react";
import AuthShell, {
  Field,
  FormMessage,
} from "../components/AuthShell";
import { ButtonSpinner } from "../components/StateBlocks";
import { Link, useNavigate } from "../lib/router";
import { isValidEmail } from "../lib/format";
import { API_BASE_URL } from "../services/api";
import loginPageBack from "../assets/loginpageback.png";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: normalizedEmail }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to send the verification code.",
        );
      }

      setEmail(normalizedEmail);
      setMessage(
        "If an account exists for this email, a 6-digit verification code has been sent.",
      );
      setStep("otp");
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to send the verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otp.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to verify the code.",
        );
      }

      setResetToken(data.resetToken);
      setMessage("Email verified. Create your new password below.");
      setStep("password");
    } catch (verifyError) {
      setError(
        verifyError.message ||
          "Unable to verify the verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetToken,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to update your password.",
        );
      }

      setMessage(
        "Your password has been updated successfully. You can now sign in.",
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (resetError) {
      setError(
        resetError.message ||
          "Unable to update your password right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const title =
    step === "email"
      ? "Forgot your password?"
      : step === "otp"
        ? "Verify your email."
        : "Create a new password.";

  const intro =
    step === "email"
      ? "Enter your registered email and we'll send you a verification code."
      : step === "otp"
        ? `Enter the 6-digit code sent to ${email}.`
        : "Choose a new password for your NISRAYA account.";

  return (
    <AuthShell
      eyebrow="Password Reset"
      title={title}
      intro={intro}
      image={loginPageBack}
      imageAlt=""
      caption="For moments that deserve to linger."
    >
      <div className="mt-10">
        <FormMessage tone="error">{error}</FormMessage>
        <FormMessage tone="success">{message}</FormMessage>

        {step === "email" ? (
          <form onSubmit={requestOtp} className="space-y-6">
            <Field
              id="reset-email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-dark w-full"
            >
              {isSubmitting ? (
                <ButtonSpinner label="Sending code" />
              ) : (
                "Send verification code"
              )}
            </button>
          </form>
        ) : null}

        {step === "otp" ? (
          <form onSubmit={verifyOtp} className="space-y-6">
            <Field
              id="reset-otp"
              label="Verification code"
              type="text"
              value={otp}
              onChange={(event) =>
                setOtp(
                  event.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              autoComplete="one-time-code"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-dark w-full"
            >
              {isSubmitting ? (
                <ButtonSpinner label="Verifying" />
              ) : (
                "Verify code"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full text-xs uppercase tracking-[0.16em] text-taupe transition hover:text-espresso-700"
            >
              Use a different email
            </button>
          </form>
        ) : null}

        {step === "password" ? (
          <form onSubmit={resetPassword} className="space-y-6">
            <Field
              id="new-password"
              label="New password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              hint="Use at least 8 characters."
            />

            <Field
              id="confirm-password"
              label="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-dark w-full"
            >
              {isSubmitting ? (
                <ButtonSpinner label="Updating password" />
              ) : (
                "Create new password"
              )}
            </button>
          </form>
        ) : null}

        <p className="mt-8 text-xs text-espresso-500">
          Remember your password?{" "}
          <Link
            to="/login"
            className="link-draw text-espresso-800"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
