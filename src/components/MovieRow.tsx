import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Movie = {
  title: string;
  img: string;
  year: number;
  match: number;
  duration: string;
  category?: string;
  rank?: number;
  progress?: number;
  description?: string;
};

interface MovieRowProps {
  title: string;
  movies: Movie[];
  variant?: "default" | "top10" | "continue";
}

export function MovieRow({ title, movies, variant = "default" }: MovieRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedMovie, setExpandedMovie] = useState<Movie | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group/row relative py-3 md:py-6"
      >
        {/* Section Title */}
        <div className="px-3.5 md:px-12 lg:px-16 mb-2.5 md:mb-3 flex items-center gap-3">
          <h2 className="text-[15px] md:text-xl lg:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            className="text-[#4CC9FF] text-xs font-semibold cursor-pointer hover:text-[#4CC9FF]/70 transition-colors flex items-center gap-1 overflow-hidden"
          >
            Explore All
            <ChevronRight className="h-3 w-3" />
          </motion.span>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <motion.button
            onClick={() => scroll(-1)}
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex absolute left-0 top-0 z-20 h-full w-14 items-center justify-center bg-gradient-to-r from-[#050816] via-[#050816]/60 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8 text-white/70" />
          </motion.button>

          {/* Movie Cards */}
          <div
            ref={ref}
            className="scrollbar-hide flex gap-2.5 md:gap-3 overflow-x-auto px-3.5 md:px-12 lg:px-16 pb-2 md:pb-4 scroll-smooth"
          >
            {movies.map((m, idx) => (
              <motion.div
                key={`${m.title}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group/card relative flex-none cursor-pointer ${variant === "top10"
                    ? "w-[44vw] sm:w-[30vw] md:w-[24vw] lg:w-[18vw]"
                    : "w-[40vw] sm:w-[28vw] md:w-[22vw] lg:w-[15vw]"
                  }`}
              >
                {/* Top 10 Rank Number */}
                {variant === "top10" && m.rank && (
                  <div className="absolute -left-2 bottom-0 z-10 rank-number select-none">
                    {m.rank}
                  </div>
                )}

                <motion.div
                  className="relative aspect-[2/3] overflow-hidden rounded-xl md:rounded-lg bg-[#0B1020] card-glow"
                  whileHover={{ scale: 1.05, y: -8, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    marginLeft: variant === "top10" ? "2rem" : 0,
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500"
                  />

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${hoveredIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                    style={{
                      background: "linear-gradient(180deg, transparent 30%, rgba(5,8,22,0.95) 100%)",
                    }}
                  />

                  {/* Hover ring — subtle */}
                  <div
                    className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${hoveredIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(157,77,255,0.15)",
                    }}
                  />

                  {/* Card Actions */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${hoveredIndex === idx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                      }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-8 w-8 rounded-full border border-white/25 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-8 w-8 rounded-full border border-white/25 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>

                    <p className="text-[13px] font-semibold truncate text-white">{m.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#AAB0C5]">
                      <span className="text-[#00E5A0] font-semibold">{m.match}%</span>
                      <span>{m.year}</span>
                      <span className="border border-white/15 px-1 py-0.5 rounded text-[9px]">HD</span>
                    </div>
                  </div>

                  {/* Continue Watching Progress */}
                  {variant === "continue" && m.progress !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="progress-bar-track">
                        <div className="progress-bar" style={{ width: `${m.progress}%` }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex absolute right-0 top-0 z-20 h-full w-14 items-center justify-center bg-gradient-to-l from-[#050816] via-[#050816]/60 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8 text-white/70" />
          </motion.button>
        </div>
      </motion.section>

      {/* Expanded Movie Modal */}
      <AnimatePresence>
        {expandedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpandedMovie(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B1020] rounded-2xl overflow-hidden max-w-2xl w-full shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] relative my-auto max-h-[90vh] flex flex-col ring-1 ring-white/5"
            >
              <div className="overflow-y-auto scrollbar-hide">
                {/* Image Header */}
                <div className="relative w-full aspect-video flex-shrink-0">
                  <img
                    src={expandedMovie.img}
                    alt={expandedMovie.title}
                    className="w-full h-full object-cover"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setExpandedMovie(null)}
                    className="absolute top-4 right-4 bg-[#0B1020]/80 hover:bg-[#0B1020] text-white rounded-full p-2 transition-colors cursor-pointer z-10 backdrop-blur-sm ring-1 ring-white/10"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 rounded-xl py-2.5 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-sm btn-play"
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Play
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center hover:border-white/50 transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center hover:border-white/50 transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Details */}
                <motion.div
                  className="p-6 space-y-5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {expandedMovie.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-[#AAB0C5]">
                      <span className="text-[#00E5A0] font-semibold">
                        {expandedMovie.match}% Match
                      </span>
                      <span>{expandedMovie.year}</span>
                      <span className="border border-white/15 px-2 py-0.5 rounded text-xs">
                        HD
                      </span>
                      <span>{expandedMovie.duration}</span>
                      {expandedMovie.category && (
                        <span className="border border-white/15 px-2 py-0.5 rounded text-xs">
                          {expandedMovie.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-white/70 leading-relaxed text-sm">
                    {expandedMovie.description ||
                      "When the last astronaut becomes stranded on a mysterious planet, he must confront the truth hidden beneath the blood-red sky."}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Romantic", "Thriller", "Action", "Drama"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2 text-xs text-[#AAB0C5]">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#00E5A0]" />
                      <span>4K Ultra HD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#00E5A0]" />
                      <span>HDR</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#00E5A0]" />
                      <span>5.1 Surround</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
