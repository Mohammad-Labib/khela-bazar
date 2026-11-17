"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

let cachedRawCart = null;
let cachedParsedCart = [];
const EMPTY_CART = [];

function subscribeToCart(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("khela-cart-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("khela-cart-change", callback);
  };
}

function getClientCartSnapshot() {
  const raw = localStorage.getItem("khela_bazar_cart");
  if (raw !== cachedRawCart) {
    cachedRawCart = raw;
    cachedParsedCart = raw ? JSON.parse(raw) : EMPTY_CART;
  }
  return cachedParsedCart;
}

function getServerCartSnapshot() {
  return EMPTY_CART;
}

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getClientCartSnapshot,
    getServerCartSnapshot
  );

  const [deliveryZone, setDeliveryZone] = useState("inside"); // 'inside' (Dhaka 60) | 'outside' (120)
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, percent, label }

  const saveCart = (updatedCart) => {
    localStorage.setItem("khela_bazar_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("khela-cart-change"));
  };

  // 1. Add to Cart 
  const addToCart = (product, quantity = 1, selectedSize = "") => {
    const size = selectedSize || product.sizes?.[0] || "Standard";
    const cartKey = `${product.id}-${size}`;
    const existingIndex = cart.findIndex((item) => item.cartKey === cartKey);

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      const maxStock = product.stock || 99;
      const currentQty = updatedCart[existingIndex].quantity;

      if (currentQty >= maxStock) {
        toast.error(`Maximum available stock (${maxStock}) reached!`);
        return;
      }

      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: Math.min(maxStock, currentQty + quantity),
      };
      toast.success(`Updated quantity for ${product.name}`);
    } else {
      updatedCart = [
        ...cart,
        {
          cartKey,
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: product.price,
          image: product.images?.[0] || product.image,
          stock: product.stock || 20,
          size,
          quantity,
        },
      ];
      toast.success(`${product.name} added to cart!`);
    }
    saveCart(updatedCart);
  };

  // ২. Remove from Cart
  const removeFromCart = (cartKey) => {
    const target = cart.find((item) => item.cartKey === cartKey);
    const updatedCart = cart.filter((item) => item.cartKey !== cartKey);
    saveCart(updatedCart);
    if (updatedCart.length === 0) setAppliedCoupon(null);
    if (target) {
      toast.error(`${target.name} removed from cart`);
    }
  };

  // ৩. Increase Quantity
  const increaseQty = (cartKey) => {
    const target = cart.find((item) => item.cartKey === cartKey);
    if (!target) return;

    if (target.quantity >= target.stock) {
      toast.error(`Only ${target.stock} units available in stock!`);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.cartKey === cartKey
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCart(updatedCart);
  };

  // 4. Decrease Quantity
  const decreaseQty = (cartKey) => {
    const target = cart.find((item) => item.cartKey === cartKey);
    if (!target) return;
    if (target.quantity <= 1) {
      removeFromCart(cartKey);
    } else {
      const updatedCart = cart.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: item.quantity - 1 } : item
      );
      saveCart(updatedCart);
    }
  };

  const clearCart = (silent = false) => {
    localStorage.removeItem("khela_bazar_cart");
    window.dispatchEvent(new Event("khela-cart-change"));
    setAppliedCoupon(null);
    if (!silent) {
      toast("Cart cleared", { icon: "🗑️" });
    }
  };

  // ৬. Price & Delivery Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ৫. Apply Coupon Code
  const applyCouponCode = (codeInput) => {
    const cleanCode = codeInput.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please enter a coupon code.");
      return { success: false, message: "Please enter a coupon code." };
    }

    if (cleanCode === "KHELA25") {
      if (subtotal < 1500) {
        const msg = "KHELA25 requires a minimum order of ৳1,500.";
        toast.error(msg);
        return { success: false, message: msg };
      }
      setAppliedCoupon({ code: "KHELA25", percent: 25, label: "25% Flash Sale Off" });
      const msg = "Coupon KHELA25 applied! (25% OFF)";
      toast.success(msg);
      return { success: true, message: msg };
    }

    if (cleanCode === "WELCOME10") {
      setAppliedCoupon({ code: "WELCOME10", percent: 10, label: "10% Welcome Discount" });
      const msg = "Coupon WELCOME10 applied! (10% OFF)";
      toast.success(msg);
      return { success: true, message: msg };
    }

    toast.error("Invalid or expired coupon code!");
    return { success: false, message: "Invalid or expired coupon code!" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast("Coupon removed", { icon: "🏷️" });
  };

  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.percent) / 100)
    : 0;

  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 3000
      ? 0 // ৳৩,০০০+ অর্ডারে ফ্রি ডেলিভারি
      : deliveryZone === "inside"
      ? 60
      : 120;

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
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
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);