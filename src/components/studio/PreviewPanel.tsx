// ─── Preview Panel — Interactive Branching ────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Smartphone, Monitor, ZoomIn, ZoomOut, Maximize2, Volume2, Eye, RotateCcw, ChevronRight } from "lucide-react";
import { useStudioStore, evaluateCondition } from "@/store/useStudioStore";
import type { StoryNodeData } from "@/types";

export function PreviewPanel() {
  const {
    isPlaying, togglePlayback, previewMode, setPreviewMode,
    zoom, setZoom, playhead, setPlayhead, totalDuration,
    nodes, selectedNodeId, edges,
    // Interactive preview
    isPreviewMode, previewNodeId, previewMemory, previewHistory,
    startPreview, previewChoose, previewGoToNode, resetPreview,
    storyMemory,
  } = useStudioStore();

  // The node currently shown in preview
  const displayNodeId = isPreviewMode ? previewNodeId : selectedNodeId;
  const displayNode = nodes.find((n) => n.id === displayNodeId);
  const d = displayNode ? (displayNode.data as unknown as StoryNodeData) : null;

  // Auto-advance: for non-choice scenes, find next connected node
  const handleContinue = () => {
    if (!displayNodeId || !d) return;
    if (d.type === "ending") return;
    const edge = edges.find((e) => e.source === displayNodeId && !e.sourceHandle?.startsWith("choice-"));
    if (edge?.target) previewGoToNode(edge.target);
  };

  const progress = totalDuration > 0 ? (playhead / totalDuration) * 100 : 0;

  // Active dialogue line (simulated based on progress)
  const activeDialogue = d?.dialogue?.find((line) => {
    const sceneProgress = (playhead % (d.duration || 5));
    return sceneProgress >= line.startTime && sceneProgress < line.endTime;
  });

  return (
    <div className="flex flex-col h-full bg-[#050816]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-1">
          <button onClick={() => setPreviewMode("desktop")} className={`p-1.5 rounded-lg transition-all cursor-pointer ${previewMode === "desktop" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}><Monitor className="w-3.5 h-3.5" /></button>
          <button onClick={() => setPreviewMode("mobile")} className={`p-1.5 rounded-lg transition-all cursor-pointer ${previewMode === "mobile" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}><Smartphone className="w-3.5 h-3.5" /></button>
          <div className="h-4 w-px bg-white/[0.06] mx-1" />
          {/* Viewer Preview Mode Toggle */}
          {!isPreviewMode ? (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={startPreview} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/15 hover:bg-purple-500/20 transition-all cursor-pointer">
              <Eye className="w-3 h-3" />Viewer Mode
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={resetPreview} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-semibold text-red-300 bg-red-500/10 border border-red-500/15 hover:bg-red-500/20 transition-all cursor-pointer">
              <RotateCcw className="w-3 h-3" />Exit Preview
            </motion.button>
          )}
        </div>
        <span className="text-[10px] font-semibold text-white/40">{isPreviewMode ? "Viewer Preview" : "Editor Preview"}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom(zoom - 10)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 transition-all cursor-pointer"><ZoomOut className="w-3.5 h-3.5" /></button>
          <span className="text-[9px] text-white/40 font-mono w-8 text-center">{zoom}%</span>
          <button onClick={() => setZoom(zoom + 10)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 transition-all cursor-pointer"><ZoomIn className="w-3.5 h-3.5" /></button>
          <button onClick={() => setZoom(100)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 transition-all cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Story Memory HUD (only in viewer mode) */}
        {isPreviewMode && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-2 left-4 right-4 flex items-center gap-2 z-10">
            {storyMemory.map((m) => {
              const val = previewMemory[m.key] ?? 0;
              return (
                <div key={m.key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/[0.06]">
                  <span className="text-xs">{m.icon}</span>
                  <span className="text-[9px] font-semibold text-white/60">{m.label}</span>
                  <span className="text-[10px] font-bold text-purple-300 tabular-nums">{val}</span>
                </div>
              );
            })}
          </motion.div>
        )}

        <div
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1020] to-[#050816] border border-white/[0.06] shadow-[0_0_60px_rgba(123,92,255,0.05)] ${previewMode === "mobile" ? "w-[240px] aspect-[9/16]" : "w-full max-w-[640px] aspect-video"}`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
        >
          {/* Scene Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a0f25] to-slate-900">
            {/* Scene content */}
            <AnimatePresence mode="wait">
              <motion.div key={displayNodeId || "empty"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 flex items-center justify-center">
                {d ? (
                  <div className="text-center px-6">
                    {/* Emotion indicator */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/[0.06] ${d.type === "start" ? "bg-gradient-to-br from-purple-500/20 to-purple-900/20" : d.type === "ending" ? (d.endingType === "good" ? "bg-gradient-to-br from-green-500/20 to-emerald-900/20" : "bg-gradient-to-br from-red-500/20 to-red-900/20") : d.type === "choice" ? "bg-gradient-to-br from-orange-500/20 to-amber-900/20" : "bg-gradient-to-br from-blue-500/20 to-blue-900/20"}`}>
                      <span className="text-2xl">{d.type === "ending" ? (d.endingType === "good" ? "🌅" : "💀") : d.type === "choice" ? "🔀" : d.type === "start" ? "🎬" : "🎥"}</span>
                    </div>
                    <p className="text-sm font-bold text-white/80">{d.title}</p>
                    <p className="text-[10px] text-white/35 mt-1.5 max-w-[300px] mx-auto leading-relaxed">{d.description}</p>
                    {d.emotion && <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[8px] font-semibold bg-white/[0.04] text-white/30 border border-white/[0.04]">{d.emotion}</span>}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3 border border-white/[0.06]">
                      <Play className="w-6 h-6 text-purple-400/50" />
                    </div>
                    <p className="text-[11px] font-semibold text-white/40">Select a scene to preview</p>
                    <p className="text-[9px] text-white/20 mt-1">Your FMV content will appear here</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #7B5CFF, transparent 70%)" }} />
          </div>

          {/* Dialogue / Subtitle Overlay */}
          {d && activeDialogue && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-16 inset-x-3 z-10">
              <div className="px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/[0.06]">
                {activeDialogue.speaker && (
                  <p className="text-[8px] font-bold text-purple-300/80 uppercase tracking-wider mb-0.5">{activeDialogue.speaker}</p>
                )}
                <p className="text-[11px] text-white/90 font-medium leading-relaxed">{activeDialogue.text}</p>
              </div>
            </motion.div>
          )}

          {/* Choice Overlay */}
          {d && d.type === "choice" && (
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="space-y-2">
                {d.choices.map((choice, i) => {
                  const isLocked = isPreviewMode && !evaluateCondition(choice.condition, previewMemory);
                  return (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => isPreviewMode && !isLocked ? previewChoose(i) : undefined}
                      disabled={isLocked}
                      className={`w-full px-4 py-2.5 rounded-xl text-left text-xs font-semibold text-white border transition-all ${isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-purple-500/25 hover:border-purple-400/40"}`}
                      style={{ background: isLocked ? "rgba(255,255,255,0.03)" : "rgba(123,92,255,0.15)", borderColor: isLocked ? "rgba(255,255,255,0.05)" : "rgba(123,92,255,0.25)", backdropFilter: "blur(12px)" }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/25 text-[9px] font-bold text-purple-300 mr-2">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {choice.text}
                      {/* Memory effect hints */}
                      {Object.keys(choice.memoryEffects || {}).length > 0 && (
                        <span className="ml-2 text-[8px] text-purple-300/50">
                          {Object.entries(choice.memoryEffects).map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(", ")}
                        </span>
                      )}
                      {isLocked && <span className="ml-2 text-[8px] text-red-300/60">🔒 Locked</span>}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Continue button for non-choice scenes in viewer mode */}
          {isPreviewMode && d && d.type !== "choice" && d.type !== "ending" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleContinue}
              className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-white/70 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-all cursor-pointer backdrop-blur-sm"
            >
              Continue <ChevronRight className="w-3 h-3" />
            </motion.button>
          )}

          {/* Ending screen in viewer mode */}
          {isPreviewMode && d && d.type === "ending" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-4xl mb-3 block">{d.endingType === "good" ? "🌅" : "💀"}</span>
                <p className="text-lg font-bold text-white">{d.title}</p>
                <p className="text-xs text-white/50 mt-1">{d.endingType === "good" ? "Good Ending" : "Bad Ending"}</p>
                <button onClick={resetPreview} className="mt-4 px-4 py-2 rounded-xl text-[10px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/15 hover:bg-purple-500/20 transition-all cursor-pointer">
                  Restart Story
                </button>
              </div>
            </motion.div>
          )}

          {/* Scene info overlay (editor mode only) */}
          {!isPreviewMode && d && d.type !== "choice" && (
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-[10px] font-bold text-white/80">{d.title}</p>
              <p className="text-[8px] text-white/40 mt-0.5">{d.description}</p>
            </div>
          )}
        </div>

        {/* Preview History (viewer mode) */}
        {isPreviewMode && previewHistory.length > 1 && (
          <div className="absolute bottom-2 left-4 flex items-center gap-1">
            {previewHistory.map((nId, i) => {
              const n = nodes.find((n) => n.id === nId);
              const nd = n?.data as unknown as StoryNodeData | undefined;
              return (
                <div key={`${nId}-${i}`} className={`w-1.5 h-1.5 rounded-full ${nId === displayNodeId ? "bg-purple-400" : "bg-white/15"}`} title={nd?.title} />
              );
            })}
          </div>
        )}
      </div>

      {/* Transport Controls */}
      <div className="px-3 pb-2 pt-1 border-t border-white/[0.06] shrink-0">
        <div className="relative h-1 rounded-full bg-white/[0.06] mb-2 cursor-pointer group" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const pct = (e.clientX - rect.left) / rect.width; setPlayhead(pct * totalDuration); }}>
          <div className="h-full rounded-full bg-gradient-to-r from-[#7B5CFF] to-[#9D4DFF] transition-all" style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(157,77,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/30 font-mono">{formatTime(playhead)}</span>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlayback} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all" style={{ background: "linear-gradient(135deg, #7B5CFF, #9D4DFF)" }}>
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />}
            </motion.button>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-3 h-3 text-white/20" />
            <span className="text-[9px] text-white/30 font-mono">{formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
