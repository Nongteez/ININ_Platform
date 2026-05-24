import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Logo/ICON_ININ.png";

const loadingTexts = [
  "Entering Story...",
  "Preparing Interactive Experience",
  "Your Choices Await",
];

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 900);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1700);

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#050816]"
        >
          {/* Animated Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[420px] h-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(123,92,255,0.35) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Floating Ambient Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  y: [-20, -120],
                  x: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
                className="absolute w-[2px] h-[2px] rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.img
              src={logo}
              alt="ININ"
              className="h-16 md:h-20 w-auto select-none"
              initial={{
                opacity: 0,
                scale: 0.82,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                scale: [1, 1.03, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Loading Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 0.8,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="mt-6 text-sm md:text-base tracking-[0.25em] text-white/60"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Animated Progress Line */}
            <div className="relative mt-5 h-[2px] w-[180px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-[40%] rounded-full bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-[1px]"
              />
            </div>
          </div>

          {/* Vignette Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}