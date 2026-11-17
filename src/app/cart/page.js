"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    totalItems,
    subtotal,
    discountAmount,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    grandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState({ type: "", text: "" });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyCouponCode(couponInput);
    setCouponStatus({
      type: res.success ? "success" : "error",
      text: res.message,
    });
    if (res.success) setCouponInput("");
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-[75vh] bg-slate-950 text-white flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Your Cart is Empty</h1>
        <p className="text-sm text-slate-400 max-w-md mt-2">
          Looks like you haven&apos;t added any cricket bats, jerseys, or fitness gear yet.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl transition"
        >
          <span>Browse Sports Gear</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Khela-Bazar Bag
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Shopping Cart ({totalItems} {totalItems === 1 ? "Item" : "Items"})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2 rounded-xl transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartKey}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Image + Title */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-emerald-400">
                      {item.category}
                    </span>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400">
                      Variant: <span className="text-slate-200 font-medium">{item.size}</span>
                    </p>
                    <p className="text-sm font-extrabold text-emerald-400 pt-0.5">
                      ৳{item.price.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-slate-500">each</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls + Line Subtotal + Remove */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => decreaseQty(item.cartKey)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs sm:text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.cartKey)}
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      title="Remove item"
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-base font-extrabold text-white">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Right Column: Coupon, Delivery Charge & Price Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Coupon Code Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <Tag className="w-4 h-4 text-emerald-400" />
                <span>Apply Coupon Code</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {appliedCoupon.code} ({appliedCoupon.label})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      setCouponStatus({ type: "", text: "" });
                    }}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try KHELA25 or WELCOME10"
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white uppercase placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponStatus.text && !appliedCoupon && (
                <p
                  className={`text-xs mt-2 ${
                    couponStatus.type === "error" ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {couponStatus.text}
                </p>
              )}
            </div>

            {/* Delivery Zone Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Delivery Location</span>
                </div>
                {subtotal >= 3000 && (
                  <span className="text-[11px] font-bold bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded-full">
                    Free Shipping Unlocked!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryZone("inside")}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryZone === "inside"
                      ? "bg-emerald-500/10 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="block font-bold">Inside Dhaka</span>
                  <span className="text-emerald-400 font-semibold">
                    {subtotal >= 3000 ? "FREE" : "৳60"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone("outside")}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryZone === "outside"
                      ? "bg-emerald-500/10 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="block font-bold">Outside Dhaka</span>
                  <span className="text-emerald-400 font-semibold">
                    {subtotal >= 3000 ? "FREE" : "৳120"}
                  </span>
                </button>
              </div>
            </div>

            {/* Order Summary Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3.5">
              <h2 className="text-base font-extrabold text-white pb-2 border-b border-slate-800">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm text-slate-300">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-white">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-emerald-400">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span className="font-semibold">
                    - ৳{discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm text-slate-300">
                <span>Delivery Charge</span>
                <span className="font-semibold text-white">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    `৳${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-base font-bold text-white">Total Payable</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}