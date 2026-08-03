import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email, resetLink) => {
  await resend.emails.send({
    from: "GroMo Track <onboarding@resend.dev>",
    to: email,
    subject: "Reset your GroMo Track Password",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>Reset Your Password</h2>

        <p>Hello,</p>

        <p>We received a request to reset your password.</p>

        <p>
          Click the button below to reset it:
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            background:#14b8a6;
            color:white;
            padding:12px 24px;
            border-radius:8px;
            text-decoration:none;
            font-weight:bold;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:20px;">
          This link expires in 15 minutes.
        </p>

        <p>
          If you didn't request this, simply ignore this email.
        </p>

        <hr/>

        <small>
          GroMo Track
        </small>
      </div>
    `,
  });
};