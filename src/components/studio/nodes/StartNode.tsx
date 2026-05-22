// ─── Start Node ───────────────────────────────────────────────────

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Play } from "lucide-react";
import type { StoryNodeData } from "@/types";
import { useStudioStore } from "@/store/useStudioStore";

export function StartNode({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as StoryNodeData;
  const setSelectedNode = useStudioStore((s) => s.setSelectedNode);

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className={`
        relative min-w-[180px] rounded-2xl border-2 cursor-pointer
        transition-all duration-300
        ${selected
          ? "border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          : "border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
        }
      `}
      style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(88,28,135,0.25))" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20">
          <Play className="w-3.5 h-3.5 text-purple-300 fill-purple-300" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/80">Start</span>
          <p className="text-xs font-bold text-white truncate leading-tight">{nodeData.title}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-2.5">
        <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">{nodeData.description}</p>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-purple-400 !border-2 !border-purple-600 !rounded-full"
      />
    </div>
  );
}
