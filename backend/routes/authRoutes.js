import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

// Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Alias (optional, for compatibility)
router.post("/register", signup);

export default router;