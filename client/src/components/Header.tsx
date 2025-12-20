import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, BRAND_WHATSAPP } from "@/const";
import { Button } from "./ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="Vieira Schmitt Advocacia"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:inline text-sm font-bold text-[#003366]">
              VS Advocacia
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.name} href={item.path}>
              <a
                className={`text-sm font-medium transition-colors ${
                  location === item.path
                    ? "text-[#FF9900]"
                    : "text-gray-700 hover:text-[#003366]"
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full">
              Agendar Consultoria
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#003366] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link key={item.name} href={item.path}>
                <a
                  className={`text-sm font-medium transition-colors ${
                    location === item.path
                      ? "text-[#FF9900]"
                      : "text-gray-700 hover:text-[#003366]"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full">
                Agendar Consultoria
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
