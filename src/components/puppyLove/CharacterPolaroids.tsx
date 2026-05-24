import { motion } from "framer-motion";
import { puppyLoveAssets } from "@/data/puppyLove";

export function CharacterPolaroids() {
  return (
    <div className="hidden lg:flex relative w-[280px] xl:w-[320px] h-[420px] items-center justify-center shrink-0">
      {puppyLoveAssets.characters.map((char, i) => (
        <motion.div
          key={char.name}
          initial={{ opacity: 0, y: 40, rotate: char.rotate }}
          animate={{ opacity: 1, y: 0, rotate: char.rotate }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute polaroid-card"
          style={{
            zIndex: i + 1,
            left: `${i * 18}px`,
            top: `${i * 28}px`,
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="polaroid-inner"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-[140px] xl:w-[155px] h-[180px] xl:h-[200px] object-cover rounded-sm"
              draggable={false}
            />
            <p className="mt-2 text-center text-[11px] font-semibold text-white/80 tracking-wide font-serif italic">
              {char.name}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
