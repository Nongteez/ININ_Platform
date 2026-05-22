// ─── Sample Story Flow ────────────────────────────────────────────

import type { StoryNode, StoryEdge, MemoryVariable } from "@/types";

// ─── Default Story Memory Variables ──────────────────────────────

export const defaultMemory: MemoryVariable[] = [
  { key: "trust", label: "Trust", value: 0, icon: "🤝" },
  { key: "courage", label: "Courage", value: 0, icon: "⚔️" },
  { key: "knowledge", label: "Knowledge", value: 0, icon: "📖" },
];

// ─── Sample Nodes ────────────────────────────────────────────────

export const initialNodes: StoryNode[] = [
  {
    id: "node_1",
    type: "start",
    position: { x: 50, y: 200 },
    data: {
      type: "start",
      title: "Story Begins",
      description: "The protagonist wakes up in a dark room",
      videoSrc: "", thumbnailSrc: "", duration: 3,
      choices: [],
      emotion: "mystery",
      transitionType: "fade", transitionDuration: 1.0,
      tags: ["intro"],
      dialogue: [
        { id: "d1", speaker: "", text: "You open your eyes. Darkness surrounds you.", startTime: 0, endTime: 2, emotion: "neutral" },
        { id: "d2", speaker: "", text: "A faint light glimmers in the distance...", startTime: 2, endTime: 3, emotion: "curious" },
      ],
      onEnterEffects: [],
      unlockCondition: null,
    },
  },
  {
    id: "node_2",
    type: "scene",
    position: { x: 350, y: 80 },
    data: {
      type: "scene",
      title: "Investigate the Room",
      description: "You search the dark room for clues",
      videoSrc: "", thumbnailSrc: "", duration: 8,
      choices: [],
      emotion: "curious",
      transitionType: "fade", transitionDuration: 0.8,
      tags: ["exploration"],
      dialogue: [
        { id: "d3", speaker: "", text: "You carefully move through the shadows...", startTime: 0, endTime: 3, emotion: "tense" },
        { id: "d4", speaker: "", text: "Your hand touches something cold. A key.", startTime: 4, endTime: 7, emotion: "surprise" },
      ],
      onEnterEffects: [{ key: "knowledge", delta: 1 }],
      unlockCondition: null,
    },
  },
  {
    id: "node_3",
    type: "scene",
    position: { x: 350, y: 340 },
    data: {
      type: "scene",
      title: "Try to Escape",
      description: "You rush towards the door",
      videoSrc: "", thumbnailSrc: "", duration: 6,
      choices: [],
      emotion: "tense",
      transitionType: "cut", transitionDuration: 0.3,
      tags: ["action"],
      dialogue: [
        { id: "d5", speaker: "", text: "Your heart pounds as you sprint toward the exit.", startTime: 0, endTime: 3, emotion: "tense" },
      ],
      onEnterEffects: [{ key: "courage", delta: 2 }],
      unlockCondition: null,
    },
  },
  {
    id: "node_4",
    type: "choice",
    position: { x: 680, y: 80 },
    data: {
      type: "choice",
      title: "Decision Point",
      description: "A mysterious figure appears",
      videoSrc: "", thumbnailSrc: "", duration: 10,
      choices: [
        { id: "c1", text: "Trust them", targetNodeId: "node_5", memoryEffects: { trust: 3 }, condition: null },
        { id: "c2", text: "Run away", targetNodeId: "node_6", memoryEffects: { courage: 2 }, condition: null },
      ],
      emotion: "tense",
      transitionType: "cut", transitionDuration: 0.3,
      tags: ["choice"],
      dialogue: [
        { id: "d6", speaker: "???", text: "I can help you... if you let me.", startTime: 1, endTime: 4, emotion: "mysterious" },
      ],
      onEnterEffects: [],
      unlockCondition: null,
    },
  },
  {
    id: "node_5",
    type: "ending",
    position: { x: 1020, y: 20 },
    data: {
      type: "ending",
      title: "Freedom",
      description: "The figure leads you to safety",
      videoSrc: "", thumbnailSrc: "", duration: 5,
      choices: [],
      emotion: "relief",
      transitionType: "fade", transitionDuration: 1.5,
      endingType: "good",
      tags: ["ending", "good"],
      dialogue: [
        { id: "d7", speaker: "", text: "Sunlight floods your vision. You made it.", startTime: 0, endTime: 3, emotion: "happy" },
      ],
      onEnterEffects: [{ key: "trust", delta: 2 }],
      unlockCondition: null,
    },
  },
  {
    id: "node_6",
    type: "ending",
    position: { x: 1020, y: 200 },
    data: {
      type: "ending",
      title: "Trapped Forever",
      description: "You run deeper into the darkness",
      videoSrc: "", thumbnailSrc: "", duration: 4,
      choices: [],
      emotion: "despair",
      transitionType: "dissolve", transitionDuration: 2.0,
      endingType: "bad",
      tags: ["ending", "bad"],
      dialogue: [
        { id: "d8", speaker: "", text: "The door slams shut behind you. No way out.", startTime: 0, endTime: 3, emotion: "despair" },
      ],
      onEnterEffects: [],
      unlockCondition: null,
    },
  },
];

