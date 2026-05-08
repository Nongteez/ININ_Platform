import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { rows } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXFLIX — ดูหนังและซีรีส์ออนไลน์ไม่จำกัด" },
      { name: "description", content: "ดูหนัง ซีรีส์ และออริจินัลคอนเทนต์ระดับโลกได้ทุกที่ทุกเวลา" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <div className="relative z-10 -mt-24 md:-mt-40 space-y-2">
        {rows.map((r) => (
          <MovieRow key={r.title} title={r.title} movies={r.movies} />
        ))}
      </div>
      <footer className="px-4 md:px-12 py-12 text-sm text-muted-foreground">
        <p>© 2026 NEXFLIX · เพื่อการสาธิตเท่านั้น</p>
      </footer>
    </div>
  );
}
