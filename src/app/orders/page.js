"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  User,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // LocalStorage থেকে প্লেস করা অর্ডারগুলো লোড করা
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("khela_bazar_orders") || "[]");
    setOrders(savedOrders);
    if (savedOrders.length > 0) {
      setSelectedOrder(savedOrders[0]);
    }
  }, []);

  // অর্ডার স্ট্যাটাস কালার ও আইকন হেল্পার
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          icon: CheckCircle2,
          text: "Delivered",
        };
      case "Shipped":
        return {
          bg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
          icon: Truck,
          text: "On the Way (Shipped)",
        };
      case "Cancelled":
        return {
          bg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          icon: XCircle,
          text: "Cancelled",
        };
      default:
        return {
          bg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          icon: Clock,
          text: "Processing",
        };
    }
  };

  // অর্ডার স্ট্যাটাস আপডেট বা ক্যান্সেল করার ফাংশন
  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) => {
      if (ord.orderId === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem("khela_bazar_orders", JSON.stringify(updated));
    const currentSelected = updated.find((o) => o.orderId === orderId);
    if (currentSelected) setSelectedOrder(currentSelected);
  };

  // ফিল্টার করা অর্ডার লিস্ট
  const filteredOrders = orders.filter(
    (ord) =>
      ord.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery)
  );

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Customer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              My Orders & Live Tracking
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your sports gear delivery status and view order history.
            </p>
          </div>

          {/* Search Order ID */}
          {orders.length > 0 && (
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Orders Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl max-w-xl mx-auto p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">No Orders Placed Yet</h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              You haven't placed any orders on Khela-Bazar yet. Explore our catalog and grab your favorite sports gear!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Orders List (5 cols) */}
            <div className="lg:col-span-5 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {filteredOrders.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-sm">
                  No orders match your search query.
                </div>
              ) : (
                filteredOrders.map((ord) => {
                  const badge = getStatusBadge(ord.status);
                  const StatusIcon = badge.icon;
                  const isSelected = selectedOrder?.orderId === ord.orderId;

                  return (
                    <div
                      key={ord.orderId}
                      onClick={() => setSelectedOrder(ord)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-emerald-400">
                          #{ord.orderId}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{ord.status}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{ord.createdAt}</span>
                        <span className="font-extrabold text-white text-sm">
                          ৳{ord.grandTotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                        <span className="truncate max-w-[70%]">
                          {ord.items.length} {ord.items.length === 1 ? "item" : "items"} ({ord.paymentMethod})
                        </span>
                        <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Selected Order Detail & Live Tracking (7 cols) */}
            <div className="lg:col-span-7">
              {selectedOrder ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 sticky top-24">
                  
                  {/* Order Heading & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-extrabold text-white">
                          Order #{selectedOrder.orderId}
                        </h2>
                        <span className="text-xs text-slate-400">({selectedOrder.createdAt})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Payment via <span className="text-white font-semibold">{selectedOrder.paymentMethod}</span> ({selectedOrder.paymentStatus})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                        <button
                          onClick={() => handleUpdateStatus(selectedOrder.orderId, "Cancelled")}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition"
                        >
                          Cancel Order
                        </button>
                      )}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          getStatusBadge(selectedOrder.status).bg
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Live Progress Bar Tracker */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Live Delivery Progress
                    </h3>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div
                        className={`p-3 rounded-2xl border transition ${
                          ["Processing", "Shipped", "Delivered"].includes(selectedOrder.status)
                            ? "bg-emerald-500/10 border-emerald-500 text-white font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-500"
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                        <span>1. Processing</span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl border transition ${
                          ["Shipped", "Delivered"].includes(selectedOrder.status)
                            ? "bg-teal-500/10 border-teal-500 text-white font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-500"
                        }`}
                      >
                        <Truck className="w-4 h-4 mx-auto mb-1 text-teal-400" />
                        <span>2. Shipped</span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl border transition ${
                          selectedOrder.status === "Delivered"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-500"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                        <span>3. Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer & Shipping Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <div className="space-y-1.5">
                      <p className="font-bold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-400" /> {selectedOrder.customerName}
                      </p>
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {selectedOrder.phone}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-bold text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Area: {selectedOrder.deliveryZone}
                      </p>
                      <p className="text-slate-400 truncate">
                        <span className="font-semibold text-slate-300">Address:</span> {selectedOrder.address}
                      </p>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                      Ordered Products ({selectedOrder.items.length})
                    </h3>
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 p-3 rounded-xl"
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
                                Size: {item.size} | Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-emerald-400 shrink-0">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bill Summary */}
                  <div className="pt-4 border-t border-slate-800 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">৳{selectedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    {selectedOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({selectedOrder.couponCode})</span>
                        <span>- ৳{selectedOrder.discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery Charge</span>
                      <span className="text-white font-semibold">
                        {selectedOrder.deliveryCharge === 0 ? "FREE" : `৳${selectedOrder.deliveryCharge}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-extrabold">
                      <span className="text-white">Total Amount</span>
                      <span className="text-emerald-400">৳{selectedOrder.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-sm">
                  Select an order from the list on the left to view detailed tracking and items.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}