import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import useDebounce from "../hooks/useDebounce";

const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Other"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedKeyword = useDebounce(keyword, 500);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort, page });
      if (debouncedKeyword) params.set("keyword", debouncedKeyword);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      const { data } = await API.get(`/products?${params}`);
      setProducts(data.products);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedKeyword, category, sort, page, minPrice, maxPrice]);

  useEffect(() => {
    setPage(1);
  }, [debouncedKeyword, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="card p-4 space-y-5 sticky top-20">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${!category ? "bg-orange-100 text-orange-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${category === c ? "bg-orange-100 text-orange-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="input-field text-sm" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max" className="input-field text-sm" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
            </div>
            <button onClick={() => { setCategory(""); setMinPrice(""); setMaxPrice(""); setKeyword(""); }} className="btn-outline w-full text-sm">
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
            <input
              type="text"
              placeholder="Search products..."
              className="input-field max-w-xs"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{total} results</span>
              <select className="input-field w-auto text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <Spinner size="lg" />
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">No products found</p>
              <button onClick={() => { setCategory(""); setKeyword(""); }} className="btn-primary mt-4">Clear search</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${page === i + 1 ? "bg-orange-500 text-white" : "bg-white border text-gray-600 hover:bg-orange-50"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;