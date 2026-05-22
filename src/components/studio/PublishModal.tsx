// ─── Publish Modal — Interactive Experience Export ────────────────

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Globe, Monitor, Smartphone, Apple, Laptop, Package, Upload,
  ExternalLink, CheckCircle2, Shield, FileCheck, HardDrive, Clock,
  Zap, ArrowUpRight, Gauge,
} from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";

// ─── Platform Data ───────────────────────────────────────────────

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "ready" | "soon" | "beta";
  color: string;
}

const platforms: Platform[] = [
  {
    id: "inin",
    name: "ININ Platform",
    description: "Publish to the ININ creator platform",
    icon: Zap,
    status: "ready",
    color: "#9D4DFF",
  },
  {
    id: "web",
    name: "Web (HTML5)",
    description: "Deploy interactive FMV directly to the browser",
    icon: Globe,
    status: "ready",
    color: "#00D1FF",
  },
  {
    id: "steam",
    name: "Steam",
    description: "Deploy on Steam for PC & Steam Deck",
    icon: Gauge,
    status: "beta",
    color: "#1B9FFF",
  },
  {
    id: "android",
    name: "Android",
    description: "Android APK for mobile devices",
    icon: Smartphone,
    status: "ready",
    color: "#3DDC84",
  },
  {
    id: "ios",
    name: "iOS",
    description: "iOS App Store deployment",
    icon: Apple,
    status: "soon",
    color: "#FF6B9D",
  },
  {
    id: "macos",
    name: "macOS",
    description: "macOS Universal App",
    icon: Laptop,
    status: "soon",
    color: "#A0A0A0",
  },
  {
    id: "windows",
    name: "Windows",
    description: "Windows desktop build",
    icon: Monitor,
    status: "beta",
    color: "#00ADEF",
  },
  {
    id: "standalone",
    name: "Standalone Build",
    description: "Export standalone executable build",
    icon: Package,
    status: "ready",
    color: "#FF9F43",
  },
];

// ─── Export Settings Data ────────────────────────────────────────

interface ExportSetting {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const exportSettings: ExportSetting[] = [
  { id: "vertical", label: "Vertical Mode 9:16", description: "Optimize experience for vertical viewing", defaultOn: false },
  { id: "choices", label: "Interactive Choice System", description: "Enable player choices and branching outcomes", defaultOn: true },
  { id: "branching", label: "Branching Story Logic", description: "Export all story branches and variables", defaultOn: true },
  { id: "analytics", label: "Emotional Analytics", description: "Track trust, courage, knowledge and engagement", defaultOn: true },
  { id: "cloudsave", label: "Cloud Save Support", description: "Enable cloud sync for player progress", defaultOn: false },
];

// ─── Toggle Component ────────────────────────────────────────────

function PublishToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`publish-toggle w-10 h-[22px] rounded-full transition-all duration-300 cursor-pointer relative shrink-0 ${
        enabled
          ? "bg-purple-500 shadow-[0_0_12px_rgba(157,77,255,0.4)]"
          : "bg-white/[0.08]"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

// ─── Status Badge ────────────────────────────────────────────────

function StatusBadge({ status }: { status: "ready" | "soon" | "beta" }) {
  const config = {
    ready: { label: "Ready", bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/20" },
    beta: { label: "Beta", bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/20" },
    soon: { label: "Soon", bg: "bg-white/[0.06]", text: "text-white/30", border: "border-white/[0.06]" },
  };
  const c = config[status];
  return (
    <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${c.bg} ${c.text} border ${c.border}`}>
      {c.label}
    </span>
  );
}

// ─── Platform Card ───────────────────────────────────────────────

function PlatformCard({
  platform,
  selected,
  onClick,
}: {
  platform: Platform;
  selected: boolean;
  onClick: () => void;
}) {
  const disabled = platform.status === "soon";

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left group ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : selected
          ? "publish-platform-selected bg-purple-500/[0.08] border-purple-500/25"
          : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] cursor-pointer"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          selected
            ? "shadow-[0_0_16px_rgba(157,77,255,0.2)]"
            : "bg-white/[0.04]"
        }`}
        style={
          selected
            ? { background: `linear-gradient(135deg, ${platform.color}30, ${platform.color}15)` }
            : undefined
        }
      >
        <platform.icon
          className={`w-4 h-4 transition-colors duration-300 ${
            selected ? "text-purple-300" : "text-white/30 group-hover:text-white/50"
          }`}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-[11px] font-semibold transition-colors ${selected ? "text-white" : "text-white/70"}`}>
          {platform.name}
        </p>
        <p className="text-[9px] text-white/25 leading-relaxed truncate">{platform.description}</p>
      </div>

      {/* Badge */}
      <StatusBadge status={platform.status} />
    </motion.button>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────

