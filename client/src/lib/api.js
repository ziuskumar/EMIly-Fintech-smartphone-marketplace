const BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:4000/api");
export const assetUrl = (source) =>
  source?.startsWith("/") ? `${BASE.replace(/\/api$/, "")}${source}` : source;
export async function getProducts(params = {}) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
  const r = await fetch(`${BASE}/products?${q}`);
  if (!r.ok) throw new Error("Unable to load products");
  return (await r.json()).data;
}
export async function getProduct(slug) {
  const r = await fetch(`${BASE}/products/${slug}`);
  if (!r.ok)
    throw new Error(
      r.status === 404
        ? "That product is no longer available."
        : "Unable to load this product",
    );
  return (await r.json()).data;
}
export async function getBrands() {
  const r = await fetch(`${BASE}/products/brands`);
  if (!r.ok) throw new Error("Unable to load filters");
  return (await r.json()).data;
}
