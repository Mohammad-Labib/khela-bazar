"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

let cachedRawUser = null;
let cachedParsedUser = null;

function subscribeToAuth(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("khela-auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("khela-auth-change", callback);
  };
}

function getClientSnapshot() {
  const raw = localStorage.getItem("khela_bazar_user");
  if (raw !== cachedRawUser) {
    cachedRawUser = raw;
    cachedParsedUser = raw ? JSON.parse(raw) : null;
  }
  return cachedParsedUser;
}

function getServerSnapshot() {
  return null; // সার্ভার ও প্রথম হাইড্রেশন পাস সবসময় null পাবে
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const user = useSyncExternalStore(
    subscribeToAuth,
    getClientSnapshot,
    getServerSnapshot
  );

  const notifyAuthChange = () => {
    window.dispatchEvent(new Event("khela-auth-change"));
  };

  // ১. User Registration
  const register = async ({ name, email, phone, password }) => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      address: "Dhaka, Bangladesh",
      joinedAt: "November 2026",
    };
    localStorage.setItem("khela_bazar_user", JSON.stringify(newUser));
    localStorage.setItem("khela_bazar_pass", password);
    notifyAuthChange();
    router.push("/");
    return { success: true };
  };

  // ২. User Login
  const login = async ({ email, password }) => {
    const loggedInUser = {
      id: 1,
      name: email.split("@")[0].replace(/[._]/g, " "),
      email,
      phone: "+880 1700-000000",
      address: "Dhanmondi, Dhaka-1205",
      joinedAt: "November 2026",
    };
    localStorage.setItem("khela_bazar_user", JSON.stringify(loggedInUser));
    localStorage.setItem("khela_bazar_pass", password);
    notifyAuthChange();
    router.push("/");
    return { success: true };
  };

  // ৩. User Logout
  const logout = () => {
    localStorage.removeItem("khela_bazar_user");
    notifyAuthChange();
    router.push("/login");
  };

  // ৪. Update Profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("khela_bazar_user", JSON.stringify(updatedUser));
    notifyAuthChange();
    return { success: true };
  };

  // ৫. Change Password
  const changePassword = (currentPassword, newPassword) => {
    const savedPass = localStorage.getItem("khela_bazar_pass");
    if (savedPass && savedPass !== currentPassword) {
      return { success: false, message: "Current password is incorrect!" };
    }
    localStorage.setItem("khela_bazar_pass", newPassword);
    return { success: true, message: "Password updated successfully!" };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: false,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);