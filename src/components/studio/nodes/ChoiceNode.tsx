// ─── Choice Node ──────────────────────────────────────────────────

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import type { StoryNodeData } from "@/types";
import { useStudioStore } from "@/store/useStudioStore";

export function ChoiceNode({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as StoryNodeData;
  const setSelectedNode = useStudioStore((s) => s.setSelectedNode);

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className={`
        relative min-w-[200px] max-w-[240px] rounded-2xl border-2 cursor-pointer
        transition-all duration-300
        ${selected
          ? "border-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.4)]"
          : "border-orange-500/30 hover:border-orange-400/60 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        }
      `}
      style={{ background: "linear-gradient(135deg, rgba(234,88,12,0.12), rgba(194,65,12,0.2))" }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-orange-400 !border-2 !border-orange-600 !rounded-full"
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/20">
          <GitBranch className="w-3.5 h-3.5 text-orange-300" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400/80">Choice</span>
          <p className="text-xs font-bold text-white truncate leading-tight">{nodeData.title}</p>
        </div>
      </div>

      {/* Choice Options */}
      <div className="px-3.5 py-2.5 space-y-1.5">
        {nodeData.choices.map((choice, idx) => (
          <div
            key={choice.id}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-orange-500/8 border border-orange-500/12"
          >
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-orange-500/20 text-[8px] font-bold text-orange-300 shrink-0">
              {String.fromCharCode(65 + idx)}
            </div>
            <span className="text-[10px] text-white/70 font-medium truncate">{choice.text}</span>
          </div>
        ))}
      </div>

      {/* Output Handles — one per choice */}
      {nodeData.choices.map((_, idx) => (
        <Handle
          key={`choice-${idx}`}
          id={`choice-${idx}`}
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-orange-400 !border-2 !border-orange-600 !rounded-full"
          style={{ top: `${55 + idx * 28}%` }}
        />
      ))}
    </div>
  );
}
