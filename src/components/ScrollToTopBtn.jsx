import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // إظهار الزر عند التمرير لأسفل
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg transition-all duration-300 z-50 animate-bounce cursor-pointer"
      >
        <ChevronUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopBtn;
