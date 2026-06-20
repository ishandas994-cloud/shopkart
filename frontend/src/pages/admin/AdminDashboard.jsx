import { useEffect, useState } from "react";
import API from "../../api/axios";
import Spinner from "../../components/Spinner";
import { formatPrice, getOrderStatusColor } from "../../utils/helpers";

const StatCard = ({ label, value, icon }) => (
  <div className="card p-6 flex items-center gap-4">
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatPrice(stats?.totalRevenue)} icon="💰" />
        <StatCard label="Total Orders" value={stats?.totalOrders} icon="📦" />
        <StatCard label="Total Products" value={stats?.totalProducts} icon="🛍️" />
        <StatCard label="Total Users" value={stats?.totalUsers} icon="👥" />
      </div>
      <div className="card p-6">
        <h2 className="font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs text-gray-500">{order._id.slice(-8)}</td>
                  <td className="py-3">
                    <p className="font-medium text-gray-800">{order.user?.name}</p>
                    <p className="text-gray-400 text-xs">{order.user?.email}</p>
                  </td>
                  <td className="py-3 font-semibold">{formatPrice(order.totalPrice)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
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

export default AdminDashboard;