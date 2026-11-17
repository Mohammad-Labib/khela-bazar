"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  Check,
  PackageCheck,
  PackageX,
} from "lucide-react";

const categories = [
  "All",
  "Cricket",
  "Football",
  "Jerseys",
  "Sports Shoes",
  "Badminton",
  "Gym & Fitness",
];

function AllProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else if (!urlCategory) {
      setSelectedCategory("All");
    }
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [urlCategory, urlSearch]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((item) => {
        const matchesCat =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !inStockOnly || item.stock > 0;
        return matchesCat && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleQuickAdd = (product) => {
    addToCart(product, 1);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== product.id));
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Khela-Bazar Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            {selectedCategory === "All"
              ? "All Sports Gear & Apparel"
              : `${selectedCategory} Collection`}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or sport..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm text-white focus:outline-none"
                >
                  <option value="default" className="bg-slate-900">Sort: Featured</option>
                  <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                  <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                  <option value="rating" className="bg-slate-900">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <p className="text-lg font-bold text-white">No products matched your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setInStockOnly(false);
              }}
              className="mt-4 bg-emerald-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedIds.includes(product.id);
              const outOfStock = product.stock === 0;

              return (
                <div
                  key={product.id}
                  className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative h-56 w-full bg-slate-950 overflow-hidden block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        outOfStock ? "opacity-50 grayscale" : ""
                      }`}
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        {product.badge}
                      </span>
                    )}
                    {outOfStock && (
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-rose-400 font-extrabold text-sm uppercase tracking-wider">
                        Out of Stock
                      </span>
                    )}
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-emerald-400 font-semibold">{product.category}</span>
                        <div className="flex items-center gap-1 text-slate-300">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">{product.rating}</span>
                          <span className="text-slate-500">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <Link href={`/products/${product.slug}`}>
                        <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {product.name}
                        </h2>
                      </Link>

                      <div className="mt-2.5">
                        {product.stock > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                            <PackageCheck className="w-3.5 h-3.5" />
                            In Stock ({product.stock} left)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                            <PackageX className="w-3.5 h-3.5" />
                            Currently Unavailable
                          </span>
                        )}
                      </div>
                    </div>

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
                        disabled={outOfStock}
                        onClick={() => handleQuickAdd(product)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          outOfStock
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                            : isAdded
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
        )}
      </div>
    </section>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
          Loading products...
        </div>
      }
    >
      <AllProductsContent />
    </Suspense>
  );
}