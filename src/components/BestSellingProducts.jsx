"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Star,
  ShoppingBag,
  Check,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const bestSellers = [
  {
    id: 101,
    rank: "#1 Best Seller",
    name: "CA Plus 15000 Grade-1 English Willow Bat",
    slug: "ca-plus-15000-cricket-bat",
    category: "Cricket",
    price: 6800,
    oldPrice: 8200,
    rating: 4.9,
    soldCount: 1420,
    stockPercent: 85,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 102,
    rank: "#2 Best Seller",
    name: "Adidas Al Rihla Pro Seamless Match Ball",
    slug: "adidas-al-rihla-pro-ball",
    category: "Football",
    price: 2650,
    oldPrice: 3200,
    rating: 4.9,
    soldCount: 1180,
    stockPercent: 78,
    image:
      "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 103,
    rank: "#3 Best Seller",
    name: "Bangladesh T20 World Cup Official Player Jersey",
    slug: "bd-t20-official-player-jersey",
    category: "Jerseys",
    price: 1050,
    oldPrice: 1400,
    rating: 4.8,
    soldCount: 2350,
    stockPercent: 92,
    image:
      "https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 104,
    rank: "#4 Best Seller",
    name: "Yonex Astrox 99 Pro Badminton Racket",
    slug: "yonex-astrox-99-pro-racket",
    category: "Badminton",
    price: 3400,
    oldPrice: 4100,
    rating: 4.8,
    soldCount: 890,
    stockPercent: 70,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 105,
    rank: "#5 Best Seller",
    name: "Nike Mercurial Vapor 15 Pro Turf Boots",
    slug: "nike-mercurial-vapor-15-boots",
    category: "Sports Shoes",
    price: 3850,
    oldPrice: 4600,
    rating: 4.9,
    soldCount: 760,
    stockPercent: 80,
    image:
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 106,
    rank: "#6 Best Seller",
    name: "Adjustable Heavy-Duty Dumbbell Set (20 KG)",
    slug: "adjustable-dumbbell-set-20kg",
    category: "Gym & Fitness",
    price: 2900,
    oldPrice: 3500,
    rating: 4.7,
    soldCount: 640,
    stockPercent: 65,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
  },
];

export default function BestSellingProducts() {
  const [addedItems, setAddedItems] = useState([]);

  const handleQuickAdd = (id) => {
    if (!addedItems.includes(id)) {
      setAddedItems([...addedItems, id]);
      setTimeout(() => {
        setAddedItems((prev) => prev.filter((item) => item !== id));
      }, 1500);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900/60 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Most Loved by Athletes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Best Selling Products
            </h2>
          </div>

          <Link
            href="/products?sort=best-selling"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>Explore All Top Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Best Sellers Grid (2 Columns on Desktop for Detailed Horizontal Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bestSellers.map((product) => {
            const isAdded = addedItems.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 transition-all duration-300 shadow-lg hover:shadow-emerald-500/5"
              >
                {/* Left Image Container */}
                <div className="relative w-full sm:w-44 h-48 sm:h-44 shrink-0 rounded-xl bg-slate-900 overflow-hidden border border-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Rank Badge */}
                  <span className="absolute top-2.5 left-2.5 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                    {product.rank}
                  </span>
                </div>

                {/* Right Content */}
                <div className="flex-1 w-full flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-emerald-400 font-semibold">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-white">
                          {product.rating}
                        </span>
                        <span className="text-slate-500">
                          • {product.soldCount.toLocaleString()}+ Sold
                        </span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Popularity / Sold Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-rose-400 font-medium">
                          <Flame className="w-3.5 h-3.5 fill-rose-400" />
                          Selling Fast
                        </span>
                        <span>{product.stockPercent}% Claimed</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${product.stockPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-white">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          ৳{product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isAdded
                          ? "bg-teal-400 text-slate-950"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}