"use client";

import React, { useState } from "react";

export default function ScenicShowcase() {
  const [cliffImgError, setCliffImgError] = useState(false);
  const [savannaImgError, setSavannaImgError] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full w-full select-none">
      {/* =====================================================================
          SCENIC CARD 1: CLIFFS OF MOHER (DUBLIN / IRELAND ICONIC COASTLINE)
          Clean aesthetic with rounded corners, NO name badge overlays
          ===================================================================== */}
      <div
        className="group relative flex-1 min-h-[170px] sm:min-h-[220px] lg:min-h-[275px] w-full overflow-hidden rounded-[20px] border border-gray-200/90 shadow-[0_4px_18px_rgba(0,0,0,0.06)] bg-[#0c2444]"
        title="Cliffs of Moher coastal cliffs and Atlantic Ocean"
      >
        {/* Fallback Rich SVG Scenery: Cliffs of Moher (Emerald cliffs, ocean horizon, seagulls) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <svg
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="60%" stopColor="#B0E0E6" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="40%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
              <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="35%" stopColor="#166534" />
                <stop offset="70%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1F2937" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="600" height="400" fill="url(#skyGrad)" />
            {/* Sun Glow */}
            <circle cx="480" cy="90" r="45" fill="#FEF08A" opacity="0.6" filter="blur(8px)" />
            <circle cx="480" cy="90" r="28" fill="#FEF9C3" opacity="0.9" />

            {/* Clouds */}
            <ellipse cx="120" cy="80" rx="70" ry="22" fill="#FFFFFF" opacity="0.8" />
            <ellipse cx="160" cy="70" rx="50" ry="28" fill="#FFFFFF" opacity="0.85" />
            <ellipse cx="380" cy="110" rx="90" ry="24" fill="#FFFFFF" opacity="0.75" />

            {/* Ocean Horizon */}
            <rect y="170" width="600" height="230" fill="url(#oceanGrad)" />

            {/* Ocean Waves Waves */}
            <path d="M0,210 Q 150,205 300,210 T 600,210 L 600,218 L 0,218 Z" fill="#38BDF8" opacity="0.3" />
            <path d="M0,230 Q 120,225 240,230 T 480,230 T 600,230 L 600,238 L 0,238 Z" fill="#38BDF8" opacity="0.25" />

            {/* Layered Cliffs of Moher Silhouette */}
            {/* Background Headland */}
            <path d="M180,170 Q 230,220 280,250 L 320,310 L 180,400 L 0,400 L 0,170 Z" fill="#1E293B" opacity="0.4" />
            
            {/* Main Dramatic Cliff Edge */}
            <path d="M0,130 Q 80,120 160,150 Q 220,180 260,250 L 290,400 L 0,400 Z" fill="url(#cliffGrad)" />

            {/* Cliff Texture Lines */}
            <path d="M120,150 L 130,280 L 140,400 M 160,165 L 175,320 M 200,200 L 210,380" stroke="#0F172A" strokeWidth="4" opacity="0.35" />

            {/* Lush Emerald Cliff Top */}
            <path d="M0,130 Q 80,118 160,148 Q 210,175 250,235 L 240,245 Q 190,185 150,155 Q 70,128 0,138 Z" fill="#22C55E" />

            {/* Seagulls in flight */}
            <path d="M220,90 Q 225,82 230,90 Q 235,82 240,90" stroke="#334155" strokeWidth="2" fill="none" />
            <path d="M270,75 Q 274,68 278,75 Q 282,68 286,75" stroke="#334155" strokeWidth="1.8" fill="none" />
            <path d="M310,105 Q 314,99 318,105 Q 322,99 326,105" stroke="#334155" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Real photo overlay (loads if host accessible, gracefully falls back to SVG scenery on DNS/network blocks) */}
        {!cliffImgError && (
          <img
            src="https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1000&q=80"
            alt="Cliffs of Moher coastal cliffs and Atlantic Ocean"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setCliffImgError(true)}
            loading="lazy"
          />
        )}

        {/* Subtle vignette gradient for depth (no text overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* =====================================================================
          SCENIC CARD 2: AFRICAN SCENIC PLACE (SERENGETI SAVANNA SUNSET)
          Clean aesthetic with rounded corners, NO name badge overlays
          ===================================================================== */}
      <div
        className="group relative flex-1 min-h-[170px] sm:min-h-[220px] lg:min-h-[275px] w-full overflow-hidden rounded-[20px] border border-gray-200/90 shadow-[0_4px_18px_rgba(0,0,0,0.06)] bg-[#451a03]"
        title="African scenic savanna landscape at sunset"
      >
        {/* Fallback Rich SVG Scenery: African Savanna Sunset (Golden sky, acacia tree, savanna plains) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <svg
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="savannaSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C2D12" />
                <stop offset="30%" stopColor="#C2410C" />
                <stop offset="65%" stopColor="#EA580C" />
                <stop offset="85%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
              <linearGradient id="savannaGround" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="30%" stopColor="#451A03" />
                <stop offset="100%" stopColor="#1C1917" />
              </linearGradient>
            </defs>

            {/* Sunset Sky */}
            <rect width="600" height="400" fill="url(#savannaSky)" />

            {/* Golden Setting Sun */}
            <circle cx="340" cy="220" r="80" fill="#FEF08A" opacity="0.85" filter="blur(6px)" />
            <circle cx="340" cy="220" r="60" fill="#FFFBEB" opacity="0.95" />

            {/* Distant Hills */}
            <path d="M0,285 Q 120,270 240,280 T 480,275 T 600,285 L 600,400 L 0,400 Z" fill="#9A3412" opacity="0.7" />

            {/* Foreground Savanna Ground */}
            <path d="M0,310 Q 150,295 300,312 T 600,305 L 600,400 L 0,400 Z" fill="url(#savannaGround)" />

            {/* Iconic Umbrella Acacia Tree Silhouette (Left) */}
            <g fill="#1C1917">
              {/* Trunk & Main Branches */}
              <path d="M125,335 C 127,290 120,250 115,220 C 115,200 100,180 80,165 L 85,160 C 108,178 122,198 123,218 C 128,195 145,180 170,165 L 174,170 C 152,184 135,198 131,222 C 133,260 135,295 137,335 Z" />
              <path d="M120,230 C 105,210 85,195 60,185 L 63,180 C 88,190 110,205 125,225 Z" />
              <path d="M128,225 C 145,210 165,198 190,190 L 192,195 C 168,202 148,214 132,230 Z" />
              
              {/* Acacia Flat Canopy Foliage Pads */}
              <ellipse cx="75" cy="162" rx="42" ry="12" />
              <ellipse cx="125" cy="155" rx="52" ry="14" />
              <ellipse cx="175" cy="165" rx="46" ry="12" />
              <ellipse cx="60" cy="182" rx="30" ry="9" />
              <ellipse cx="190" cy="188" rx="34" ry="10" />
            </g>

            {/* Distant Acacia Tree (Right) */}
            <g fill="#292524" opacity="0.85">
              <path d="M470,320 C 471,290 467,265 464,248 C 456,234 445,222 430,212 L 433,209 C 449,219 460,230 468,245 C 474,230 484,220 500,210 L 503,213 C 488,223 478,232 474,248 C 476,270 477,295 478,320 Z" />
              <ellipse cx="430" cy="210" rx="30" ry="8" />
              <ellipse cx="468" cy="205" rx="36" ry="9" />
              <ellipse cx="500" cy="212" rx="28" ry="8" />
            </g>

            {/* Birds soaring near sunset */}
            <path d="M260,130 Q 264,124 268,130 Q 272,124 276,130" stroke="#451A03" strokeWidth="1.8" fill="none" />
            <path d="M290,115 Q 293,110 296,115 Q 299,110 302,115" stroke="#451A03" strokeWidth="1.5" fill="none" />
            <path d="M380,140 Q 384,135 388,140 Q 392,135 396,140" stroke="#451A03" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Real photo overlay (loads if host accessible, gracefully falls back to SVG scenery on DNS/network blocks) */}
        {!savannaImgError && (
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
            alt="African scenic savanna sunset with acacia trees"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setSavannaImgError(true)}
            loading="lazy"
          />
        )}

        {/* Subtle vignette gradient for depth (no text overlay) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
