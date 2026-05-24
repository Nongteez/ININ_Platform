import { useMemo } from "react";
import { motion } from "framer-motion";

export function PuppyLoveAtmosphere() {
  const dust = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: `${(i * 13.7) % 100}%`,
        top: `${(i * 19.3 + 5) % 100}%`,
        size: 1 + (i % 4) * 0.5,
        duration: 10 + (i % 7) * 2,
        delay: i * 0.45,
        warm: i % 3 !== 0,
      })),
    []
  );

  return (
    <div className="puppy-atmosphere absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 vignette opacity-85" />

      {/* Slow volumetric light rays */}
      <div className="puppy-light-rays absolute inset-0">
        <motion.div
          className="puppy-ray puppy-ray--a"
          animate={{ opacity: [0.04, 0.09, 0.05], x: [0, 12, 0], rotate: [18, 20, 18] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="puppy-ray puppy-ray--b"
          animate={{ opacity: [0.03, 0.07, 0.04], x: [0, -10, 0], rotate: [-12, -10, -12] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="puppy-ray puppy-ray--c"
          animate={{ opacity: [0.02, 0.06, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
      </div>

      {/* Animated fog / haze */}
      <motion.div
        className="puppy-fog puppy-fog--lower"
        animate={{ x: ["-2%", "2%", "-2%"], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="puppy-fog puppy-fog--mid"
        animate={{ x: ["1%", "-1.5%", "1%"], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="puppy-fog puppy-fog--warm"
        animate={{ opacity: [0.05, 0.11, 0.06], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Warm sunset wash */}
      <motion.div
        className="absolute -top-1/4 left-[10%] w-[55%] h-[75%]"
        style={{
          background: "linear-gradient(165deg, rgba(255,190,140,0.35) 0%, transparent 60%)",
          filter: "blur(48px)",
        }}
        animate={{ opacity: [0.06, 0.12, 0.07], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Neon sign glow — background logo area */}
      <motion.div
        className="puppy-sign-glow"
        animate={{
          opacity: [0.2, 0.42, 0.28, 0.38, 0.22],
          scale: [1, 1.03, 1.01, 1.04, 1],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="puppy-sign-glow puppy-sign-glow--core"
        animate={{
          opacity: [0.35, 0.65, 0.45, 0.6, 0.38],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Floating dust */}
      {dust.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${p.warm ? "bg-amber-100/25" : "bg-pink-100/20"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            filter: "blur(0.3px)",
          }}
          animate={{
            y: [0, -40 - (p.id % 3) * 10, 0],
            x: [0, (p.id % 2 === 0 ? 12 : -10), 0],
            opacity: [0.05, 0.35, 0.08],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
