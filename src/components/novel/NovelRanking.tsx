import { motion } from "framer-motion";
import { Eye, TrendingUp } from "lucide-react";
import type { VisualNovel } from "@/data/visualNovels";

interface NovelRankingProps {
  novels: VisualNovel[];
}

export function NovelRanking({ novels }: NovelRankingProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col gap-4 bg-[#0B1020]/30 rounded-3xl border border-white/[0.04] p-5 md:p-6 backdrop-blur-md">
      
      {/* Title Header */}
      <div className="flex items-center gap-2 mb-2 pb-3 border-b border-white/[0.05]">
        <TrendingUp className="h-5 w-5 text-purple-400" />
        <h2 className="text-lg font-bold text-white tracking-tight">
          New & Trending Top 10
        </h2>
      </div>

      {/* Rankings List */}
      <div className="flex flex-col gap-4">
        {novels.slice(0, 10).map((novel, index) => {
          const rank = index + 1;
          return (
            <motion.div
              key={novel.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 py-1.5 group cursor-pointer border-b border-white/[0.02] last:border-0"
            >
              
              {/* Giant Rank Number */}
              <div className="w-10 flex justify-center select-none">
                <span className="text-3xl md:text-4xl font-black italic text-zinc-700/50 group-hover:text-purple-500/40 transition-colors">
                  {rank}
                </span>
              </div>

              {/* Cover Thumbnail */}
              <div className="relative w-12 aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shadow-md">
                <img
                  src={novel.cover}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h3 className="text-xs sm:text-[13px] font-bold text-white leading-tight line-clamp-1 group-hover:text-purple-300 transition-colors">
                  {novel.title}
                </h3>
                
                <div className="flex items-center gap-2.5 text-[10px] text-zinc-500 font-semibold">
                  <span className="text-purple-400/80">{novel.genres[0]}</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                  <span className="flex items-center gap-0.5">
                    <Eye className="h-3 w-3" />
                    {formatNumber(novel.views)} views
                  </span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
