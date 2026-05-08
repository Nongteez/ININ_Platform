import { Play, Info } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={hero}
        alt="ภาพยนตร์เด่น"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-side)" }} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 flex h-full flex-col justify-end md:justify-center pb-24 md:pb-0 px-4 md:px-12 max-w-2xl">
        <p className="text-primary font-semibold text-sm tracking-widest mb-3">N · ออริจินัล</p>
        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground drop-shadow-2xl">
          เงาแห่งดาวแดง
        </h1>
        <p className="mt-4 text-base md:text-lg text-foreground/85 max-w-xl drop-shadow-lg">
          เมื่อนักบินอวกาศคนสุดท้ายติดอยู่บนดาวเคราะห์ลึกลับ เขาต้องเผชิญหน้ากับความจริง
          ที่ซ่อนอยู่ใต้ท้องฟ้าสีเลือด การเดินทางสู่ขอบจักรวาลกำลังจะเริ่มต้น
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded bg-foreground text-background px-6 py-2.5 font-semibold hover:bg-foreground/85 transition">
            <Play className="h-5 w-5 fill-current" /> เล่น
          </button>
          <button className="inline-flex items-center gap-2 rounded bg-muted/70 text-foreground px-6 py-2.5 font-semibold hover:bg-muted backdrop-blur transition">
            <Info className="h-5 w-5" /> ข้อมูลเพิ่มเติม
          </button>
        </div>
      </div>
    </section>
  );
}
