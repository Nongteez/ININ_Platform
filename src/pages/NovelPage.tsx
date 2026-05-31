import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FeaturedNovel } from "@/components/novel/FeaturedNovel";
import { ContinueReading } from "@/components/novel/ContinueReading";
import { SearchBar } from "@/components/novel/SearchBar";
import { CategoryFilter } from "@/components/novel/CategoryFilter";
import { NovelCard } from "@/components/novel/NovelCard";
import { NovelCarousel } from "@/components/novel/NovelCarousel";
import { NovelRanking } from "@/components/novel/NovelRanking";
import { visualNovels } from "@/data/visualNovels";
import { Sparkles, Compass, Flame, ShieldAlert } from "lucide-react";

export default function NovelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Featured Novel Selection
  const featuredNovel = useMemo(() => {
    return visualNovels.find((vn) => vn.featured) || visualNovels[0];
  }, []);

  // 2. Filter Novels in Real Time
  const filteredNovels = useMemo(() => {
    return visualNovels.filter((vn) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        vn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vn.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        vn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vn.tags && vn.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        selectedCategory === "All" ||
        vn.genres.some((g) => g.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "All";

  // 3. Weekly Spotlight (Grid of 6)
  const spotlightNovels = useMemo(() => {
    // Curated high-rated ones for Spotlight
    return visualNovels.slice(0, 6);
  }, []);

  // 4. New & Trending (Top 10 sorted by views)
  const trendingNovels = useMemo(() => {
    return [...visualNovels].sort((a, b) => b.views - a.views).slice(0, 10);
  }, []);

  // 5. Recommended For You (Sorted by match ratio)
  const recommendedNovels = useMemo(() => {
    return [...visualNovels].sort((a, b) => (b.match || 0) - (a.match || 0));
  }, []);

  // 6. Popular on ININ (Sorted by likes)
  const popularNovels = useMemo(() => {
    return [...visualNovels].sort((a, b) => b.likes - a.likes);
  }, []);

  // 7. ININ Originals
  const originalNovels = useMemo(() => {
    return visualNovels.filter((vn) => vn.original);
  }, []);

  // 8. Recently Updated (Sorted by lastUpdated date descending)
  const recentlyUpdatedNovels = useMemo(() => {
    return [...visualNovels].sort(
      (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden font-sans">
      
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-purple-900/5 blur-[150px] pointer-events-none" />

      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Main Body Content */}
      <AnimatePresence mode="wait">
        {!hasActiveFilters ? (
          <motion.div
            key="discovery-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1: Featured Cinematic Hero */}
            <FeaturedNovel novel={featuredNovel} />

            {/* Content Body Container */}
            <div className="relative z-20 -mt-12 md:-mt-24 space-y-12 md:space-y-16 pb-20 max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
              
              {/* SECTION 2: Continue Reading horizontal carousel */}
              <ContinueReading novels={visualNovels} />

              {/* SEARCH & FILTERS CONTROLS AREA */}
              <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center py-6 border-y border-white/[0.05] bg-[#0B1020]/20 rounded-3xl p-6 backdrop-blur-md">
                <div className="space-y-1.5 max-w-md">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Compass className="h-5 w-5 text-purple-400" />
                    Browse Catalog
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Use filters or search bar to discover novels from Romance to Horror
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
              </div>

              {/* Category selector chips under browse */}
              <div className="space-y-2">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* SECTION 3 & 4: Spotlight Grid (Left 8 cols) + Trending list (Right 4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                
                {/* Weekly Spotlight (Grid of 6) */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      Weekly Spotlight
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {spotlightNovels.map((novel) => (
                      <NovelCard key={novel.id} novel={novel} variant="spotlight" />
                    ))}
                  </div>
                </div>

                {/* New & Trending (Top 10 right-side list) */}
                <div className="col-span-12 lg:col-span-4">
                  <NovelRanking novels={trendingNovels} />
                </div>

              </div>

              {/* SECTION 5: Recommended For You Row */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <Flame className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    Recommended For You
                  </h2>
                </div>
                <NovelCarousel novels={recommendedNovels} />
              </div>

              {/* SECTION 6: Popular Row */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight px-1">
                  Popular Novels
                </h2>
                <NovelCarousel novels={popularNovels} />
              </div>

              {/* SECTION 7: ININ Originals Row */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black px-2 py-0.5 tracking-wider bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] text-white rounded-md mr-2">
                    ORIGINALS
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    ININ Originals
                  </h2>
                </div>
                <NovelCarousel novels={originalNovels} />
              </div>

              {/* SECTION 8: Recently Updated Row */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight px-1">
                  What's New / Recently Updated
                </h2>
                <NovelCarousel novels={recentlyUpdatedNovels} />
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-catalog-results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-12 lg:px-16 space-y-8"
          >
            {/* Catalog header with search filters in search mode */}
            <div className="flex flex-col gap-6 md:flex-row justify-between items-start md:items-center py-6 border-b border-white/[0.05]">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Search & Filter Results
                </h1>
                <p className="text-xs text-zinc-400">
                  Showing {filteredNovels.length} visual novels matching your criteria
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                {(searchQuery.trim() !== "" || selectedCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white text-xs text-zinc-400 font-semibold transition-all cursor-pointer text-center"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Filter chips at the top */}
            <div className="space-y-2">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Dynamic Results Grid */}
            {filteredNovels.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
              >
                {filteredNovels.map((novel) => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-[#0B1020]/20 rounded-3xl border border-white/[0.04] p-8 max-w-lg mx-auto"
              >
                <ShieldAlert className="h-10 w-10 text-purple-400" />
                <h3 className="text-lg font-bold text-white">No Visual Novels Found</h3>
                <p className="text-xs text-zinc-400 max-w-sm">
                  We couldn't find any match for "{searchQuery}" under "{selectedCategory}". Try clearing your filters or testing other terms.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] rounded-xl hover:shadow-[0_0_15px_rgba(157,77,255,0.2)] transition-all cursor-pointer"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />

      {/* Utilities */}
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
