import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Khela-Bazar | Sports & Gear Store",
  description: "Your ultimate sports marketplace in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2500,
                style: {
                  background: "#0f172a",
                  color: "#f8fafc",
                  border: "1px solid #1e293b",
                  borderRadius: "14px",
                  fontSize: "13px",
                  fontWeight: "600",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#020617",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#f43f5e",
                    secondary: "#020617",
                  },
                },
              }}
            />
            <Suspense fallback={<div className="h-16 bg-slate-950 border-b border-slate-800" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}