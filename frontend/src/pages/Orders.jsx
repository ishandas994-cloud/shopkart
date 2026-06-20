import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import OrderStatus from "../components/OrderStatus";
import Spinner from "../components/Spinner";
import { formatPrice } from "../utils/helpers";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/my")
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500 text-lg mb-4">No orders yet</p>
          <Link to="/products" className="btn-primary px-8 py-2.5">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatPrice(order.totalPrice)}</p>
                  <p className="text-xs text-gray-400">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                </div>
              </div>

              <OrderStatus status={order.orderStatus} />

              <div className="mt-4 flex flex-wrap gap-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={item.image || "https://placehold.co/40x40?text=?"} alt={item.name} className="w-10 h-10 rounded object-cover bg-gray-50" />
                    <div>
                      <p className="text-xs font-medium text-gray-700 line-clamp-1 max-w-[120px]">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;