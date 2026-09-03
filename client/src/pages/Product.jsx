import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronLeft, ShieldCheck, Star, X } from "lucide-react";
import { assetUrl, getProduct } from "../lib/api";
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export default function Product() {
  const { slug } = useParams(),
    [product, setProduct] = useState(),
    [err, setErr] = useState(""),
    [variantId, setVariantId] = useState(),
    [planId, setPlanId] = useState(),
    [modal, setModal] = useState(false),
    [downPayment, setDownPayment] = useState(0);
  useEffect(() => {
    setProduct();
    getProduct(slug)
      .then((p) => {
        setProduct(p);
        setVariantId(p.variants[0].id);
      })
      .catch((e) => setErr(e.message));
  }, [slug]);
  const v = useMemo(
    () => product?.variants.find((x) => x.id === variantId),
    [product, variantId],
  );
  useEffect(() => {
    if (v) {
      setPlanId(v.emiPlans.find((p) => p.popular)?.id || v.emiPlans[0]?.id);
      setDownPayment(0);
    }
  }, [v]);
  const plan = v?.emiPlans.find((x) => x.id === planId);
  if (err)
    return (
      <main className="wrap state py-24">
        <b>{err}</b>
        <Link className="btn btn-dark mt-4" to="/shop">
          Back to shop
        </Link>
      </main>
    );
  if (!product || !v || !plan)
    return (
      <main className="wrap grid gap-10 py-12 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-96 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </main>
    );
  const discount = Math.round((1 - v.sellingPrice / v.mrp) * 100);
  const principal = Math.max(0, v.sellingPrice - Math.min(downPayment, v.sellingPrice));
  const monthlyRate = plan.interestRate / 1200;
  const calculatedEmi = monthlyRate ? Math.round(principal * monthlyRate * Math.pow(1 + monthlyRate, plan.tenure) / (Math.pow(1 + monthlyRate, plan.tenure) - 1)) : Math.ceil(principal / plan.tenure);
  return (
    <main className="wrap py-7">
      <Link
        to="/shop"
        className="flex items-center gap-1 text-sm font-semibold text-slate-500"
      >
        <ChevronLeft size={16} /> All smartphones
      </Link>
      <div className="mt-6 grid gap-9 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-3xl bg-slate-50 p-8 md:p-12">
          <img
            className="h-[370px] w-full object-contain"
            src={assetUrl(v.image)}
            alt={product.name}
          />
        </div>
        <div>
          <p className="text-sm font-bold text-blue-700">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-navy">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 font-bold text-emerald-700">
              <Star size={14} fill="currentColor" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-slate-500">
              {product.reviewCount.toLocaleString()} ratings
            </span>
          </div>
          <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <b className="text-3xl">{money(v.sellingPrice)}</b>
            <del className="mb-1 text-slate-400">{money(v.mrp)}</del>
            <span className="mb-1 text-sm font-bold text-emerald-600">
              Save {discount}%
            </span>
          </div>
          <div className="mt-7 border-t pt-6">
            <label className="text-sm font-bold">Choose configuration</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((x) => (
                <button
                  key={x.id}
                  onClick={() => setVariantId(x.id)}
                  className={`variant ${x.id === v.id ? "variant-active" : ""}`}
                >
                  <i style={{ background: x.colorHex }} /> {x.storage} ·{" "}
                  {x.color}
                </button>
              ))}
            </div>
          </div>
          <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-700" size={19} />
              <h2 className="font-bold">Select your EMI plan</h2>
            </div>
            <div className="mt-4 grid gap-2">
              {v.emiPlans.map((p) => (
                <button
                  onClick={() => setPlanId(p.id)}
                  key={p.id}
                  className={`plan ${p.id === planId ? "plan-active" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <i
                      className={`radio ${p.id === planId ? "checked" : ""}`}
                    />
                    <span className="text-left">
                      <b>{p.provider}</b>
                      <small>
                        {p.tenure} months · {p.interestRate}% p.a.
                      </small>
                    </span>
                  </span>
                  <span className="text-right">
                    <b>{money(p.monthlyEmi)}/mo</b>
                    <small className="text-emerald-600">
                      {p.cashback
                        ? `${money(p.cashback)} cashback`
                        : "No cost EMI"}
                    </small>
                  </span>
                  {p.popular && <em>Most chosen</em>}
                </button>
              ))}
            </div>
          </section>
          <div className="mt-5 rounded-xl bg-slate-100 p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <label className="text-slate-500">EMI calculator: down payment</label>
              <input aria-label="Down payment" className="w-28 rounded border border-slate-300 bg-white px-2 py-1 text-right" type="number" min="0" max={v.sellingPrice} value={downPayment || ""} placeholder="0" onChange={(e) => setDownPayment(Number(e.target.value) || 0)} />
            </div>
            <div className="mt-3 flex justify-between">
              <span className="text-slate-500">Estimated monthly EMI</span>
              <b>
                {money(calculatedEmi)} × {plan.tenure} months
              </b>
            </div>
            <div className="mt-2 flex justify-between text-slate-500">
              <span>Processing fee</span>
              <span>
                {plan.processingFee ? money(plan.processingFee) : "₹0"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setModal(true)}
            className="btn btn-dark mt-5 w-full"
          >
            Proceed with EMI
          </button>
        </div>
      </div>
      {modal && (
        <Confirmation
          product={product}
          v={v}
          plan={plan}
          close={() => setModal(false)}
        />
      )}
    </main>
  );
}
function Confirmation({ product, v, plan, close }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <button onClick={close} className="float-right">
          <X size={19} />
        </button>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold">EMI plan selected</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You’re choosing {product.name} ({v.storage}, {v.color}) on{" "}
          {plan.provider}.
        </p>
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <div className="flex justify-between">
            <span>Monthly payment</span>
            <b>{money(plan.monthlyEmi)}</b>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            for {plan.tenure} months · {plan.interestRate}% interest
          </p>
        </div>
        <button onClick={close} className="btn btn-dark mt-6 w-full">
          Continue to secure checkout
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Final approval is subject to lender eligibility.
        </p>
      </div>
    </div>
  );
}
