import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeIndianRupee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getProducts()
      .then((x) => setItems(x.filter((p) => p.featured).slice(0, 4)))
      .catch(() => {});
  }, []);
  return (
    <main>
      <section className="hero">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">BUY NOW. PAY YOUR WAY.</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-6xl">
              Premium phones,{" "}
              <span className="underline decoration-mint decoration-[12px] underline-offset-[-3px]">
                lighter
              </span>{" "}
              monthly payments.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Discover the latest smartphones with transparent EMIs, bank offers
              and no surprises at checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-dark" to="/shop">
                Explore smartphones <ArrowRight size={17} />
              </Link>
              <a className="btn btn-light" href="#how">
                How EMI works
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-5 rounded-[2.5rem] bg-mint/50" />
            <img
              className="relative mx-auto h-[360px] w-full rounded-[2rem] object-cover shadow-card md:h-[430px]"
              src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1100&q=85"
              alt="Smartphone collection"
            />
            <div className="absolute -bottom-3 left-3 rounded-2xl bg-white p-4 shadow-card">
              <p className="text-xs text-slate-500">Start from</p>
              <p className="font-bold">
                ₹2,499/mo{" "}
                <span className="text-xs font-medium text-emerald-600">
                  No cost EMI
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2 className="section-title">Popular right now</h2>
          </div>
          <Link
            className="hidden text-sm font-bold text-blue-700 sm:block"
            to="/shop"
          >
            View all products →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.length
            ? items.map((p) => <ProductCard key={p.id} product={p} />)
            : [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
        </div>
      </section>
      <section id="how" className="bg-slate-100 py-16">
        <div className="wrap">
          <p className="eyebrow">SIMPLE BY DESIGN</p>
          <h2 className="section-title">A better way to pay</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                Sparkles,
                "Choose your phone",
                "Compare the latest devices and configurations.",
              ],
              [
                BadgeIndianRupee,
                "Pick an EMI plan",
                "See monthly payments and all charges up front.",
              ],
              [
                ShieldCheck,
                "Checkout with confidence",
                "Complete a secure application in a few simple steps.",
              ],
            ].map(([Icon, t, d], i) => (
              <div key={t} className="rounded-2xl bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={20} />
                </span>
                <p className="mt-5 text-sm font-bold text-blue-700">0{i + 1}</p>
                <h3 className="mt-1 font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
