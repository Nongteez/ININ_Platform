import { NovelCarousel } from "./NovelCarousel";
import type { VisualNovel } from "@/data/visualNovels";
import { BookOpen } from "lucide-react";

interface ContinueReadingProps {
  novels: VisualNovel[];
}

export function ContinueReading({ novels }: ContinueReadingProps) {
  // Filter visual novels that have progress > 0
  const continueNovels = novels.filter(
    (n) => n.recentProgress !== undefined && n.recentProgress > 0
  );

  if (continueNovels.length === 0) return null;

  return (
    <div className="w-full space-y-3.5">
      <div className="flex items-center gap-2 px-2">
        <BookOpen className="h-5 w-5 text-purple-400" />
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
          Continue Reading
        </h2>
      </div>
      <NovelCarousel novels={continueNovels} variant="continue" />
    </div>
  );
}
