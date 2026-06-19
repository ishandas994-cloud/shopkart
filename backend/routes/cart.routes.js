import express from "express";
import { getCart, addToCart, updateCartItem, clearCart } from "../controllers/cart.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/:itemId", updateCartItem);
router.delete("/", clearCart);

export default router;