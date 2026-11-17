"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Copy, Check, ArrowRight, Sparkles, Clock } from "lucide-react";

export default function DiscountOffers() {
  const [copied, setCopied] = useState(false);

  // Static initial countdown state (Next.js 16 hydration safe)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("KHELA25");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Flash Sale Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl">
          
          {/* Background Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Offer Details & Promo Code */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Limited Time Mega Flash Sale</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Flat{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                  25% OFF
                </span>{" "}
                on All Jerseys & Cricket Gear!
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                Upgrade your match-day kit today. Apply the promo code at checkout to unlock instant savings on orders above ৳1,500.
              </p>

              {/* Promo Code Box + CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Copyable Coupon Box */}
                <div className="flex items-center justify-between gap-3 bg-slate-950/90 border border-dashed border-emerald-400/60 px-4 py-3 rounded-xl w-full sm:w-auto">
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                      Use Promo Code
                    </span>
                    <span className="text-base font-mono font-extrabold text-emerald-400 tracking-widest">
                      KHELA25
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Shop Deal Button */}
                <Link
                  href="/offers"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition"
                >
                  <span>Claim Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side: Live Countdown Timer */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Offer Ends In</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-slate-900 border border-slate-800 rounded-xl py-3.5 px-2"
                    >
                      <span className="block text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free delivery inside Dhaka on all flash deals</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom 2 Mini Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Mini Card 1 */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex items-center justify-between gap-4 transition">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Combo Deal
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                Buy 2 Jerseys, Get 15% Extra Off
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Mix and match any national or club edition jersey.
              </p>
              <Link
                href="/products/jerseys"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 mt-3"
              >
                <span>Shop Jerseys</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-2xl sm:text-3xl font-black text-emerald-400">
              15%
            </div>
          </div>

          {/* Mini Card 2 */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex items-center justify-between gap-4 transition">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Weekend Special
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                Up to ৳1,200 Off on Cricket Bats
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Selected English & Kashmir willow bats in stock.
              </p>
              <Link
                href="/products/cricket"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 mt-3"
              >
                <span>Shop Cricket</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-lg sm:text-xl font-black text-sky-400">
              ৳1200
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}