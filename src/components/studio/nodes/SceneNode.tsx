// ─── Scene Node ───────────────────────────────────────────────────

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Film, Clock } from "lucide-react";
import type { StoryNodeData } from "@/types";
import { useStudioStore } from "@/store/useStudioStore";

export function SceneNode({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as StoryNodeData;
  const setSelectedNode = useStudioStore((s) => s.setSelectedNode);

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className={`
        relative min-w-[200px] max-w-[240px] rounded-2xl border-2 cursor-pointer
        transition-all duration-300
        ${selected
          ? "border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          : "border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        }
      `}
      style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(29,78,216,0.2))" }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-blue-400 !border-2 !border-blue-600 !rounded-full"
      />

      {/* Thumbnail Area */}
      <div className="relative h-20 rounded-t-xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-slate-900/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-8 h-8 text-blue-400/30" />
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
          <Clock className="w-2.5 h-2.5 text-blue-300/70" />
          <span className="text-[9px] font-semibold text-blue-200/80">{nodeData.duration}s</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-3.5 py-2.5 border-t border-blue-500/15">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-400/70">Scene</span>
        <p className="text-xs font-bold text-white truncate leading-tight mt-0.5">{nodeData.title}</p>
        <p className="text-[10px] text-white/40 mt-1 line-clamp-1">{nodeData.description}</p>
      </div>

      {/* Emotion Tag */}
      {nodeData.emotion && (
        <div className="px-3.5 pb-2.5">
          <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-semibold bg-blue-500/10 text-blue-300/70 border border-blue-500/15">
            {nodeData.emotion}
          </span>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-blue-400 !border-2 !border-blue-600 !rounded-full"
      />
    </div>
  );
}
