import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="Search by title, genre, tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-[#0B1020]/80 border border-white/[0.06] rounded-2xl text-sm font-medium text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-purple-500/40 focus:bg-[#0B1020] focus:shadow-[0_0_20px_rgba(157,77,255,0.15)] focus:ring-1 focus:ring-purple-500/30"
      />
    </div>
  );
}
