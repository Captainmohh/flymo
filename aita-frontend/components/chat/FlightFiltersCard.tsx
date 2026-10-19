"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Repeat,
  User as UserIcon,
  Armchair,
  Calendar,
  Search,
} from "lucide-react";

export interface FlightFilterValues {
  tripType: string;
  passengers: string;
  cabinClass: string;
  origin: string;
  destination: string;
  dateFrom?: string;
  dateTo?: string;
}

interface CalendarPickerProps {
  value: string;
  onChange: (dateStr: string) => void;
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const parseVal = (str: string): { day: number; month: number; year: number } => {
    if (str && str.includes("/")) {
      const parts = str.split("/").map(Number);
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        return { day: parts[0], month: parts[1] - 1, year: parts[2] };
      }
    }
    if (str && str.includes("-")) {
      const parts = str.split("-").map(Number);
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        return { day: parts[2], month: parts[1] - 1, year: parts[0] };
      }
    }
    return { day: 6, month: 10, year: 2026 }; // Default: Nov 2026
  };

  const parsed = parseVal(value);
  const [viewYear, setViewYear] = useState(parsed.year || 2026);
  const [viewMonth, setViewMonth] = useState(parsed.month ?? 10);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="w-[230px] sm:w-[240px] select-none text-slate-800">
      {/* Month & Year header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer"
          title="Previous Month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-bold text-gray-900 tracking-tight">
          {months[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 transition cursor-pointer"
          title="Next Month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-1">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <span key={`empty-${i}`} className="h-7 w-7" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const isSelected =
            parsed.day === d &&
            parsed.month === viewMonth &&
            parsed.year === viewYear;

          return (
            <button
              key={d}
              type="button"
              onClick={() => {
                onChange(`${d}/${viewMonth + 1}/${viewYear}`);
              }}
              className={`h-7 w-7 mx-auto flex items-center justify-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                isSelected
                  ? "bg-[#011847] text-white shadow-xs font-bold"
                  : "text-gray-700 hover:bg-sky-50 hover:text-sky-700"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface FlightFiltersCardProps {
  onSearch: (filters: FlightFilterValues) => void;
  defaultOrigin?: string;
  defaultDestination?: string;
}

export default function FlightFiltersCard({
  onSearch,
  defaultOrigin = "",
  defaultDestination = "",
}: FlightFiltersCardProps) {
  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState("1 adult");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);
  const [dateFrom, setDateFrom] = useState("6/11/2026");
  const [dateTo, setDateTo] = useState("20/11/2026");

  const formatNumericDate = (dateStr: string): string => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      const [y, m, d] = dateStr.split("-");
      return `${parseInt(d, 10)}/${parseInt(m, 10)}/${y}`;
    }
    return dateStr;
  };

  const [tripDropdownOpen, setTripDropdownOpen] = useState(false);
  const [passDropdownOpen, setPassDropdownOpen] = useState(false);
  const [cabinDropdownOpen, setCabinDropdownOpen] = useState(false);
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);

  const tripRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);
  const dateFromRef = useRef<HTMLDivElement>(null);
  const dateToRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tripRef.current && !tripRef.current.contains(event.target as Node)) {
        setTripDropdownOpen(false);
      }
      if (passRef.current && !passRef.current.contains(event.target as Node)) {
        setPassDropdownOpen(false);
      }
      if (cabinRef.current && !cabinRef.current.contains(event.target as Node)) {
        setCabinDropdownOpen(false);
      }
      if (dateFromRef.current && !dateFromRef.current.contains(event.target as Node)) {
        setDateFromOpen(false);
      }
      if (dateToRef.current && !dateToRef.current.contains(event.target as Node)) {
        setDateToOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      tripType,
      passengers,
      cabinClass,
      origin: origin.trim() || "Dublin (DUB)",
      destination: destination.trim() || "Medina (MED)",
      dateFrom,
      dateTo: tripType === "One way" ? undefined : dateTo,
    });
  };

  return (
    <div className="w-full rounded-[22px] border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)]">
      {/* 1. Top Options Row: Roundtrip, Passenger, Class */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-3">
        {/* Trip Type Dropdown */}
        <div className="relative" ref={tripRef}>
          <button
            type="button"
            onClick={() => {
              setTripDropdownOpen(!tripDropdownOpen);
              setPassDropdownOpen(false);
              setCabinDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100/90 active:scale-95 cursor-pointer"
          >
            <Repeat className="h-3 w-3 text-gray-500" />
            <span>{tripType}</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </button>

          {tripDropdownOpen && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[140px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
              {["Round trip", "One way", "Multi-city"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setTripType(type);
                    setTripDropdownOpen(false);
                  }}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition cursor-pointer ${
                    tripType === type
                      ? "bg-[#011847]/10 font-bold text-[#011847]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Passenger Count Dropdown */}
        <div className="relative" ref={passRef}>
          <button
            type="button"
            onClick={() => {
              setPassDropdownOpen(!passDropdownOpen);
              setTripDropdownOpen(false);
              setCabinDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100/90 active:scale-95 cursor-pointer"
          >
            <UserIcon className="h-3 w-3 text-gray-500" />
            <span>{passengers}</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </button>

          {passDropdownOpen && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[170px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
              {[
                "1 adult",
                "2 adults",
                "3 adults",
                "2 adults, 1 child",
                "Family (4+ travelers)",
              ].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPassengers(p);
                    setPassDropdownOpen(false);
                  }}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition cursor-pointer ${
                    passengers === p
                      ? "bg-[#011847]/10 font-bold text-[#011847]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cabin Class Dropdown */}
        <div className="relative" ref={cabinRef}>
          <button
            type="button"
            onClick={() => {
              setCabinDropdownOpen(!cabinDropdownOpen);
              setTripDropdownOpen(false);
              setPassDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100/90 active:scale-95 cursor-pointer"
          >
            <Armchair className="h-3 w-3 text-gray-500" />
            <span>{cabinClass}</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </button>

          {cabinDropdownOpen && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[160px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
              {["Economy", "Premium Economy", "Business", "First Class"].map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCabinClass(c);
                      setCabinDropdownOpen(false);
                    }}
                    className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition cursor-pointer ${
                      cabinClass === c
                        ? "bg-[#011847]/10 font-bold text-[#011847]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Route Row: Departure, Swap Button, Destination, Dates, Search Action */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5"
      >
        {/* Departure Box */}
        <div className="flex-1 min-w-[130px] flex items-center rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 transition-all focus-within:border-[#011847] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#011847]/15">
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Departure"
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
          />
        </div>

        {/* Airport Swap Button */}
        <button
          type="button"
          onClick={handleSwap}
          title="Swap departure and destination"
          aria-label="Swap airports"
          className="self-center flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-[#011847] hover:bg-[#011847]/5 hover:text-[#011847] active:scale-90 cursor-pointer"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
        </button>

        {/* Destination Box */}
        <div className="flex-1 min-w-[130px] flex items-center rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 transition-all focus-within:border-[#011847] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#011847]/15">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
          />
        </div>

        {/* Date From (Departure) Dropdown - Only Calendar */}
        <div className="relative shrink-0" ref={dateFromRef}>
          <button
            type="button"
            onClick={() => {
              setDateFromOpen(!dateFromOpen);
              setDateToOpen(false);
              setTripDropdownOpen(false);
              setPassDropdownOpen(false);
              setCabinDropdownOpen(false);
            }}
            className="flex h-[42px] items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/70 px-3 text-xs sm:text-sm font-semibold text-gray-800 transition hover:bg-gray-100 hover:border-gray-300 cursor-pointer active:scale-95"
            title="Departure Date"
          >
            <Calendar className="h-4 w-4 text-[#011847] shrink-0" />
            <span className="whitespace-nowrap">{dateFrom}</span>
            <ChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
          </button>

          {dateFromOpen && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
              <CalendarPicker
                value={dateFrom}
                onChange={(d) => {
                  setDateFrom(d);
                  setDateFromOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Date To (Return) Dropdown - Only Calendar */}
        <div className="relative shrink-0" ref={dateToRef}>
          <button
            type="button"
            onClick={() => {
              if (tripType === "One way") return;
              setDateToOpen(!dateToOpen);
              setDateFromOpen(false);
              setTripDropdownOpen(false);
              setPassDropdownOpen(false);
              setCabinDropdownOpen(false);
            }}
            className={`flex h-[42px] items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/70 px-3 text-xs sm:text-sm font-semibold transition cursor-pointer active:scale-95 ${
              tripType === "One way"
                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                : "text-gray-800 hover:bg-gray-100 hover:border-gray-300"
            }`}
            title="Return Date"
          >
            <Calendar className="h-4 w-4 text-[#011847] shrink-0" />
            <span className="whitespace-nowrap">
              {tripType === "One way" ? "No return" : dateTo}
            </span>
            <ChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
          </button>

          {dateToOpen && tripType !== "One way" && (
            <div className="absolute left-0 top-[calc(100%+6px)] z-30 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
              <CalendarPicker
                value={dateTo}
                onChange={(d) => {
                  setDateTo(d);
                  setDateToOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Search Button*/}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#011847] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#022368] active:scale-[0.98] cursor-pointer shrink-0"
          title="Search"
        >
          <Search className="h-3 w-3 text-white" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
