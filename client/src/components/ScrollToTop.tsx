import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botão quando rolar para baixo
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll suave para o topo
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const distance = startPosition;
    const duration = 1500; // 1.5 segundos para scroll suave
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function para movimento mais suave
      const easeInOutQuad = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startPosition - distance * easeInOutQuad);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-[#003366] text-white p-3 rounded-full shadow-lg hover:bg-[#003366]/90 transition-all duration-300 z-40 flex items-center gap-2 animate-fadeIn"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <ChevronUp size={20} />
          <span className="text-sm font-semibold hidden sm:inline">Voltar ao Topo</span>
        </button>
      )}
    </>
  );
}
