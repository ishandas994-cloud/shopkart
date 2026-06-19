import express from "express";
import {
  getDashboardStats, getAllOrders, updateOrderStatus, getAllUsers,
} from "../controllers/admin.controller.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/stats", getDashboardStats);
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);
router.get("/users", getAllUsers);

export default router;