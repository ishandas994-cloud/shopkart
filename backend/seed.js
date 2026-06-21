import mongoose from "mongoose";
import dotenv from "dotenv";
 
dotenv.config();
 
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    discountPrice: Number,
    category: String,
    brand: String,
    images: [{ public_id: String, url: String }],
    stock: Number,
    ratings: Number,
    numReviews: Number,
    featured: Boolean,
    tags: [String],
  },
  { timestamps: true }
);
 