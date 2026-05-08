import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function CinematicParticles({ count = 30 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 60 + Math.random() * 40,
      size: 1 + Math.random() * 3,
      duration: 8 + Math.random() * 15,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(229,9,20,${p.opacity}) 0%, rgba(139,0,0,${p.opacity * 0.5}) 60%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 4}px ${p.size}px rgba(229,9,20,${p.opacity * 0.3})`,
          }}
          animate={{
            y: [0, -(200 + Math.random() * 400)],
            x: [0, (Math.random() - 0.5) * 120],
            opacity: [0, p.opacity, p.opacity * 0.6, 0],
            scale: [0.5, 1, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(229,9,20,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,0,0,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
