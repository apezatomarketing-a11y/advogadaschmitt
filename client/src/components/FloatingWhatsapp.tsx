import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND_WHATSAPP } from "@/const";

export default function FloatingWhatsapp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={BRAND_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Abrir WhatsApp"
    >
      {/* Efeito de bolhas pulsantes */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
      <div 
        className="absolute inset-1 bg-[#25D366] rounded-full animate-pulse opacity-50"
        style={{ animationDelay: "0.1s" }}
      ></div>

      {/* Botao principal */}
      <button className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 hover-lift hover-glow flex items-center justify-center animate-fadeIn">
        <MessageCircle size={28} fill="currentColor" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </a>
  );
}
