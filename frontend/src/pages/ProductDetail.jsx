import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ReviewStars from "../components/ReviewStars";
import Spinner from "../components/Spinner";
import { formatPrice, getDiscount } from "../utils/helpers";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartLoading } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: prod }, { data: revs }] = await Promise.all([
          API.get(`/products/${id}`),
          API.get(`/reviews/${id}`),
        ]);
        setProduct(prod);
        setReviews(revs);
      } catch {
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to review");
    setSubmitting(true);
    try {
      const { data } = await API.post(`/reviews/${id}`, reviewForm);
      setReviews((prev) => [data, ...prev]);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Review submitted!");
      const { data: updated } = await API.get(`/products/${id}`);
      setProduct(updated);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner size="lg" />;
  if (!product) return null;

  const displayPrice = product.discountPrice || product.price;
  const discount = getDiscount(product.price, product.discountPrice);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="card overflow-hidden bg-gray-50 h-80 md:h-96">
            <img
              src={product.images?.[selectedImage]?.url || "https://placehold.co/600x400?text=No+Image"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-orange-500" : "border-gray-200"}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <p className="text-sm text-orange-500 font-medium">{product.category} {product.brand && `· ${product.brand}`}</p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-3">
            <ReviewStars rating={product.ratings} size="md" />
            <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded">{discount}% off</span>
              </>
            )}
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
            </span>
          </div>
          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold">−</button>
                <span className="px-4 py-2 font-semibold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold">+</button>
              </div>
              <button
                onClick={() => addToCart(product._id, qty)}
                disabled={cartLoading}
                className="btn-primary flex-1 py-2.5"
              >
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          )}
          <button onClick={() => { addToCart(product._id, qty); navigate("/checkout"); }} disabled={product.stock === 0} className="btn-outline w-full py-2.5">
            Buy Now
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-14">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        {user && (
          <form onSubmit={handleSubmitReview} className="card p-6 mb-8 space-y-4">
            <h3 className="font-semibold text-gray-700">Write a Review</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rating:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                  className={`text-2xl ${s <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"}`}>★</button>
              ))}
            </div>
            <textarea
              required
              rows={3}
              className="input-field resize-none"
              placeholder="Share your experience..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            />
            <button type="submit" disabled={submitting} className="btn-primary px-6">
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                    {r.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{r.user?.name}</p>
                    <ReviewStars rating={r.rating} />
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;