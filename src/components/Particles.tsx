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
  color: string;
}

const COLORS = [
  "rgba(123,92,255,",
  "rgba(76,201,255,",
  "rgba(157,77,255,",
];

export function CinematicParticles({ count = 8 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 60 + Math.random() * 40,
      size: 1 + Math.random() * 2,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 12,
      opacity: 0.08 + Math.random() * 0.15,
      color: COLORS[i % COLORS.length],
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
            background: `radial-gradient(circle, ${p.color}${p.opacity}) 0%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}${p.opacity * 0.3})`,
          }}
          animate={{
            y: [0, -(150 + Math.random() * 300)],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.5, 1, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,92,255,0.03) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
