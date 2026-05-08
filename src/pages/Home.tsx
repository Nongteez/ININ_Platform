import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { Footer } from "@/components/Footer";
import { rows } from "@/data/movies";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <Navbar />
      <Hero />

      {/* Movie Carousels */}
      <div className="relative z-10 -mt-32 md:-mt-48 space-y-1">
        {rows.map((r) => (
          <MovieRow
            key={r.title}
            title={r.title}
            movies={r.movies}
            variant={r.variant}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
