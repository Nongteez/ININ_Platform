// ─── Studio Topbar — Professional Software UI ────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Undo2, Redo2, Play, Eye, Upload, ChevronDown, Pencil, Puzzle, HelpCircle,
  Check, Loader2, Save, Download, RotateCcw, FilePlus, FolderOpen, Clock,
  Camera, Archive, Hammer, Share2, Copy, Trash2, Settings, Keyboard, Book,
  Video, Globe, MessageCircle, Headphones, Info, Package, RefreshCw,
  ShoppingBag, CheckCircle2, ExternalLink, Palette, Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStudioStore } from "@/store/useStudioStore";
import logo from "@/assets/Logo/ICON_ININ.png";

// ─── Dropdown Menu Primitive ─────────────────────────────────────

interface MenuItem {
  label: string;
  icon?: React.ElementType;
  shortcut?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  external?: boolean;
  separator?: boolean;
  badge?: string;
}

function DropdownMenu({
  trigger,
  items,
  open,
  onOpenChange,
}: {
  trigger: React.ReactNode;
  items: MenuItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onOpenChange]);

  // Keyboard nav
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[220px] py-1.5 rounded-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden"
            style={{
              background: "rgba(11,16,32,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {items.map((item, i) =>
              item.separator ? (
                <div key={`sep-${i}`} className="h-px bg-white/[0.05] my-1.5 mx-3" />
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.disabled) return;
                    item.onClick?.();
                    onOpenChange(false);
                  }}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-2.5 px-3 py-[7px] text-[11px] font-medium transition-all cursor-pointer group ${
                    item.danger
                      ? "text-red-400/80 hover:bg-red-500/10 hover:text-red-300"
                      : item.disabled
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.icon && (
                    <item.icon className={`w-3.5 h-3.5 shrink-0 ${item.disabled ? "opacity-30" : "opacity-60 group-hover:opacity-100"} transition-opacity`} />
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/20">{item.badge}</span>
                  )}
                  {item.shortcut && (
                    <span className="text-[9px] font-mono text-white/25 ml-2">{item.shortcut}</span>
                  )}
                  {item.external && (
                    <ExternalLink className="w-2.5 h-2.5 text-white/20" />
                  )}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Menu Trigger Button ─────────────────────────────────────────

