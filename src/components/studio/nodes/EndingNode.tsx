// ─── Ending Node ──────────────────────────────────────────────────

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Flag, Skull } from "lucide-react";
import type { StoryNodeData } from "@/types";
import { useStudioStore } from "@/store/useStudioStore";

export function EndingNode({ id, data, selected }: NodeProps) {
  const nodeData = data as unknown as StoryNodeData;
  const setSelectedNode = useStudioStore((s) => s.setSelectedNode);
  const isGood = nodeData.endingType === "good";

  const borderColor = isGood ? "green" : "red";
  const glowColor = isGood ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)";
  const glowColorSoft = isGood ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)";
  const bg = isGood
    ? "linear-gradient(135deg, rgba(22,163,74,0.12), rgba(21,128,61,0.2))"
    : "linear-gradient(135deg, rgba(220,38,38,0.12), rgba(185,28,28,0.2))";

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className={`
        relative min-w-[180px] rounded-2xl border-2 cursor-pointer
        transition-all duration-300
        ${selected
          ? `border-${borderColor}-400 shadow-[0_0_25px_${glowColor}]`
          : `border-${borderColor}-500/30 hover:border-${borderColor}-400/60 shadow-[0_0_15px_${glowColorSoft}]`
        }
      `}
      style={{
        background: bg,
        borderColor: selected
          ? (isGood ? "rgb(74, 222, 128)" : "rgb(248, 113, 113)")
          : (isGood ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"),
        boxShadow: selected
          ? `0 0 25px ${glowColor}`
          : `0 0 15px ${glowColorSoft}`,
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
          background: isGood ? "#4ade80" : "#f87171",
          border: `2px solid ${isGood ? "#16a34a" : "#dc2626"}`,
          borderRadius: "50%",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: isGood ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)" }}>
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ background: isGood ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)" }}
        >
          {isGood
            ? <Flag className="w-3.5 h-3.5 text-green-300" />
            : <Skull className="w-3.5 h-3.5 text-red-300" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: isGood ? "rgba(74,222,128,0.8)" : "rgba(248,113,113,0.8)" }}
          >
            {isGood ? "Good Ending" : "Bad Ending"}
          </span>
          <p className="text-xs font-bold text-white truncate leading-tight">{nodeData.title}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-2.5">
        <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">{nodeData.description}</p>
      </div>
    </div>
  );
}
