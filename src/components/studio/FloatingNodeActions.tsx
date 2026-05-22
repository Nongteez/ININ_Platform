// ─── Floating Node Actions (Unified Right-Side Overlay) ─────────
// ONE container: toolbar row (utility buttons + Add Node) + minimap below.
// Uses Radix Popover for collision-aware popup positioning.
// Uses ReactFlow <Panel> for anchoring inside the graph canvas.

import { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Film,
  MessageSquare,
  GitBranch,
  Flag,
  Timer,
  Zap,
  Type,
  Brain,
  HelpCircle,
  Dice3,
  Clock,
  Volume2,
  Subtitles,
  ArrowRightLeft,
  Layers,
  Sparkles,
  ScanSearch,
  Eye,
  Crosshair,
  X,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { useStudioStore } from "@/store/useStudioStore";
import type { StoryNodeType } from "@/types";
import { Panel, MiniMap, useReactFlow } from "@xyflow/react";

// ─── Node Category Definitions ──────────────────────────────────

interface NodeMenuItem {
  type: StoryNodeType;
  icon: typeof Film;
  emoji: string;
  title: string;
  description: string;
}

interface NodeCategory {
  label: string;
  color: string;
  glowColor: string;
  items: NodeMenuItem[];
}

const nodeCategories: NodeCategory[] = [
  {
    label: "CORE FLOW",
    color: "#3B82F6",
    glowColor: "rgba(59,130,246,0.15)",
    items: [
      { type: "scene", icon: Film, emoji: "🎬", title: "Scene", description: "Main story scene" },
      { type: "scene", icon: MessageSquare, emoji: "💬", title: "Dialogue", description: "Character dialogue and subtitles" },
      { type: "choice", icon: GitBranch, emoji: "🌿", title: "Choice", description: "Branch the story" },
      { type: "ending", icon: Flag, emoji: "🏁", title: "Ending", description: "End the current route" },
    ],
  },
  {
    label: "INTERACTION",
    color: "#F97316",
    glowColor: "rgba(249,115,22,0.15)",
    items: [
      { type: "scene", icon: Timer, emoji: "⏱️", title: "Timer", description: "Timed event trigger" },
      { type: "choice", icon: Zap, emoji: "⚡", title: "QTE", description: "Quick time event" },
      { type: "choice", icon: GitBranch, emoji: "🔀", title: "Branch", description: "Conditional branching" },
      { type: "scene", icon: Type, emoji: "📝", title: "Text Input", description: "Player text response" },
    ],
  },
  {
    label: "LOGIC",
    color: "#A855F7",
    glowColor: "rgba(168,85,247,0.15)",
    items: [
      { type: "scene", icon: Brain, emoji: "🧠", title: "Story Memory", description: "Save/load story state" },
      { type: "choice", icon: HelpCircle, emoji: "❓", title: "Condition", description: "Logic gate check" },
      { type: "scene", icon: Dice3, emoji: "🎲", title: "Random", description: "Randomized outcome" },
      { type: "scene", icon: Clock, emoji: "⏳", title: "Wait", description: "Delay before continue" },
    ],
  },
  {
    label: "MEDIA",
    color: "#06B6D4",
    glowColor: "rgba(6,182,212,0.15)",
    items: [
      { type: "scene", icon: Volume2, emoji: "🔊", title: "Audio", description: "Play sound or music" },
      { type: "scene", icon: Subtitles, emoji: "💬", title: "Subtitle", description: "Display subtitles" },
      { type: "scene", icon: ArrowRightLeft, emoji: "🎞️", title: "Transition", description: "Scene transition effect" },
    ],
  },
  {
    label: "UI",
    color: "#22C55E",
    glowColor: "rgba(34,197,94,0.15)",
    items: [
      { type: "scene", icon: Layers, emoji: "📐", title: "UI Layer", description: "Custom UI overlay" },
      { type: "scene", icon: Sparkles, emoji: "✨", title: "UI Animation", description: "Animate UI elements" },
    ],
  },
];

// ─── Minimap node color mapper ──────────────────────────────────

const minimapNodeColor = (n: { type?: string }) => {
  if (n.type === "start") return "#A855F7";
  if (n.type === "scene") return "#3B82F6";
  if (n.type === "choice") return "#F97316";
  if (n.type === "ending") return "#22C55E";
  return "#666";
};

// ─── Utility Button ─────────────────────────────────────────────

function UtilityButton({
  icon: Icon,
  title,
  onClick,
}: {
  icon: typeof ScanSearch;
  title: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -1 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-[10px] flex items-center justify-center cursor-pointer
        bg-[#0B1020]/90 border border-white/[0.06] backdrop-blur-lg
        text-white/35 hover:text-white/80 hover:border-[#9D4DFF]/25
        hover:bg-[#9D4DFF]/8 transition-all duration-250
        shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.03)]
        hover:shadow-[0_4px_16px_rgba(157,77,255,0.15),0_0_0_1px_rgba(157,77,255,0.08)]"
    >
      <Icon className="w-3.5 h-3.5" />
    </motion.button>
  );
}

// ─── Component ──────────────────────────────────────────────────

export function FloatingNodeActions() {
  const { addNode } = useStudioStore();
  const reactFlowInstance = useReactFlow();

  const handleAddNode = useCallback(
    (type: StoryNodeType) => {
      const containerEl = document.querySelector(".react-flow");
      const containerRect = containerEl?.getBoundingClientRect();
      const centerX = (containerRect?.width ?? 800) / 2;
      const centerY = (containerRect?.height ?? 600) / 2;

      const position = reactFlowInstance.screenToFlowPosition({
        x: centerX + (containerRect?.left ?? 0),
        y: centerY + (containerRect?.top ?? 0),
      });

      position.x += (Math.random() - 0.5) * 120;
      position.y += (Math.random() - 0.5) * 80;

      addNode(type, position);
    },
    [addNode, reactFlowInstance],
  );

  const handleZoomToFit = useCallback(() => {
    reactFlowInstance.fitView({ padding: 0.3, duration: 500 });
  }, [reactFlowInstance]);

  return (
    <Panel position="bottom-right" className="floating-overlay-panel" style={{ zIndex: 30 }}>
      {/* ═══ ONE unified container ═══ */}
      <div className="flex flex-col gap-2.5 items-end">

        {/* ── Top Row: Utility Buttons + Add Node ── */}
        <div className="flex items-center gap-2">
          {/* Utility buttons — horizontal */}
          <div className="flex items-center gap-1.5">
            <UtilityButton icon={Eye} title="Viewer Mode" />
            <UtilityButton icon={ScanSearch} title="Zoom to Fit" onClick={handleZoomToFit} />
            <UtilityButton icon={Crosshair} title="Focus Graph" />
          </div>

          {/* Add Node — primary CTA */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="floating-add-node-fab group relative flex items-center gap-2 h-8 px-3.5 rounded-xl cursor-pointer
                  bg-gradient-to-r from-[#9D4DFF] via-[#8B3FEF] to-[#7B2FFF]
                  border border-[#B06FFF]/35
                  shadow-[0_4px_24px_rgba(157,77,255,0.3),0_2px_8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(157,77,255,0.1)]
                  hover:shadow-[0_8px_36px_rgba(157,77,255,0.5),0_2px_12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(157,77,255,0.2)]
                  transition-all duration-300
                  data-[state=open]:shadow-[0_8px_36px_rgba(157,77,255,0.5),0_0_0_1px_rgba(157,77,255,0.2)]"
              >
                {/* Ambient glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#9D4DFF]/15 to-[#7B2FFF]/15 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                {/* Inner highlight */}
                <div className="absolute inset-px rounded-[11px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                <Plus className="w-3.5 h-3.5 text-white relative" />
                <span className="text-[10px] font-bold text-white tracking-wide relative">Add Node</span>
              </motion.button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                side="top"
                align="end"
                sideOffset={10}
                collisionPadding={16}
                avoidCollisions
                className="floating-node-menu w-[300px] max-h-[min(420px,calc(100vh-120px))]
                  overflow-y-auto overflow-x-hidden
                  rounded-2xl border border-white/[0.08]
                  bg-[#0B1020]/95 backdrop-blur-2xl
                  shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_0_1px_rgba(157,77,255,0.06),0_0_40px_rgba(157,77,255,0.04)]
                  scrollbar-hide
                  animate-in fade-in-0 slide-in-from-bottom-3 duration-200
                  z-[9999]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                {/* Header */}
                <div
                  className="sticky top-0 z-10 flex items-center justify-between px-3.5 pt-2.5 pb-2
                    bg-[#0B1020]/95 backdrop-blur-2xl border-b border-white/[0.04]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#9D4DFF] to-[#7B2FFF] flex items-center justify-center shadow-[0_2px_8px_rgba(157,77,255,0.25)]">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[11px] font-bold text-white/80">Quick Add Node</span>
                  </div>
                  <Popover.Close asChild>
                    <button className="w-6 h-6 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Popover.Close>
                </div>

                {/* Categories */}
                <div className="p-1.5">
                  {nodeCategories.map((category, catIdx) => (
                    <div key={category.label} className={catIdx > 0 ? "mt-1.5" : ""}>
                      {/* Category Label */}
                      <div className="flex items-center gap-2 px-2 py-1">
                        <div
                          className="w-1 h-2.5 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span
                          className="text-[8px] font-extrabold tracking-[0.12em]"
                          style={{ color: `${category.color}99` }}
                        >
                          {category.label}
                        </span>
                      </div>

                      {/* Node Items */}
                      <div className="space-y-px">
                        {category.items.map((item, idx) => (
                          <Popover.Close asChild key={`${category.label}-${item.title}-${idx}`}>
                            <motion.button
                              whileHover={{ x: 2 }}
                              onClick={() => handleAddNode(item.type)}
                              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl
                                text-left cursor-pointer group/item
                                hover:bg-white/[0.04] transition-all duration-150"
                            >
                              {/* Icon */}
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                  transition-all duration-200"
                                style={{
                                  backgroundColor: `${category.color}12`,
                                  border: `1px solid ${category.color}20`,
                                }}
                              >
                                <span className="text-xs leading-none">{item.emoji}</span>
                              </div>

                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-semibold text-white/80 group-hover/item:text-white transition-colors">
                                  {item.title}
                                </p>
                                <p className="text-[8px] text-white/30 group-hover/item:text-white/45 transition-colors truncate leading-tight">
                                  {item.description}
                                </p>
                              </div>

                              {/* Add indicator */}
                              <div className="w-4 h-4 rounded flex items-center justify-center
                                opacity-0 group-hover/item:opacity-100
                                bg-white/[0.06] transition-all duration-200">
                                <Plus className="w-2.5 h-2.5 text-white/50" />
                              </div>
                            </motion.button>
                          </Popover.Close>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-3 py-1.5 border-t border-white/[0.04]">
                  <p className="text-[7px] text-white/20 text-center font-medium tracking-wide">
                    Click to add • Node spawns at viewport center
                  </p>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {/* ── Bottom Row: Minimap ── */}
        <div className="minimap-wrapper rounded-2xl overflow-hidden
          border border-white/[0.06] backdrop-blur-lg
          shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.02)]"
        >
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={minimapNodeColor}
            maskColor="rgba(5,8,22,0.88)"
            className="studio-minimap-inline"
            style={{
              background: "rgba(8,12,26,0.92)",
            }}
          />
        </div>

      </div>
    </Panel>
  );
}
