import { motion } from "framer-motion";
import { Eye, Heart, BookOpen } from "lucide-react";
import type { VisualNovel } from "@/data/visualNovels";

interface NovelCardProps {
  novel: VisualNovel;
  variant?: "default" | "continue" | "spotlight";
}

export function NovelCard({ novel, variant = "default" }: NovelCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex flex-col w-full bg-[#0B1020]/45 rounded-2xl overflow-hidden border border-white/[0.05] hover:border-purple-500/25 shadow-lg hover:shadow-[0_8px_30px_rgba(157,77,255,0.12)] transition-all duration-300 cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
        <img
          src={novel.cover}
          alt={novel.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Banners & Badges */}
        {novel.original && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] text-white rounded-md shadow-md border border-white/10">
            ININ Original
          </div>
        )}

        {novel.match && (
          <div className="absolute top-3 right-3 z-10 px-2 py-0.5 text-[10px] font-bold bg-[#34D399]/90 text-black rounded-md shadow-md">
            {novel.match}% Match
          </div>
        )}

        {/* Hover Overlay — Read Button slide-up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] rounded-xl shadow-lg border border-purple-400/20"
          >
            Read Now
          </motion.div>
        </div>
      </div>

      {/* Info Details */}
      <div className="flex flex-col flex-grow p-4 gap-2.5 bg-gradient-to-b from-[#0B1020]/20 to-[#0B1020]/70">
        {/* Title */}
        <h3 className="text-[14px] font-bold text-white leading-tight line-clamp-1 group-hover:text-purple-300 transition-colors">
          {novel.title}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {novel.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.03]"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Progress bar layout for continue reading */}
        {variant === "continue" && novel.recentProgress !== undefined && (
          <div className="w-full mt-1.5 space-y-1">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>Progress</span>
              <span className="font-semibold text-purple-400">{novel.recentProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] rounded-full"
                style={{ width: `${novel.recentProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Regular stats display */}
        {variant !== "continue" && (
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold mt-auto pt-1 border-t border-white/[0.03]">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-zinc-400" />
              <span>{formatNumber(novel.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-purple-500/80" />
              <span>{formatNumber(novel.likes)}</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <BookOpen className="h-3 w-3 text-purple-400/70" />
              <span>{novel.endings} Endings</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
