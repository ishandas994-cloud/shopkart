import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const existing = await Review.findOne({ user: req.user._id, product: productId });
    if (existing) return res.status(400).json({ message: "You already reviewed this product" });

    const review = await Review.create({ user: req.user._id, product: productId, rating, comment });

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { ratings: avgRating.toFixed(1), numReviews: reviews.length });

    await review.populate("user", "name avatar");
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    await Product.findByIdAndUpdate(review.product, { ratings: avgRating.toFixed(1), numReviews: reviews.length });

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};