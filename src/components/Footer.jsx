"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Trophy,
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
} from "lucide-react";

const socialLinks = [
    {
        name: "Facebook",
        href: "#",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "#",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        href: "#",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
    {
        name: "X (Twitter)",
        href: "#",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">

            {/* Top Newsletter Banner */}
            <div className="border-b border-slate-800/80 bg-slate-900/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                                Join the <span className="text-emerald-400">Khela-Bazar</span> Club
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">
                                Subscribe to get 10% off your first order, flash sale alerts & new gear updates.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubscribe}
                            className="w-full max-w-md flex flex-col sm:flex-row gap-2.5"
                        >
                            <div className="relative flex-1">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address..."
                                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none transition"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition shrink-0"
                            >
                                {subscribed ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Subscribed!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                    {/* Column 1: Brand & Contact Info */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <div className="bg-emerald-500 p-2 rounded-xl text-slate-950">
                                <Trophy className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Khela<span className="text-emerald-400">-Bazar</span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400 leading-relaxed">
                            Bangladesh’s trusted online sports & fitness marketplace. From
                            English willow cricket bats to official team jerseys, we bring
                            authentic gear straight to your doorstep.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-2.5 pt-2 text-sm text-slate-400">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>House 24, Road 7, Dhanmondi, Dhaka-1205, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>+880 1700-000000 (10 AM - 10 PM)</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>support@khela-bazar.com</span>
                            </div>
                        </div>

                        {/* Social Media SVG Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition"
                                >
                                    {social.svg}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Shop Categories */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                            Top Categories
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li>
                                <Link href="/products/cricket" className="hover:text-emerald-400 transition">
                                    Cricket Bats & Kits
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/football" className="hover:text-emerald-400 transition">
                                    Football & Turf Boots
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/jerseys" className="hover:text-emerald-400 transition">
                                    National & Club Jerseys
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/badminton" className="hover:text-emerald-400 transition">
                                    Badminton Rackets
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/fitness" className="hover:text-emerald-400 transition">
                                    Gym & Home Fitness
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                            Customer Care
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li>
                                <Link href="/track-order" className="hover:text-emerald-400 transition">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-policy" className="hover:text-emerald-400 transition">
                                    Shipping & Delivery
                                </Link>
                            </li>
                            <li>
                                <Link href="/return-policy" className="hover:text-emerald-400 transition">
                                    Return & Exchange
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide" className="hover:text-emerald-400 transition">
                                    Jersey Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-emerald-400 transition">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Company & Payment Methods */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                            Company & Legal
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li>
                                <Link href="/about" className="hover:text-emerald-400 transition">
                                    About Khela-Bazar
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-emerald-400 transition">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-emerald-400 transition">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>

                        {/* Accepted Payment Methods */}
                        <div className="pt-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                                We Accept
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-bold">
                                <span className="px-2.5 py-1 rounded-md bg-pink-600/20 text-pink-400 border border-pink-500/30">
                                    bKash
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-orange-600/20 text-orange-400 border border-orange-500/30">
                                    Nagad
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-purple-600/20 text-purple-400 border border-purple-500/30">
                                    Rocket
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                                    VISA / Card
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                    Cash on Delivery
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-slate-800/80 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-500">
                    <p>
                        © 2026 <span className="text-slate-300 font-semibold">Khela-Bazar</span>. All rights reserved.
                    </p>
                    <p>
                        Crafted for Sports Lovers in Bangladesh 🇧🇩
                    </p>
                </div>
            </div>

        </footer>
    );
}