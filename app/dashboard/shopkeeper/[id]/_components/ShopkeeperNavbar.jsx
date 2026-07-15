"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, Store, Bell } from "lucide-react";

export default function ShopkeeperNavbar({ shop, user }) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left — Brand + Shop Name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hidden sm:inline">
                AirPDF
              </span>
            </Link>

            {/* Divider + Shop Name */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
              <Store className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground truncate max-w-[180px]">
                {shop?.name || "My Shop"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium">
                Shopkeeper
              </span>
            </div>
          </div>

          {/* Right — User + Actions */}
          <div className="flex items-center gap-2">
            {/* Avatar + Name */}
            {user?.image && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border">
                <img src={user.image} alt={user.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium text-foreground truncate max-w-[120px]">{user.name}</span>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
