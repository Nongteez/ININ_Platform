import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp } from "lucide-react";

export type Movie = { title: string; img: string; year: number; match: number; duration: string };

export function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="group/row relative py-4 md:py-6">
      <h2 className="px-4 md:px-12 text-lg md:text-2xl font-bold mb-3">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-0 z-20 h-full w-12 items-center justify-center bg-background/40 opacity-0 group-hover/row:opacity-100 transition"
          aria-label="เลื่อนซ้าย"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div
          ref={ref}
          className="scrollbar-hide flex gap-2 md:gap-3 overflow-x-auto px-4 md:px-12 pb-6 scroll-smooth"
        >
          {movies.map((m) => (
            <div
              key={m.title}
              className="group/card relative flex-none w-[42vw] sm:w-[28vw] md:w-[19vw] lg:w-[15vw] transition-transform duration-300 hover:scale-110 hover:z-10 first:hover:translate-x-4 last:hover:-translate-x-4"
            >
              <div
                className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  width={512}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-2 translate-y-2 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition rounded-b-md bg-card p-3 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <button className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center pointer-events-auto">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                  <button className="h-8 w-8 rounded-full border border-foreground/60 flex items-center justify-center pointer-events-auto">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full border border-foreground/60 flex items-center justify-center pointer-events-auto">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm font-semibold truncate">{m.title}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary font-semibold">{m.match}% ตรงใจ</span>
                  <span>{m.year}</span>
                  <span className="border border-muted-foreground/40 px-1 rounded text-[10px]">HD</span>
                  <span>{m.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-0 z-20 h-full w-12 items-center justify-center bg-background/40 opacity-0 group-hover/row:opacity-100 transition"
          aria-label="เลื่อนขวา"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
