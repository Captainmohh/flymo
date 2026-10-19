"use client";

import React, { useState, useRef, useEffect } from "react";
import { RotateCcw, Search, ArrowRight, User, Paperclip, FileText, X, Plane } from "lucide-react";
import AitaLogoVector from "./AitaLogoVector";
import { CurrencyItem } from "./ChatHeader";

export interface FlightTicketDeal {
  id: string;
  airline: string;
  flightNumber: string;
  airlineCode?: string;
  airlineColor?: string;
  tag?: string;
  tagType?: "emerald" | "amber" | "blue";
  aircraft?: string;
  amenities?: string;
  departureTime: string;
  departureAirport: string;
  departureCity: string;
  departureTerminal?: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTerminal?: string;
  duration: string;
  stops: string;
  co2Note?: string;
  basePriceUSD: number;
  baggageBadges?: string[];
  baggage?: string;
  fareLabel?: string;
  taxesNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text?: string;
  files?: string[];
  deals?: FlightTicketDeal[];
  isInitialDeals?: boolean;
}

export const PROMPT_SAMPLES = [
  "Find me a flight to Paris next Friday after 6 PM, preferably non-stop or with a short layover under 2 hours, under $800",
  "Cheapest round-trip from Dublin to Medina Nov 6–20 with checked baggage included, under $700",
];

export function getAirlineBadge(deal: FlightTicketDeal) {
  if (deal.airlineCode && deal.airlineColor) {
    return { code: deal.airlineCode, color: deal.airlineColor };
  }

  const name = deal.airline.toLowerCase();
  if (name.includes("virgin")) {
    return { code: deal.airlineCode || "VIR", color: "bg-red-600" };
  }
  if (name.includes("british") || name.includes("ba")) {
    return { code: deal.airlineCode || "BA", color: "bg-blue-900" };
  }
  if (name.includes("delta")) {
    return { code: deal.airlineCode || "DAL", color: "bg-red-700" };
  }
  if (name.includes("france") || name.includes("af")) {
    return { code: deal.airlineCode || "AF", color: "bg-[#00226C]" };
  }
  if (name.includes("aer lingus") || name.includes("lingus")) {
    return { code: deal.airlineCode || "EI", color: "bg-emerald-700" };
  }
  if (name.includes("lufthansa")) {
    return { code: deal.airlineCode || "LH", color: "bg-amber-600" };
  }
  if (name.includes("turkish")) {
    return { code: deal.airlineCode || "TK", color: "bg-red-700" };
  }
  if (name.includes("saudia") || name.includes("saudi")) {
    return { code: deal.airlineCode || "SV", color: "bg-emerald-800" };
  }

  const derivedCode =
    deal.airlineCode ||
    deal.flightNumber.split(" ")[0] ||
    deal.airline.slice(0, 3).toUpperCase();
  return { code: derivedCode, color: deal.airlineColor || "bg-[#011847]" };
}

export function getTagClass(tag?: string, tagType?: "emerald" | "amber" | "blue") {
  if (
    tagType === "amber" ||
    (tag && (tag.toLowerCase().includes("fast") || tag.toLowerCase().includes("quick")))
  ) {
    return "bg-amber-100 text-amber-800";
  }
  if (
    tagType === "blue" ||
    (tag &&
      (tag.toLowerCase().includes("low") ||
        tag.toLowerCase().includes("cheap") ||
        tag.toLowerCase().includes("value")))
  ) {
    return "bg-blue-100 text-blue-800";
  }
  return "bg-emerald-100 text-emerald-800";
}

