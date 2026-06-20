import { useEffect, useState } from "react";
import API from "../../api/axios";
import Spinner from "../../components/Spinner";
import { formatPrice, getOrderStatusColor } from "../../utils/helpers";
import toast from "react-hot-toast";

const statuses = ["Processing", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    API.get("/admin/orders")
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, orderStatus) => {
    setUpdating(orderId);
    try {
      const { data } = await API.put(`/admin/orders/${orderId}`, { orderStatus });
      setOrders((prev) => prev.map((o) => o._id === orderId ? data : o));
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders ({orders.length})</h1>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{order._id.slice(-8)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{order.user?.name}</p>
                    <p className="text-gray-400 text-xs">{order.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(order.totalPrice)}</td>
                  <td className="px-4 py-3 text-gray-500">{order.items.length}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.orderStatus}
                      disabled={updating === order._id}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${getOrderStatusColor(order.orderStatus)}`}
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;