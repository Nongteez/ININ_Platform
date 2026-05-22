import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  GitBranch,
  Smartphone,
  Wallet,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import logo from "@/assets/Logo/ICON_ININ.png";

// ─── Placeholder images ──────────────────────────────────────────
// Replace with actual Creator assets from:
// src/assets/Creator/
import m1 from "@/assets/Image/Studio/m1.jpg";
import m2 from "@/assets/Image/Studio/m2.jpg";
import m3 from "@/assets/Image/Studio/m3.jpg";
import m4 from "@/assets/Image/Studio/m4.jpg";
import m5 from "@/assets/Image/Studio/m5.jpg";
import m6 from "@/assets/Image/Studio/m6.jpg";
import m7 from "@/assets/Image/Studio/m7.jpg";
import m8 from "@/assets/Image/Studio/m8.jpg";

import p1 from "@/assets/Image/Studio/p1.jpg";
import p2 from "@/assets/Image/Studio/p2.jpg";
import p3 from "@/assets/Image/Studio/p3.jpg";
import p4 from "@/assets/Image/Studio/p4.jpg";
import p5 from "@/assets/Image/Studio/p5.jpg";

// ─── Data ────────────────────────────────────────────────────────

const showcaseProjects = [
  { img: p1, title: "Puppy Love", creator: "Studio Neon", genre: "Romantic", episodes: 6, choices: 18 },
  { img: p2, title: "Rain Zone", creator: "Lumina Films", genre: "Romantic", episodes: 8, choices: 24 },
  { img: p3, title: "Sea You", creator: "Indie Collective", genre: "Boy Love", episodes: 5, choices: 15 },
  { img: p4, title: "The Esan Love", creator: "Dreamweaver", genre: "Boy Love", episodes: 10, choices: 32 },
  { img: p5, title: "Startup Partner", creator: "Dark Canvas", genre: "Inspirational", episodes: 4, choices: 12 },
];

const features = [
  {
    icon: GitBranch,
    title: "Interactive Story Branching",
    desc: "Build complex narrative trees with our visual node editor. Create unlimited story paths and multiple endings that respond to audience choices.",
  },
  {
    icon: Smartphone,
    title: "Vertical Storytelling Tools",
    desc: "Purpose-built for 9:16 vertical content. Your stories are optimized for the way audiences consume content on mobile today.",
  },
  {
    icon: Wallet,
    title: "Creator Monetization",
    desc: "Earn from premium story branches, audience tipping, and native ad integration. Built-in revenue tools from day one.",
  },
  {
    icon: BarChart3,
    title: "Audience Analytics",
    desc: "Understand how viewers navigate your stories. Track choice patterns, completion rates, drop-offs, and engagement in real-time.",
  },
];

