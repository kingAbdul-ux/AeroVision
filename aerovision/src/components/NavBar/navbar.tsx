import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Plane, X } from "lucide-react";

const links = [
  ["Home", "/"], ["Dashboard", "/dashboard"], ["Flights", "/flights"],
  ["Airports", "/airports"], ["Live Map", "/map"], ["Weather", "/weather"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return <nav className="sticky top-0 z-2000 px-2 pt-2 sm:px-4">
    <div className="glass-surface mx-auto flex h-[60px] max-w-7xl items-center justify-between rounded-xl px-4 sm:px-6">
      <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label="AeroVision home">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white"><Plane size={19} /></span>
        <span><span className="block text-lg font-extrabold tracking-tight text-[#102a43]">AeroVision</span><span className="block text-[9px] font-bold tracking-[.14em] text-slate-500">AVIATION INTELLIGENCE</span></span>
      </Link>
      <div className="hidden h-full items-center gap-1 md:flex">{links.map(([name, path]) => <Link key={path} to={path} className={`rounded-md px-3 py-2 text-sm font-semibold transition ${pathname === path ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"}`}>{name}</Link>)}</div>
      <button type="button" className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <div id="mobile-navigation" className="glass-surface mx-2 mt-2 rounded-xl px-4 py-3 md:hidden sm:mx-4">{links.map(([name, path]) => <Link key={path} to={path} onClick={() => setOpen(false)} className={`block rounded-md px-3 py-3 text-sm font-semibold ${pathname === path ? "bg-sky-50 text-sky-700" : "text-slate-600"}`}>{name}</Link>)}</div>}
  </nav>;
}
