import React from "react";

interface AitaLogoVectorProps {
  className?: string;
  color?: string;
}

export default function AitaLogoVector({
  className = "w-5 h-5",
  color = "currentColor",
}: AitaLogoVectorProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="3.5" />
      <ellipse cx="50" cy="50" rx="45" ry="22" stroke={color} strokeWidth="2.8" />
      <ellipse cx="50" cy="50" rx="22" ry="45" stroke={color} strokeWidth="2.8" />
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="2.8" />
      <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="2.8" />
      <path
        d="M28 50 L35 45 L48 45 L42 38 L48 38 L58 48 L76 48 C79 48 82 49.5 82 50 C82 50.5 79 52 76 52 L58 52 L48 62 L42 62 L48 55 L35 55 Z"
        fill={color}
      />
    </svg>
  );
}
