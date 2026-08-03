import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res) => {
  try {

    const { full_name } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name,
        updated_at: new Date()
      })
      .eq("id", req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      user: data
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });

  }
};

export const changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required."
      });
    }

    // Get current user
    const { data: user, error } = await supabase
      .from("users")
      .select("id, password_hash")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect."
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq("id", req.user.id);

    if (updateError) throw updateError;

    res.json({
      success: true,
      message: "Password changed successfully."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to change password."
    });

  }
};