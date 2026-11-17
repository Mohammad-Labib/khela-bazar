"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {!sent ? (
          <>
            <h1 className="text-2xl font-extrabold text-white">Forgot Password?</h1>
            <p className="text-sm text-slate-400 mt-1.5 mb-6">
              Enter your registered email address and we&apos;ll send you a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Reset Link</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Check Your Email</h2>
            <p className="text-sm text-slate-400">
              We&apos;ve sent a password reset link to <span className="text-white font-semibold">{email}</span>.
            </p>
            {/* ডেমো টেস্ট করার জন্য সরাসরি Reset Password পেজের লিংক */}
            <Link
              href="/reset-password?token=demo-reset-token"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              Open Reset Password Page (Demo Link) →
            </Link>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </section>
  );
}