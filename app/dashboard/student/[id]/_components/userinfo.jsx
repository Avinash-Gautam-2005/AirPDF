"use client";

import { Calendar, Mail } from "lucide-react";

export default function UserInfo({ user }) {
  if (!user) return null;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600" />

      {/* Animated Glow Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/15 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff1_1px,transparent_1px),linear-gradient(to_bottom,#fff1_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Content */}
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/30 shadow-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/30 bg-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            {/* Online Indicator */}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {user.name?.split(" ")[0] || "Student"}! 👋
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>
              {joinDate && (
                <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  Joined {joinDate}
                </span>
              )}
            </div>
          </div>

          {/* Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
