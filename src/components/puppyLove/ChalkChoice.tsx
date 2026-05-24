import { motion } from "framer-motion";

interface ChalkChoiceProps {
  label: string;
  onClick?: () => void;
  delay?: number;
}

export function ChalkChoice({ label, onClick, delay = 0 }: ChalkChoiceProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(255,220,180,0.15)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="chalk-choice cursor-pointer w-full max-w-md px-8 py-4 text-left text-base md:text-lg font-medium text-white/90"
    >
      <span className="chalk-choice-text">{label}</span>
    </motion.button>
  );
}