function MenuTrigger({ icon: Icon, label, active }: { icon: React.ElementType; label: string; active: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer select-none ${
        active
          ? "text-white bg-white/[0.06]"
          : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

// ─── Mode Pill Buttons ───────────────────────────────────────────

function ModePills() {
  const { editorMode, setEditorMode } = useStudioStore();
  const modes = [
    { key: "design" as const, label: "Design", icon: Palette },
    { key: "play" as const, label: "Play", icon: Play },
    { key: "preview" as const, label: "Preview", icon: Eye },
  ];

  return (
    <div className="flex items-center p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
      {modes.map(({ key, label, icon: Icon }) => (
        <motion.button
          key={key}
          onClick={() => setEditorMode(key)}
          className={`relative flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
            editorMode === key ? "text-white" : "text-white/40 hover:text-white/60"
          }`}
          whileTap={{ scale: 0.97 }}
        >
          {editorMode === key && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 rounded-md"
              style={{
                background: "linear-gradient(135deg, rgba(123,92,255,0.3), rgba(157,77,255,0.2))",
                boxShadow: "0 0 12px rgba(123,92,255,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon className="w-3 h-3 relative z-10" />
          <span className="relative z-10">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Profile Dropdown ────────────────────────────────────────────

function ProfileButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="h-7 w-7 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-purple-500/30 transition-all cursor-pointer"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#7B5CFF] to-[#9D4DFF] flex items-center justify-center text-white text-[10px] font-bold">
          U
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-[200px] z-50 py-1.5 rounded-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
            style={{ background: "rgba(11,16,32,0.96)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-3 py-2 border-b border-white/[0.05]">
              <p className="text-[11px] font-bold text-white/80">Creator</p>
              <p className="text-[9px] text-white/30">creator@inin.studio</p>
            </div>
            {[
              { label: "My Projects", icon: FolderOpen },
              { label: "Account Settings", icon: Settings },
              { label: "Keyboard Shortcuts", icon: Keyboard },
            ].map((item) => (
              <button key={item.label} onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-[7px] text-[11px] font-medium text-white/60 hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer">
                <item.icon className="w-3.5 h-3.5 opacity-50" />
                {item.label}
              </button>
            ))}
            <div className="h-px bg-white/[0.05] my-1 mx-3" />
            <button onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-[7px] text-[11px] font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer">
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Topbar ─────────────────────────────────────────────────

export function Topbar() {
  const {
    projectName, setProjectName, autosaveStatus, triggerSave,
    isPreviewMode, loadProject, lastSavedAt, setSettingsOpen,
    editorMode, setPublishModalOpen, setAIPanelOpen,
  } = useStudioStore();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const openMenu = useCallback((id: string) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  }, []);

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  // ── Menu Definitions ──

  const projectItems: MenuItem[] = [
    { label: "New Project", icon: FilePlus, shortcut: "Ctrl+N", onClick: () => { /* clear state */ } },
    { label: "Open Project", icon: FolderOpen, shortcut: "Ctrl+O", onClick: () => loadProject() },
    { label: "Open Recent", icon: Clock, onClick: () => {} },
    { separator: true, label: "" },
    { label: "Save", icon: Save, shortcut: "Ctrl+S", onClick: () => triggerSave() },
    { label: "Save Snapshot", icon: Camera, onClick: () => triggerSave() },
    { label: "Restore Backup", icon: Archive, onClick: () => loadProject() },
    { separator: true, label: "" },
    { label: "Build Game", icon: Hammer, shortcut: "Ctrl+B", onClick: () => {} },
    { label: "Export Project", icon: Download, onClick: () => {} },
    { label: "Publish Project", icon: Upload, onClick: () => {} },
  ];

  const editItems: MenuItem[] = [
    { label: "Undo", icon: Undo2, shortcut: "Ctrl+Z", onClick: () => {} },
    { label: "Redo", icon: Redo2, shortcut: "Ctrl+Y", onClick: () => {} },
    { separator: true, label: "" },
    { label: "Duplicate Scene", icon: Copy, shortcut: "Ctrl+D", onClick: () => {} },
    { label: "Delete", icon: Trash2, shortcut: "Del", danger: true, onClick: () => {} },
    { separator: true, label: "" },
    { label: "Preferences", icon: Settings, onClick: () => setSettingsOpen(true) },
    { label: "Keyboard Shortcuts", icon: Keyboard, shortcut: "Ctrl+K", onClick: () => {} },
  ];

  const pluginItems: MenuItem[] = [
    { label: "Plugin Manager", icon: Package, onClick: () => {} },
    { label: "Plugin Store", icon: ShoppingBag, badge: "Soon", disabled: true, onClick: () => {} },
    { separator: true, label: "" },
    { label: "Check for Updates", icon: RefreshCw, onClick: () => {} },
    { label: "Installed Plugins", icon: CheckCircle2, onClick: () => {} },
  ];

  const helpItems: MenuItem[] = [
    { label: "Documentation", icon: Book, external: true, onClick: () => window.open("#", "_blank") },
    { label: "Video Tutorials", icon: Video, external: true, onClick: () => window.open("#", "_blank") },
    { separator: true, label: "" },
    { label: "Official Website", icon: Globe, external: true, onClick: () => window.open("#", "_blank") },
    { label: "Discord Community", icon: MessageCircle, external: true, onClick: () => window.open("#", "_blank") },
    { label: "Tech Support", icon: Headphones, external: true, onClick: () => window.open("#", "_blank") },
    { separator: true, label: "" },
    { label: "About ININ Studio", icon: Info, onClick: () => {} },
  ];

  return (
    <div className="studio-topbar h-[52px] flex items-center justify-between px-3 border-b border-white/[0.06] shrink-0 select-none">

      {/* ═══ LEFT SECTION ═══ */}
      <div className="flex items-center gap-1">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-2 group">
          <img src={logo} alt="ININ" className="h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-[11px] font-bold text-white/60 group-hover:text-white/80 transition-colors tracking-wider">STUDIO</span>
        </Link>

        <div className="h-5 w-px bg-white/[0.08] mx-1" />

        {/* Project Name Dropdown */}
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent text-xs font-semibold text-white/80 w-32 outline-none group-hover:text-white transition-colors"
              />
              <ChevronDown className="w-3 h-3 text-white/30" />
            </div>
          }
          items={projectItems}
          open={activeMenu === "project"}
          onOpenChange={(open) => open ? openMenu("project") : closeMenu()}
        />

        <div className="h-5 w-px bg-white/[0.08] mx-1 hidden md:block" />

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-0.5">
          <DropdownMenu
            trigger={<MenuTrigger icon={Pencil} label="Edit" active={activeMenu === "edit"} />}
            items={editItems}
            open={activeMenu === "edit"}
            onOpenChange={(open) => open ? openMenu("edit") : closeMenu()}
          />
          <DropdownMenu
            trigger={<MenuTrigger icon={Puzzle} label="Plugins" active={activeMenu === "plugins"} />}
            items={pluginItems}
            open={activeMenu === "plugins"}
            onOpenChange={(open) => open ? openMenu("plugins") : closeMenu()}
          />
          <DropdownMenu
            trigger={<MenuTrigger icon={HelpCircle} label="Help" active={activeMenu === "help"} />}
            items={helpItems}
            open={activeMenu === "help"}
            onOpenChange={(open) => open ? openMenu("help") : closeMenu()}
          />
        </div>
      </div>

      {/* ═══ CENTER SECTION ═══ */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.04] transition-all cursor-pointer" title="Undo (Ctrl+Z)">
            <Undo2 className="w-4 h-4" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.04] transition-all cursor-pointer" title="Redo (Ctrl+Y)">
            <Redo2 className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="h-5 w-px bg-white/[0.08] mx-1" />

        {/* Mode Pills */}
        <ModePills />
      </div>

      {/* ═══ RIGHT SECTION ═══ */}
      <div className="flex items-center gap-2">
        {/* Autosave */}
        <div className="flex items-center gap-1.5 text-[10px] font-medium">
          {autosaveStatus === "saved" && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-green-400/60">
              <Check className="w-3 h-3" />Saved
            </motion.span>
          )}
          {autosaveStatus === "saving" && (
            <span className="flex items-center gap-1 text-yellow-400/60">
              <Loader2 className="w-3 h-3 animate-spin" />Saving...
            </span>
          )}
          {autosaveStatus === "unsaved" && (
            <span className="flex items-center gap-1 text-orange-400/60">
              <Save className="w-3 h-3" />Unsaved
            </span>
          )}
        </div>

        {/* Settings Gear */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSettingsOpen(true)}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </motion.button>

        {/* AI Agent */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAIPanelOpen(true)}
          className="ai-agent-trigger relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shrink-0"
          title="Connect AI Agent"
          aria-label="Connect AI Agent"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300/90 relative z-10" />
        </motion.button>

        {/* Publish */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setPublishModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold text-[11px] text-white cursor-pointer relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7B5CFF, #9D4DFF)",
            boxShadow: "0 4px 16px rgba(123,92,255,0.3), 0 0 0 1px rgba(157,77,255,0.2)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          <Upload className="w-3.5 h-3.5 relative z-10" />
          <span className="relative z-10">Publish</span>
        </motion.button>

        {/* Profile */}
        <ProfileButton />
      </div>
    </div>
  );
}
