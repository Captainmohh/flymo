"use client";

import React from "react";
import {
  Search,
  Calendar,
  Bookmark,
  Bell,
  Award,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

interface ChatSidebarProps {
  mobileOpen: boolean;
  desktopCollapsed?: boolean;
  onClose?: () => void;
  onSignOut?: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  badge?: string;
  icon: (props: { className?: string }) => React.ReactNode;
  active?: boolean;
}

export default function ChatSidebar({
  mobileOpen,
  desktopCollapsed = false,
  onClose,
  onSignOut,
}: ChatSidebarProps) {
  const navItems: NavLinkItem[] = [
    {
      id: "search",
      label: "Flight Search",
      active: true,
      icon: ({ className }) => <Search className={className} />,
    },
    {
      id: "trips",
      label: "My Trips",
      badge: "1 Active",
      icon: ({ className }) => <Calendar className={className} />,
    },
    {
      id: "saved",
      label: "Saved Flights",
      icon: ({ className }) => <Bookmark className={className} />,
    },
    {
      id: "alerts",
      label: "Price Alerts",
      icon: ({ className }) => <Bell className={className} />,
    },
    {
      id: "miles",
      label: "Flymo Miles",
      icon: ({ className }) => <Award className={className} />,
    },
    {
      id: "help",
      label: "Help & Support",
      icon: ({ className }) => <HelpCircle className={className} />,
    },
  ];

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClose) onClose();
  };

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClose) onClose();
    if (onSignOut) {
      onSignOut();
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      {/* =========================================================================
          1. MOBILE FULL-PAGE OVERLAY SIDEBAR
          Totally hidden unless user taps the header logo.
          When tapped, takes over the entire page below the header.
          ========================================================================= */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[66px] bottom-0 z-50 bg-[#011847] flex flex-col justify-between p-4 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            {/* Mobile Header Row with Close Button */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Menu & Navigation
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links with comfortable touch targets */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={handleItemClick}
                  className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-150 ${
                    item.active
                      ? "bg-white/15 text-white font-bold shadow-xs"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex h-6 w-6 items-center justify-center shrink-0">
                    {item.icon({ className: "w-5 h-5 stroke-[2.2]" })}
                  </div>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Bottom Sign Out */}
          <div className="pt-4 border-t border-white/10 mt-auto">
            <button
              type="button"
              onClick={handleSignOutClick}
              className="w-full flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-base font-semibold text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-all cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center shrink-0">
                <LogOut className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="truncate font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. DESKTOP SIDEBAR
          Hidden on mobile (< md). Collapsible between 64 and 76px on desktop (>= md).
          ========================================================================= */}
      <aside
        className={`hidden md:flex flex-col justify-between h-[calc(100vh-66px)] sticky top-[66px] bg-[#011847] border-r border-white/10 text-white transition-all duration-300 z-40 shrink-0 select-none ${
          desktopCollapsed ? "w-[76px]" : "w-64"
        }`}
      >
        {/* Top Nav List */}
        <div className="p-3 pt-4">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    item.active
                      ? "bg-white/15 text-white font-bold shadow-xs"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  } ${desktopCollapsed ? "justify-center px-0" : ""}`}
                >
                  <div className="flex h-5 w-5 items-center justify-center shrink-0">
                    {item.icon({ className: "w-5 h-5 stroke-[2.2]" })}
                  </div>

                  {!desktopCollapsed && (
                    <>
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>

                {/* Floating Tooltip in collapsed mode */}
                {desktopCollapsed && (
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-xs font-bold text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Sign Out Button */}
        <div className="p-3 border-t border-white/10 mt-auto">
          <div className="relative group">
            <button
              type="button"
              onClick={handleSignOutClick}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-150 cursor-pointer ${
                desktopCollapsed ? "justify-center px-0" : ""
              }`}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <div className="flex h-5 w-5 items-center justify-center shrink-0">
                <LogOut className="w-5 h-5 stroke-[2.2]" />
              </div>

              {!desktopCollapsed && <span className="truncate font-semibold">Sign Out</span>}
            </button>

            {/* Floating Tooltip in collapsed mode */}
            {desktopCollapsed && (
              <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-xs font-bold text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                Sign Out
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
