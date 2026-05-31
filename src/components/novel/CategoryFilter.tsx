interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  "All",
  "Romance",
  "Boy Love",
  "Horror",
  "Mystery",
  "Fantasy",
  "Drama",
  "School Life",
  "Comedy",
  "Thriller"
];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-1">
      <div className="flex items-center gap-2.5 pb-2 md:pb-0">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-purple-500/[0.18] text-white border border-purple-500/30 shadow-[0_0_12px_rgba(157,77,255,0.25)]"
                  : "bg-white/[0.03] text-zinc-400 border border-transparent hover:text-white hover:bg-white/[0.06] hover:border-white/[0.08]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
