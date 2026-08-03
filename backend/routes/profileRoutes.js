import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {updateProfile,changePassword} from "../controllers/profileController.js";


const router = express.Router();

router.put("/", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
export default router;