export function getBaggageBadges(deal: FlightTicketDeal): string[] {
  if (deal.baggageBadges && deal.baggageBadges.length > 0) {
    return deal.baggageBadges;
  }
  if (deal.baggage) {
    const parts = deal.baggage
      .split(/•|\+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.map((part) => {
      const lower = part.toLowerCase();
      if (lower.includes("personal") || lower.includes("cabin") || lower.includes("carry")) {
        return `👜 ${part}`;
      }
      if (lower.includes("bag") || lower.includes("checked") || lower.includes("23kg")) {
        return `🧳 ${part}`;
      }
      if (lower.includes("seat")) {
        return `💺 ${part}`;
      }
      return `✓ ${part}`;
    });
  }
  return [
    "👜 Personal item included",
    "🧳 23kg Checked bag included",
    "💺 Free standard seat pick",
  ];
}

interface ChatInterfaceCardProps {
  activeCurrency: CurrencyItem;
  messages: ChatMessage[];
  onSendMessage: (text: string, files?: string[]) => void;
  onResetChat: () => void;
  onSelectPromptChip: (query: string) => void;
  onSelectDeal: (airline: string, price: string) => void;
}

export default function ChatInterfaceCard({
  activeCurrency,
  messages,
  onSendMessage,
  onResetChat,
  onSelectPromptChip,
  onSelectDeal,
}: ChatInterfaceCardProps) {
  const [inputValue, setInputValue] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const streamEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setAttachedFiles((prev) => prev.filter((name) => name !== fileName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query && attachedFiles.length === 0) return;

    onSendMessage(query, attachedFiles.length > 0 ? [...attachedFiles] : undefined);
    setInputValue("");
    setAttachedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const turkishPrice = Math.round(642 * activeCurrency.rate);
  const saudiaPrice = Math.round(715 * activeCurrency.rate);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-[22px] shadow-sm overflow-hidden h-[530px] sm:h-[580px] lg:h-[620px] w-full transition-all">
      
      {/* Card Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-[#011847] tracking-tight">
            flymo assistant
          </span>
        </div>

        <button
          onClick={onResetChat}
          className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-0.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#011847] hover:border-[#011847] transition-all cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Message Stream: responsive swipeable container with compact, smaller typography */}
      <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-3 sm:p-4 flex flex-col gap-3 bg-[#F8FAFC]">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto w-full max-w-lg mx-auto select-none">
            {/* Prompt sample pills in the background: pure pill shape, no icons */}
            <div className="flex flex-col gap-2.5 w-full">
              {PROMPT_SAMPLES.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPromptChip(prompt)}
                  className="rounded-full border border-blue-200/90 bg-white px-5 py-2.5 sm:py-3 text-center sm:text-left text-xs sm:text-[13px] font-semibold text-[#011847] leading-snug transition-all hover:border-blue-400 hover:bg-blue-50/70 hover:shadow-xs active:scale-[0.99] cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  title="Tap to run this flight query"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 w-full ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#011847] p-1 text-white shadow-xs mt-0.5">
                  <AitaLogoVector className="w-full h-full" color="#FFFFFF" />
                </div>
              )}

              <div className={msg.deals && msg.deals.length > 0 ? "w-full max-w-full" : "max-w-[90%] sm:max-w-[84%]"}>
                {msg.sender === "user" ? (
                  <div className="flex flex-col gap-1 items-end">
                    {/* Render attached files if present */}
                    {msg.files && msg.files.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-end mb-0.5">
                        {msg.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-[11px] font-semibold text-[#011847]"
                          >
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span className="truncate max-w-[120px]">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.text && (
                      <div className="rounded-xl rounded-tr-xs bg-[#011847] px-3.5 py-2 text-xs sm:text-[13px] text-white shadow-xs font-medium leading-relaxed">
                        {msg.text}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 w-full">
                    {msg.text && (
                      <div className="rounded-xl rounded-tl-xs bg-white border border-gray-200/90 p-3 sm:p-3.5 text-xs sm:text-[13px] text-gray-800 shadow-xs leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </div>
                    )}

                    {/* Flight Ticket Cards - Design Kit Exact Layout */}
                    {msg.deals && msg.deals.length > 0 && (
                      <div className="flex flex-col gap-3.5 w-full">
                        {msg.deals.map((deal) => {
                          const price = Math.round(deal.basePriceUSD * activeCurrency.rate);
                          const badge = getAirlineBadge(deal);
                          const tagClass = getTagClass(deal.tag, deal.tagType);
                          const badges = getBaggageBadges(deal);

                          return (
                            <div
                              key={deal.id}
                              className="bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200 hover:border-sky-500 transition-all duration-200 group w-full text-left"
                            >
                              {/* Top Badge & Airline Header */}
                              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className={`w-8 h-8 rounded-lg ${badge.color} text-white font-black text-xs flex items-center justify-center tracking-tighter shrink-0 shadow-xs`}
                                  >
                                    {badge.code}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                                      <span>
                                        {deal.airline} · {deal.flightNumber}
                                      </span>
                                      {deal.tag && (
                                        <span
                                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${tagClass}`}
                                        >
                                          {deal.tag}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                      {deal.aircraft || "Boeing 787-9 Dreamliner"} ·{" "}
                                      {deal.amenities || "Wi-Fi & USB Power"}
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <div className="text-xs text-slate-500 leading-tight">
                                    {deal.fareLabel || "Total round-trip fare"}
                                  </div>
                                  <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-1">
                                    {activeCurrency.symbol}
                                    {price.toLocaleString()}
                                  </div>
                                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                                    {deal.taxesNote || "Includes all taxes & fees"}
                                  </div>
                                </div>
                              </div>

                              {/* Flight Route Schedule */}
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center py-4">
                                {/* Departure */}
                                <div className="sm:col-span-3 text-left">
                                  <div className="text-2xl font-black text-slate-900 leading-tight">
                                    {deal.departureTime}
                                  </div>
                                  <div className="text-xs font-bold text-slate-700 truncate">
                                    {deal.departureAirport} · {deal.departureCity}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate">
                                    {deal.departureTerminal || "Terminal 3 · Fri, Nov 14"}
                                  </div>
                                </div>

                                {/* Path graphic */}
                                <div className="sm:col-span-6 flex flex-col items-center px-2 text-center">
                                  <div className="text-[11px] font-bold text-slate-600 mb-1">
                                    {deal.duration} · {deal.stops}
                                  </div>
                                  <div className="relative flex w-full items-center justify-center my-1">
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-300" />
                                    <span className="relative z-10 bg-white px-2 text-sky-600 text-sm font-sans select-none">
                                      ✈
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-1 justify-center truncate">
                                    <span>{deal.co2Note || "✓ 14% less CO2 than average"}</span>
                                  </div>
                                </div>

                                {/* Arrival */}
                                <div className="sm:col-span-3 text-left sm:text-right">
                                  <div className="text-2xl font-black text-slate-900 leading-tight">
                                    {deal.arrivalTime}
                                  </div>
                                  <div className="text-xs font-bold text-slate-700 truncate">
                                    {deal.arrivalAirport} · {deal.arrivalCity}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate">
                                    {deal.arrivalTerminal || "Terminal 4 · Fri, Nov 14"}
                                  </div>
                                </div>
                              </div>

                              {/* Baggage & Amenities Badges + Booking CTA */}
                              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                                <div className="flex flex-wrap items-center gap-2 text-slate-600">
                                  {badges.map((badgeText, bIdx) => (
                                    <span
                                      key={bIdx}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 font-medium text-[11px] text-slate-700"
                                    >
                                      {badgeText}
                                    </span>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onSelectDeal(
                                      `${deal.airline} ${deal.flightNumber}`,
                                      `${activeCurrency.symbol}${price.toLocaleString()}`
                                    )
                                  }
                                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-md hover:shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                >
                                  <span>Select Flight</span>
                                  <span>➔</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00226C] text-white shadow-xs mt-0.5">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={streamEndRef} />
      </div>

      {/* Bottom Search & File Input Bar */}
      <div className="border-t border-gray-100 bg-white p-2.5 sm:p-3 shrink-0 flex flex-col gap-1.5">
        {/* Attached Files Preview Bar */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {attachedFiles.map((fileName, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 rounded-md bg-gray-100 border border-gray-300 px-2 py-0.5 text-[11px] font-semibold text-gray-800"
              >
                <FileText className="h-3 w-3 text-blue-600" />
                <span className="max-w-[120px] truncate">{fileName}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(fileName)}
                  className="text-gray-400 hover:text-gray-700 cursor-pointer ml-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 sm:gap-2">
          {/* File Attachment Input & Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            className="hidden"
            id="chat-file-upload"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach ticket or itinerary file"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:border-[#011847] hover:bg-[#011847]/5 hover:text-[#011847] transition-all cursor-pointer"
          >
            <Paperclip className="h-3.5 w-3.5" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask flymo anything or type your flight query..."
            className="flex-1 rounded-lg border border-gray-200 bg-[#F8FAFC] px-3 py-2 text-xs sm:text-[13px] text-gray-900 outline-none transition-all focus:border-[#011847] focus:bg-white focus:ring-1 focus:ring-[#011847]/15"
          />

          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg bg-[#011847] px-3 sm:px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#00226C] shrink-0 cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </button>
        </form>
      </div>

    </div>
  );
}
