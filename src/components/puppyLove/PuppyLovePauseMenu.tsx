import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Image, Settings, LogOut } from "lucide-react";

interface PuppyLovePauseMenuProps {
  onResume: () => void;
}

const menuBtnClass =
  "flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-pink-400/30 transition-colors cursor-pointer";

const menuItems = [
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function PuppyLovePauseMenu({ onResume }: PuppyLovePauseMenuProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 flex items-center justify-center px-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Pause menu"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm rounded-2xl border border-pink-500/20 bg-black/55 backdrop-blur-2xl px-8 py-10 shadow-[0_0_60px_rgba(251,113,133,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <h2
          className="text-center font-light uppercase text-white/95 mb-10 text-3xl md:text-[2.75rem] leading-none tracking-[0.32em] pl-[0.32em] [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_0_48px_rgba(251,113,133,0.4),0_0_96px_rgba(251,113,133,0.15),0_2px_4px_rgba(0,0,0,0.8)]"
        >
          Paused
        </h2>

        <nav className="flex flex-col gap-3">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 36px rgba(251,113,133,0.28)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onResume}
            className={`${menuBtnClass} border-pink-400/35 bg-pink-950/25 text-pink-50/95 hover:border-pink-300/45`}
          >
            <Play className="w-4 h-4 text-pink-200/90" />
            <span className="text-sm font-medium tracking-[0.12em]">Resume</span>
          </motion.button>

          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.06, duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 32px rgba(251,113,133,0.18)",
              }}
              whileTap={{ scale: 0.98 }}
              className={menuBtnClass}
            >
              <item.icon className="w-4 h-4 text-pink-300/70" />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </motion.button>
          ))}

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.4 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 32px rgba(251,113,133,0.22)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/game/puppy-love")}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-pink-500/25 bg-pink-950/30 text-pink-100/90 hover:text-white hover:border-pink-400/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Exit</span>
          </motion.button>
        </nav>
      </motion.div>
    </motion.div>
  );
}
