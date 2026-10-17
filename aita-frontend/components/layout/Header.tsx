import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="w-full px-3 sm:px-4 py-3 sm:py-4 overflow-x-hidden">
      <div className="mx-auto max-w-5xl rounded-2xl bg-card px-3 sm:px-6 py-2 flex items-center justify-between gap-2 shadow-xs">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0 min-w-0">
          <Image
            src="/aita-mark-navy-square.png"
            alt="AI Ticket Assistant logo"
            width={50}
            height={50}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] object-contain shrink-0"
            priority
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base md:text-lg font-bold text-card-foreground leading-tight truncate">
              flymo
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground">
              AI-Powered Flight Booking
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-card-foreground hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="shrink-0">
          <Button render={<Link href="/chat" />} nativeButton={false} size="sm" className="text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl">
            Get Started
          </Button>
        </div>

      </div>
    </header>
  );
}