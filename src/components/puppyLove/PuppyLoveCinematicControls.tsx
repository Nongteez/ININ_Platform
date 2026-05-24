import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { puppyLoveAssets } from "@/data/puppyLove";

const DEFAULT_VOLUME = 0.01;

export function PuppyLoveCinematicControls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const audio = new Audio(puppyLoveAssets.ambientSound);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    audio.play().catch(() => {}).finally(() => setVisible(true));

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !muted;
    if (nextMuted) {
      audio.pause();
      setMuted(true);
    } else {
      setMuted(false);
      audio.volume = DEFAULT_VOLUME;
      try {
        await audio.play();
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: visible ? 1 : 0, x: 0 }}
      transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="puppy-controls-stack fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
      aria-label="Cinematic controls"
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleMute}
        className="puppy-sound-btn relative flex items-center justify-center w-11 h-11 rounded-full cursor-pointer shrink-0"
        aria-label={muted ? "Unmute ambient sound" : "Mute ambient sound"}
        title={muted ? "Unmute" : "Mute"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {muted ? (
            <motion.span
              key="muted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <VolumeX className="w-[18px] h-[18px] text-white/55" />
            </motion.span>
          ) : (
            <motion.span
              key="on"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <Volume2 className="w-[18px] h-[18px] text-pink-100/85" />
            </motion.span>
          )}
        </AnimatePresence>
        {!muted && <span className="puppy-sound-pulse" aria-hidden />}
      </motion.button>

      <div className="puppy-age-badge" aria-label="Age rating 16 plus">
        <span className="puppy-age-badge__text">16+</span>
      </div>
    </motion.div>
  );
}
