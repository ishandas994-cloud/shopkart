import express from "express";
import {
  createRazorpayOrder, placeOrder, getMyOrders, getOrderById,
} from "../controllers/order.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.post("/razorpay", createRazorpayOrder);
router.post("/", placeOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrderById);

export default router;