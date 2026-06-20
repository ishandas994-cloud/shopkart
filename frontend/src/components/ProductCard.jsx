import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ReviewStars from "./ReviewStars";
import { formatPrice, getDiscount, truncate } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const { addToCart, cartLoading } = useCart();
  const discount = getDiscount(product.price, product.discountPrice);
  const displayPrice = product.discountPrice || product.price;

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 group overflow-hidden">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden bg-gray-50 h-52">
          <img
            src={product.images?.[0]?.url || "https://placehold.co/400x300?text=No+Image"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold bg-black/60 px-3 py-1 rounded">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs text-orange-500 font-medium mb-1">{product.category}</p>
        <Link to={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 hover:text-orange-500 transition-colors leading-snug">
            {truncate(product.name, 50)}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <ReviewStars rating={product.ratings} />
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-gray-900">{formatPrice(displayPrice)}</span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product._id)}
          disabled={cartLoading || product.stock === 0}
          className="btn-primary w-full mt-3 text-sm py-2"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;