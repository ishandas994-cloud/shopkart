import { useEffect, useState } from "react";
import API from "../../api/axios";
import Spinner from "../../components/Spinner";
import { formatPrice } from "../../utils/helpers";
import toast from "react-hot-toast";

const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Other"];
const emptyForm = { name: "", description: "", price: "", discountPrice: "", category: "Electronics", brand: "", stock: "", featured: false };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products?limit=100");
      setProducts(data.products);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        const { data } = await API.put(`/products/${editId}`, form);
        setProducts((prev) => prev.map((p) => p._id === editId ? data : p));
        toast.success("Product updated");
      } else {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        images.forEach((img) => fd.append("images", img));
        const { data } = await API.post("/products", fd);
        setProducts((prev) => [data, ...prev]);
        toast.success("Product created");
      }
      setShowForm(false);
      setForm(emptyForm);
      setImages([]);
      setEditId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEdit = (product) => {
    setForm({ name: product.name, description: product.description, price: product.price, discountPrice: product.discountPrice || "", category: product.category, brand: product.brand || "", stock: product.stock, featured: product.featured });
    setEditId(product._id);
    setShowForm(true);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products ({products.length})</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }} className="btn-primary">+ Add Product</button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">{editId ? "Edit Product" : "New Product"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Name", key: "name", type: "text", colSpan: true },
              { label: "Price (₹)", key: "price", type: "number" },
              { label: "Discount Price (₹)", key: "discountPrice", type: "number" },
              { label: "Brand", key: "brand", type: "text" },
              { label: "Stock", key: "stock", type: "number" },
            ].map(({ label, key, type, colSpan }) => (
              <div key={key} className={colSpan ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type={type} required={key !== "discountPrice" && key !== "brand"} className="input-field" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="featured" className="text-sm text-gray-700">Featured product</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            {!editId && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (max 5)</label>
                <input type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files).slice(0, 5))} className="text-sm text-gray-600" />
              </div>
            )}
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary px-6">{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="btn-outline px-6">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img src={p.images?.[0]?.url || "https://placehold.co/40x40?text=?"} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                    <span className="font-medium text-gray-800 line-clamp-1 max-w-[200px]">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(p.discountPrice || p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-yellow-600" : "text-green-600"}`}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-blue-500 hover:underline text-xs font-medium">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline text-xs font-medium">Delete</button>
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

export default AdminProducts;