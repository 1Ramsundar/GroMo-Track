import express from "express";
import { getBudget, saveBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's budget
router.get("/", authMiddleware, getBudget);

// Create or Update budget
router.post("/", authMiddleware, saveBudget);

export default router;