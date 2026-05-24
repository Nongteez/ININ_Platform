// ─── AI Agent Hub — Connect AI Assistant Modal ───────────────────

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Sparkles,
  WandSparkles,
  Loader2,
  ChevronDown,
  Link2,
  CheckCircle2,
  Activity,
  RefreshCw,
  Star,
} from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import logoChatgpt from "@/assets/Image/Contact/Logo_chatgpt.png";
import logoClaude from "@/assets/Image/Contact/Logo_claude.png";
import logoGemini from "@/assets/Image/Contact/Logo_gemini.png";

// ─── Types ───────────────────────────────────────────────────────

type ConnectStatus = "idle" | "connecting" | "connected" | "disconnecting";
type ProviderCategory = "all" | "writing" | "multimodal" | "custom";
type FilterOption = "all" | "connected" | "available" | "recommended";

interface AIProvider {
  id: string;
  name: string;
  description: string;
  logo?: string;
  icon?: React.ElementType;
  color: string;
  iconClass: string;
  category: Exclude<ProviderCategory, "all">;
  recommended?: boolean;
}

const STORAGE_KEY = "inin_studio_ai_connections";

const providers: AIProvider[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Story generation, branching dialogue, emotional scripting.",
    logo: logoChatgpt,
    color: "#10A37F",
    iconClass: "ai-provider-icon--chatgpt",
    category: "writing",
    recommended: true,
  },
  {
    id: "claude",
    name: "Claude",
    description: "Long-form narrative planning and cinematic writing.",
    logo: logoClaude,
    color: "#D97757",
    iconClass: "ai-provider-icon--claude",
    category: "writing",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Multimodal scene understanding and visual analysis.",
    logo: logoGemini,
    color: "#4285F4",
    iconClass: "ai-provider-icon--gemini",
    category: "multimodal",
  },
  {
    id: "custom",
    name: "Custom AI Agent",
    description: "Connect your own external AI workflow.",
    icon: WandSparkles,
    color: "#9D4DFF",
    iconClass: "ai-provider-icon--custom",
    category: "custom",
  },
];

const categories: { id: ProviderCategory; label: string }[] = [
  { id: "all", label: "All Agents" },
  { id: "writing", label: "Writing" },
  { id: "multimodal", label: "Multimodal" },
  { id: "custom", label: "Custom" },
];

const filters: { id: FilterOption; label: string }[] = [
  { id: "all", label: "All" },
  { id: "connected", label: "Connected" },
  { id: "available", label: "Available" },
  { id: "recommended", label: "Recommended" },
];

function loadConnections(): Record<string, ConnectStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ConnectStatus>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => v === "connected")
    ) as Record<string, ConnectStatus>;
  } catch {
    return {};
  }
}

function saveConnections(state: Record<string, ConnectStatus>) {
  const connected = Object.fromEntries(
    Object.entries(state).filter(([, v]) => v === "connected")
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(connected));
}

// ─── Floating Particles ──────────────────────────────────────────

function ModalParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${8 + (i * 7.5) % 85}%`,
        top: `${10 + (i * 11) % 80}%`,
        size: 2 + (i % 3),
        delay: i * 0.4,
        duration: 4 + (i % 4),
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Connect Button (toggle) ───────────────────────────────────────

const CONNECT_BTN_CONFIG: Record<
  ConnectStatus,
  { label: string; className: string; icon: React.ElementType; spin?: boolean; disabled?: boolean }
> = {
  idle: {
    label: "Connect",
    className: "ai-connect-btn ai-connect-btn--idle",
    icon: Link2,
  },
  connecting: {
    label: "Connecting...",
    className: "ai-connect-btn ai-connect-btn--busy",
    icon: Loader2,
    spin: true,
    disabled: true,
  },
  connected: {
    label: "Connected",
    className: "ai-connect-btn ai-connect-btn--connected",
    icon: CheckCircle2,
  },
  disconnecting: {
    label: "Disconnecting...",
    className: "ai-connect-btn ai-connect-btn--busy",
    icon: Loader2,
    spin: true,
    disabled: true,
  },
};

function ConnectionStatusLine({
  status,
  syncActive,
}: {
  status: ConnectStatus;
  syncActive: boolean;
}) {
  if (status === "connecting" || status === "disconnecting") {
    return (
      <motion.p
        key={status}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="text-[9px] text-white/30 font-medium"
      >
        {status === "connecting" ? "Establishing link…" : "Closing connection…"}
      </motion.p>
    );
  }

  if (status === "connected") {
    return (
      <motion.p
        key="connected"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="text-[9px] font-medium text-emerald-400/70 flex items-center gap-1.5 justify-end"
      >
        <span className="status-dot w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
        AI Connected
        {syncActive && <span className="text-emerald-400/45">· Sync Active</span>}
      </motion.p>
    );
  }

  return (
    <motion.p
      key="idle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-[9px] text-white/20 font-medium"
    >
      Disconnected
    </motion.p>
  );
}

function ConnectButton({
  status,
  onToggle,
  syncActive,
}: {
  status: ConnectStatus;
  onToggle: () => void;
  syncActive: boolean;
}) {
  const config = CONNECT_BTN_CONFIG[status];
  const Icon = config.icon;
  const canToggle = !config.disabled;

  return (
    <div className="flex flex-col items-end gap-1.5 min-w-[108px]">
      <AnimatePresence mode="wait">
        <motion.button
          key={status}
          type="button"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          whileHover={canToggle ? { scale: 1.03 } : undefined}
          whileTap={canToggle ? { scale: 0.97 } : undefined}
          onClick={canToggle ? onToggle : undefined}
          disabled={config.disabled}
          title={
            status === "connected"
              ? "Click to disconnect"
              : status === "idle"
              ? "Connect AI agent"
              : undefined
          }
          className={`${config.className} flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold min-w-[108px] ${
            canToggle ? "cursor-pointer" : "cursor-wait"
          } ${status === "connected" ? "text-emerald-300" : status === "idle" ? "text-white/75" : "text-white/50"}`}
        >
          <Icon className={`w-3.5 h-3.5 shrink-0 ${config.spin ? "animate-spin" : ""}`} />
          {config.label}
        </motion.button>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <ConnectionStatusLine status={status} syncActive={syncActive} />
      </AnimatePresence>
    </div>
  );
}

// ─── Provider Card ─────────────────────────────────────────────────

function ProviderCard({
  provider,
  status,
  onToggle,
  syncActive,
  index,
}: {
  provider: AIProvider;
  status: ConnectStatus;
  onToggle: () => void;
  syncActive: boolean;
  index: number;
}) {
  const Icon = provider.icon;
  const isConnected = status === "connected";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`ai-provider-card group relative rounded-2xl border p-4 transition-all duration-300 ${
        isConnected
          ? "ai-provider-card--connected"
          : "border-white/[0.06] hover:border-purple-500/25"
      }`}
    >
      {provider.recommended && !isConnected && (
        <span className="absolute -top-2 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/25">
          <Star className="w-2.5 h-2.5" />
          Recommended
        </span>
      )}

      <div className="flex gap-4">
        <div
          className={`ai-provider-icon ${provider.iconClass} w-12 h-12 rounded-xl flex items-center justify-center shrink-0 p-2`}
          style={{
            boxShadow: isConnected
              ? `0 0 12px ${provider.color}30`
              : `0 0 8px ${provider.color}12`,
          }}
        >
          {provider.logo ? (
            <img
              src={provider.logo}
              alt={`${provider.name} logo`}
              className="w-full h-full object-contain"
              draggable={false}
            />
          ) : Icon ? (
            <Icon className="w-5 h-5" style={{ color: provider.color }} />
          ) : null}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-[13px] font-bold text-white flex items-center gap-2">
                {provider.name}
                {isConnected && (
                  <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                )}
              </h4>
              <p className="text-[10px] text-white/35 mt-1 leading-relaxed pr-2">
                {provider.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <ConnectButton status={status} onToggle={onToggle} syncActive={syncActive && isConnected} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Memory Sync Toggle ──────────────────────────────────────────

function MemorySyncToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
        enabled
          ? "bg-purple-500/10 border-purple-500/25 text-purple-300"
          : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white/60"
      }`}
    >
      <RefreshCw
        className="w-3 h-3"
        style={enabled ? { animation: "spin 3s linear infinite" } : undefined}
      />
      <span className="text-[10px] font-semibold">Memory Sync</span>
      <div
        className={`w-8 h-[18px] rounded-full relative transition-all ${
          enabled ? "bg-purple-500 shadow-[0_0_10px_rgba(157,77,255,0.4)]" : "bg-white/[0.08]"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 16 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-[2px] w-3.5 h-3.5 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  );
}

// ─── Main Modal ────────────────────────────────────────────────────

export function AIAgentModal() {
  const { aiPanelOpen, setAIPanelOpen } = useStudioStore();
  const [connections, setConnections] = useState<Record<string, ConnectStatus>>(loadConnections);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProviderCategory>("all");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [memorySync, setMemorySync] = useState(true);
  const pendingTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const clearPending = useCallback((providerId: string) => {
    const timer = pendingTimers.current[providerId];
    if (timer) {
      clearTimeout(timer);
      delete pendingTimers.current[providerId];
    }
  }, []);

  useEffect(() => {
    return () => {
      Object.values(pendingTimers.current).forEach(clearTimeout);
      pendingTimers.current = {};
    };
  }, []);

  useEffect(() => {
    if (aiPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [aiPanelOpen]);

  useEffect(() => {
    if (!aiPanelOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAIPanelOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [aiPanelOpen, setAIPanelOpen]);

  const handleToggle = useCallback(
    (providerId: string) => {
      setConnections((prev) => {
        const current = prev[providerId] ?? "idle";
        if (current === "connecting" || current === "disconnecting") return prev;

        clearPending(providerId);

        if (current === "connected") {
          pendingTimers.current[providerId] = setTimeout(() => {
            setConnections((p) => {
              const { [providerId]: _, ...rest } = p;
              saveConnections(rest);
              return rest;
            });
            delete pendingTimers.current[providerId];
          }, 480);
          return { ...prev, [providerId]: "disconnecting" };
        }

        pendingTimers.current[providerId] = setTimeout(() => {
          setConnections((p) => {
            const next = { ...p, [providerId]: "connected" as ConnectStatus };
            saveConnections(next);
            return next;
          });
          delete pendingTimers.current[providerId];
        }, 1100 + Math.random() * 400);

        return { ...prev, [providerId]: "connecting" };
      });
    },
    [clearPending]
  );

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      const status = connections[p.id] ?? "idle";
      const matchesSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      const matchesFilter =
        filter === "all" ||
        (filter === "connected" && status === "connected") ||
        (filter === "available" && status !== "connected") ||
        (filter === "recommended" && p.recommended);
      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [search, category, filter, connections]);

  const connectedCount = Object.values(connections).filter((s) => s === "connected").length;

  if (!aiPanelOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          onClick={() => setAIPanelOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="ai-agent-modal relative w-full md:w-[min(920px,92vw)] max-h-[100dvh] md:max-h-[88vh] rounded-t-3xl md:rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalParticles />

          {/* Ambient glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 right-0 w-[300px] h-[150px] bg-cyan-500/5 blur-[60px] pointer-events-none" />

          {/* Header */}
          <div className="relative shrink-0 px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-white/[0.05]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-400/80 neon-text">
                    AI Agent Hub
                  </span>
                  <span className="ai-online-badge flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
                    <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    AI Online
                  </span>
                </div>
                <h2 className="text-[17px] md:text-[18px] font-bold text-white flex items-center gap-2">
                  <div className="ai-agent-header-icon w-8 h-8 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                  </div>
                  Connect Your AI Assistant
                </h2>
                <p className="text-[11px] text-white/35 mt-1.5 max-w-md leading-relaxed">
                  Enhance your interactive storytelling workflow with AI-powered agents.
                </p>
              </div>
              <button
                onClick={() => setAIPanelOpen(false)}
                className="p-2 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search + filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search AI agents..."
                  className="ai-agent-input w-full pl-9 pr-3 py-2.5 rounded-xl text-[11px] text-white placeholder:text-white/25 outline-none"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="ai-agent-input flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/70 min-w-[120px] cursor-pointer"
                  >
                    {filters.find((f) => f.id === filter)?.label}
                    <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {filterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute right-0 top-full mt-1 z-20 min-w-[140px] py-1 rounded-xl border border-white/[0.08] shadow-xl overflow-hidden"
                        style={{ background: "rgba(11,16,32,0.98)", backdropFilter: "blur(20px)" }}
                      >
                        {filters.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setFilter(f.id);
                              setFilterOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-[11px] font-medium transition-colors cursor-pointer ${
                              filter === f.id
                                ? "text-purple-300 bg-purple-500/10"
                                : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProviderCategory)}
                  className="ai-agent-input ai-agent-select px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/70 min-w-[130px] cursor-pointer outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0B1020]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex-1 overflow-y-auto scrollbar-hide px-5 md:px-6 py-4 md:py-5">
            {filteredProviders.length === 0 ? (
              <div className="py-12 text-center">
                <Activity className="w-8 h-8 text-white/15 mx-auto mb-2" />
                <p className="text-[12px] text-white/40">No agents match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filteredProviders.map((provider, i) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    status={connections[provider.id] ?? "idle"}
                    onToggle={() => handleToggle(provider.id)}
                    syncActive={memorySync}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative shrink-0 px-5 md:px-6 py-3 md:py-4 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-3 bg-black/20">
            <MemorySyncToggle enabled={memorySync} onChange={setMemorySync} />
            <div className="flex items-center gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-purple-400/60" />
                {connectedCount} agent{connectedCount !== 1 ? "s" : ""} connected
              </span>
              <span className="hidden sm:inline text-white/15">|</span>
              <span className="hidden sm:inline text-white/25">Story memory {memorySync ? "syncing" : "paused"}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
