import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Info, Heart, BookOpen, Layers } from "lucide-react";
import type { VisualNovel } from "@/data/visualNovels";

interface FeaturedNovelProps {
  novel: VisualNovel;
}

/* ─── Deterministic pseudo-random ──────────────────────────────── */
function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ─── Particle layer generator ─────────────────────────────────── */
interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  sway: number;
  layer: "bg" | "mid" | "fg";
}

function makeParticles(): Particle[] {
  const out: Particle[] = [];
  // Background particles — tiny, slow, dim
  for (let i = 0; i < 8; i++) {
    out.push({
      id: i,
      size: 1.5 + sr(i * 3) * 2.5,
      x: sr(i * 7) * 100,
      y: sr(i * 11) * 100,
      duration: 18 + sr(i * 13) * 14,
      delay: sr(i * 17) * 8,
      opacity: 0.1 + sr(i * 19) * 0.2,
      sway: 15 + sr(i * 23) * 30,
      layer: "bg",
    });
  }
  // Mid particles — medium, moderate speed
  for (let i = 0; i < 8; i++) {
    const id = 8 + i;
    out.push({
      id,
      size: 2.5 + sr(id * 5) * 3,
      x: sr(id * 9) * 100,
      y: sr(id * 13) * 100,
      duration: 12 + sr(id * 17) * 10,
      delay: sr(id * 23) * 6,
      opacity: 0.2 + sr(id * 29) * 0.35,
      sway: 25 + sr(id * 31) * 50,
      layer: "mid",
    });
  }
  // Foreground particles — larger, faster, brighter
  for (let i = 0; i < 6; i++) {
    const id = 16 + i;
    out.push({
      id,
      size: 3.5 + sr(id * 7) * 4,
      x: sr(id * 11) * 100,
      y: sr(id * 19) * 100,
      duration: 8 + sr(id * 23) * 8,
      delay: sr(id * 29) * 4,
      opacity: 0.3 + sr(id * 37) * 0.45,
      sway: 35 + sr(id * 41) * 70,
      layer: "fg",
    });
  }
  return out;
}

/* ─── Sakura petal generator ───────────────────────────────────── */
interface Petal {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  rotation: number;
  swayX: number;
  opacity: number;
}

function makePetals(): Petal[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 8 + sr(i * 11) * 10,
    left: -5 + sr(i * 19) * 110,
    duration: 9 + sr(i * 29) * 9,
    delay: sr(i * 43) * 12,
    rotation: sr(i * 53) * 360,
    swayX: 40 + sr(i * 61) * 120,
    opacity: 0.2 + sr(i * 67) * 0.4,
  }));
}

