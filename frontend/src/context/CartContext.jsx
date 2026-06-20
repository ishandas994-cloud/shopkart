import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) return setCart({ items: [], totalPrice: 0 });
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch {
      setCart({ items: [], totalPrice: 0 });
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return toast.error("Please login to add items");
    setCartLoading(true);
    try {
      const { data } = await API.post("/cart", { productId, quantity });
      setCart(data);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add");
    } finally {
      setCartLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    setCartLoading(true);
    try {
      const { data } = await API.put(`/cart/${itemId}`, { quantity });
      setCart(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setCartLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    setCartLoading(true);
    try {
      const { data } = await API.put(`/cart/${itemId}`, { quantity: 0 });
      setCart(data);
      toast.success("Item removed");
    } catch (err) {
      toast.error("Remove failed");
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await API.delete("/cart");
      setCart({ items: [], totalPrice: 0 });
    } catch {}
  };

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartLoading, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);