function UploadProgressBar({
  progress,
  platformName,
  speed,
  remaining,
}: {
  progress: number;
  platformName: string;
  speed: string;
  remaining: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/50">
          Uploading to {platformName}…{" "}
          <span className="text-purple-300 font-semibold">{progress}%</span>
        </span>
        <span className="text-[9px] text-white/25">{remaining} remaining</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="publish-progress-bar h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-white/20 flex items-center gap-1">
          <ArrowUpRight className="w-2.5 h-2.5" />
          {speed}
        </span>
      </div>
    </div>
  );
}

// ─── Main Publish Modal ──────────────────────────────────────────

export function PublishModal() {
  const { publishModalOpen, setPublishModalOpen, projectName } = useStudioStore();
  const [selectedPlatform, setSelectedPlatform] = useState("inin");
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    exportSettings.forEach((s) => { initial[s.id] = s.defaultOn; });
    return initial;
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (publishModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [publishModalOpen]);

  // ESC to close
  useEffect(() => {
    if (!publishModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPublishModalOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [publishModalOpen, setPublishModalOpen]);

  // Simulate export progress
  useEffect(() => {
    if (!isExporting) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportDone(true);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isExporting]);

  const handlePublish = useCallback(() => {
    setIsExporting(true);
    setExportDone(false);
    setProgress(0);
  }, []);

  const handleToggle = useCallback((id: string, value: boolean) => {
    setToggleStates((prev) => ({ ...prev, [id]: value }));
  }, []);

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform);
  const clampedProgress = Math.min(Math.round(progress), 100);

  if (!publishModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/65 backdrop-blur-md"
          onClick={() => setPublishModalOpen(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="publish-modal relative w-[920px] max-w-[92vw] max-h-[88vh] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col"
        >
          {/* ═══ Header ═══ */}
          <div className="shrink-0 px-6 pt-6 pb-4 border-b border-white/[0.05]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center publish-header-icon">
                    <Upload className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  Publish Interactive Experience
                </h2>
                <p className="text-[11px] text-white/35 mt-1 ml-9">
                  Choose a platform and configure your export settings
                </p>
              </div>
              <button
                onClick={() => setPublishModalOpen(false)}
                className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ═══ Body ═══ */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex min-h-0">
              {/* ─── LEFT: Platforms ─── */}
              <div className="flex-1 p-5 border-r border-white/[0.05]">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Supported Platforms</h3>
                  <span className="text-[9px] font-semibold text-white/20 px-1.5 py-0.5 rounded bg-white/[0.04]">
                    {platforms.filter((p) => p.status !== "soon").length} available
                  </span>
                </div>
                <div className="space-y-1.5">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      platform={platform}
                      selected={selectedPlatform === platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─── RIGHT: Export Settings ─── */}
              <div className="w-[320px] shrink-0 p-5">
                <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-3">Export Settings</h3>
                <div className="space-y-0 divide-y divide-white/[0.04]">
                  {exportSettings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-white/75">{setting.label}</p>
                        <p className="text-[9px] text-white/25 mt-0.5 leading-relaxed">{setting.description}</p>
                      </div>
                      <PublishToggle
                        enabled={toggleStates[setting.id]}
                        onChange={(v) => handleToggle(setting.id, v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Bottom: Summary + Progress + Actions ═══ */}
          <div className="shrink-0 border-t border-white/[0.05] px-6 py-4 space-y-4">
            {/* Summary Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="publish-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] font-semibold text-emerald-400/80">AI Moderation Passed</span>
              </div>
              <div className="publish-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg">
                <FileCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] font-semibold text-emerald-400/80">Content Check Approved</span>
              </div>
              <div className="publish-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg">
                <HardDrive className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-semibold text-white/40">248 MB</span>
              </div>
              <div className="publish-chip flex items-center gap-1.5 px-2.5 py-1 rounded-lg">
                <Clock className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-semibold text-white/40">~2 min</span>
              </div>
            </div>

            {/* Progress Bar (visible during/after export) */}
            {(isExporting || exportDone) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <UploadProgressBar
                  progress={clampedProgress}
                  platformName={currentPlatform?.name || "ININ Platform"}
                  speed="12.4 MB/s"
                  remaining={clampedProgress >= 100 ? "Done" : `${Math.max(1, Math.round((100 - clampedProgress) / 8))}s`}
                />
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              {/* Status Label */}
              <div className="flex items-center gap-2">
                {exportDone ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-semibold text-emerald-400/80">
                      Export Completed — Ready for distribution
                    </span>
                  </motion.div>
                ) : isExporting ? (
                  <span className="text-[10px] font-medium text-white/30">
                    Exporting "{projectName}"…
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-white/20">
                    Ready to publish
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                {/* View Dashboard */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold text-white/50 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/70 hover:border-white/[0.1] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Dashboard
                </motion.button>

                {/* Publish & Export */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePublish}
                  disabled={isExporting}
                  className={`publish-export-btn flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-bold text-white cursor-pointer relative overflow-hidden ${
                    isExporting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="publish-btn-shimmer absolute inset-0" />
                  <Upload className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">
                    {isExporting ? "Publishing…" : exportDone ? "Re-publish" : "Publish & Export"}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
