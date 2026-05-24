import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CinematicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-gradient-to-r from-[#7B5CFF]/90 via-[#9D4DFF]/90 to-[#C961FF]/80 border border-white/20 shadow-[0_8px_32px_rgba(123,92,255,0.35)] hover:shadow-[0_12px_40px_rgba(157,77,255,0.45)] text-white",
  secondary:
    "bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-white/25 text-white",
  ghost:
    "bg-transparent border border-white/10 hover:bg-white/5 text-white/70 hover:text-white",
};

export function CinematicButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: CinematicButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`cursor-pointer rounded-2xl px-8 py-3.5 text-sm md:text-base font-bold tracking-wide transition-shadow duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
