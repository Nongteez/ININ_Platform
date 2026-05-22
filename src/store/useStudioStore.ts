// ─── ININ Studio — Zustand Store ──────────────────────────────────

import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import type {
  StoryNode,
  StoryEdge,
  SidebarTab,
  PreviewMode,
  AutosaveStatus,
  StoryNodeData,
  StoryNodeType,
  MemoryVariable,
  ProjectData,
} from "@/types";
import { initialNodes, initialEdges, defaultMemory } from "@/data/sampleStory";

// ─── Store Interface ────────────────────────────────────────────

interface StudioState {
  // ── Graph ──
  nodes: StoryNode[];
  edges: StoryEdge[];
  selectedNodeId: string | null;
  onNodesChange: OnNodesChange<StoryNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setSelectedNode: (id: string | null) => void;
  addNode: (type: StoryNodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<StoryNodeData>) => void;
  deleteNode: (id: string) => void;

  // ── Story Memory ──
  storyMemory: MemoryVariable[];
  addMemoryVar: (key: string, label: string, icon: string) => void;
  removeMemoryVar: (key: string) => void;
  updateMemoryVar: (key: string, patch: Partial<MemoryVariable>) => void;
  resetMemoryValues: () => void;

  // ── Interactive Preview ──
  previewNodeId: string | null;
  previewMemory: Record<string, number>;
  previewHistory: string[];
  startPreview: () => void;
  previewChoose: (choiceIndex: number) => void;
  previewGoToNode: (nodeId: string) => void;
  resetPreview: () => void;
  isPreviewMode: boolean;

  // ── UI State ──
  editorMode: "design" | "play" | "preview";
  setEditorMode: (mode: "design" | "play" | "preview") => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  publishModalOpen: boolean;
  setPublishModalOpen: (open: boolean) => void;
  sidebarTab: SidebarTab;
  setSidebarTab: (tab: SidebarTab) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  inspectorCollapsed: boolean;
  toggleInspector: () => void;
  bottomPanelTab: "graph" | "timeline";
  setBottomPanelTab: (tab: "graph" | "timeline") => void;
  bottomPanelCollapsed: boolean;
  toggleBottomPanel: () => void;

  // ── Preview Display ──
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
  isPlaying: boolean;
  togglePlayback: () => void;
  zoom: number;
  setZoom: (z: number) => void;

  // ── Timeline ──
  playhead: number;
  setPlayhead: (t: number) => void;
  totalDuration: number;

  // ── Autosave ──
  autosaveStatus: AutosaveStatus;
  triggerSave: () => void;

  // ── Project ──
  projectName: string;
  setProjectName: (name: string) => void;

  // ── Save / Load ──
  saveProject: () => void;
  loadProject: () => boolean;
  lastSavedAt: string | null;
}

// ─── Helper ─────────────────────────────────────────────────────

let nodeIdCounter = 100;
const nextId = () => `node_${++nodeIdCounter}`;

const STORAGE_KEY = "inin_studio_project";

const defaultNodeData: Record<StoryNodeType, () => StoryNodeData> = {
  start: () => ({
    type: "start",
    title: "Start",
    description: "Story begins here",
    videoSrc: "",
    thumbnailSrc: "",
    duration: 0,
    choices: [],
    emotion: "neutral",
    transitionType: "cut",
    transitionDuration: 0.5,
    tags: [],
    dialogue: [],
    onEnterEffects: [],
    unlockCondition: null,
  }),
  scene: () => ({
    type: "scene",
    title: "New Scene",
    description: "Scene description",
    videoSrc: "",
    thumbnailSrc: "",
    duration: 5,
    choices: [],
    emotion: "neutral",
    transitionType: "fade",
    transitionDuration: 0.8,
    tags: [],
    dialogue: [],
    onEnterEffects: [],
    unlockCondition: null,
  }),
  choice: () => ({
    type: "choice",
    title: "Choice Point",
    description: "Player must choose",
    videoSrc: "",
    thumbnailSrc: "",
    duration: 10,
    choices: [
      { id: "c1", text: "Option A", targetNodeId: null, memoryEffects: {}, condition: null },
      { id: "c2", text: "Option B", targetNodeId: null, memoryEffects: {}, condition: null },
    ],
    emotion: "tense",
    transitionType: "cut",
    transitionDuration: 0.3,
    tags: [],
    dialogue: [],
    onEnterEffects: [],
    unlockCondition: null,
  }),
  ending: () => ({
    type: "ending",
    title: "Ending",
    description: "Story ends here",
    videoSrc: "",
    thumbnailSrc: "",
    duration: 3,
    choices: [],
    emotion: "neutral",
    transitionType: "fade",
    transitionDuration: 1.2,
    endingType: "good",
    tags: [],
    dialogue: [],
    onEnterEffects: [],
    unlockCondition: null,
  }),
};

