import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar o botão quando o usuário rolar mais de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-40 bg-[#003366] hover:bg-[#003366]/90 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover-lift hover-glow flex items-center gap-2 justify-center animate-fadeIn"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ArrowUp size={20} />
      <span className="text-sm font-semibold">Voltar ao Topo</span>
    </button>
  );
}
