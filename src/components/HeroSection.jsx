import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Truck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* Background Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content (Text & CTA) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Season Sale: Up to 35% Off on Pro Gear!</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Gear Up Like a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Champion
              </span>{" "}
              at Khela-Bazar
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover authentic cricket bats, FIFA-grade footballs, official
              team jerseys, and fitness accessories—delivered fast right to your
              doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/offers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-all"
              >
                <span>Explore Flash Deals</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>24h Fast Delivery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content (Featured Gear Card / Visual Showcase) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Card Frame */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 rounded-3xl p-6 shadow-2xl">
                {/* Product Image Container */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-slate-950/70 flex items-center justify-center overflow-hidden border border-slate-800">
                  {/* Replace this img src with your local image in /public/images/ */}
                  <img
                    src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
                    alt="Pro English Willow Cricket Bat"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount Floating Badge */}
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                    -25% OFF
                  </span>
                </div>

                {/* Featured Product Info */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      Featured Deal
                    </p>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Pro Edition Cricket Kit
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-extrabold text-emerald-400">
                        ৳4,500
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        ৳6,000
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/products/cricket"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}