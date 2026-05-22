// ─── Settings Modal — Full Settings System ───────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Settings, Monitor, Globe, Brain, MessageCircle, Keyboard, Trophy,
  Map, Languages, ChevronRight, Film, Volume2, Play, Maximize2,
} from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";

// ─── Settings Sections ──────────────────────────────────────────

const sections = [
  { id: "project", label: "Project Settings", icon: Settings },
  { id: "platforms", label: "Target Platforms", icon: Monitor },
  { id: "variables", label: "Global Variables", icon: Brain },
  { id: "ai", label: "AI Dialogue", icon: MessageCircle },
  { id: "shortcuts", label: "Keyboard Shortcuts", icon: Keyboard },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "storymap", label: "Story Map", icon: Map },
  { id: "language", label: "Editor Language", icon: Languages },
];

// ─── Shared Input Components ─────────────────────────────────────

function SettingField({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-8 py-3">
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-white/80">{label}</p>
        {description && <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SettingSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/80 outline-none focus:border-purple-500/30 transition-colors cursor-pointer min-w-[160px]">
      {options.map((o) => <option key={o.value} value={o.value} className="bg-[#0B1020]">{o.label}</option>)}
    </select>
  );
}

function SettingInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/80 outline-none focus:border-purple-500/30 transition-colors min-w-[160px]" />;
}

function SettingToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${enabled ? "bg-purple-500" : "bg-white/10"}`}>
      <motion.div animate={{ x: enabled ? 16 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
    </button>
  );
}

// ─── Section: Project Settings ───────────────────────────────────

function ProjectSettings() {
  const [resolution, setResolution] = useState("1920x1080");
  const [aspect, setAspect] = useState("16:9");
  const [scaleMode, setScaleMode] = useState("contain");
  const [transition, setTransition] = useState("0.8");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [startScene, setStartScene] = useState("node_1");

  return (
    <div>
      <h3 className="text-sm font-bold text-white/90 mb-1">Project Settings</h3>
      <p className="text-[10px] text-white/30 mb-5">Configure your interactive story project</p>

      <div className="space-y-0 divide-y divide-white/[0.04]">
        <SettingField label="Resolution" description="Output resolution for your story">
          <SettingSelect value={resolution} onChange={setResolution} options={[
            { value: "1920x1080", label: "1920×1080 (Full HD)" },
            { value: "1080x1920", label: "1080×1920 (Vertical)" },
            { value: "1280x720", label: "1280×720 (HD)" },
            { value: "2560x1440", label: "2560×1440 (2K)" },
          ]} />
        </SettingField>

        <SettingField label="Aspect Ratio" description="Display aspect ratio">
          <div className="flex items-center gap-1.5">
            {["16:9", "9:16", "4:3", "1:1"].map((r) => (
              <button key={r} onClick={() => setAspect(r)} className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${aspect === r ? "bg-purple-500/20 text-purple-300 border border-purple-500/25" : "bg-white/[0.03] text-white/40 border border-white/[0.04] hover:bg-white/[0.06]"}`}>{r}</button>
            ))}
          </div>
        </SettingField>

        <SettingField label="Scale Mode" description="How content fits the display">
          <SettingSelect value={scaleMode} onChange={setScaleMode} options={[
            { value: "contain", label: "Contain" },
            { value: "cover", label: "Cover" },
            { value: "stretch", label: "Stretch" },
          ]} />
        </SettingField>

        <SettingField label="Audio" description="Enable background audio playback">
          <SettingToggle enabled={audioEnabled} onChange={setAudioEnabled} />
        </SettingField>

        <SettingField label="Default Transition" description="Default transition time between scenes (seconds)">
          <SettingInput value={transition} onChange={setTransition} type="number" placeholder="0.8" />
        </SettingField>

        <SettingField label="Start Scene" description="Which scene plays first">
          <SettingSelect value={startScene} onChange={setStartScene} options={[
            { value: "node_1", label: "Story Begins" },
          ]} />
        </SettingField>
      </div>
    </div>
  );
}

// ─── Section: Target Platforms ───────────────────────────────────

