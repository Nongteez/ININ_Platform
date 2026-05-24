import { useEffect, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Maximize, Minimize, Pause, Play } from "lucide-react";

interface PuppyLovePlayControlsProps {
  visible: boolean;
  isPaused: boolean;
  volume: number;
  volumePanelOpen: boolean;
  isFullscreen: boolean;
  onTogglePause: () => void;
  onToggleVolumePanel: () => void;
  onCloseVolumePanel: () => void;
  onVolumeChange: (value: number) => void;
  onToggleFullscreen: () => void;
}

const controlBtnClass =
  "p-2 rounded-full border border-white/15 bg-black/30 text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer backdrop-blur-sm";

export function PuppyLovePlayControls({
  visible,
  isPaused,
  volume,
  volumePanelOpen,
  isFullscreen,
  onTogglePause,
  onToggleVolumePanel,
  onCloseVolumePanel,
  onVolumeChange,
  onToggleFullscreen,
}: PuppyLovePlayControlsProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!volumePanelOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onCloseVolumePanel();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [volumePanelOpen, onCloseVolumePanel]);

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8, scale: visible ? 1 : 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div ref={panelRef} className="relative">
        <button
          type="button"
          onClick={onToggleVolumePanel}
          className={controlBtnClass}
          aria-label="Volume"
          aria-expanded={volumePanelOpen}
        >
          {volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {volumePanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-full mt-2 z-50 flex flex-col items-center gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(251,113,133,0.08)]"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-pink-200/50">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                style={{ "--volume-percent": `${volume * 100}%` } as CSSProperties}
                className="puppy-play-volume-slider w-28 h-1 accent-pink-300/80 cursor-pointer"
                aria-label="Game volume"
              />
              <span className="text-[10px] text-white/40 tabular-nums">{Math.round(volume * 100)}%</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onToggleFullscreen}
        className={controlBtnClass}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={onTogglePause}
        className={controlBtnClass}
        aria-label={isPaused ? "Resume" : "Pause"}
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>
    </motion.div>
  );
}
