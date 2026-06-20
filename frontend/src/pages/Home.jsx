import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys"];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products/featured")
      .then(({ data }) => setFeatured(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Everything You Love</h1>
          <p className="text-orange-100 text-lg mb-8">Millions of products. Unbeatable prices. Fast delivery.</p>
          <Link to="/products" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors text-lg inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="card p-4 text-center hover:shadow-md hover:border-orange-200 border border-transparent transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-2">
                {cat === "Electronics" ? "📱" : cat === "Clothing" ? "👕" : cat === "Books" ? "📚" :
                 cat === "Home" ? "🏠" : cat === "Sports" ? "⚽" : cat === "Beauty" ? "💄" : "🧸"}
              </div>
              <p className="text-xs font-medium text-gray-600 group-hover:text-orange-500">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-sm text-orange-500 font-semibold hover:underline">View all →</Link>
        </div>
        {loading ? (
          <Spinner />
        ) : featured.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No featured products yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="py-8 px-4 max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Free Shipping on Orders Above ₹499</h3>
          <p className="text-gray-300 mb-6">Use code <span className="text-orange-400 font-bold">SHOPKART</span> for 10% off your first order</p>
          <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;