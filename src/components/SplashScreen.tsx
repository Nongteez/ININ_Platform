import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Logo/ICON_ININ.png";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050816]"
        >
          {/* Subtle radial glow behind logo */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(123,92,255,0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <motion.img
            src={logo}
            alt="ININ"
            className="relative z-10 h-16 md:h-20 w-auto"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
