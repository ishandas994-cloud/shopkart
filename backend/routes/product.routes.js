import express from "express";
import {
  getProducts, getProduct, getFeatured,
  createProduct, updateProduct, deleteProduct,
} from "../controllers/product.controller.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeatured);
router.get("/:id", getProduct);
router.post("/", protect, adminOnly, upload.array("images", 5), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;