// ─── ININ Studio — Core Types ─────────────────────────────────────

import type { Node, Edge } from "@xyflow/react";

// ─── Node Types ──────────────────────────────────────────────────

export type StoryNodeType = "start" | "scene" | "choice" | "ending";

export interface Choice {
  id: string;
  text: string;
  targetNodeId: string | null;
  /** Memory changes when this choice is picked — e.g. { trust: 1, romance: 1 } */
  memoryEffects: Record<string, number>;
  /** Optional condition to show this choice — e.g. { key: "trust", operator: ">=", value: 3 } */
  condition: MemoryCondition | null;
}

// ─── Story Memory (lightweight variable system) ──────────────────

export interface MemoryVariable {
  key: string;
  label: string;
  value: number;
  icon: string; // emoji for visual display
}

export interface MemoryCondition {
  key: string;
  operator: ">=" | "<=" | "==" | ">" | "<" | "!=";
  value: number;
}

export interface MemoryEffect {
  key: string;
  delta: number; // positive or negative
}

// ─── Dialogue / Subtitles ────────────────────────────────────────

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  startTime: number;
  endTime: number;
  emotion: string;
}

// ─── Node Data ───────────────────────────────────────────────────

export interface StoryNodeData {
  type: StoryNodeType;
  title: string;
  description: string;
  videoSrc: string;
  thumbnailSrc: string;
  duration: number;
  choices: Choice[];
  emotion: string;
  transitionType: "cut" | "fade" | "dissolve" | "wipe";
  transitionDuration: number;
  endingType?: "good" | "bad" | "neutral";
  tags: string[];
  /** Dialogue lines for this scene */
  dialogue: DialogueLine[];
  /** Memory effects applied when entering this scene */
  onEnterEffects: MemoryEffect[];
  /** Condition required to unlock/show this scene */
  unlockCondition: MemoryCondition | null;
}

export type StoryNode = Node<StoryNodeData>;
export type StoryEdge = Edge;

// ─── Timeline Types ─────────────────────────────────────────────

export type TrackType = "video" | "audio" | "choices" | "effects";

export interface TimelineClip {
  id: string;
  trackType: TrackType;
  label: string;
  startTime: number;
  endTime: number;
  color: string;
  nodeId?: string;
}

export interface TimelineTrack {
  id: string;
  type: TrackType;
  label: string;
  clips: TimelineClip[];
  muted: boolean;
  locked: boolean;
}

// ─── Asset Types ────────────────────────────────────────────────

export type AssetType = "video" | "image" | "audio" | "effect";

export interface AssetItem {
  id: string;
  type: AssetType;
  title: string;
  thumbnailSrc: string;
  duration?: number;
  fileSize?: string;
  src: string;
  folder?: string;
}

// ─── Sidebar ────────────────────────────────────────────────────

export type SidebarTab =
  | "media"
  | "audio"
  | "choices"
  | "effects"
  | "ai"
  | "assets";

// ─── Preview ────────────────────────────────────────────────────

export type PreviewMode = "desktop" | "mobile";

// ─── Autosave ───────────────────────────────────────────────────

export type AutosaveStatus = "saved" | "saving" | "unsaved";

// ─── Project Save Data ──────────────────────────────────────────

export interface ProjectData {
  version: number;
  projectName: string;
  nodes: StoryNode[];
  edges: StoryEdge[];
  storyMemory: MemoryVariable[];
  savedAt: string;
}
