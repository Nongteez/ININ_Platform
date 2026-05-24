import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CinematicParticles } from "./Particles";
import hero from "@/assets/image/PuppyLove/BG_PUPPYNOLOGO2.png";

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
    <section className="relative h-[95vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with subtle Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
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

      {/* Side Gradient — text readability */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-side)" }} />

      {/* Bottom Gradient — seamless blend */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Subtle accent atmospheric glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(123,92,255,0.5), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating Particles — minimal */}
      <CinematicParticles count={8} />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-4 md:px-12 lg:px-16 max-w-3xl -mt-10 md:-mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D4DFF]/10 border border-[#9D4DFF]/20">
            <span className="text-[#9D4DFF] font-bold text-sm tracking-wider">ININ</span>
            <span className="text-[#AAB0C5] font-medium text-[11px] tracking-[0.15em] uppercase">
              Originals
            </span>
          </div>
          <span className="text-[#AAB0C5] text-xs font-medium tracking-wider">
            Romance • 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[0.9]"
          style={{
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          The Puppy
          <br />
          <span className="bg-gradient-to-r from-white via-white/90 to-[#9D4DFF]/50 bg-clip-text text-transparent">
            Love Heart
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg text-white/80 max-w-xl leading-relaxed font-normal"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          When a transfer student enters the halls of St. Lucia Academy, he finds himself surrounded by four girls —
          each hiding secrets behind their smiles. What begins as a youthful romance soon turns into a journey filled
          with mystery, heartbreak, and truths buried deep within the school’s shadows.
        </motion.p>

        {/* Meta Info */}
        <motion.div variants={itemVariants} className="mt-4 flex items-center gap-3 text-xs text-[#AAB0C5] font-medium">
          <span className="text-[#00E5A0] font-semibold">98% Match</span>
          <span className="border border-white/15 px-1.5 py-0.5 rounded text-[10px]">16+</span>
          <span>2h 14m</span>
          <span className="border border-white/15 px-1.5 py-0.5 rounded text-[10px]">4K</span>
          <span className="border border-white/15 px-1.5 py-0.5 rounded text-[10px]">HDR</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4 items-center"
        >
          {/* Play Button — gradient */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/game/puppy-love")}
            className="cursor-pointer inline-flex items-center gap-2.5 rounded-xl px-7 py-3 md:px-9 md:py-3.5 font-bold text-base md:text-lg transition-all btn-play"
          >
            <Play className="h-5 w-5 md:h-6 md:w-6 fill-current" />
            Play
          </motion.button>

          {/* More Info Button — glass */}
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer inline-flex items-center gap-2.5 rounded-xl px-7 py-3 md:px-9 md:py-3.5 font-semibold text-base md:text-lg text-white transition-all btn-info"
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
        className="absolute right-4 md:right-12 lg:right-16 bottom-[30%] md:bottom-[34%] z-20 h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </motion.button>

      {/* Age Rating Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-4 md:right-12 lg:right-16 bottom-[22%] md:bottom-[26%] z-20 flex items-center gap-2"
      >
        <div className="bg-white/5 border-l-2 border-white/30 px-3 py-1 text-sm text-white/70 font-medium backdrop-blur-sm">
          16+
        </div>
      </motion.div>


    </section>


  );
}
