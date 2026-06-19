import express from "express";
import { addReview, getProductReviews, deleteReview } from "../controllers/review.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/:productId", protect, addReview);
router.delete("/:id", protect, deleteReview);

export default router;