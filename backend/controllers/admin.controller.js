import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalOrders, totalUsers, totalProducts, orders] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
      Product.countDocuments(),
      Order.find().select("totalPrice orderStatus createdAt"),
    ]);

    const totalRevenue = orders
      .filter((o) => o.isPaid)
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ totalOrders, totalUsers, totalProducts, totalRevenue, recentOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, ...(orderStatus === "Delivered" ? { deliveredAt: new Date() } : {}) },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};