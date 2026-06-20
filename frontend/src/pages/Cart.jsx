import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";
import Spinner from "../components/Spinner";

const Cart = () => {
  const { cart, cartLoading, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  if (cartLoading && !cart.items.length) return <Spinner />;

  if (!cart.items.length)
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add some products to get started</p>
        <Link to="/products" className="btn-primary px-8 py-2.5">Shop Now</Link>
      </div>
    );

  const shipping = cart.totalPrice >= 499 ? 0 : 49;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({cart.items.length} items)</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.items.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4 items-center">
              <img
                src={item.product?.images?.[0]?.url || "https://placehold.co/80x80?text=?"}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product?._id}`} className="font-semibold text-gray-800 hover:text-orange-500 text-sm line-clamp-2">
                  {item.product?.name}
                </Link>
                <p className="text-orange-500 font-bold mt-1">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => updateItem(item._id, item.quantity - 1)} disabled={cartLoading} className="w-7 h-7 rounded-full border hover:bg-gray-100 font-bold text-sm">−</button>
                <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                <button onClick={() => updateItem(item._id, item.quantity + 1)} disabled={cartLoading || item.quantity >= item.product?.stock} className="w-7 h-7 rounded-full border hover:bg-gray-100 font-bold text-sm">+</button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-800 text-sm">{formatPrice(item.price * item.quantity)}</p>
                <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-600 text-xs mt-1">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit space-y-4">
          <h2 className="font-bold text-gray-800 text-lg">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-orange-500">Add {formatPrice(499 - cart.totalPrice)} more for free shipping</p>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatPrice(cart.totalPrice + shipping)}</span>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")} className="btn-primary w-full py-3 text-base">
            Proceed to Checkout
          </button>
          <Link to="/products" className="block text-center text-sm text-orange-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;