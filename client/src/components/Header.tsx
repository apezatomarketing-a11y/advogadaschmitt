import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { BRAND_WHATSAPP } from "@/const";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    
    if (href.includes('#')) {
      const [path, id] = href.split('#');
      if (location === path || (path === "" && location === "/")) {
        const element = document.getElementById(id);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return;
        }
      }
    }
    
    setLocation(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    {
      name: "Para Empresas",
      path: "/para-empresas",
      dropdown: [
        { name: "Compliance e Gestão Ambiental", path: "/para-empresas#compliance" },
        { name: "Direito Administrativo", path: "/para-empresas#administrativo" },
        { name: "Direito Empresarial", path: "/para-empresas#empresarial" },
        { name: "Proteção Patrimonial", path: "/para-empresas#protecao" },
      ]
    },
    {
      name: "Saúde",
      path: "/saude",
      dropdown: [
        { name: "Direito à Saúde & Cannabis", path: "/saude#cannabis" },
        { name: "Judicialização Humanizada", path: "/saude#humanizada" },
        { name: "Tratamentos Doenças Raras", path: "/saude#raras" },
      ]
    },
    {
      name: "Família",
      path: "/familia",
      dropdown: [
        { name: "Planejamento Sucessório", path: "/familia#sucessorio" },
        { name: "Proteção Patrimonial", path: "/familia#protecao" },
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg"
          : "py-6 bg-[#003366] dark:bg-gray-950"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick("/")} 
          className="flex items-center gap-2 group cursor-pointer hover-lift"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-[#FF9900]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="/images/logo.png"
              alt="Vieira Schmitt"
              className="h-10 md:h-12 w-auto relative transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg md:text-xl font-bold leading-none transition-colors ${
              isScrolled ? "text-[#003366] dark:text-white" : "text-white"
            }`}>
              Vieira Schmitt
            </span>
            <span className="text-[10px] md:text-xs text-[#FF9900] font-semibold tracking-wider uppercase transition-colors">
              Advocacia
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 nav-link-underline ${
                  location === item.path || (item.dropdown && item.dropdown.some(d => location === d.path))
                    ? "text-[#FF9900]"
                    : isScrolled ? "text-[#003366] dark:text-gray-200 hover:text-[#FF9900]" : "text-white hover:text-[#FF9900]"
                }`}
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.dropdown && activeDropdown === item.name && (
                <div className="absolute top-full left-0 pt-4 w-72 animate-scaleIn">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-gray-900/95">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleNavClick(subItem.path)}
                        className="w-full text-left px-6 py-4 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#FF9900] transition-all duration-300 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:pl-8"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-12 ${
              isScrolled ? "text-[#003366] dark:text-gray-200" : "text-white"
            }`}
            title="Alternar Tema"
          >
            {theme === "dark" ? <Sun size={20} className="text-[#FF9900]" /> : <Moon size={20} />}
          </button>
          <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full px-6 py-5 font-bold hover-lift hover-glow">
              Agendar Consultoria
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 ${
              isScrolled ? "text-[#003366] dark:text-gray-200" : "text-white"
            }`}
          >
            {theme === "dark" ? <Sun size={20} className="text-[#FF9900]" /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isScrolled ? "text-[#003366] dark:text-gray-200" : "text-white"
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-6 animate-fadeIn">
          <div className="container mx-auto px-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col">
                <button
                  className={`text-left py-3 text-base font-semibold ${
                    location === item.path ? "text-[#FF9900]" : "text-gray-700 dark:text-gray-200"
                  }`}
                  onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === item.name ? null : item.name) : handleNavClick(item.path)}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    {item.dropdown && <ChevronDown size={18} className={activeDropdown === item.name ? "rotate-180" : ""} />}
                  </div>
                </button>
                {item.dropdown && activeDropdown === item.name && (
                  <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-100 dark:border-gray-800 ml-1 mt-1 mb-2">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.name}
                        className="text-left py-2 text-sm text-gray-500 dark:text-gray-400"
                        onClick={() => handleNavClick(subItem.path)}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <a href={BRAND_WHATSAPP} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#FF9900] text-white hover:bg-[#FF9900]/90 rounded-full py-6 font-bold">
                  Agendar Consultoria
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
