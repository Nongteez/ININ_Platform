// ─── ININ Studio Editor — Main Page ───────────────────────────────

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { Topbar } from "@/components/studio/Topbar";
import { LeftSidebar } from "@/components/studio/LeftSidebar";
import { PreviewPanel } from "@/components/studio/PreviewPanel";
import { InspectorPanel } from "@/components/studio/InspectorPanel";
import { NodeGraph } from "@/components/studio/NodeGraph";
import { Timeline } from "@/components/studio/Timeline";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useStudioStore } from "@/store/useStudioStore";
import { SettingsModal } from "@/components/studio/SettingsModal";
import { PublishModal } from "@/components/studio/PublishModal";
import { AIAgentModal } from "@/components/studio/AIAgentModal";

export default function StudioEditor() {
  useKeyboardShortcuts();

  const { bottomPanelTab, setBottomPanelTab, bottomPanelCollapsed, toggleBottomPanel, inspectorCollapsed, toggleInspector, loadProject, triggerSave } = useStudioStore();

  // Auto-load saved project on mount
  useEffect(() => {
    loadProject();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => triggerSave(), 30000);
    return () => clearInterval(interval);
  }, [triggerSave]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050816] text-white overflow-hidden">
      {/* Topbar */}
      <Topbar />

      {/* Modals */}
      <SettingsModal />
      <PublishModal />
      <AIAgentModal />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Center + Right Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Upper Area: Preview + Inspector */}
          <div className="flex-1 flex min-h-0">
            {/* Center Preview */}
            <div className="flex-1 min-w-0">
              <PreviewPanel />
            </div>

            {/* Right Inspector */}
            <AnimatePresence>
              {!inspectorCollapsed && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-l border-white/[0.06] bg-[#0B1020]/60 overflow-hidden shrink-0"
                >
                  <div className="w-[260px] h-full">
                    <InspectorPanel />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inspector Toggle */}
            <button
              onClick={toggleInspector}
              className="w-5 flex items-center justify-center border-l border-white/[0.06] bg-[#050816]/50 text-white/20 hover:text-white/50 hover:bg-white/[0.02] transition-all cursor-pointer shrink-0"
              title={inspectorCollapsed ? "Show Inspector" : "Hide Inspector"}
            >
              <div className="[writing-mode:vertical-lr] text-[8px] font-semibold tracking-widest rotate-180">
                INSPECTOR
              </div>
            </button>
          </div>

          {/* Bottom Panel: Node Graph / Timeline */}
          <div className={`shrink-0 border-t border-white/[0.06] flex flex-col transition-all ${bottomPanelCollapsed ? "h-8" : "h-[280px]"}`}>
            {/* Bottom Panel Header */}
            <div className="h-8 flex items-center justify-between px-2 border-b border-white/[0.06] bg-[#0B1020]/40 shrink-0">
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setBottomPanelTab("graph")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${bottomPanelTab === "graph" ? "bg-purple-500/15 text-purple-400" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}
                >
                  <GitBranch className="w-3 h-3" />
                  Node Graph
                </button>
                <button
                  onClick={() => setBottomPanelTab("timeline")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${bottomPanelTab === "timeline" ? "bg-purple-500/15 text-purple-400" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}
                >
                  <Clock className="w-3 h-3" />
                  Timeline
                </button>
              </div>

              <button
                onClick={toggleBottomPanel}
                className="p-1 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                {bottomPanelCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Bottom Panel Content */}
            {!bottomPanelCollapsed && (
              <div className="flex-1 min-h-0">
                {bottomPanelTab === "graph" && <NodeGraph />}
                {bottomPanelTab === "timeline" && <Timeline />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
