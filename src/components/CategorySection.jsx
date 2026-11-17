import React from "react";
import Link from "next/link";
import {
  Trophy,
  Shirt,
  Dumbbell,
  Footprints,
  Medal,
  Swords,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Cricket",
    items: "120+ Products",
    href: "/products/cricket",
    icon: Trophy,
    accent: "group-hover:bg-emerald-500 group-hover:text-slate-950",
  },
  {
    id: 2,
    name: "Football",
    items: "85+ Products",
    href: "/products/football",
    icon: Medal,
    accent: "group-hover:bg-teal-400 group-hover:text-slate-950",
  },
  {
    id: 3,
    name: "Jerseys & Kits",
    items: "200+ Products",
    href: "/products/jerseys",
    icon: Shirt,
    accent: "group-hover:bg-sky-400 group-hover:text-slate-950",
  },
  {
    id: 4,
    name: "Sports Shoes",
    items: "60+ Products",
    href: "/products/shoes",
    icon: Footprints,
    accent: "group-hover:bg-amber-400 group-hover:text-slate-950",
  },
  {
    id: 5,
    name: "Gym & Fitness",
    items: "95+ Products",
    href: "/products/fitness",
    icon: Dumbbell,
    accent: "group-hover:bg-rose-400 group-hover:text-slate-950",
  },
  {
    id: 6,
    name: "Badminton",
    items: "50+ Products",
    href: "/products/badminton",
    icon: Swords,
    accent: "group-hover:bg-purple-400 group-hover:text-slate-950",
  },
];

export default function CategorySection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Browse by Sport
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Icon Wrapper */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-slate-800/90 text-emerald-400 flex items-center justify-center mb-4 transition-colors duration-300 ${category.accent}`}
                >
                  <IconComponent className="w-7 h-7 stroke-[2]" />
                </div>

                {/* Category Title */}
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>

                {/* Item Count */}
                <p className="text-xs text-slate-400 mt-1">
                  {category.items}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}