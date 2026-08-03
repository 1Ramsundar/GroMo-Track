import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";
import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "🚀 GroMo Track Backend is Running"
    });
});

// Database Test Route
app.get("/test-db", async (req, res) => {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});