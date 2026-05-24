import { motion } from "framer-motion";

interface PuppyLoveBackgroundProps {
  src: string;
}

export function PuppyLoveBackground({ src }: PuppyLoveBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-[-3%] will-change-transform"
        animate={{
          scale: [1, 1.035, 1.02, 1.04, 1],
          x: ["0%", "-0.6%", "0.4%", "-0.3%", "0%"],
          y: ["0%", "-0.4%", "0.3%", "-0.2%", "0%"],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </motion.div>
    </div>
  );
}
