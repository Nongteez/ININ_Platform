import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { SplashScreen } from "@/components/SplashScreen";
import { rows } from "@/data/movies";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
        <Navbar />
        <Hero />

        {/* Movie Carousels */}
        <div className="relative z-10 -mt-24 md:-mt-36 space-y-1 pb-20 md:pb-0">
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
        <MobileNav />
      </div>
    </>
  );
}
