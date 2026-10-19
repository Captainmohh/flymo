"use client";

import React, { useState } from "react";
import ChatHeader, { CURRENCIES, CurrencyItem } from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatInterfaceCard, { ChatMessage, FlightTicketDeal } from "@/components/chat/ChatInterfaceCard";
import FlightFiltersCard, { FlightFilterValues } from "@/components/chat/FlightFiltersCard";
import ScenicShowcase from "@/components/chat/ScenicShowcase";

export default function ChatPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyItem>(CURRENCIES[0]);

  const initialMessages: ChatMessage[] = [];

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

    // Simulate smart bot response returning ticket cards
    setTimeout(() => {
      let botResponse = "";
      let deals: FlightTicketDeal[] | undefined = undefined;
      const lower = userText.toLowerCase();

      if (files && files.length > 0) {
        botResponse = `I received ${files.join(", ")}. Analyzing your uploaded booking details and comparing live schedules across 500+ airlines...`;
      } else if (lower.includes("paris") || lower.includes("cdg")) {
        botResponse = "Here are the top-ranked evening flights to Paris departing next Friday after 6:00 PM matching your criteria:";
        deals = [
          {
            id: "deal-af-1117",
            airline: "Air France",
            flightNumber: "AF 1117",
            airlineCode: "AF",
            airlineColor: "bg-[#00226C]",
            tag: "Recommended",
            tagType: "emerald",
            aircraft: "Airbus A320neo",
            amenities: "Wi-Fi & USB Power",
            departureTime: "18:30",
            departureAirport: "DUB",
            departureCity: "Dublin Airport",
            departureTerminal: "Terminal 1 · Fri, Nov 14",
            arrivalTime: "21:15",
            arrivalAirport: "CDG",
            arrivalCity: "Paris Charles de Gaulle",
            arrivalTerminal: "Terminal 2E · Fri, Nov 14",
            duration: "1h 45m",
            stops: "Non-stop",
            co2Note: "✓ 18% less CO2 than average",
            basePriceUSD: 185,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
              "💺 Free standard seat pick",
            ],
          },
          {
            id: "deal-ei-528",
            airline: "Aer Lingus",
            flightNumber: "EI 528",
            airlineCode: "EI",
            airlineColor: "bg-emerald-700",
            tag: "Fastest Flight",
            tagType: "amber",
            aircraft: "Airbus A321neo",
            amenities: "In-Flight Streaming & Wi-Fi",
            departureTime: "19:40",
            departureAirport: "DUB",
            departureCity: "Dublin Airport",
            departureTerminal: "Terminal 2 · Fri, Nov 14",
            arrivalTime: "22:25",
            arrivalAirport: "CDG",
            arrivalCity: "Paris Charles de Gaulle",
            arrivalTerminal: "Terminal 1 · Fri, Nov 14",
            duration: "1h 45m",
            stops: "Non-stop",
            co2Note: "Direct evening departure",
            basePriceUSD: 240,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
            ],
          },
          {
            id: "deal-lh-2515",
            airline: "Lufthansa",
            flightNumber: "LH 2515",
            airlineCode: "LH",
            airlineColor: "bg-amber-600",
            tag: "Lowest Fare",
            tagType: "blue",
            aircraft: "Airbus A320",
            amenities: "Free Snacks & Drinks",
            departureTime: "18:15",
            departureAirport: "DUB",
            departureCity: "Dublin Airport",
            departureTerminal: "Terminal 1 · Fri, Nov 14",
            arrivalTime: "22:45",
            arrivalAirport: "CDG",
            arrivalCity: "Paris Charles de Gaulle",
            arrivalTerminal: "Terminal 2B · Fri, Nov 14",
            duration: "3h 30m",
            stops: "1 stop (55m layover)",
            co2Note: "Short Frankfurt transfer",
            basePriceUSD: 165,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
            ],
          },
        ];
      } else if (lower.includes("medina") || lower.includes("med")) {
        botResponse = "Found verified round-trip routes for Dublin (DUB) ➔ Medina (MED) with checked baggage included:";
        deals = [
          {
            id: "deal-tk-1976",
            airline: "Turkish Airlines",
            flightNumber: "TK 1976",
            airlineCode: "TK",
            airlineColor: "bg-red-700",
            tag: "Recommended",
            tagType: "emerald",
            aircraft: "Boeing 787-9 Dreamliner",
            amenities: "Wi-Fi & Full Meal Service",
            departureTime: "10:45",
            departureAirport: "DUB",
            departureCity: "Dublin Airport",
            departureTerminal: "Terminal 1 · Thu, Nov 6",
            arrivalTime: "22:15",
            arrivalAirport: "MED",
            arrivalCity: "Medina Prince Mohammad",
            arrivalTerminal: "Terminal 1 · Thu, Nov 6",
            duration: "10h 30m",
            stops: "1 stop (IST)",
            co2Note: "✓ Top rated connecting route",
            basePriceUSD: 642,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 2x 23kg Checked bags included",
              "💺 Free standard seat pick",
            ],
          },
          {
            id: "deal-sv-124",
            airline: "Saudia",
            flightNumber: "SV 124",
            airlineCode: "SV",
            airlineColor: "bg-emerald-800",
            tag: "Fastest Route",
            tagType: "amber",
            aircraft: "Boeing 777-300ER",
            amenities: "Halal Dining & Quiet Cabin",
            departureTime: "13:10",
            departureAirport: "DUB",
            departureCity: "Dublin Airport",
            departureTerminal: "Terminal 2 · Thu, Nov 6",
            arrivalTime: "23:25",
            arrivalAirport: "MED",
            arrivalCity: "Medina Prince Mohammad",
            arrivalTerminal: "Terminal 1 · Thu, Nov 6",
            duration: "9h 15m",
            stops: "1 stop (JED)",
            co2Note: "Fastest travel time",
            basePriceUSD: 715,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 2x 23kg Checked bags included",
            ],
          },
        ];
      } else {
        botResponse = `Found verified direct flights matching your search:`;
        deals = [
          {
            id: "deal-vs-045",
            airline: "Virgin Atlantic",
            flightNumber: "VS045",
            airlineCode: "VIR",
            airlineColor: "bg-red-600",
            tag: "Recommended",
            tagType: "emerald",
            aircraft: "Boeing 787-9 Dreamliner",
            amenities: "Wi-Fi & USB Power",
            departureTime: "10:15",
            departureAirport: "LHR",
            departureCity: "London Heathrow",
            departureTerminal: "Terminal 3 · Fri, Nov 14",
            arrivalTime: "13:35",
            arrivalAirport: "JFK",
            arrivalCity: "New York John F. Kennedy",
            arrivalTerminal: "Terminal 4 · Fri, Nov 14",
            duration: "7h 20m",
            stops: "Non-stop",
            co2Note: "✓ 14% less CO2 than average",
            basePriceUSD: 519,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
              "💺 Free standard seat pick",
            ],
          },
          {
            id: "deal-ba-0177",
            airline: "British Airways",
            flightNumber: "BA0177",
            airlineCode: "BA",
            airlineColor: "bg-blue-900",
            tag: "Fastest Flight",
            tagType: "amber",
            aircraft: "Airbus A350-1000",
            amenities: "State-of-the-art Quiet Cabin",
            departureTime: "09:30",
            departureAirport: "LHR",
            departureCity: "London Heathrow",
            departureTerminal: "Terminal 5 · Fri, Nov 14",
            arrivalTime: "12:45",
            arrivalAirport: "JFK",
            arrivalCity: "New York John F. Kennedy",
            arrivalTerminal: "Terminal 7 · Fri, Nov 14",
            duration: "7h 15m",
            stops: "Non-stop",
            co2Note: "Direct morning departure",
            basePriceUSD: 542,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
            ],
          },
          {
            id: "deal-dl-0002",
            airline: "Delta Air Lines",
            flightNumber: "DL0002",
            airlineCode: "DAL",
            airlineColor: "bg-red-700",
            tag: "Lowest Fare",
            tagType: "blue",
            aircraft: "Boeing 767-400",
            amenities: "In-Flight Entertainment",
            departureTime: "14:10",
            departureAirport: "LHR",
            departureCity: "London Heathrow",
            departureTerminal: "Terminal 3 · Fri, Nov 14",
            arrivalTime: "17:50",
            arrivalAirport: "JFK",
            arrivalCity: "New York John F. Kennedy",
            arrivalTerminal: "Terminal 4 · Fri, Nov 14",
            duration: "7h 40m",
            stops: "Non-stop",
            co2Note: "Afternoon flight",
            basePriceUSD: 498,
            baggageBadges: [
              "👜 Personal item included",
              "🧳 23kg Checked bag included",
            ],
          },
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        deals,
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
    const dateDesc =
      filters.tripType === "One way" || !filters.dateTo
        ? `Departing ${filters.dateFrom || "6/11/2026"}`
        : `${filters.dateFrom || "6/11/2026"} → ${filters.dateTo || "20/11/2026"}`;
    const querySummary = `Search: ${filters.origin} → ${filters.destination} · ${dateDesc} · ${filters.tripType} · ${filters.passengers} · ${filters.cabinClass}`;
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
