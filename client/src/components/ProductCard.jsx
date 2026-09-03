import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { assetUrl } from "../lib/api";
const rupee = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export default function ProductCard({ product }) {
  const v = [...product.variants].sort(
      (a, b) => a.sellingPrice - b.sellingPrice,
    )[0],
    discount = Math.round((1 - v.sellingPrice / v.mrp) * 100),
    emi = [...v.emiPlans].sort((a, b) => a.monthlyEmi - b.monthlyEmi)[0];
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group card block overflow-hidden"
    >
      <div className="relative h-56 bg-slate-50 p-5">
        <img
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          src={assetUrl(v.image)}
          alt={product.name}
        />
        <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm">
          {product.brand}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {v.storage} · {v.color}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold">
            <Star size={12} fill="currentColor" className="text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 text-base font-bold text-ink">{product.name}</h3>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-extrabold">
            {rupee(v.sellingPrice)}
          </span>
          <del className="mb-1 text-xs text-slate-400">{rupee(v.mrp)}</del>
          <span className="mb-1 text-xs font-bold text-emerald-600">
            {discount}% off
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-slate-500">
            EMI from <b className="text-ink">{rupee(emi.monthlyEmi)}/mo</b>
          </span>
          <ArrowRight
            size={17}
            className="transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
