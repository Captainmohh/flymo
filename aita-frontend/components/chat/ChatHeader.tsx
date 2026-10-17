"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";

export interface CurrencyItem {
  code: string;
  symbol: string;
  rate: number;
  label: string;
}

export const CURRENCIES: CurrencyItem[] = [
  { code: "USD", symbol: "$", rate: 1.0, label: "USD - US Dollar ($)" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "EUR - Euro (€)" },
  { code: "GBP", symbol: "£", rate: 0.79, label: "GBP - British Pound (£)" },
  { code: "AED", symbol: "AED", rate: 3.67, label: "AED - UAE Dirham (د.إ)" },
  { code: "SAR", symbol: "SAR", rate: 3.75, label: "SAR - Saudi Riyal (ر.س)" },
];

export interface LanguageItem {
  code: string;
  name: string;
  short: string;
  flag: string;
}

export const LANGUAGES: LanguageItem[] = [
  { code: "en-US", name: "English (US)", short: "EN", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", short: "UK", flag: "🇬🇧" },
  { code: "es-ES", name: "Español", short: "ES", flag: "🇪🇸" },
  { code: "fr-FR", name: "Français", short: "FR", flag: "🇫🇷" },
  { code: "de-DE", name: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "ar-SA", name: "العربية", short: "AR", flag: "🇸🇦" },
];

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  activeCurrency: CurrencyItem;
  onSelectCurrency: (curr: CurrencyItem) => void;
}

export default function ChatHeader({
  onToggleSidebar,
  activeCurrency,
  onSelectCurrency,
}: ChatHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<LanguageItem>(LANGUAGES[0]);

  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(event.target as Node)) {
        setCurrOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-[66px] w-full bg-[#011847] text-white border-b border-white/10 shadow-[0_2px_12px_rgba(1,24,71,0.25)]">
      {/* Full width container: logo & name on the left, language, currency, and circle user icon on the right */}
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-5">
        
        {/* Left Side: Only Name and Logo on the left */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Logo Button - Toggles sidebar (full-screen on mobile, collapsible on desktop) */}
          <button
            onClick={onToggleSidebar}
            title="Toggle Navigation Menu"
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/12 border border-white/20 p-1.5 transition-all duration-150 hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="/aita-mark-white.png"
                alt="Flight Ticket Assistant Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
          </button>

          {/* Brand Name */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            flymo
          </Link>
        </div>

        {/* Right Side: Language, Currency, and Circle User Icon */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Language Selector: Symbol + Dropdown Arrow */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setCurrOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-1 px-1.5 py-1 text-sm sm:text-base font-bold text-white hover:text-white/80 transition-colors cursor-pointer"
              title="Change Language"
              aria-label="Change Language"
            >
              <span>{activeLang.short}</span>
              <ChevronDown className="h-3.5 w-3.5 stroke-[2.5] opacity-80" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[170px] rounded-lg border border-gray-200 bg-white p-1.5 shadow-xl text-gray-900">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLang(lang);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-blue-50 hover:text-[#011847] cursor-pointer ${
                      activeLang.code === lang.code ? "bg-blue-50 font-bold text-[#011847]" : ""
                    }`}
                  >
                    <span>{lang.flag} {lang.name}</span>
                    <span className="text-[11px] font-bold text-gray-400">{lang.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector: Symbol + Dropdown Arrow */}
          <div ref={currRef} className="relative">
            <button
              onClick={() => {
                setCurrOpen(!currOpen);
                setLangOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-1 px-1.5 py-1 text-sm sm:text-base font-bold text-white hover:text-white/80 transition-colors cursor-pointer"
              title="Change Currency"
              aria-label="Change Currency"
            >
              <span>{activeCurrency.symbol}</span>
              <ChevronDown className="h-3.5 w-3.5 stroke-[2.5] opacity-80" />
            </button>

            {currOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[190px] rounded-lg border border-gray-200 bg-white p-1.5 shadow-xl text-gray-900">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      onSelectCurrency(curr);
                      setCurrOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-blue-50 hover:text-[#011847] cursor-pointer ${
                      activeCurrency.code === curr.code ? "bg-blue-50 font-bold text-[#011847]" : ""
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span className="font-mono font-bold text-[#011847]">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Circle User Icon on the Right */}
          <div ref={userRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setLangOpen(false);
                setCurrOpen(false);
              }}
              title="Sarah N. Account Profile"
              aria-label="Sarah N. Account Profile"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-[#011847] hover:ring-2 hover:ring-white/50 active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
            >
              <User className="h-4 w-4 stroke-[2.5]" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[200px] rounded-xl border border-gray-200 bg-white p-2 shadow-xl text-gray-900">
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="font-bold text-sm text-[#011847]">Sarah N.</div>
                  <div className="text-xs text-gray-500">sarah.n@example.com</div>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    Saved Preferences
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      if (typeof window !== "undefined") window.location.href = "/";
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
