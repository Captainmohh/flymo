"use client";

import React, { useState, useRef, useEffect } from "react";
import { RotateCcw, Search, ArrowRight, User, Paperclip, FileText, X } from "lucide-react";
import AitaLogoVector from "./AitaLogoVector";
import { CurrencyItem } from "./ChatHeader";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text?: string;
  files?: string[];
  isInitialDeals?: boolean;
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
        {messages.map((msg) => (
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

            <div className="max-w-[90%] sm:max-w-[84%]">
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
                <div className="rounded-xl rounded-tl-xs bg-white border border-gray-200/90 p-3 sm:p-3.5 text-xs sm:text-[13px] text-gray-800 shadow-xs leading-relaxed">
                  {msg.text && <div>{msg.text}</div>}

                  {/* Initial Flight Deals Card Payload with compact typography */}
                  {msg.isInitialDeals && (
                    <div className="flex flex-col gap-2.5 mt-2.5">
                      
                      {/* Deal 1: Turkish Airlines */}
                      <div className="rounded-lg border border-gray-200 bg-white p-2.5 sm:p-3 shadow-2xs hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                          <span className="font-bold text-[#011847] text-xs">
                            Turkish Airlines (TK 1976)
                          </span>
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                            Cheapest
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <div className="font-mono text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                              10:45
                            </div>
                            <div className="text-[10px] font-semibold text-gray-500">
                              DUB • Dublin
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col items-center px-2">
                            <span className="text-[10px] font-semibold text-gray-400">
                              10h 30m
                            </span>
                            <div className="relative flex w-full items-center justify-center py-0.5">
                              <div className="h-0.5 w-full bg-gray-200" />
                              <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 shadow-2xs">
                                <AitaLogoVector className="w-3 h-3 text-[#011847]" />
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-amber-700">
                              1 stop (IST)
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="font-mono text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                              22:15
                            </div>
                            <div className="text-[10px] font-semibold text-gray-500">
                              MED • Medina
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-gray-400">
                              Round-trip
                            </span>
                            <div className="font-mono text-sm sm:text-base font-extrabold text-emerald-700 leading-none">
                              {activeCurrency.symbol}{turkishPrice.toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              onSelectDeal(
                                "Turkish Airlines",
                                `${activeCurrency.symbol}${turkishPrice}`
                              )
                            }
                            className="flex items-center gap-1 rounded-md bg-[#011847] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#00226C] transition-colors cursor-pointer"
                          >
                            <span>View Deal</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Deal 2: Saudia Airlines */}
                      <div className="rounded-lg border border-gray-200 bg-white p-2.5 sm:p-3 shadow-2xs hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                          <span className="font-bold text-[#011847] text-xs">
                            Saudia (SV 262)
                          </span>
                          <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
                            Fastest
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <div className="font-mono text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                              13:10
                            </div>
                            <div className="text-[10px] font-semibold text-gray-500">
                              DUB • Dublin
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col items-center px-2">
                            <span className="text-[10px] font-semibold text-gray-400">
                              9h 15m
                            </span>
                            <div className="relative flex w-full items-center justify-center py-0.5">
                              <div className="h-0.5 w-full bg-gray-200" />
                              <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 shadow-2xs">
                                <AitaLogoVector className="w-3 h-3 text-[#011847]" />
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-amber-700">
                              1 stop (JED)
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="font-mono text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                              23:25
                            </div>
                            <div className="text-[10px] font-semibold text-gray-500">
                              MED • Medina
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-gray-400">
                              Round-trip
                            </span>
                            <div className="font-mono text-sm sm:text-base font-extrabold text-emerald-700 leading-none">
                              {activeCurrency.symbol}{saudiaPrice.toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              onSelectDeal(
                                "Saudia",
                                `${activeCurrency.symbol}${saudiaPrice}`
                              )
                            }
                            className="flex items-center gap-1 rounded-md bg-[#011847] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#00226C] transition-colors cursor-pointer"
                          >
                            <span>View Deal</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Quick-Prompt Interactive Chips */}
                  {msg.isInitialDeals && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                      <button
                        onClick={() =>
                          onSelectPromptChip("Is 2 pieces of 23kg checked baggage included?")
                        }
                        className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#011847] hover:bg-[#011847] hover:text-white transition-colors cursor-pointer"
                      >
                        <AitaLogoVector className="w-3 h-3" />
                        <span>Baggage Allowance</span>
                      </button>

                      <button
                        onClick={() =>
                          onSelectPromptChip(
                            "Dublin (DUB) to Paris (CDG), Round trip, 1 adult, Economy"
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#011847] hover:bg-[#011847] hover:text-white transition-colors cursor-pointer"
                      >
                        <AitaLogoVector className="w-3 h-3" />
                        <span>Dublin ➔ Paris (CDG)</span>
                      </button>

                      <button
                        onClick={() =>
                          onSelectPromptChip(
                            "Dublin (DUB) to London (LHR), Round trip, 1 adult, Economy"
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#011847] hover:bg-[#011847] hover:text-white transition-colors cursor-pointer"
                      >
                        <AitaLogoVector className="w-3 h-3" />
                        <span>Dublin ➔ London (&lt;$60)</span>
                      </button>
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
        ))}
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
            placeholder="Ask flymo: 'Dublin to London' ..."
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