function PlatformSettings() {
  const [platforms, setPlatforms] = useState({ web: true, mobile: true, desktop: false, tv: false });
  const toggle = (key: string) => setPlatforms((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  const platformData = [
    { key: "web", label: "Web Browser", desc: "HTML5 responsive experience", icon: Globe },
    { key: "mobile", label: "Mobile App", desc: "iOS & Android via WebView", icon: Monitor },
    { key: "desktop", label: "Desktop App", desc: "Windows & macOS (Coming Soon)", icon: Maximize2 },
    { key: "tv", label: "Smart TV", desc: "TV optimized (Coming Soon)", icon: Film },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-white/90 mb-1">Target Platforms</h3>
      <p className="text-[10px] text-white/30 mb-5">Choose where your story will be published</p>
      <div className="space-y-2">
        {platformData.map((p) => (
          <div key={p.key} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${platforms[p.key as keyof typeof platforms] ? "bg-purple-500/5 border-purple-500/15" : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"}`} onClick={() => toggle(p.key)}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${platforms[p.key as keyof typeof platforms] ? "bg-purple-500/15" : "bg-white/[0.04]"}`}>
              <p.icon className={`w-4 h-4 ${platforms[p.key as keyof typeof platforms] ? "text-purple-400" : "text-white/30"}`} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-white/80">{p.label}</p>
              <p className="text-[9px] text-white/30">{p.desc}</p>
            </div>
            <SettingToggle enabled={platforms[p.key as keyof typeof platforms]} onChange={() => toggle(p.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Global Variables ───────────────────────────────────

function VariableSettings() {
  const { storyMemory, addMemoryVar, removeMemoryVar, updateMemoryVar } = useStudioStore();
  return (
    <div>
      <h3 className="text-sm font-bold text-white/90 mb-1">Story Memory</h3>
      <p className="text-[10px] text-white/30 mb-5">Global variables that track player choices across scenes</p>
      <div className="space-y-2">
        {storyMemory.map((m) => (
          <div key={m.key} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <input type="text" value={m.icon} onChange={(e) => updateMemoryVar(m.key, { icon: e.target.value })} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center text-sm outline-none" />
            <div className="flex-1 space-y-1">
              <input type="text" value={m.label} onChange={(e) => updateMemoryVar(m.key, { label: e.target.value })} className="w-full bg-transparent text-[11px] font-semibold text-white/80 outline-none" />
              <input type="text" value={m.key} onChange={(e) => updateMemoryVar(m.key, { key: e.target.value })} className="w-full bg-transparent text-[9px] text-white/25 font-mono outline-none" />
            </div>
            <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.04]">= {m.value}</span>
            <button onClick={() => removeMemoryVar(m.key)} className="p-1 text-white/15 hover:text-red-400 cursor-pointer transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button onClick={() => addMemoryVar(`var_${Date.now()}`, "New Variable", "💡")} className="w-full py-2 rounded-xl text-[10px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 transition-all cursor-pointer">+ Add Variable</button>
      </div>
    </div>
  );
}

// ─── Section: Keyboard Shortcuts ─────────────────────────────────

function ShortcutSettings() {
  const shortcuts = [
    { action: "Play / Pause", keys: "Space" },
    { action: "Save Project", keys: "Ctrl + S" },
    { action: "Delete Node", keys: "Delete" },
    { action: "Toggle Sidebar", keys: "[" },
    { action: "Toggle Preview", keys: "P" },
    { action: "Undo", keys: "Ctrl + Z" },
    { action: "Redo", keys: "Ctrl + Y" },
    { action: "Duplicate", keys: "Ctrl + D" },
    { action: "Build", keys: "Ctrl + B" },
    { action: "New Project", keys: "Ctrl + N" },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-white/90 mb-1">Keyboard Shortcuts</h3>
      <p className="text-[10px] text-white/30 mb-5">Quick actions for faster editing</p>
      <div className="divide-y divide-white/[0.04]">
        {shortcuts.map((s) => (
          <div key={s.action} className="flex items-center justify-between py-2.5">
            <span className="text-[11px] text-white/60">{s.action}</span>
            <div className="flex items-center gap-1">
              {s.keys.split(" + ").map((k, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-white/15 mx-0.5">+</span>}
                  <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[9px] font-mono font-semibold text-white/50">{k}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Placeholder Sections ───────────────────────────────

function PlaceholderSection({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white/90 mb-1">{title}</h3>
      <p className="text-[10px] text-white/30 mb-8">{description}</p>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-white/15" />
        </div>
        <p className="text-[11px] font-semibold text-white/25">Coming Soon</p>
        <p className="text-[9px] text-white/15 mt-1">This feature is being developed</p>
      </div>
    </div>
  );
}

// ─── Main Settings Modal ─────────────────────────────────────────

export function SettingsModal() {
  const { settingsOpen, setSettingsOpen } = useStudioStore();
  const [activeSection, setActiveSection] = useState("project");

  if (!settingsOpen) return null;

  const renderContent = () => {
    switch (activeSection) {
      case "project": return <ProjectSettings />;
      case "platforms": return <PlatformSettings />;
      case "variables": return <VariableSettings />;
      case "shortcuts": return <ShortcutSettings />;
      case "ai": return <PlaceholderSection title="AI Dialogue" description="Generate dialogue and story branches with AI" icon={MessageCircle} />;
      case "achievements": return <PlaceholderSection title="Achievement System" description="Create achievements and milestones for players" icon={Trophy} />;
      case "storymap": return <PlaceholderSection title="Story Map" description="Visualize your complete story structure" icon={Map} />;
      case "language": return <PlaceholderSection title="Editor Language" description="Change the editor interface language" icon={Languages} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-[800px] max-w-[90vw] h-[560px] max-h-[85vh] rounded-2xl border border-white/[0.08] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.03)] flex"
          style={{ background: "rgba(5,8,22,0.98)", backdropFilter: "blur(40px)" }}
        >
          {/* Sidebar */}
          <div className="w-[200px] shrink-0 border-r border-white/[0.06] py-3 flex flex-col">
            <div className="px-4 pb-3 mb-2 border-b border-white/[0.05]">
              <h2 className="text-xs font-bold text-white/80">Settings</h2>
              <p className="text-[9px] text-white/25 mt-0.5">ININ Studio v1.0</p>
            </div>
            <div className="flex-1 space-y-0.5 px-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    activeSection === s.id
                      ? "bg-purple-500/15 text-purple-300"
                      : "text-white/45 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  <s.icon className={`w-3.5 h-3.5 ${activeSection === s.id ? "text-purple-400" : "opacity-50"}`} />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="w-3 h-3 ml-auto opacity-40" />}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setSettingsOpen(false)}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
