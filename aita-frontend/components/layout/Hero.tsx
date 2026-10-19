"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, Plane, Wifi, Luggage, ArrowRight, Sparkles } from "lucide-react";

interface StepItem {
  id: number;
  title: string;
  description: string;
  badge?: string;
  circleColor: string;
}

export default function Hero() {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps: StepItem[] = [
    {
      id: 1,
      title: "Talk to AI",
      description: "Chat naturally: 'Find me a direct flight from New York to London next Friday under $600 with luggage.'",
      circleColor: "bg-sky-500",
    },
    {
      id: 2,
      title: "Match Route & Aircraft",
      description: "The AI compares hundreds of airlines, analyzes live seat maps, aircraft models, and optimal layovers.",
      circleColor: "bg-indigo-600",
    },
    {
      id: 3,
      title: "Get Available Ticket",
      description: "Select your preferred seat, confirm passenger details, and receive your verified digital boarding pass.",
      badge: "Instant",
      circleColor: "bg-gradient-to-tr from-orange-500 to-amber-500",
    },
  ];

  return (
    <section className="w-full max-w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 overflow-x-hidden">
      <div className="mx-auto max-w-6xl w-full min-w-0">
        
        {/* Top Header / Value Proposition */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2 min-w-0 w-full">
         
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.2] tracking-tight max-w-full break-words">
            {"Book flights the way you'd "}
            <span className="relative inline-block text-sky-400">
              ask a friend!
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2 sm:h-2.5 text-sky-400/80"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,7 Q50,0 100,7"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="font-heading text-sm sm:text-base md:text-lg text-foreground/75 mt-3 sm:mt-4 max-w-2xl leading-relaxed">
            Search flights, compare live aircraft, and secure your available ticket — from chat conversation to boarding pass in 3 simple steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-5 sm:mt-6 w-full sm:w-auto justify-center max-w-xs sm:max-w-none mx-auto">
            <Button
              render={<Link href="/chat" />}
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base font-bold rounded-full bg-white text-slate-900 hover:bg-white/90 px-6 py-2.5 shadow-md flex items-center justify-center gap-2"
            >
              Start Searching
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              render={<Link href="#how-it-works" />}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base font-bold rounded-full border border-white/30 text-white bg-white/5 hover:bg-white/15 px-6 py-2.5 justify-center"
            >
              How It Works
            </Button>
          </div>
        </div>

        {/* 2-Column Showcase (Steps on Left, Aircraft & Ticket on Right) */}
        <div id="how-it-works" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full min-w-0">
          
          {/* LEFT: 3-Step Flow with Mathematically Centered Dotted Guide */}
          <div className="lg:col-span-5 relative w-full min-w-0">
            
            {/* 
              Mathematically Centered Dotted Line:
              - Mobile: padding p-4 (pl = 16px), circle is 40px wide (half = 20px) -> Center is 16 + 20 = 36px.
              - Desktop: sm:p-5 (pl = 20px), circle is 44px wide (half = 22px) -> Center is 20 + 22 = 42px.
            */}
            <div
              aria-hidden="true"
              className="absolute left-[36px] sm:left-[42px] top-[36px] sm:top-[42px] bottom-[36px] sm:bottom-[42px] w-0 -translate-x-1/2 border-l-2 border-dashed border-white/30 pointer-events-none z-0"
            />

            <div className="space-y-3.5 sm:space-y-4 relative z-10 w-full min-w-0">
              {steps.map((step) => {
                const isActive = step.id === activeStep;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`cursor-pointer transition-all duration-200 rounded-2xl p-4 sm:p-5 relative w-full min-w-0 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-xl border border-white"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    {/* Active Accent Bar on Bottom */}
                    {isActive && (
                      <div className="absolute bottom-0 left-6 sm:left-7 w-12 sm:w-14 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-full" />
                    )}

                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      {/* Step Circle Badge */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 transition-all relative z-10 shadow-sm ${
                          isActive
                            ? "bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 sm:text-base"
                            : `${step.circleColor} text-white`
                        }`}
                      >
                        {isActive ? step.id : <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />}
                      </div>

                      {/* Content */}
                      <div className="pt-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`font-bold text-sm sm:text-base md:text-lg leading-snug truncate ${
                              isActive ? "text-slate-900" : "text-white"
                            }`}
                          >
                            {step.id}. {step.title}
                          </h3>
                          {step.badge && isActive && (
                            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                              {step.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                            isActive ? "text-slate-600" : "text-white/70"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Airplane Route & Available Ticket Showcase */}
          <div className="lg:col-span-7 relative w-full min-w-0">
            
            {/* Browser / App Window Mockup */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden text-slate-900 w-full min-w-0">
              
              {/* Window Top Bar */}
              <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                
                <div className="flex-1 flex justify-center min-w-0 px-2">
                  <div className="bg-white border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-500 font-mono flex items-center gap-1.5 shadow-2xs max-w-xs w-full justify-center truncate">
                    <span className="truncate">flymo.travel/flights/JFK-LHR</span>
                  </div>
                </div>

                <div className="w-8 shrink-0" />
              </div>

              {/* Main Inside Card Area with Generous Height and Breathing Room */}
              <div className="p-4 sm:p-7 bg-gradient-to-b from-sky-50/40 via-white to-slate-50/60 relative w-full min-w-0 sm:min-h-[460px]">
                
                {/* Flight Route Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md">
                      Live AI Route Match
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                      New York (JFK) ➔ London (LHR)
                    </h4>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start sm:self-auto shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Seats Available
                  </div>
                </div>

                {/* Plane Route Path Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden mb-4 w-full min-w-0">
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    {/* Origin Airport */}
                    <div className="shrink-0 text-left">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">JFK</div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">New York</div>
                      <div className="text-xs text-sky-600 font-semibold">20:30 EST</div>
                    </div>

                    {/* Flight Arc and Plane */}
                    <div className="flex-1 px-2 sm:px-6 flex flex-col items-center min-w-0">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 truncate">
                        <span>6h 55m</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">Non-Stop</span>
                      </div>

                      <div className="w-full relative flex items-center justify-center my-2">
                        <div className="w-full border-t-2 border-dashed border-sky-300" />
                        <div className="absolute bg-sky-600 text-white p-1.5 rounded-full shadow-md shadow-sky-600/30">
                          <Plane className="w-4 h-4 transform rotate-90" />
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 font-medium mt-1 text-center truncate">
                        ✈ Boeing 787-9 Dreamliner
                      </div>
                    </div>

                    {/* Destination Airport */}
                    <div className="text-right shrink-0">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">LHR</div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">London Heathrow</div>
                      <div className="text-xs text-sky-600 font-semibold">
                        08:25 <sup className="text-amber-500 font-bold">+1</sup>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aircraft Amenities Pills */}
                <div className="flex flex-wrap gap-2 text-xs text-slate-600 mb-6 sm:mb-8">
                  <span className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                    <Luggage className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Carry-on Bag
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                    <Wifi className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Fast Wi-Fi
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                    🍴 In-Flight Meal Included
                  </span>
                </div>

                {/*Available Ticket stamp*/}
                <div className="w-full sm:w-80 sm:absolute sm:bottom-6 sm:right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 z-20">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-slate-900">Available Ticket</span>
                    </div>
                    <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      $549
                    </span>
                  </div>

                  {/* Clean 3-Column Flight Pass Specs (Spacious, modern, no cramming) */}
                  <div className="grid grid-cols-3 gap-2 py-3.5 border-b border-slate-100 my-1 text-center sm:text-left">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Seat</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">14A</div>
                      <div className="text-[11px] text-slate-500">Window</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cabin</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">Premium</div>
                      <div className="text-[11px] text-slate-500">Economy</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gate</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">B24</div>
                      <div className="text-[11px] text-slate-500">Terminal 4</div>
                    </div>
                  </div>

                  {/* Primary Orange CTA Button */}
                  <div className="relative pt-2">
                    <Link
                      href="/chat"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/25 text-sm transition duration-150 flex items-center justify-center gap-2 group"
                    >
                      <span>Download E-Ticket</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    {/* Mouse Pointer Cursor (Desktop) */}
                    <div className="hidden sm:block absolute -bottom-3 right-6 pointer-events-none drop-shadow-md">
                      <svg
                        className="w-6 h-6 text-slate-900 fill-white"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l7 18 3-7 7-3L3 3z" />
                      </svg>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION*/}
        <div id="about" className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT: Big illustration from design kit (Lady with travel planning box) */}
            <div className="lg:col-span-5 flex justify-center w-full min-w-0 order-2 lg:order-1">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none flex justify-center">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-sky-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
                
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl w-full flex items-center justify-center">
                  <Image
                    src="/hero-travel-planning.svg"
                    alt="Flight Ticket Assistant - Lady planning travel itinerary"
                    width={520}
                    height={520}
                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Write-up */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left w-full min-w-0 order-1 lg:order-2">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.2] tracking-tight max-w-full break-words">
                {"About "}
                <span className="relative inline-block text-sky-400">
                  flymo
                  <svg
                    className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2 sm:h-2.5 text-sky-400/80"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,7 Q50,0 100,7"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="font-heading text-sm sm:text-base text-foreground/80 mt-4 leading-relaxed">
                Booking your flights shouldn’t require dozens of browser tabs, deciphering confusing airline policies, or worrying about hidden baggage surcharges. Flight Ticket Assistant brings conversational intelligence to modern aviation booking.
              </p>

              <p className="font-heading text-sm sm:text-base text-foreground/70 mt-3 leading-relaxed">
                Simply state where you want to go in plain English. The assistant scans live carrier networks, compares aircraft amenities, identifies direct routes, and generates verified e-tickets ready for departure.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Natural Conversation</h4>
                    <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                      Skip rigid filters. Speak naturally to search flights by budget, time, or stops.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Real-Time Aircraft Data</h4>
                    <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                      Instant visibility into aircraft models, seat availability, Wi-Fi, and baggage rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  render={<Link href="/chat" />}
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base font-bold rounded-full bg-white text-slate-900 hover:bg-white/90 px-6 py-2.5 shadow-md flex items-center justify-center gap-2"
                >
                  Start Booking with AI
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );

}