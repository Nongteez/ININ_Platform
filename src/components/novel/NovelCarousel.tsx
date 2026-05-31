import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NovelCard } from "./NovelCard";
import type { VisualNovel } from "@/data/visualNovels";

interface NovelCarouselProps {
  novels: VisualNovel[];
  variant?: "default" | "continue" | "spotlight";
}

export function NovelCarousel({ novels, variant = "default" }: NovelCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to dynamically show/hide arrows
  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      // scrollWidth - clientWidth is the max scroll position. Allow a small epsilon.
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [novels]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      // Scroll by 75% of the visible container width
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!novels || novels.length === 0) {
    return (
      <div className="text-zinc-500 font-medium py-10 pl-2">
        No Visual Novels found.
      </div>
    );
  }

  return (
    <div className="relative group/carousel w-full">
      {/* 1. Left Arrow Button */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 md:left-6 top-[40%] -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#9D4DFF]/60 border border-white/10 text-white backdrop-blur-md shadow-2xl hover:scale-108 hover:border-purple-400/30 transition-all duration-300 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* 2. Scrolling Track Container */}
      <div
        ref={rowRef}
        className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-2 select-none"
      >
        {novels.map((novel) => (
          <div
            key={novel.id}
            className="flex-shrink-0 w-[170px] sm:w-[200px] md:w-[220px]"
          >
            <NovelCard novel={novel} variant={variant} />
          </div>
        ))}
      </div>

      {/* 3. Right Arrow Button */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 md:right-6 top-[40%] -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#9D4DFF]/60 border border-white/10 text-white backdrop-blur-md shadow-2xl hover:scale-108 hover:border-purple-400/30 transition-all duration-300 cursor-pointer opacity-0 group-hover/carousel:opacity-100"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