// ─── Helper: find connected node ────────────────────────────────

function findNextNode(nodeId: string, edges: StoryEdge[]): string | null {
  const edge = edges.find((e) => e.source === nodeId);
  return edge?.target || null;
}

function findChoiceTarget(nodeId: string, choiceIndex: number, edges: StoryEdge[]): string | null {
  const handleId = `choice-${choiceIndex}`;
  const edge = edges.find((e) => e.source === nodeId && e.sourceHandle === handleId);
  return edge?.target || null;
}

// ─── Condition evaluator ────────────────────────────────────────

function evaluateCondition(condition: { key: string; operator: string; value: number } | null, memory: Record<string, number>): boolean {
  if (!condition) return true;
  const val = memory[condition.key] ?? 0;
  switch (condition.operator) {
    case ">=": return val >= condition.value;
    case "<=": return val <= condition.value;
    case "==": return val === condition.value;
    case ">":  return val > condition.value;
    case "<":  return val < condition.value;
    case "!=": return val !== condition.value;
    default: return true;
  }
}

// ─── Store ──────────────────────────────────────────────────────

export const useStudioStore = create<StudioState>((set, get) => ({
  // ── Graph ──
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          animated: true,
          style: { stroke: "#7B5CFF", strokeWidth: 2 },
        },
        get().edges,
      ),
    });
  },

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  addNode: (type, position) => {
    const id = nextId();
    const newNode: StoryNode = {
      id,
      type,
      position,
      data: defaultNodeData[type](),
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId:
        get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  // ── Story Memory ──
  storyMemory: defaultMemory,

  addMemoryVar: (key, label, icon) => {
    const existing = get().storyMemory;
    if (existing.find((m) => m.key === key)) return;
    set({ storyMemory: [...existing, { key, label, value: 0, icon }] });
  },

  removeMemoryVar: (key) => {
    set({ storyMemory: get().storyMemory.filter((m) => m.key !== key) });
  },

  updateMemoryVar: (key, patch) => {
    set({
      storyMemory: get().storyMemory.map((m) =>
        m.key === key ? { ...m, ...patch } : m,
      ),
    });
  },

  resetMemoryValues: () => {
    set({
      storyMemory: get().storyMemory.map((m) => ({ ...m, value: 0 })),
    });
  },

  // ── Interactive Preview ──
  previewNodeId: null,
  previewMemory: {},
  previewHistory: [],
  isPreviewMode: false,

  startPreview: () => {
    const startNode = get().nodes.find((n) => (n.data as unknown as StoryNodeData).type === "start");
    const mem: Record<string, number> = {};
    get().storyMemory.forEach((m) => { mem[m.key] = 0; });
    set({
      isPreviewMode: true,
      previewNodeId: startNode?.id || null,
      previewMemory: mem,
      previewHistory: startNode ? [startNode.id] : [],
      selectedNodeId: startNode?.id || null,
    });
  },

  previewChoose: (choiceIndex) => {
    const { previewNodeId, edges, nodes, previewMemory, previewHistory } = get();
    if (!previewNodeId) return;

    const currentNode = nodes.find((n) => n.id === previewNodeId);
    if (!currentNode) return;

    const d = currentNode.data as unknown as StoryNodeData;

    // Apply choice memory effects
    const choice = d.choices[choiceIndex];
    const newMem = { ...previewMemory };
    if (choice?.memoryEffects) {
      Object.entries(choice.memoryEffects).forEach(([k, v]) => {
        newMem[k] = (newMem[k] ?? 0) + v;
      });
    }

    // Find target node
    let targetId = choice?.targetNodeId || findChoiceTarget(previewNodeId, choiceIndex, edges);

    if (targetId) {
      // Apply onEnterEffects of target
      const targetNode = nodes.find((n) => n.id === targetId);
      if (targetNode) {
        const td = targetNode.data as unknown as StoryNodeData;
        (td.onEnterEffects || []).forEach((e) => {
          newMem[e.key] = (newMem[e.key] ?? 0) + e.delta;
        });
      }

      set({
        previewNodeId: targetId,
        previewMemory: newMem,
        previewHistory: [...previewHistory, targetId],
        selectedNodeId: targetId,
      });
    }
  },

  previewGoToNode: (nodeId) => {
    const { nodes, previewMemory, previewHistory, edges } = get();
    const targetNode = nodes.find((n) => n.id === nodeId);
    if (!targetNode) return;

    const newMem = { ...previewMemory };
    const td = targetNode.data as unknown as StoryNodeData;
    (td.onEnterEffects || []).forEach((e) => {
      newMem[e.key] = (newMem[e.key] ?? 0) + e.delta;
    });

    set({
      previewNodeId: nodeId,
      previewMemory: newMem,
      previewHistory: [...previewHistory, nodeId],
      selectedNodeId: nodeId,
    });
  },

  resetPreview: () => {
    set({
      isPreviewMode: false,
      previewNodeId: null,
      previewMemory: {},
      previewHistory: [],
    });
  },

  // ── UI State ──
  editorMode: "design",
  setEditorMode: (mode) => {
    if (mode === "preview") {
      get().startPreview();
    } else if (get().isPreviewMode) {
      get().resetPreview();
    }
    set({ editorMode: mode });
  },
  settingsOpen: false,
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  publishModalOpen: false,
  setPublishModalOpen: (open) => set({ publishModalOpen: open }),
  sidebarTab: "media",
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  inspectorCollapsed: false,
  toggleInspector: () =>
    set((s) => ({ inspectorCollapsed: !s.inspectorCollapsed })),
  bottomPanelTab: "graph",
  setBottomPanelTab: (tab) => set({ bottomPanelTab: tab }),
  bottomPanelCollapsed: false,
  toggleBottomPanel: () =>
    set((s) => ({ bottomPanelCollapsed: !s.bottomPanelCollapsed })),

  // ── Preview Display ──
  previewMode: "desktop",
  setPreviewMode: (mode) => set({ previewMode: mode }),
  isPlaying: false,
  togglePlayback: () => set((s) => ({ isPlaying: !s.isPlaying })),
  zoom: 100,
  setZoom: (z) => set({ zoom: Math.max(25, Math.min(200, z)) }),

  // ── Timeline ──
  playhead: 0,
  setPlayhead: (t) => set({ playhead: Math.max(0, t) }),
  totalDuration: 60,

  // ── Autosave ──
  autosaveStatus: "saved",
  triggerSave: () => {
    get().saveProject();
    set({ autosaveStatus: "saving" });
    setTimeout(() => set({ autosaveStatus: "saved" }), 1200);
  },

  // ── Project ──
  projectName: "Untitled Project",
  setProjectName: (name) => set({ projectName: name }),

  // ── Save / Load ──
  lastSavedAt: null,

  saveProject: () => {
    const { nodes, edges, storyMemory, projectName } = get();
    const data: ProjectData = {
      version: 1,
      projectName,
      nodes,
      edges,
      storyMemory,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      set({ lastSavedAt: data.savedAt, autosaveStatus: "saved" });
    } catch (e) {
      console.warn("Save failed:", e);
    }
  },

  loadProject: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data: ProjectData = JSON.parse(raw);
      set({
        nodes: data.nodes,
        edges: data.edges,
        storyMemory: data.storyMemory,
        projectName: data.projectName,
        lastSavedAt: data.savedAt,
        selectedNodeId: null,
      });
      return true;
    } catch (e) {
      console.warn("Load failed:", e);
      return false;
    }
  },
}));

// Re-export the condition evaluator for use in components
export { evaluateCondition };
