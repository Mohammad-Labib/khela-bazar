"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading, logout, updateProfile, changePassword } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'password'
  const [profileMsg, setProfileMsg] = useState("");
  const [passStatus, setPassStatus] = useState({ type: "", text: "" });

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileMsg("Profile details updated successfully!");
    setTimeout(() => setProfileMsg(""), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPassStatus({ type: "", text: "" });

    if (passForm.newPassword.length < 6) {
      return setPassStatus({ type: "error", text: "New password must be at least 6 characters." });
    }
    if (passForm.newPassword !== passForm.confirmPassword) {
      return setPassStatus({ type: "error", text: "New passwords do not match!" });
    }

    const res = changePassword(passForm.currentPassword, passForm.newPassword);
    if (!res.success) {
      return setPassStatus({ type: "error", text: res.message });
    }

    setPassStatus({ type: "success", text: res.message });
    setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Sidebar: User Summary & Navigation */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit">
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 text-2xl font-extrabold flex items-center justify-center uppercase">
              {user.name?.slice(0, 2) || "KB"}
            </div>
            <h2 className="text-lg font-extrabold text-white mt-3 capitalize">{user.name}</h2>
            <p className="text-xs text-slate-400">{user.email}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Member
            </span>
          </div>

          {/* Sidebar Tabs */}
          <div className="mt-5 space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "profile"
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "password"
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          {activeTab === "profile" ? (
            <>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                Profile Information
              </h1>
              <p className="text-sm text-slate-400 mb-6">
                Manage your personal details and default delivery address.
              </p>

              {profileMsg && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{profileMsg}</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address (Read-only)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={3}
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                Change Password
              </h1>
              <p className="text-sm text-slate-400 mb-6">
                Keep your account secure by updating your password regularly.
              </p>

              {passStatus.text && (
                <div
                  className={`mb-5 p-3 rounded-xl text-xs font-semibold border ${
                    passStatus.type === "error"
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  }`}
                >
                  {passStatus.text}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passForm.currentPassword}
                    onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passForm.newPassword}
                    onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition"
                >
                  <Lock className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
}