"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Trophy,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Cricket", href: "/products?category=Cricket" },
  { name: "Football", href: "/products?category=Football" },
  { name: "Jerseys", href: "/products?category=Jerseys" },
  { name: "All Products", href: "/products" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 group-hover:bg-emerald-400 transition">
              <Trophy className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Khela<span className="text-emerald-400">-Bazar</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-emerald-400 font-semibold"
                      : "text-slate-300 hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-slate-900 border border-slate-800 focus-within:border-emerald-500 rounded-full px-3.5 py-1.5 w-64 transition"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bat, jersey, ball..."
              className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Link with Live Total Items Badge */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-full transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-slate-950 text-[11px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hydration-Safe Auth UI */}
            {!mounted ? (
              <div className="hidden sm:block w-24 h-9 bg-slate-900 border border-slate-800 rounded-xl" />
            ) : user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-semibold text-sm px-3.5 py-2 rounded-xl transition capitalize"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name?.split(" ")[0] || "Profile"}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-4 py-2 rounded-xl transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition"
              aria-label="Toggle Menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sports gear..."
              className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </form>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {mounted && user ? (
            <div className="flex gap-2">
              <Link
                href="/profile"
                onClick={() => setIsMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-emerald-400 font-semibold py-2.5 rounded-xl transition"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  logout();
                }}
                className="flex items-center justify-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 font-semibold px-4 py-2.5 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-xl transition"
            >
              <User className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}