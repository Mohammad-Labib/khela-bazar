"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  PackageCheck,
  PackageX,
  Minus,
  Plus,
  ChevronRight,
  Send,
} from "lucide-react";

function ProductDetailsContent({ slug }) {
  const product = allProducts.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Customer Reviews State
  const [customReviews, setCustomReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    user: "",
    rating: 5,
    comment: "",
  });

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 text-white px-4">
        <h1 className="text-2xl font-extrabold">Product Not Found</h1>
        <p className="text-sm text-slate-400 mt-1">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/products"
          className="mt-5 bg-emerald-500 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl"
        >
          Back to All Products
        </Link>
      </div>
    );
  }

  const activeSize = selectedSize || product.sizes?.[0] || "";
  const allReviews = [...customReviews, ...(product.reviews || [])];

  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) return;

    const newReview = {
      id: Date.now(),
      user: reviewForm.user,
      rating: Number(reviewForm.rating),
      date: "Just now",
      comment: reviewForm.comment,
    };

    setCustomReviews([newReview, ...customReviews]);
    setReviewForm({ user: "", rating: 5, comment: "" });
  };

  return (
    <section className="bg-slate-950 text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-emerald-400">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Top Main Grid: Images (Left) + Product Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* 1. Product Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-80 sm:h-[440px] w-full rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? "border-emerald-400 scale-105"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Product Details, Price, Availability & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-slate-500 font-mono">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-400">({allReviews.length} Reviews)</span>
                </div>

                <span className="text-slate-700">|</span>

                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <PackageCheck className="w-4 h-4" />
                    In Stock ({product.stock} units available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-400 font-semibold">
                    <PackageX className="w-4 h-4" />
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-400">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-slate-500 line-through">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Description
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.highlights && (
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {product.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Select Variant / Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                          activeSize === size
                            ? "bg-emerald-500 text-slate-950 border-emerald-500"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="inline-flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 sm:w-36">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock || 1, q + 1))
                    }
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition ${
                    product.stock === 0
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : addedToCart
                      ? "bg-teal-400 text-slate-950"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24-48h Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Product Ratings & Reviews Section */}
        <div className="py-14 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit">
            <h2 className="text-xl font-extrabold text-white mb-1">
              Write a Customer Review
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Share your experience with this gear to help fellow players.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={reviewForm.user}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, user: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Rating
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, rating: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value={5}>★★★★★ (5 - Excellent)</option>
                  <option value={4}>★★★★☆ (4 - Very Good)</option>
                  <option value={3}>★★★☆☆ (3 - Average)</option>
                  <option value={2}>★★☆☆☆ (2 - Fair)</option>
                  <option value={1}>★☆☆☆☆ (1 - Poor)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Review Comment
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the quality, grip, or fit?"
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-extrabold text-white">
              Customer Ratings & Reviews ({allReviews.length})
            </h2>

            {allReviews.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-sm text-slate-400">
                No reviews yet for this product. Be the first to review!
              </div>
            ) : (
              allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{rev.user}</span>
                    <span className="text-xs text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-14">
            <h2 className="text-2xl font-extrabold text-white mb-6">
              Related Products in {product.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition"
                >
                  <div className="h-48 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="text-emerald-400 font-semibold">{rel.category}</span>
                      <span className="flex items-center gap-1 text-white font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {rel.rating}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-base font-extrabold text-emerald-400 mt-2">
                      ৳{rel.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function ProductDetailsWrapper() {
  const params = useParams();
  return <ProductDetailsContent key={params?.slug} slug={params?.slug} />;
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-slate-400">
          Loading product details...
        </div>
      }
    >
      <ProductDetailsWrapper />
    </Suspense>
  );
}