// ─── Sample Edges ────────────────────────────────────────────────

export const initialEdges: StoryEdge[] = [
  { id: "e1-2", source: "node_1", target: "node_2", animated: true, style: { stroke: "#7B5CFF", strokeWidth: 2 } },
  { id: "e1-3", source: "node_1", target: "node_3", animated: true, style: { stroke: "#7B5CFF", strokeWidth: 2 } },
  { id: "e2-4", source: "node_2", target: "node_4", animated: true, style: { stroke: "#3B82F6", strokeWidth: 2 } },
  {
    id: "e4-5", source: "node_4", target: "node_5", sourceHandle: "choice-0", animated: true,
    label: "Trust them", style: { stroke: "#22C55E", strokeWidth: 2 },
    labelStyle: { fill: "#22C55E", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "#0B1020", fillOpacity: 0.9 },
  },
  {
    id: "e4-6", source: "node_4", target: "node_6", sourceHandle: "choice-1", animated: true,
    label: "Run away", style: { stroke: "#EF4444", strokeWidth: 2 },
    labelStyle: { fill: "#EF4444", fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: "#0B1020", fillOpacity: 0.9 },
  },
];

// ─── Sample Timeline ─────────────────────────────────────────────

import type { TimelineTrack } from "@/types";

export const initialTimeline: TimelineTrack[] = [
  {
    id: "track-video", type: "video", label: "Video", muted: false, locked: false,
    clips: [
      { id: "clip-1", trackType: "video", label: "Intro Scene", startTime: 0, endTime: 8, color: "#7B5CFF", nodeId: "node_1" },
      { id: "clip-2", trackType: "video", label: "Room Search", startTime: 8, endTime: 20, color: "#3B82F6", nodeId: "node_2" },
      { id: "clip-3", trackType: "video", label: "Escape Route", startTime: 20, endTime: 30, color: "#3B82F6", nodeId: "node_3" },
      { id: "clip-4", trackType: "video", label: "Decision", startTime: 30, endTime: 42, color: "#F97316", nodeId: "node_4" },
    ],
  },
  {
    id: "track-audio", type: "audio", label: "Audio", muted: false, locked: false,
    clips: [
      { id: "clip-a1", trackType: "audio", label: "Ambient Dark", startTime: 0, endTime: 20, color: "#06B6D4" },
      { id: "clip-a2", trackType: "audio", label: "Tension Build", startTime: 20, endTime: 42, color: "#8B5CF6" },
    ],
  },
  {
    id: "track-choices", type: "choices", label: "Choices", muted: false, locked: false,
    clips: [
      { id: "clip-c1", trackType: "choices", label: "Investigate / Escape", startTime: 2, endTime: 5, color: "#F97316" },
      { id: "clip-c2", trackType: "choices", label: "Trust / Run", startTime: 32, endTime: 40, color: "#F97316" },
    ],
  },
  {
    id: "track-effects", type: "effects", label: "Effects", muted: false, locked: false,
    clips: [
      { id: "clip-e1", trackType: "effects", label: "Fade In", startTime: 0, endTime: 2, color: "#A855F7" },
      { id: "clip-e2", trackType: "effects", label: "Glitch", startTime: 28, endTime: 31, color: "#EC4899" },
    ],
  },
];

// ─── Sample Assets ───────────────────────────────────────────────

import type { AssetItem } from "@/types";

export const sampleAssets: AssetItem[] = [
  { id: "asset-1", type: "video", title: "Dark Room Intro", thumbnailSrc: "", duration: 8, fileSize: "24MB", src: "", folder: "Scenes" },
  { id: "asset-2", type: "video", title: "Room Investigation", thumbnailSrc: "", duration: 12, fileSize: "36MB", src: "", folder: "Scenes" },
  { id: "asset-3", type: "video", title: "Escape Sequence", thumbnailSrc: "", duration: 6, fileSize: "18MB", src: "", folder: "Scenes" },
  { id: "asset-4", type: "video", title: "Mysterious Figure", thumbnailSrc: "", duration: 10, fileSize: "30MB", src: "", folder: "Characters" },
  { id: "asset-5", type: "video", title: "Good Ending", thumbnailSrc: "", duration: 5, fileSize: "15MB", src: "", folder: "Endings" },
  { id: "asset-6", type: "video", title: "Bad Ending", thumbnailSrc: "", duration: 4, fileSize: "12MB", src: "", folder: "Endings" },
  { id: "asset-7", type: "image", title: "Room Background", thumbnailSrc: "", src: "", folder: "Backgrounds" },
  { id: "asset-8", type: "image", title: "Dark Corridor", thumbnailSrc: "", src: "", folder: "Backgrounds" },
  { id: "asset-9", type: "audio", title: "Ambient Dark", thumbnailSrc: "", duration: 120, fileSize: "8MB", src: "", folder: "Music" },
  { id: "asset-10", type: "audio", title: "Tension Build", thumbnailSrc: "", duration: 90, fileSize: "6MB", src: "", folder: "Music" },
];
