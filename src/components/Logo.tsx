import { Link } from "@tanstack/react-router";
import logo from "@/assets/ethixweb-logo-text.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center group ${className}`}>
      <img
        src={logo}
        alt="Ethixweb"
        className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
