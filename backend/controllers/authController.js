import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from("users")
            .select("email")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert User
        const { error } = await supabase
            .from("users")
            .insert([
                {
                    full_name: fullName,
                    email,
                    password_hash: hashedPassword
                }
            ]);

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    // Check if user exists
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    // Always return success (don't reveal whether email exists)
    if (error || !user) {
      return res.json({
        success: true,
        message:
          "If an account exists with this email, a reset link has been sent."
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Create SHA256 hash
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    // Expiry = 15 minutes
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // Save token
    await supabase
      .from("users")
      .update({
        reset_token: hashedToken,
        reset_token_expiry: expiry
      })
      .eq("id", user.id);

    // Frontend reset page
    const resetLink =
      `http://localhost:5173/reset-password/${token}`;

    // Send email
    await sendResetEmail(email, resetLink);

    res.json({
      success: true,
      message:
        "If an account exists with this email, a reset link has been sent."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong."
    });

  }
};

export const resetPassword = async (req, res) => {
  try {

    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required."
      });
    }

    // Hash the incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with this token
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("reset_token", hashedToken)
      .single();

    if (error || !user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link."
      });
    }

    // Check expiry
    const expiryTime = new Date(user.reset_token_expiry).getTime();

    if (Date.now() > expiryTime) {
        return res.status(400).json({
            success: false,
            message: "Reset link has expired."
        });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    const { error: updateError } = await supabase
    .from("users")
    .update({
        password_hash: passwordHash,
        reset_token: null,
        reset_token_expiry: null,
        updated_at: new Date().toISOString()
    })
    .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    res.json({
      success: true,
      message: "Password reset successfully."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong."
    });

  }
};