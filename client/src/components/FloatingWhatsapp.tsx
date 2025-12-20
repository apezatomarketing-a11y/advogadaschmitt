import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND_WHATSAPP } from "@/const";

export default function FloatingWhatsapp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={BRAND_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
