"use client";

import React, { useState } from "react";
import ChatHeader, { CURRENCIES, CurrencyItem } from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatInterfaceCard, { ChatMessage } from "@/components/chat/ChatInterfaceCard";
import FlightFiltersCard, { FlightFilterValues } from "@/components/chat/FlightFiltersCard";
import ScenicShowcase from "@/components/chat/ScenicShowcase";

export default function ChatPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyItem>(CURRENCIES[0]);

  const initialMessages: ChatMessage[] = [
    {
      id: "msg-init-1",
      sender: "bot",
      text: "Hello Sarah! Welcome to flymo assistant. I monitor over 500 airlines in real time to guarantee you find the lowest fares, optimal layovers, and flexible booking perks. Here are the top verified options for your route:",
      isInitialDeals: true,
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setDesktopCollapsed((prev) => !prev);
    }
  };

  const handleSendMessage = (userText: string, files?: string[]) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      files,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate smart bot response
    setTimeout(() => {
      let botResponse = "";
      const lower = userText.toLowerCase();

      if (files && files.length > 0) {
        botResponse = `I received ${files.join(", ")}. Analyzing your uploaded booking details and comparing schedules across 500+ airlines now...`;
      } else if (lower.includes("baggage") || lower.includes("luggage")) {
        botResponse =
          "Both Turkish Airlines and Saudia include 2 pieces of checked baggage (23kg each) + 8kg cabin bag on this international route with zero extra charge.";
      } else if (lower.includes("cheapest") || lower.includes("price") || lower.includes("discount")) {
        botResponse = `Turkish Airlines (TK 1976) currently offers the lowest verified round-trip fare at ${activeCurrency.symbol}${Math.round(
          642 * activeCurrency.rate
        )}. Plus, your Flymo Gold Club membership entitles you to an additional 15% discount at checkout.`;
      } else if (lower.includes("flexible") || lower.includes("cancel") || lower.includes("refund")) {
        botResponse =
          "All fares shown include free 24-hour cancellation and no change fees up to 48 hours prior to departure.";
      } else if (lower.includes("search flights:") || lower.includes("dublin") || lower.includes("medina")) {
        botResponse = `Searching flights for: "${userText}". Found 14 real-time routes matching your criteria. Turkish Airlines via Istanbul and Saudia via Jeddah remain the highest rated for comfort and value.`;
      } else {
        botResponse = `Got it! I am searching across 500+ global airlines for "${userText}". Real-time seat availability and updated flight schedules have been refreshed.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  const handleSelectDeal = (airline: string, price: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: `Select ${airline} flight option (${price})`,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `Great choice! I have reserved the fare for ${airline} at ${price} for the next 15 minutes. Would you like to proceed with your saved passenger details (Sarah N.) or customize seat preferences?`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleFilterSearch = (filters: FlightFilterValues) => {
    const querySummary = `Search flights: ${filters.origin} → ${filters.destination} · ${filters.tripType} · ${filters.passengers} · ${filters.cabinClass}`;
    handleSendMessage(querySummary);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-900 font-sans">
      {/* 1. Header with Name & Logo on left, and Language, Currency, Circle User icon on right */}
      <ChatHeader
        onToggleSidebar={toggleSidebar}
        activeCurrency={activeCurrency}
        onSelectCurrency={setActiveCurrency}
      />

      {/* 2. Main Flex Layout: Left Navbar + Center Split Grid */}
      <div className="flex-1 flex w-full relative">
        {/* Sidebar: totally hidden on mobile unless user taps header logo; full-screen on mobile when open */}
        <ChatSidebar
          mobileOpen={mobileOpen}
          desktopCollapsed={desktopCollapsed}
          onClose={() => setMobileOpen(false)}
        />

        {/* Center & Right Content Area with responsive touch scrolling */}
        <main className="flex-1 min-w-0 flex flex-col justify-between p-2.5 sm:p-4 lg:p-6 transition-all duration-300">
          <div className="max-w-[1380px] w-full mx-auto flex-1">
            
            {/* Split Grid: Left Column (Chat + Filters Pills) & Right Column (2 Scenic Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch min-h-[calc(100vh-140px)]">
              
              {/* LEFT COLUMN: TWO SQUARE SHAPED ROUNDED PILLS (TOP: CHAT, BOTTOM: FILTERS) */}
              <div className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-4 justify-between">
                
                {/* Top Pill (Bigger): flymo assistant Chat Interface (Longer & compact typography) */}
                <ChatInterfaceCard
                  activeCurrency={activeCurrency}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onResetChat={handleResetChat}
                  onSelectPromptChip={handleSendMessage}
                  onSelectDeal={handleSelectDeal}
                />

                {/* Bottom Pill (Smaller): Flight Filters (Departure, Destination, Roundtrip, Passenger, Class) */}
                <FlightFiltersCard onSearch={handleFilterSearch} />
              </div>

              {/* RIGHT COLUMN: TWO SCENIC DESTINATION CARDS (CLIFFS OF MOHER & AFRICAN SCENIC) */}
              <div className="lg:col-span-4 flex flex-col h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[380px]">
                <ScenicShowcase />
              </div>

            </div>

          </div>

          {/* Minimalist Professional Footer */}
          <footer className="mt-6 sm:mt-8 pt-4 border-t border-gray-200/80 text-center max-w-[1380px] w-full mx-auto text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3 sm:gap-4 text-gray-600 font-medium text-[11px] sm:text-xs">
              <span className="hover:text-[#011847] cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-[#011847] cursor-pointer">Terms of Use</span>
              <span>•</span>
              <span className="hover:text-[#011847] cursor-pointer">Flight Search Guarantee</span>
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400">
              flymo searches hundreds of flight sites with zero hidden markups.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
