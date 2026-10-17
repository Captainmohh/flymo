"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  MapPin,
  ChevronDown,
  Repeat,
  User as UserIcon,
  Armchair,
} from "lucide-react";
import AitaLogoVector from "./AitaLogoVector";

export interface FlightFilterValues {
  tripType: string;
  passengers: string;
  cabinClass: string;
  origin: string;
  destination: string;
}

interface FlightFiltersCardProps {
  onSearch: (filters: FlightFilterValues) => void;
  defaultOrigin?: string;
  defaultDestination?: string;
}

export default function FlightFiltersCard({
  onSearch,
  defaultOrigin = "Dublin (DUB)",
  defaultDestination = "Medina (MED)",
}: FlightFiltersCardProps) {
  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState("1 adult");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);

  const [tripDropdownOpen, setTripDropdownOpen] = useState(false);
  const [passDropdownOpen, setPassDropdownOpen] = useState(false);
  const [cabinDropdownOpen, setCabinDropdownOpen] = useState(false);

  const tripRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);

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

      {/* 2. Main Route Row: Departure, Swap Button, Destination, Search Action */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5"
      >
        {/* Departure Box */}
        <div className="flex-1 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2 transition-all focus-within:border-[#011847] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#011847]/15">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#011847] shadow-xs">
            <AitaLogoVector className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Departure
            </span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="City or airport"
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
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
        <div className="flex-1 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2 transition-all focus-within:border-[#011847] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#011847]/15">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 text-rose-500 shadow-xs">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Destination
            </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or airport"
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Search Flights Button in Design-Kit Navy (#011847) */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#011847] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#022368] active:scale-[0.98] cursor-pointer shrink-0"
        >
          <AitaLogoVector className="h-4 w-4 text-white" />
          <span>Search Flights</span>
        </button>
      </form>
    </div>
  );
}
