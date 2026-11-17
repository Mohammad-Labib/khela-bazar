"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Banknote,
  Smartphone,
} from "lucide-react";

const paymentMethods = [
  {
    id: "COD",
    name: "Cash on Delivery",
    subtitle: "Pay with cash when your gear arrives",
    icon: Banknote,
  },
  {
    id: "bKash",
    name: "bKash Payment",
    subtitle: "Instant mobile banking payment",
    icon: Smartphone,
  },
  {
    id: "Nagad",
    name: "Nagad Payment",
    subtitle: "Fast digital payment via Nagad",
    icon: Smartphone,
  },
  {
    id: "Card",
    name: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, DBBL Nexus",
    icon: CreditCard,
  },
];

export default function CheckoutPage() {
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
    clearCart,
  } = useCart();

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    orderNote: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [trxInfo, setTrxInfo] = useState({ senderNumber: "", trxId: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // লগইন করা ইউজারের তথ্য ফর্মে অটো-ফিল করা
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user.name || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
        address: prev.address || user.address || "",
      }));
    }
  }, [user]);

  // ১. অর্ডার প্লেস হওয়ার পর Confirmation Screen
  if (placedOrder) {
    return (
      <section className="min-h-[80vh] bg-slate-950 text-white flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-5">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Thank You, {placedOrder.customerName}!
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Your order has been received and is now being prepared for dispatch.
          </p>

          {/* Order Receipt Box */}
          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID:</span>
              <span className="font-mono font-bold text-emerald-400">
                #{placedOrder.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Method:</span>
              <span className="font-semibold text-white">
                {placedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery To:</span>
              <span className="font-semibold text-white text-right max-w-[60%]">
                {placedOrder.address}
              </span>
            </div>
            <div className="pt-2.5 border-t border-slate-800 flex justify-between text-base">
              <span className="font-bold text-white">Total Paid / Payable:</span>
              <span className="font-extrabold text-emerald-400">
                ৳{placedOrder.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition"
            >
              <span>Track My Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ২. কার্ট খালি থাকলে চেকআউট ব্লক করা
  if (cart.length === 0) {
    return (
      <section className="min-h-[75vh] bg-slate-950 text-white flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold">No Items to Checkout</h1>
        <p className="text-sm text-slate-400 mt-1">
          Please add some sports gear to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="mt-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition"
        >
          Explore Products
        </Link>
      </section>
    );
  }

  // ৩. Place Order সাবমিট হ্যান্ডলার
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      return setError("Please fill in your Name, Phone Number, and Full Delivery Address.");
    }

    if ((paymentMethod === "bKash" || paymentMethod === "Nagad") && (!trxInfo.senderNumber.trim() || !trxInfo.trxId.trim())) {
      return setError(`Please enter your ${paymentMethod} number and Transaction ID.`);
    }

    setIsSubmitting(true);

    const newOrder = {
      orderId: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      deliveryZone: deliveryZone === "inside" ? "Inside Dhaka" : "Outside Dhaka",
      orderNote: formData.orderNote,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending (COD)" : "Paid",
      transactionId: trxInfo.trxId || null,
      items: cart,
      subtotal,
      discountAmount,
      couponCode: appliedCoupon?.code || null,
      deliveryCharge,
      grandTotal,
      status: "Processing",
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Order History-তে সেভ করা (My Orders ও Admin Panel-এর জন্য)
    const existingOrders = JSON.parse(localStorage.getItem("khela_bazar_orders") || "[]");
    localStorage.setItem("khela_bazar_orders", JSON.stringify([newOrder, ...existingOrders]));

    setPlacedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Checkout & Delivery Details
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete your shipping information and choose a payment method.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer Info & Payment Method (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer & Delivery Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-extrabold text-white pb-2 border-b border-slate-800">
                1. Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Customer Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="017XX-XXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Zone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Delivery Area
                </label>
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
                    <span className="block font-bold">Inside Dhaka City</span>
                    <span className="text-emerald-400">
                      Delivery: {subtotal >= 3000 ? "FREE" : "৳60"}
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
                    <span className="text-emerald-400">
                      Delivery: {subtotal >= 3000 ? "FREE" : "৳120"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Full Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Delivery Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    required
                    placeholder="House No, Road No, Area, Thana, District..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Order Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Call before arriving or deliver after 5 PM"
                  value={formData.orderNote}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNote: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Select Payment Method */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-extrabold text-white pb-2 border-b border-slate-800">
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          isSelected
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-slate-900 text-slate-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{method.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{method.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Banking Extra Inputs (bKash / Nagad) */}
              {(paymentMethod === "bKash" || paymentMethod === "Nagad") && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                  <p className="text-xs text-slate-300">
                    Send <span className="font-bold text-emerald-400">৳{grandTotal.toLocaleString()}</span> to our Merchant {paymentMethod} Number:{" "}
                    <span className="font-mono font-bold text-white">01700-112233</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder={`Your ${paymentMethod} Number`}
                      value={trxInfo.senderNumber}
                      onChange={(e) =>
                        setTrxInfo({ ...trxInfo, senderNumber: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Transaction ID (TrxID)"
                      value={trxInfo.trxId}
                      onChange={(e) =>
                        setTrxInfo({ ...trxInfo, trxId: e.target.value })
                      }
                      className="bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white uppercase focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 sticky top-24 space-y-5">
              <h2 className="text-lg font-extrabold text-white pb-2 border-b border-slate-800">
                Order Summary ({totalItems} {totalItems === 1 ? "Item" : "Items"})
              </h2>

              {/* Cart Items Preview */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex items-center justify-between gap-3 bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold">
                      - ৳{discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
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
                  <span className="text-base font-bold text-white">Grand Total</span>
                  <span className="text-2xl font-extrabold text-emerald-400">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? "Placing Order..."
                    : `Place Order (৳${grandTotal.toLocaleString()})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Safe & Fast Nationwide Delivery Guaranteed</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}