import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { formatPrice } from "../utils/helpers";
import toast from "react-hot-toast";

const defaultAddress = { street: "", city: "", state: "", pincode: "", country: "India" };

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || defaultAddress);
  const [loading, setLoading] = useState(false);

  const shipping = cart.totalPrice >= 499 ? 0 : 49;
  const total = cart.totalPrice + shipping;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cart.items.length) return toast.error("Cart is empty");
    setLoading(true);
    try {
      const { data: razorOrder } = await API.post("/orders/razorpay", { amount: total });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "ShopKart",
        description: "Order Payment",
        order_id: razorOrder.orderId,
        prefill: { name: user.name, email: user.email },
        theme: { color: "#f97316" },
        handler: async (response) => {
          try {
            const { data: order } = await API.post("/orders", {
              shippingAddress: address,
              paymentInfo: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              itemsPrice: cart.totalPrice,
              shippingPrice: shipping,
              totalPrice: total,
            });
            await clearCart();
            toast.success("Order placed successfully!");
            navigate(`/orders`);
          } catch (err) {
            toast.error(err.response?.data?.message || "Order failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => toast.error("Payment failed. Please try again."));
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handlePayment} className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-bold text-gray-800 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Street / Area", key: "street", colSpan: 2 },
                { label: "City", key: "city" },
                { label: "State", key: "state" },
                { label: "Pincode", key: "pincode" },
                { label: "Country", key: "country" },
              ].map(({ label, key, colSpan }) => (
                <div key={key} className={colSpan === 2 ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    required
                    className="input-field"
                    value={address[key]}
                    onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-gray-800 mb-2">Payment</h2>
            <p className="text-sm text-gray-500 mb-4">Secure payment via Razorpay. Supports UPI, cards, net banking.</p>
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-semibold text-sm text-gray-800">100% Secure Checkout</p>
                <p className="text-xs text-gray-500">Your payment info is encrypted and safe</p>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
          </button>
        </form>

        <div className="card p-6 h-fit space-y-3">
          <h2 className="font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1 mr-2">{item.product?.name} × {item.quantity}</span>
                <span className="font-medium shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="text-sm space-y-1">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(cart.totalPrice)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;