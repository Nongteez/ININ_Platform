import { useEffect, useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["หน้าแรก", "ซีรีส์", "ภาพยนตร์", "ใหม่และน่าสนใจ", "รายการของฉัน"];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-background" : "bg-gradient-to-b from-background/90 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <span className="text-primary text-2xl md:text-3xl font-black tracking-tighter select-none">
            NEXFLIX
          </span>
          <nav className="hidden md:flex items-center gap-5 text-sm text-foreground/90">
            {links.map((l, i) => (
              <a key={l} href="#" className={i === 0 ? "font-medium" : "text-muted-foreground hover:text-foreground transition"}>
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-foreground/90">
          <Search className="h-5 w-5 cursor-pointer" />
          <Bell className="h-5 w-5 cursor-pointer hidden sm:block" />
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-destructive" />
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
