import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { getBrands, getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams(),
    [products, setProducts] = useState([]),
    [brands, setBrands] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [filters, setFilters] = useState({
      search: searchParams.get("search") || "",
      brand: "",
      sort: "featured",
      maxPrice: "",
    });
  useEffect(() => {
    getBrands()
      .then(setBrands)
      .catch(() => {});
  }, []);
  useEffect(() => {
    setLoading(true);
    setError("");
    getProducts(filters)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    const q = {};
    if (filters.search) q.search = filters.search;
    setSearchParams(q, { replace: true });
  }, [filters]);
  const update = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  return (
    <main className="wrap py-10">
      <p className="eyebrow">SMARTPHONE STORE</p>
      <h1 className="section-title">Find your next phone</h1>
      <div className="mt-7 grid gap-6 lg:grid-cols-[245px_1fr]">
        <aside className="rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between font-bold">
            <span className="flex gap-2">
              <SlidersHorizontal size={18} /> Filters
            </span>
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  brand: "",
                  sort: "featured",
                  maxPrice: "",
                })
              }
              className="text-xs text-blue-700"
            >
              Reset
            </button>
          </div>
          <label className="filter-label">Search</label>
          <input
            className="input"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Brand or model"
          />
          <label className="filter-label">Brand</label>
          <select
            className="input"
            value={filters.brand}
            onChange={(e) => update("brand", e.target.value)}
          >
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <label className="filter-label">Budget</label>
          <select
            className="input"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          >
            <option value="">Any price</option>
            <option value="35000">Under ₹35,000</option>
            <option value="70000">Under ₹70,000</option>
            <option value="100000">Under ₹1,00,000</option>
          </select>
        </aside>
        <section>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {loading
                ? "Loading devices…"
                : `${products.length} devices found`}
            </p>
            <select
              aria-label="Sort products"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          {error ? (
            <div className="state">
              <X className="text-red-500" />
              <b>Couldn’t load products</b>
              <p>{error}</p>
              <button
                className="btn btn-dark mt-4"
                onClick={() => setFilters({ ...filters })}
              >
                Try again
              </button>
            </div>
          ) : loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <div
                  key={x}
                  className="h-96 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : products.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="state">
              <b>No phones match those filters.</b>
              <p>Try clearing a filter or choosing a different budget.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
