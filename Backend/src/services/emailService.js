const nodemailer = require("nodemailer");

const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    String(process.env.SMTP_SECURE ?? "true") === "true";

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(
      "SMTP_USER or SMTP_PASS is missing from Backend/.env",
    );
  }

  console.log("📧 SMTP configuration:");
  console.log("   Host:", host);
  console.log("   Port:", port);
  console.log("   Secure:", secure);
  console.log("   User:", process.env.SMTP_USER);
  console.log("   Password configured:", Boolean(process.env.SMTP_PASS));

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendPasswordResetOtp = async ({ to, otp }) => {
  const transporter = createTransporter();

  try {
    console.log("📧 Checking Gmail SMTP connection...");

    await transporter.verify();

    console.log("✅ Gmail SMTP connection successful.");

    const from =
      process.env.SMTP_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `NISRAYA <${from}>`,
      to,
      subject: "Your NISRAYA password reset code",
      text: `Your NISRAYA password reset code is ${otp}. It expires in 10 minutes. If you did not request this, you can ignore this email.`,
      html: `
        <div style="margin:0;background:#f7f2ea;padding:40px 20px;font-family:Arial,sans-serif;color:#3b2117;">
          <div style="max-width:560px;margin:0 auto;background:#fffdf9;padding:42px 34px;border:1px solid #e5d9ca;">
            <div style="text-align:center;letter-spacing:8px;font-size:20px;margin-bottom:28px;">
              NISRAYA
            </div>

            <div style="text-align:center;text-transform:uppercase;letter-spacing:3px;font-size:10px;color:#9b806d;">
              Password reset
            </div>

            <h1 style="font-family:Georgia,serif;font-weight:400;text-align:center;font-size:32px;margin:18px 0 12px;">
              Your verification code
            </h1>

            <p style="text-align:center;color:#7d6b5e;line-height:1.7;">
              Use the code below to reset your NISRAYA account password.
            </p>

            <div style="margin:30px auto;padding:18px;text-align:center;background:#f3eadf;font-size:30px;letter-spacing:9px;font-weight:600;">
              ${otp}
            </div>

            <p style="text-align:center;color:#9b8a7d;font-size:12px;line-height:1.7;">
              This code expires in 10 minutes. If you did not request a password reset, no action is required.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Password reset OTP email sent to:", to);
  } catch (error) {
    console.error("❌ Gmail SMTP Error");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("Response Code:", error.responseCode);

    throw error;
  }
};

module.exports = {
  sendPasswordResetOtp,
};