import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CinematicParticles } from "./Particles";
import hero from "@/assets/Image/PuppyLove/BG_PUPPYNOLOGO2.png";
import heroMobile from "@/assets/HeroMobile.png";

export function Hero() {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.04, y: -1 },
    tap: { scale: 0.97 },
  };

  return (
    <section className="relative h-[100svh] min-h-[580px] md:h-[95vh] md:min-h-[600px] w-full overflow-hidden">
      {/* Background Image with subtle Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <picture>
          <source
            srcSet={heroMobile}
            media="(max-width: 767px) and (orientation: portrait)"
          />
          <img
            src={hero}
            alt="Featured Movie"
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%] sm:object-[50%_42%] md:object-[50%_32%] lg:object-[50%_28%] xl:object-[50%_26%] hero-mobile-pan"
          />
        </picture>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Top gradient for navbar readability */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-top)" }} />

      {/* Side Gradient — text readability (subtle on mobile, stronger on desktop) */}
      <div className="absolute inset-0 hidden md:block" style={{ background: "var(--gradient-side)" }} />
      {/* Mobile: lighter side gradient to keep the image more visible */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(90deg, rgba(5,8,22,0.6) 0%, rgba(5,8,22,0.15) 50%, transparent 100%)" }}
      />

      {/* Bottom Gradient — seamless blend */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Mobile: cinematic bottom gradient — heavier at bottom for text zone, preserves image at top */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(180deg, transparent 0%, transparent 35%, rgba(5,8,22,0.35) 50%, rgba(5,8,22,0.8) 70%, rgba(5,8,22,0.97) 85%, rgba(5,8,22,1) 100%)" }}
      />

      {/* Subtle accent atmospheric glow — mobile positioned */}
      <div className="absolute bottom-0 left-0 w-[250px] h-[180px] md:w-[500px] md:h-[300px] opacity-[0.06] md:opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(123,92,255,0.5), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating Particles — fewer on mobile */}
      <CinematicParticles count={8} />

      {/* ─── Hero Content — Bottom-anchored on mobile ─── */}
      <motion.div
        className="relative z-10 flex h-full flex-col px-5 md:px-12 lg:px-16 max-w-3xl pt-[66px] pb-[76px] md:pt-0 md:pb-0 md:justify-center md:-mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-[#9D4DFF]/10 border border-[#9D4DFF]/20">
              <span className="text-[#9D4DFF] font-bold text-[11px] md:text-sm tracking-wider">ININ</span>
              <span className="text-[#AAB0C5] font-medium text-[9px] md:text-[11px] tracking-[0.15em] uppercase">
                Originals
              </span>
            </div>
            <span className="text-[#AAB0C5] text-[10px] md:text-xs font-medium tracking-wider">
              Romance • 2026
            </span>
          </motion.div>

          {/* Title — immersive mobile sizing */}
          <motion.h1
            variants={itemVariants}
            className="text-[2.15rem] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[0.95] md:leading-[0.9]"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.3)",
            }}
          >
            The Puppy
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-[#9D4DFF]/50 bg-clip-text text-transparent">
              Love Heart
            </span>
          </motion.h1>
        </div>

        <div className="mt-auto md:mt-0">
          {/* Description — tighter on mobile, 2-line max feel */}
          <motion.p
            variants={itemVariants}
            className="mt-2 md:mt-7 text-[12.5px] sm:text-base md:text-lg text-white/65 md:text-white/80 max-w-[300px] sm:max-w-xl leading-[1.6] md:leading-relaxed font-light md:font-normal"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            A youthful romance unravels into mystery and heartbreak within the shadows of St. Lucia Academy.
          </motion.p>

          {/* Meta Info */}
          <motion.div variants={itemVariants} className="mt-2 md:mt-4 flex items-center gap-1.5 md:gap-3 text-[10px] md:text-xs text-[#AAB0C5]/80 md:text-[#AAB0C5] font-medium">
            <span className="text-[#00E5A0] font-semibold">98% Match</span>
            <span className="w-px h-2.5 bg-white/15 md:hidden" />
            <span className="border border-white/15 px-1.5 py-0.5 rounded text-[9px] md:text-[10px]">16+</span>
            <span>2h 14m</span>
            <span className="border border-white/15 px-1.5 py-0.5 rounded text-[9px] md:text-[10px]">4K</span>
            <span className="border border-white/15 px-1.5 py-0.5 rounded text-[9px] md:text-[10px]">HDR</span>
          </motion.div>

          {/* Buttons — side by side, balanced */}
          <motion.div
            variants={itemVariants}
            className="mt-3 md:mt-9 flex gap-2.5 md:gap-4 items-center"
          >
            {/* Play Button — gradient */}
            <motion.button
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/game/puppy-love")}
              className="cursor-pointer inline-flex items-center justify-center gap-2 md:gap-2.5 rounded-xl px-7 py-3 md:px-9 md:py-3.5 font-bold text-[14px] md:text-lg transition-all btn-play flex-1 max-w-[180px] md:flex-none md:max-w-none"
            >
              <Play className="h-[18px] w-[18px] md:h-6 md:w-6 fill-current" />
              Play
            </motion.button>

            {/* More Info Button — glass */}
            <motion.button
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer inline-flex items-center justify-center gap-2 md:gap-2.5 rounded-xl px-7 py-3 md:px-9 md:py-3.5 font-semibold text-[14px] md:text-lg text-white transition-all btn-info flex-1 max-w-[180px] md:flex-none md:max-w-none"
            >
              <Info className="h-[18px] w-[18px] md:h-6 md:w-6" />
              More Info
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Right-side controls — Mute + Age ─── */}
      <div className="absolute right-4 md:right-12 lg:right-16 top-[86px] md:top-auto md:bottom-auto z-20 flex flex-col items-end gap-2 md:gap-0 md:block">
        {/* Mute/Unmute button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setMuted(!muted)}
          className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer bg-black/20 md:bg-white/5 backdrop-blur-sm md:absolute md:right-0 md:bottom-[34vh]"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </motion.button>

        {/* Age Rating Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-1 md:mt-0 md:absolute md:right-0 md:bottom-[26vh]"
        >
          <div className="bg-black/20 md:bg-white/5 border-l-2 border-white/30 px-2 md:px-3 py-0.5 md:py-1 text-[12px] md:text-sm text-white/70 font-medium backdrop-blur-sm">
            16+
          </div>
        </motion.div>
      </div>


    </section>


  );
}
