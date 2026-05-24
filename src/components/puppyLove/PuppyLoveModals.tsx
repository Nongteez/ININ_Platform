import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

function ModalShell({ open, onClose, title, children, wide }: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="vn-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`vn-modal relative w-full ${wide ? "max-w-lg" : "max-w-md"} rounded-2xl border border-pink-500/15 p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="vn-modal-title" className="text-sm font-bold tracking-[0.2em] text-pink-200/90 uppercase">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const mockSaves = [
  {
    slot: 1,
    title: "Chapter 3 — Rainy Confession",
    chapter: "Route: Mia",
    timestamp: "Mar 12, 2026 — 21:34",
    filled: true,
  },
  {
    slot: 2,
    title: "Chapter 1 — First Meeting",
    chapter: "Common Route",
    timestamp: "Mar 10, 2026 — 18:02",
    filled: true,
  },
  {
    slot: 3,
    title: "Empty Slot",
    chapter: null,
    timestamp: null,
    filled: false,
  },
];

export function LoadGameModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell open={open} onClose={onClose} title="Load Game" wide>
      <div className="space-y-2">
        {mockSaves.map((save) => (
          <button
            key={save.slot}
            type="button"
            disabled={!save.filled}
            onClick={save.filled ? onClose : undefined}
            className={`w-full text-left rounded-xl border px-4 py-3 transition-all cursor-pointer ${
              save.filled
                ? "border-pink-500/20 bg-white/[0.04] hover:border-pink-400/35 hover:bg-pink-500/[0.06]"
                : "border-white/[0.06] bg-white/[0.02] opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  save.filled ? "bg-pink-500/15 text-pink-300" : "bg-white/[0.04] text-white/25"
                }`}
              >
                <Save className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-pink-300/60 tracking-wider">SLOT {save.slot}</p>
                <p className={`text-sm font-semibold mt-0.5 ${save.filled ? "text-white/85" : "text-white/35"}`}>
                  {save.title}
                </p>
                {save.chapter && <p className="text-[10px] text-white/35 mt-0.5">{save.chapter}</p>}
                {save.timestamp && (
                  <p className="text-[10px] text-white/25 mt-1 font-mono">{save.timestamp}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

export function GalleryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell open={open} onClose={onClose} title="Gallery">
      <div className="py-10 text-center">
        <p className="text-lg font-light text-pink-100/80 tracking-wide">Gallery Coming Soon</p>
        <p className="text-xs text-white/30 mt-2">Unlock character art as you progress through the story.</p>
      </div>
    </ModalShell>
  );
}

function ToggleRow({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-white/70">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
          enabled ? "bg-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)]" : "bg-white/10"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [volume, setVolume] = useState(72);
  const [subtitles, setSubtitles] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreen = (next: boolean) => {
    setFullscreen(next);
    if (next) {
      document.documentElement.requestFullscreen?.().catch(() => setFullscreen(false));
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <ModalShell open={open} onClose={onClose} title="Settings">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Master Volume</span>
            <span className="text-[11px] font-mono text-pink-300/70">{volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="vn-volume-slider w-full"
          />
        </div>
        <div className="border-t border-white/[0.06] pt-2 space-y-1">
          <ToggleRow label="Subtitles" enabled={subtitles} onChange={setSubtitles} />
          <ToggleRow label="Fullscreen" enabled={fullscreen} onChange={handleFullscreen} />
        </div>
      </div>
    </ModalShell>
  );
}
