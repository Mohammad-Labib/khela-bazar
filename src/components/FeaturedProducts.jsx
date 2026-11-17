"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Heart, Eye, Check } from "lucide-react";

const productsData = [
  {
    id: 1,
    name: "Pro English Willow Cricket Bat",
    slug: "pro-english-willow-bat",
    category: "Cricket",
    price: 4500,
    oldPrice: 5800,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "FIFA Quality Pro Match Football",
    slug: "fifa-pro-match-football",
    category: "Football",
    price: 2200,
    oldPrice: 2800,
    rating: 4.8,
    reviews: 94,
    badge: "-21%",
    image:
      "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Bangladesh National Fan Edition Jersey",
    slug: "bangladesh-fan-jersey",
    category: "Jerseys",
    price: 850,
    oldPrice: 1200,
    rating: 4.9,
    reviews: 310,
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Carbon Fiber Badminton Racket",
    slug: "carbon-fiber-badminton-racket",
    category: "Cricket",
    price: 1950,
    oldPrice: 2500,
    rating: 4.7,
    reviews: 65,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Pro Grip Football Turf Boots",
    slug: "pro-grip-turf-boots",
    category: "Football",
    price: 3200,
    oldPrice: 4000,
    rating: 4.8,
    reviews: 82,
    badge: "-20%",
    image:
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Argentina Home Edition Player Jersey",
    slug: "argentina-home-player-jersey",
    category: "Jerseys",
    price: 1150,
    oldPrice: 1500,
    rating: 4.9,
    reviews: 245,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Leather Season Cricket Ball (Red)",
    slug: "leather-season-cricket-ball",
    category: "Cricket",
    price: 650,
    oldPrice: 800,
    rating: 4.6,
    reviews: 51,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Padded Goalkeeper Match Gloves",
    slug: "padded-goalkeeper-gloves",
    category: "Football",
    price: 1450,
    oldPrice: 1850,
    rating: 4.7,
    reviews: 44,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1518605368461-1ee7e33f67f3?auto=format&fit=crop&w=600&q=80",
  },
];

const filterTabs = ["All", "Cricket", "Football", "Jerseys"];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");
  const [addedIds, setAddedIds] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts =
    activeTab === "All"
      ? productsData
      : productsData.filter((item) => item.category === activeTab);

  const handleAddToCart = (id) => {
    if (!addedIds.includes(id)) {
      setAddedIds([...addedIds, id]);
      setTimeout(() => {
        setAddedIds((prev) => prev.filter((item) => item !== id));
      }, 1500);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Top Picks For You
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
              Featured Products
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedIds.includes(product.id);
            const isLiked = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                {/* Product Image Box */}
                <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Left Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                      {product.badge}
                    </span>
                  )}

                  {/* Top Right Action Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to Wishlist"
                      className={`p-2 rounded-full backdrop-blur-md transition ${
                        isLiked
                          ? "bg-rose-500 text-white"
                          : "bg-slate-950/70 text-slate-300 hover:text-rose-400"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`}
                      />
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      aria-label="Quick View"
                      className="p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-emerald-400 backdrop-blur-md transition"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="text-emerald-400 font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-slate-200 font-semibold">
                          {product.rating}
                        </span>
                        <span>({product.reviews})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg font-extrabold text-white">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.oldPrice && (
                        <span className="block text-xs text-slate-500 line-through">
                          ৳{product.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-emerald-500/50 font-semibold text-sm px-8 py-3.5 rounded-xl transition"
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  );
}