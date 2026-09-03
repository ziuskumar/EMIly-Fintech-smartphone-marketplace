import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false),
    [search, setSearch] = useState("");
  const nav = useNavigate();
  function submit(e) {
    e.preventDefault();
    nav(`/shop?search=${encodeURIComponent(search)}`);
    setOpen(false);
  }
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="wrap flex h-16 items-center gap-4">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-navy"
          >
            EMI<span className="text-blue-600">ly</span>
          </Link>
          <form onSubmit={submit} className="hidden max-w-xl flex-1 md:flex">
            <Search className="absolute mt-3 ml-3 h-4 w-4 text-slate-400" />
            <input
              className="input pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search iPhone, Galaxy, Pixel..."
            />
          </form>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold md:flex">
            <Link to="/shop">Shop</Link>
            <a href="#how">How it works</a>
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck size={16} /> Secure EMI
            </span>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="wrap border-t py-4 md:hidden">
            <form onSubmit={submit}>
              <input
                autoFocus
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phones"
              />
            </form>
            <div className="mt-3 flex gap-5 text-sm font-semibold">
              <Link onClick={() => setOpen(false)} to="/shop">
                Shop
              </Link>
              <a onClick={() => setOpen(false)} href="#how">
                How it works
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-slate-300">
      <div className="wrap grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="text-xl font-extrabold text-white">
            EMI<span className="text-mint">ly</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6">
            A smarter way to bring home the technology you love.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Shop with confidence</h4>
          <p className="mt-3 text-sm leading-7">
            Transparent pricing
            <br />
            Trusted finance partners
            <br />
            Secure checkout experience
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Need a hand?</h4>
          <p className="mt-3 text-sm leading-7">
            help@emily.shop
            <br />
            Mon–Sat, 9am–8pm
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © 2026 EMIly. Built for better buying decisions.
      </div>
    </footer>
  );
}
