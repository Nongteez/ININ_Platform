// ─── Node Graph Editor ────────────────────────────────────────────

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { Plus, Play, Film, GitBranch, Flag } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import { StartNode } from "./nodes/StartNode";
import { SceneNode } from "./nodes/SceneNode";
import { ChoiceNode } from "./nodes/ChoiceNode";
import { EndingNode } from "./nodes/EndingNode";
import { FloatingNodeActions } from "./FloatingNodeActions";
import type { StoryNodeType } from "@/types";

const nodeTypes: NodeTypes = {
  start: StartNode,
  scene: SceneNode,
  choice: ChoiceNode,
  ending: EndingNode,
};

const addNodeButtons: { type: StoryNodeType; icon: typeof Play; label: string; color: string }[] = [
  { type: "scene", icon: Film, label: "Scene", color: "#3B82F6" },
  { type: "choice", icon: GitBranch, label: "Choice", color: "#F97316" },
  { type: "ending", icon: Flag, label: "Ending", color: "#22C55E" },
];

export function NodeGraph() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNode, addNode } = useStudioStore();

  const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleAddNode = useCallback((type: StoryNodeType) => {
    const x = 200 + Math.random() * 400;
    const y = 100 + Math.random() * 300;
    addNode(type, { x, y });
  }, [addNode]);

  const defaultEdgeOptions = useMemo(() => ({
    animated: true,
    style: { stroke: "#7B5CFF", strokeWidth: 2 },
  }), []);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="studio-flow"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.03)" />
        <Controls
          showInteractive={false}
          className="studio-flow-controls"
        />

        {/* Add Node Toolbar (left side — preserved) */}
        <Panel position="top-left">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0B1020]/90 border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-0.5 px-2 py-1">
              <Plus className="w-3 h-3 text-white/40 mr-1" />
              <span className="text-[9px] font-semibold text-white/40">Add:</span>
            </div>
            {addNodeButtons.map(({ type, icon: Icon, label, color }) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddNode(type)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer"
                style={{
                  background: `${color}15`,
                  color: color,
                  border: `1px solid ${color}25`,
                }}
              >
                <Icon className="w-3 h-3" />
                {label}
              </motion.button>
            ))}
          </div>
        </Panel>

        {/* Floating Quick Actions + Minimap (unified right-side overlay) */}
        <FloatingNodeActions />
      </ReactFlow>
    </div>
  );
}