/* ─── SVG Sakura petal ─────────────────────────────────────────── */
function SakuraPetal({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 8 6 4 10C0 14 4 20 12 22C20 20 24 14 20 10C16 6 12 2 12 2Z"
        fill={color}
      />
      <path
        d="M12 4C12 4 10 8 12 14"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Component ────────────────────────────────────────────────── */
export function FeaturedNovel({ novel }: FeaturedNovelProps) {
  const particles = useMemo(makeParticles, []);
  const petals = useMemo(makePetals, []);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse parallax ──────────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Parallax intensity per depth layer
  const bgParX = useTransform(smoothX, (v) => v * 0.008);
  const bgParY = useTransform(smoothY, (v) => v * 0.008);
  const midParX = useTransform(smoothX, (v) => v * 0.02);
  const midParY = useTransform(smoothY, (v) => v * 0.02);
  const fgParX = useTransform(smoothX, (v) => v * 0.04);
  const fgParY = useTransform(smoothY, (v) => v * 0.04);
  const auroraParX = useTransform(smoothX, (v) => v * 0.015);
  const auroraParY = useTransform(smoothY, (v) => v * 0.015);
  const rayParX = useTransform(smoothX, (v) => v * 0.01);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ── Viewport height for petals ──────────────────────────────── */
  const [vh, setVh] = useState(1100);
  useEffect(() => {
    setVh(window.innerHeight + 100);
    const onResize = () => setVh(window.innerHeight + 100);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const petalColors = ["#FFB7C5", "#FFC8D6", "#FFAEC0", "#FFD1DC", "#FF9FB8"];

  /* ── Parallax mapping for each particle layer ────────────────── */
  const parallaxMap = {
    bg: { x: bgParX, y: bgParY },
    mid: { x: midParX, y: midParY },
    fg: { x: fgParX, y: fgParY },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] pt-20 pb-16 md:py-0"
    >
      {/* ═══════════════════════════════════════════════════════════
          LAYER 0 — Cinematic Blurred Cover Backdrop
          Cover image, heavily blurred and scaled, dark overlayed.
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1.0, 1.06, 1.0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={novel.cover}
          alt=""
          className="w-full h-full object-cover object-top scale-125 blur-[90px] opacity-30 saturate-[1.2]"
        />
        <div className="absolute inset-0 bg-[#050816]/55" />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1 — Large Aurora Glow Layers (10-15% opacity)
          Slow drifting colored orbs, mouse-reactive parallax.
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ x: auroraParX, y: auroraParY }}
      >
        {/* Purple Aurora */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "50rem",
            height: "50rem",
            top: "-10%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(157,77,255,0.14) 0%, rgba(123,92,255,0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80, -40, 60, 0],
            y: [0, 60, -30, 50, 0],
            scale: [1, 1.12, 0.92, 1.08, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Pink Aurora */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "45rem",
            height: "45rem",
            top: "20%",
            right: "-10%",
            background: "radial-gradient(circle, rgba(255,77,106,0.12) 0%, rgba(255,150,170,0.04) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, -70, 50, -60, 0],
            y: [0, -50, 70, -30, 0],
            scale: [1, 0.9, 1.15, 0.95, 1],
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blue Aurora */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "40rem",
            height: "40rem",
            bottom: "-5%",
            left: "25%",
            background: "radial-gradient(circle, rgba(0,209,255,0.12) 0%, rgba(0,150,255,0.04) 40%, transparent 70%)",
            filter: "blur(65px)",
          }}
          animate={{
            x: [0, 60, -80, 40, 0],
            y: [0, -60, 40, -50, 0],
            scale: [1.05, 0.88, 1.1, 0.93, 1.05],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2 — Volumetric Light Rays
          Soft diagonal light beams that slowly sweep across.
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
        style={{ x: rayParX }}
      >
        {/* Ray 1 — wide purple diagonal */}
        <motion.div
          className="absolute"
          style={{
            width: "200%",
            height: "120px",
            top: "15%",
            left: "-50%",
            background: "linear-gradient(90deg, transparent 0%, rgba(157,77,255,0.04) 30%, rgba(157,77,255,0.07) 50%, rgba(157,77,255,0.04) 70%, transparent 100%)",
            transform: "rotate(-15deg)",
            filter: "blur(30px)",
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Ray 2 — narrow pink diagonal */}
        <motion.div
          className="absolute"
          style={{
            width: "200%",
            height: "80px",
            top: "45%",
            left: "-40%",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,77,106,0.03) 30%, rgba(255,77,106,0.06) 50%, rgba(255,77,106,0.03) 70%, transparent 100%)",
            transform: "rotate(-8deg)",
            filter: "blur(25px)",
          }}
          animate={{
            x: ["10%", "-15%", "10%"],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Ray 3 — blue upper */}
        <motion.div
          className="absolute"
          style={{
            width: "180%",
            height: "60px",
            top: "70%",
            left: "-30%",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,209,255,0.03) 30%, rgba(0,209,255,0.05) 50%, rgba(0,209,255,0.03) 70%, transparent 100%)",
            transform: "rotate(-20deg)",
            filter: "blur(20px)",
          }}
          animate={{
            x: ["-10%", "25%", "-10%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3 — Multi-depth Particles (BG, Mid, FG)
          Each layer moves at different speeds; all mouse-reactive.
          ═══════════════════════════════════════════════════════════ */}
      {(["bg", "mid", "fg"] as const).map((layer, li) => (
        <motion.div
          key={layer}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            zIndex: 3 + li,
            x: parallaxMap[layer].x,
            y: parallaxMap[layer].y,
          }}
        >
          {particles
            .filter((p) => p.layer === layer)
            .map((p) => {
              const glowColor =
                layer === "bg"
                  ? `rgba(157,77,255,${p.opacity})`
                  : layer === "mid"
                    ? `rgba(200,140,255,${p.opacity})`
                    : `rgba(220,180,255,${p.opacity})`;
              return (
                <motion.div
                  key={`p-${p.id}`}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                    boxShadow: `0 0 ${p.size * 3}px ${glowColor}`,
                  }}
                  animate={{
                    y: [0, -(300 + p.y * 4)],
                    x: [0, p.sway, -p.sway * 0.6, p.sway * 0.3, 0],
                    opacity: [0, p.opacity, p.opacity * 0.8, p.opacity, 0],
                    scale: [0.6, 1, 1.3, 0.9, 0.6],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
        </motion.div>
      ))}

      {/* ═══════════════════════════════════════════════════════════
          LAYER 6 — Cherry Blossom Petals
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[6] overflow-hidden pointer-events-none"
        style={{ x: midParX, y: midParY }}
      >
        {petals.map((p) => (
          <motion.div
            key={`petal-${p.id}`}
            className="absolute"
            style={{ left: `${p.left}%`, top: -30 }}
            animate={{
              y: [0, vh],
              x: [0, p.swayX, -p.swayX * 0.7, p.swayX * 0.4, 0],
              rotate: [p.rotation, p.rotation + 360, p.rotation + 720],
              rotateY: [0, 180, 360],
              opacity: [0, p.opacity, p.opacity, p.opacity * 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <SakuraPetal
              size={p.size}
              color={petalColors[p.id % petalColors.length]}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 7 — Readability overlays & vignettes
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[7] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/80 via-[#050816]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/40 via-transparent to-transparent" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FOREGROUND CONTENT (z-10) — UNCHANGED
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Hero details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-12 lg:col-span-7 flex flex-col items-start gap-4 md:gap-5"
        >
          {novel.original && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#7B5CFF]/30 to-[#9D4DFF]/30 text-white border border-[#9D4DFF]/40 shadow-[0_0_15px_rgba(157,77,255,0.15)]"
            >
              <span className="w-1.5 h-1.5 bg-[#9D4DFF] rounded-full animate-ping" />
              ININ NOVEL ORIGINAL
            </motion.div>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight max-w-2xl text-glow">
            {novel.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-300">
            {novel.match && (
              <span className="flex items-center gap-1 text-[#34D399]">
                <Heart className="h-4 w-4 fill-current" />
                {novel.match}% Match
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="flex items-center gap-1 text-purple-400">
              <Layers className="h-4 w-4" />
              Visual Novel
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="flex items-center gap-1 text-zinc-300">
              <BookOpen className="h-4 w-4" />
              {novel.endings} Endings
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-zinc-400">{novel.chapters} Chapters</span>
          </div>

          <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed max-w-xl">
            {novel.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {novel.genres.map((genre) => (
              <span
                key={genre}
                className="text-[10px] font-bold px-3 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.05]"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3.5 mt-4 w-full sm:w-auto">
            <button className="btn-play inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold w-full sm:w-auto cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]">
              <Play className="h-4.5 w-4.5 fill-current" />
              Read Now
            </button>
            <button className="btn-info inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white w-full sm:w-auto cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98]">
              <Info className="h-4.5 w-4.5" />
              More Info
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Cover Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="col-span-12 lg:col-span-5 hidden lg:flex items-center justify-center"
        >
          <div className="relative group max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-[#0B1020]/25 backdrop-blur-md shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/75 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute inset-0 rounded-2xl border border-purple-500/10 pointer-events-none" />
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-purple-500/0 via-purple-500/15 to-[#00D1FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Bottom vignette blend */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none z-10" />
    </div>
  );
}
