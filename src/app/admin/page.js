"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { allProducts as initialProducts } from "@/data/products";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Trash2,
  Edit,
  Save,
  X,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");

  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);

  // New Product Form State (sku initially empty to prevent SSR mismatch)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Cricket",
    price: "",
    oldPrice: "",
    stock: "",
    sku: "",
    badge: "New Arrival",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Client mount হওয়ার পর SKU জেনারেট করা
    setNewProduct((prev) => ({
      ...prev,
      sku: `KB-${Math.floor(100 + Math.random() * 900)}`,
    }));

    const savedOrders = JSON.parse(localStorage.getItem("khela_bazar_orders") || "[]");
    setOrders(savedOrders);

    const savedProducts = JSON.parse(localStorage.getItem("khela_bazar_admin_products") || "null");
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const handleDeleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("khela_bazar_admin_products", JSON.stringify(updated));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const createdProduct = {
      id: Date.now(),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newProduct.category,
      price: Number(newProduct.price),
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      stock: Number(newProduct.stock),
      sku: newProduct.sku || `KB-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 1,
      badge: newProduct.badge,
      sizes: ["Short Handle", "Standard", "S", "M", "L", "XL"],
      description: newProduct.description,
      highlights: ["Official tournament approved", "High durability guarantee"],
      images: [
        newProduct.image ||
          "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
      ],
      reviews: [],
    };

    const updatedList = [createdProduct, ...products];
    setProducts(updatedList);
    localStorage.setItem("khela_bazar_admin_products", JSON.stringify(updatedList));

    setNewProduct({
      name: "",
      category: "Cricket",
      price: "",
      oldPrice: "",
      stock: "",
      sku: `KB-${Math.floor(100 + Math.random() * 900)}`,
      badge: "New Arrival",
      description: "",
      image: "",
    });
    setActiveTab("products");
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((ord) => {
      if (ord.orderId === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });
    setOrders(updatedOrders);
    localStorage.setItem("khela_bazar_orders", JSON.stringify(updatedOrders));
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== "Cancelled" ? ord.grandTotal : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "Processing").length;
  const totalStockCount = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <section className="min-h-screen bg-slate-950 text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Khela-Bazar Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              Visit Storefront
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === "overview"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === "products"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === "orders"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add-product")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === "add-product"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  ৳{totalRevenue.toLocaleString()}
                </p>
                <span className="text-[11px] text-emerald-400 font-medium">Real-time store earnings</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalOrdersCount}</p>
                <span className="text-[11px] text-teal-400 font-medium">{pendingOrdersCount} orders pending</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Inventory</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{products.length} Items</p>
                <span className="text-[11px] text-amber-400 font-medium">{totalStockCount} units in stock</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Store Health</span>
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</p>
                <span className="text-[11px] text-sky-400 font-medium">All systems operational</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-extrabold text-white">Recent Customer Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  View All Orders →
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No orders received yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Payment</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.orderId}>
                          <td className="py-3.5 font-mono font-bold text-emerald-400">#{ord.orderId}</td>
                          <td className="py-3.5 text-white font-medium">{ord.customerName}</td>
                          <td className="py-3.5 text-slate-300">{ord.paymentMethod}</td>
                          <td className="py-3.5 font-bold text-white">৳{ord.grandTotal.toLocaleString()}</td>
                          <td className="py-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Inventory & Products Stock</h2>
                <p className="text-xs text-slate-400">Manage stock quantities and remove obsolete items.</p>
              </div>
              <button
                onClick={() => setActiveTab("add-product")}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4 font-semibold">Product</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Price</th>
                      <th className="p-4 font-semibold">Stock Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-950 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-white line-clamp-1">{item.name}</p>
                            <span className="text-[11px] font-mono text-slate-500">SKU: {item.sku}</span>
                          </div>
                        </td>
                        <td className="p-4 text-emerald-400 font-semibold">{item.category}</td>
                        <td className="p-4 font-extrabold text-white">৳{item.price.toLocaleString()}</td>
                        <td className="p-4">
                          {item.stock > 0 ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              In Stock ({item.stock})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(item.id)}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Customer Orders & Delivery Management</h2>
              <p className="text-xs text-slate-400">Update delivery progress from Processing to Shipped or Delivered.</p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-sm">
                No orders have been placed by customers yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-emerald-400 text-base">
                          #{ord.orderId}
                        </span>
                        <span className="text-xs text-slate-400">({ord.createdAt})</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300 space-y-0.5">
                        <p><strong className="text-white">Customer:</strong> {ord.customerName} ({ord.phone})</p>
                        <p><strong className="text-white">Address:</strong> {ord.address} ({ord.deliveryZone})</p>
                        <p><strong className="text-white">Payment:</strong> {ord.paymentMethod} - <span className="text-emerald-400 font-bold">৳{ord.grandTotal.toLocaleString()}</span></p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Update Status
                        </label>
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.orderId, e.target.value)}
                          className="bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-white focus:outline-none"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "add-product" && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Add New Product to Store</h2>
              <p className="text-xs text-slate-400">Fill in product details, price, and inventory stock.</p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Product Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SG Savage Edition Cricket Bat"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Jerseys">Jerseys</option>
                    <option value="Sports Shoes">Sports Shoes</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Gym & Fitness">Gym & Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Best Seller, Hot, -20%"
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Price (BDT) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="4500"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Old Price (Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="5800"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Stock Quantity <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Image URL (Unsplash or direct link)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Product Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed product specifications..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Publish Product</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
          Loading Admin Dashboard...
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}