// ─── Fade variants ───────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Section 1: Hero ─────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.035] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7B5CFF, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4CC9FF, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 w-full px-4 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* Left — Copy */}
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2.5 mb-7">
              <img src={logo} alt="ININ" className="h-5 w-auto opacity-70" />
              <div className="h-4 w-px bg-white/15" />
              <span className="text-[#AAB0C5] text-xs font-semibold tracking-widest uppercase">Studio</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.08}
              className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-black text-white leading-[1.08] tracking-[-0.025em]"
            >
              Create Interactive Stories{" "}
              <span className="bg-gradient-to-r from-[#9D4DFF] via-[#C961FF] to-[#4CC9FF] bg-clip-text text-transparent">
                That React To Your Audience
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mt-6 text-[15px] md:text-base text-[#AAB0C5] max-w-[480px] leading-[1.7]"
            >
              Build immersive FMV storytelling experiences with branching narratives,
              interactive choices, and vertical-first design — for the next generation
              of mobile entertainment.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.24} className="mt-9 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/studio")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white cursor-pointer btn-play"
              >
                <Zap className="h-4 w-4" />
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById("tutorial-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white cursor-pointer btn-info"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch Tutorial
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={0.32} className="mt-12 flex items-center gap-10">
              {[
                { num: "12K+", label: "Creators" },
                { num: "50K+", label: "Stories Published" },
                { num: "8M+", label: "Interactions" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-lg md:text-xl font-bold text-white tracking-tight">{s.num}</p>
                  <p className="text-[11px] text-[#AAB0C5]/70 mt-0.5 font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main preview */}
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/[0.06] studio-preview-card">
              <img src={m2} alt="ININ Studio Dashboard" className="w-full aspect-[16/10] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/30 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-5 left-4 md:left-6 px-4 py-2.5 rounded-xl glass-card flex items-center gap-2.5 shadow-lg"
            >
              <div className="h-7 w-7 rounded-lg bg-[#7B5CFF]/15 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-[#C961FF]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Interactive FMV Editor</p>
                <p className="text-[10px] text-[#AAB0C5]/60">Build · Preview · Publish</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Product Screenshots (Horizontal Slide) ──────────

const slides = [
  { img: m1, label: "FMV Story Editor", desc: "A full vertical video editing workspace for interactive storytelling" },
  { img: m2, label: "Visual Node Graph", desc: "Design branching narratives with an intuitive node-based editor" },
  { img: m3, label: "Interactive Timeline", desc: "Place choice-points and manage story sequencing visually" },
  { img: m4, label: "Creator Dashboard", desc: "Manage all your projects, drafts, and published stories" },
  { img: m5, label: "Audience Analytics", desc: "Track viewer choices, completion rates, and engagement metrics" },
  { img: m6, label: "Publish & Preview", desc: "Preview on device and publish with one click" },
];

function ScreenshotShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const direction = useRef(1); // 1 = forward, -1 = backward

  // Auto-advance every 3s
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      direction.current = 1;
      setActive((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (dir: 1 | -1) => {
    direction.current = dir;
    setActive((prev) => (prev + dir + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.3 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0.3 }),
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-4 md:px-12 lg:px-16 py-16 md:py-20"
    >
      {/* Section header — centered */}
      <div className="text-center mb-12">
        <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#9D4DFF] uppercase tracking-widest mb-3">
          Screenshots
        </motion.p>
        <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Product Screenshots
        </motion.h2>
        <motion.p variants={fadeUp} custom={0.1} className="text-sm text-[#AAB0C5] mt-2 max-w-md mx-auto">
          Explore the tools behind interactive FMV storytelling.
        </motion.p>
      </div>

      {/* Showcase container */}
      <motion.div
        variants={fadeUp}
        custom={0.15}
        className="max-w-5xl mx-auto"
      >
        <div
          className="relative rounded-3xl overflow-hidden screenshot-showcase group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides — horizontal push */}
          <div className="relative aspect-video overflow-hidden bg-[#0B1020]">
            <AnimatePresence initial={false} custom={direction.current} mode="popLayout">
              <motion.div
                key={active}
                custom={direction.current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={slides[active].img}
                  alt={slides[active].label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/70 via-transparent to-transparent pointer-events-none z-[2]" />

            {/* Current slide info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-24 z-10"
              >
                <p className="text-xs text-[#9D4DFF] font-semibold uppercase tracking-widest mb-1">{slides[active].label}</p>
                <p className="text-sm md:text-base text-white/80 font-medium">{slides[active].desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={() => go(-1)}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  direction.current = i > active ? 1 : -1;
                  setActive(i);
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${active === i
                  ? "w-6 h-2 bg-[#9D4DFF] shadow-[0_0_10px_rgba(157,77,255,0.5)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ─── Section 3: Tutorial / Demo Video ────────────────────────────

function TutorialSection() {
  return (
    <motion.section
      id="tutorial-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-4 md:px-12 lg:px-16 py-10 md:py-16"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#9D4DFF] uppercase tracking-widest mb-3">
            Tutorial
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            See It In Action
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.1} className="text-sm text-[#AAB0C5] mt-2 max-w-md mx-auto">
            Watch how creators build interactive FMV stories from script to publish in minutes
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          custom={0.15}
          className="relative rounded-2xl overflow-hidden ring-1 ring-white/[0.06] group cursor-pointer studio-preview-card"
        >
          <img src={m6} alt="Tutorial Preview" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-[#050816]/40 group-hover:bg-[#050816]/25 transition-colors duration-500" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center btn-play shadow-[0_0_40px_rgba(123,92,255,0.2)]"
            >
              <Play className="h-6 w-6 md:h-7 md:w-7 fill-current ml-0.5" />
            </motion.div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7">
            <p className="text-[10px] text-[#9D4DFF] font-semibold uppercase tracking-widest">Tutorial</p>
            <p className="text-sm md:text-base font-bold text-white mt-1">Creating Your First Interactive Story</p>
            <p className="text-xs text-[#AAB0C5] mt-0.5">12 min · Step-by-step walkthrough</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Section 4: Creator Showcase ─────────────────────────────────

function CreatorShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-10 md:py-16"
    >
      <div className="px-4 md:px-12 lg:px-16 mb-8 flex items-end justify-between">
        <div>
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#9D4DFF] uppercase tracking-widest mb-3">
            Community
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Creator Showcase
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.1} className="text-sm text-[#AAB0C5] mt-2">
            Interactive projects built by the ININ creator community
          </motion.p>
        </div>
        <motion.div variants={fadeUp} custom={0.1} className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="h-9 w-9 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/15 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="h-9 w-9 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/15 transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto px-4 md:px-12 lg:px-16 pb-4 scroll-smooth"
      >
        {showcaseProjects.map((project, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i * 0.04}
            className="flex-none w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[18vw] group cursor-pointer"
          >
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-white/[0.05] group-hover:ring-[#7B5CFF]/15 transition-all duration-500">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/10 to-transparent" />

              {/* Interactive badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.08] backdrop-blur-sm">
                <span className="text-[9px] font-semibold text-white/80">Interactive</span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-[13px] font-bold text-white leading-tight">{project.title}</p>
                <p className="text-[11px] text-[#AAB0C5]/70 mt-1">{project.creator}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.05] text-[#AAB0C5]/60 font-medium">{project.genre}</span>
                  <span className="text-[9px] text-[#AAB0C5]/40">{project.episodes} eps · {project.choices} choices</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Section 5: Features ─────────────────────────────────────────

function FeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-4 md:px-12 lg:px-16 py-12 md:py-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#9D4DFF] uppercase tracking-widest mb-3">
            Features
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Why Choose FMV Studio?
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.1} className="text-sm text-[#AAB0C5] mt-2 max-w-md mx-auto">
            Everything you need to create, publish, and monetize interactive stories
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.06}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500"
              >
                <div className="h-10 w-10 rounded-xl bg-[#7B5CFF]/8 flex items-center justify-center mb-5 group-hover:bg-[#7B5CFF]/12 transition-colors duration-500">
                  <Icon className="h-5 w-5 text-[#9D4DFF]/80 group-hover:text-[#9D4DFF] transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2.5 tracking-tight">{f.title}</h3>
                <p className="text-xs text-[#AAB0C5]/70 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function Studio() {
  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <ScreenshotShowcase />
      <TutorialSection />
      <CreatorShowcase />
      <FeaturesSection />
      <Footer />
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
