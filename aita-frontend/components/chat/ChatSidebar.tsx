"use client";

import React from "react";
import {
  Calendar,
  Bookmark,
  Bell,
  Award,
  HelpCircle,
  Crown,
} from "lucide-react";
import AitaLogoVector from "./AitaLogoVector";

interface ChatSidebarProps {
  collapsed?: boolean;
  desktopCollapsed?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  badge?: string;
  icon: (props: { className?: string }) => React.ReactNode;
  active?: boolean;
}

export default function ChatSidebar({
  collapsed,
  desktopCollapsed,
  mobileOpen = false,
  onClose,
}: ChatSidebarProps) {
  const isCollapsed = collapsed ?? desktopCollapsed ?? false;
  const navItems: NavLinkItem[] = [
    {
      id: "search",
      label: "Flight Search",
      active: true,
      icon: ({ className }) => <AitaLogoVector className={className} />,
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
      id: "help",
      label: "Help & Support",
      icon: ({ className }) => <HelpCircle className={className} />,
    },
  ];

  return (
    <aside
      className={`h-[calc(100vh-66px)] sticky top-[66px] flex flex-col justify-between bg-[#011847] border-r border-white/10 text-white transition-all duration-300 z-40 shrink-0 ${
        mobileOpen
          ? "fixed inset-y-0 left-0 top-[66px] z-50 w-64 shadow-2xl flex"
          : "hidden md:flex"
      } ${isCollapsed ? "md:w-[76px]" : "md:w-64"}`}
    >
      {/* Top Nav List - starts cleanly at the top with no logo on the navbar */}
      <div className="p-3 pt-4">
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  item.active
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <div className="flex h-5 w-5 items-center justify-center shrink-0">
                  {item.icon({ className: "w-5 h-5" })}
                </div>

                {!isCollapsed && (
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
              {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center rounded-md bg-gray-900 px-2.5 py-1 text-xs font-bold text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
