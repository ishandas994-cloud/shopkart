import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Other"],
    },
    brand: { type: String, default: "" },
    images: [{ public_id: String, url: String }],
    stock: { type: Number, required: true, default: 0 },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;