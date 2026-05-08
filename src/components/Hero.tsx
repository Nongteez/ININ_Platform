import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CinematicParticles } from "./Particles";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const [muted, setMuted] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative h-[95vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={hero}
          alt="Featured Movie"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Top gradient for navbar readability */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-top)" }} />

      {/* Side Gradient - Left Fade for text readability */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-side)" }} />

      {/* Bottom Gradient - Seamless blend into content */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Red accent atmospheric glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(229,9,20,0.4), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating Particles */}
      <CinematicParticles count={25} />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end pb-32 md:pb-40 px-4 md:px-12 lg:px-16 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30">
            <span className="text-[#E50914] font-black text-lg tracking-wider">I</span>
            <span className="text-[#E50914]/90 font-semibold text-[11px] tracking-[0.2em] uppercase">
              Originals
            </span>
          </div>
          <span className="text-[#B3B3B3] text-xs font-medium tracking-wider">
            Sci-Fi • 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[0.9]"
          style={{
            textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(229,9,20,0.15)",
          }}
        >
          Shadow of the
          <br />
          <span className="bg-gradient-to-r from-white via-white to-[#E50914]/60 bg-clip-text text-transparent">
            Red Star
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg text-white/85 max-w-xl leading-relaxed font-normal"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          When the last astronaut becomes stranded on a mysterious planet, he must
          confront the truth hidden beneath the blood-red sky. A journey to the
          edge of the universe is about to begin.
        </motion.p>

        {/* Meta Info */}
        <motion.div variants={itemVariants} className="mt-4 flex items-center gap-3 text-xs text-[#B3B3B3] font-medium">
          <span className="text-[#46D369] font-semibold">98% Match</span>
          <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px]">16+</span>
          <span>2h 14m</span>
          <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px]">4K</span>
          <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px]">HDR</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4 items-center"
        >
          {/* Play Button */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer inline-flex items-center gap-2.5 rounded-lg bg-white text-black px-7 py-3 md:px-9 md:py-3.5 font-bold text-base md:text-lg hover:bg-white/85 transition-colors btn-play"
          >
            <Play className="h-5 w-5 md:h-6 md:w-6 fill-current" />
            Play
          </motion.button>

          {/* More Info Button */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer inline-flex items-center gap-2.5 rounded-lg px-7 py-3 md:px-9 md:py-3.5 font-semibold text-base md:text-lg text-white transition-all btn-info"
          >
            <Info className="h-5 w-5 md:h-6 md:w-6" />
            More Info
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mute/Unmute button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setMuted(!muted)}
        className="absolute right-4 md:right-12 lg:right-16 bottom-32 md:bottom-40 z-20 h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all cursor-pointer bg-black/20 backdrop-blur-sm"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </motion.button>

      {/* Age Rating Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-4 md:right-12 lg:right-16 bottom-20 md:bottom-28 z-20 flex items-center gap-2"
      >
        <div className="bg-[#333]/80 border-l-2 border-white/40 px-3 py-1 text-sm text-white/80 font-medium backdrop-blur-sm">
          16+
        </div>
      </motion.div>
    </section>
  );
}
