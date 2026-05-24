// ─── Sample Story Flow ────────────────────────────────────────────

import type { StoryNode, StoryEdge, MemoryVariable, CreatorAnalytics } from "@/types";

// ─── Default Story Memory Variables ──────────────────────────────

export const defaultMemory: MemoryVariable[] = [
  { key: "trust", label: "Trust", value: 0, icon: "🤝" },
  { key: "courage", label: "Courage", value: 0, icon: "⚔️" },
  { key: "knowledge", label: "Knowledge", value: 0, icon: "📖" },
  { key: "romance", label: "Romance", value: 0, icon: "❤️" },
  { key: "suspicion", label: "Suspicion", value: 0, icon: "🔍" },
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
        { id: "c1", text: "Trust them", targetNodeId: "node_5", memoryEffects: { trust: 3, romance: 1 }, condition: null },
        { id: "c2", text: "Run away", targetNodeId: "node_6", memoryEffects: { courage: 2, suspicion: 1 }, condition: null },
        { id: "c3", text: "Investigate further", targetNodeId: "node_2", memoryEffects: { knowledge: 2 }, condition: { key: "knowledge", operator: ">=", value: 2 } },
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
    id: "track-subtitles", type: "subtitles", label: "Subtitles", muted: false, locked: false,
    clips: [
      { id: "clip-s1", trackType: "subtitles", label: "Opening Narration", startTime: 0, endTime: 3, color: "#FBBF24" },
      { id: "clip-s2", trackType: "subtitles", label: "Investigation Lines", startTime: 8, endTime: 15, color: "#FBBF24" },
      { id: "clip-s3", trackType: "subtitles", label: "Mystery Dialogue", startTime: 31, endTime: 40, color: "#FBBF24" },
    ],
  },
  {
    id: "track-choices", type: "choices", label: "Choices", muted: false, locked: false,
    clips: [
      { id: "clip-c1", trackType: "choices", label: "Investigate / Escape", startTime: 2, endTime: 5, color: "#F97316" },
      { id: "clip-c2", trackType: "choices", label: "Trust / Run / Investigate", startTime: 32, endTime: 40, color: "#F97316" },
    ],
  },
  {
    id: "track-emotional", type: "emotional", label: "Emotional Beats", muted: false, locked: false,
    clips: [
      { id: "clip-em1", trackType: "emotional", label: "🔮 Mystery", startTime: 0, endTime: 5, color: "#A855F7" },
      { id: "clip-em2", trackType: "emotional", label: "🤔 Curiosity", startTime: 8, endTime: 18, color: "#3B82F6" },
      { id: "clip-em3", trackType: "emotional", label: "😰 Tension", startTime: 20, endTime: 30, color: "#EF4444" },
      { id: "clip-em4", trackType: "emotional", label: "😱 Fear", startTime: 30, endTime: 42, color: "#DC2626" },
    ],
  },
  {
    id: "track-effects", type: "effects", label: "Effects", muted: false, locked: false,
    clips: [
      { id: "clip-e1", trackType: "effects", label: "Fade In", startTime: 0, endTime: 2, color: "#A855F7" },
      { id: "clip-e2", trackType: "effects", label: "Glitch", startTime: 28, endTime: 31, color: "#EC4899" },
    ],
  },
  {
    id: "track-camera", type: "camera", label: "Camera", muted: false, locked: false,
    clips: [
      { id: "clip-cam1", trackType: "camera", label: "Slow Pan", startTime: 0, endTime: 6, color: "#10B981" },
      { id: "clip-cam2", trackType: "camera", label: "Zoom In", startTime: 30, endTime: 34, color: "#10B981" },
      { id: "clip-cam3", trackType: "camera", label: "Shake", startTime: 40, endTime: 42, color: "#EF4444" },
    ],
  },
];

// ─── Sample Assets ───────────────────────────────────────────────

import type { AssetItem } from "@/types";

export const sampleAssets: AssetItem[] = [
  { id: "asset-1", type: "video", title: "Dark Room Intro", thumbnailSrc: "", duration: 8, fileSize: "24MB", src: "", folder: "Scenes", isFavorite: true },
  { id: "asset-2", type: "video", title: "Room Investigation", thumbnailSrc: "", duration: 12, fileSize: "36MB", src: "", folder: "Scenes" },
  { id: "asset-3", type: "video", title: "Escape Sequence", thumbnailSrc: "", duration: 6, fileSize: "18MB", src: "", folder: "Scenes" },
  { id: "asset-4", type: "video", title: "Mysterious Figure", thumbnailSrc: "", duration: 10, fileSize: "30MB", src: "", folder: "Characters", isFavorite: true },
  { id: "asset-5", type: "video", title: "Good Ending", thumbnailSrc: "", duration: 5, fileSize: "15MB", src: "", folder: "Endings" },
  { id: "asset-6", type: "video", title: "Bad Ending", thumbnailSrc: "", duration: 4, fileSize: "12MB", src: "", folder: "Endings" },
  { id: "asset-7", type: "image", title: "Room Background", thumbnailSrc: "", src: "", folder: "Backgrounds" },
  { id: "asset-8", type: "image", title: "Dark Corridor", thumbnailSrc: "", src: "", folder: "Backgrounds" },
  { id: "asset-9", type: "audio", title: "Ambient Dark", thumbnailSrc: "", duration: 120, fileSize: "8MB", src: "", folder: "Music", isFavorite: true },
  { id: "asset-10", type: "audio", title: "Tension Build", thumbnailSrc: "", duration: 90, fileSize: "6MB", src: "", folder: "Music" },
  { id: "asset-11", type: "audio", title: "Heartbeat SFX", thumbnailSrc: "", duration: 5, fileSize: "1MB", src: "", folder: "SFX" },
  { id: "asset-12", type: "audio", title: "Door Creak", thumbnailSrc: "", duration: 2, fileSize: "0.5MB", src: "", folder: "SFX" },
  { id: "asset-13", type: "subtitle", title: "EN Subtitles", thumbnailSrc: "", src: "", folder: "Subtitles" },
  { id: "asset-14", type: "subtitle", title: "TH Subtitles", thumbnailSrc: "", src: "", folder: "Subtitles" },
  { id: "asset-15", type: "template", title: "BL Romance Template", thumbnailSrc: "", src: "", folder: "Templates", isFavorite: true },
  { id: "asset-16", type: "template", title: "Horror Template", thumbnailSrc: "", src: "", folder: "Templates" },
];

// ─── Sample Creator Analytics ────────────────────────────────────

export const sampleAnalytics: CreatorAnalytics = {
  totalViews: 128450,
  avgWatchTime: 4.2,
  completionRate: 72,
  replayRate: 34,
  engagementScore: 87,
  viralScore: 64,
  emotionalScore: 91,
  viewerPrediction: 78,
  branchPopularity: [
    { branch: "Trust Path", percentage: 62, color: "#22C55E" },
    { branch: "Escape Path", percentage: 28, color: "#3B82F6" },
    { branch: "Investigate", percentage: 10, color: "#A855F7" },
  ],
  endingStats: [
    { ending: "Freedom", percentage: 45, type: "good" },
    { ending: "Trapped", percentage: 35, type: "bad" },
    { ending: "Secret Route", percentage: 20, type: "neutral" },
  ],
  emotionalTimeline: [
    { time: 0, intensity: 30, emotion: "mystery" },
    { time: 5, intensity: 45, emotion: "curiosity" },
    { time: 10, intensity: 55, emotion: "curiosity" },
    { time: 15, intensity: 60, emotion: "tense" },
    { time: 20, intensity: 75, emotion: "tense" },
    { time: 25, intensity: 80, emotion: "fear" },
    { time: 30, intensity: 95, emotion: "fear" },
    { time: 35, intensity: 70, emotion: "decision" },
    { time: 40, intensity: 50, emotion: "resolution" },
  ],
  audienceHeatmap: [
    { nodeId: "node_1", views: 128450, avgTime: 3.1, dropoff: 5 },
    { nodeId: "node_2", views: 85200, avgTime: 7.2, dropoff: 12 },
    { nodeId: "node_3", views: 38100, avgTime: 5.8, dropoff: 8 },
    { nodeId: "node_4", views: 80400, avgTime: 9.5, dropoff: 3 },
    { nodeId: "node_5", views: 57600, avgTime: 4.8, dropoff: 0 },
    { nodeId: "node_6", views: 22800, avgTime: 3.9, dropoff: 0 },
  ],
  dailyViews: [
    { date: "Mon", views: 12400 },
    { date: "Tue", views: 18300 },
    { date: "Wed", views: 22100 },
    { date: "Thu", views: 19800 },
    { date: "Fri", views: 25600 },
    { date: "Sat", views: 31200 },
    { date: "Sun", views: 28400 },
  ],
};

// ─── AI Suggestions ─────────────────────────────────────────────

import type { AISuggestion } from "@/types";

export const sampleAISuggestions: AISuggestion[] = [
  {
    id: "ai-1", type: "route", title: "Add Hidden Romance Route",
    description: "Based on emotional patterns, adding a hidden romance route after the trust choice could increase replay rate by ~18%",
    confidence: 87, icon: "❤️",
  },
  {
    id: "ai-2", type: "pacing", title: "Extend Decision Timer",
    description: "The decision point at node_4 has high engagement. Adding a 15-second timer could increase tension by 23%",
    confidence: 74, icon: "⏱️",
  },
  {
    id: "ai-3", type: "ending", title: "Add Secret Ending",
    description: "Players who collect all clues could unlock a secret ending. This pattern increases completion rate by 31%",
    confidence: 92, icon: "🌟",
  },
  {
    id: "ai-4", type: "dialogue", title: "Enhance Mystery Dialogue",
    description: "The mysterious figure's dialogue could be more impactful with emotional depth. Suggested rewrite available.",
    confidence: 81, icon: "💬",
  },
  {
    id: "ai-5", type: "emotion", title: "Emotional Arc Optimization",
    description: "Current emotional curve peaks too early. Consider adding a quiet moment before the climax for better impact.",
    confidence: 69, icon: "📈",
  },
];

// ─── Story Presets ──────────────────────────────────────────────

export const storyPresets = [
  { id: "preset-1", title: "BL Romance", icon: "❤️", desc: "Boy Love interactive drama with relationship meters", color: "#EC4899" },
  { id: "preset-2", title: "Horror Mystery", icon: "👻", desc: "Horror story with survival mechanics and jump scares", color: "#EF4444" },
  { id: "preset-3", title: "Campus Drama", icon: "🎓", desc: "School-based drama with social dynamics", color: "#F97316" },
  { id: "preset-4", title: "Crime Thriller", icon: "🔍", desc: "Detective investigation with clue gathering", color: "#3B82F6" },
  { id: "preset-5", title: "Fantasy RPG", icon: "⚔️", desc: "Fantasy adventure with stat-based choices", color: "#A855F7" },
  { id: "preset-6", title: "Sci-Fi", icon: "🚀", desc: "Space exploration with moral dilemmas", color: "#06B6D4" },
  { id: "preset-7", title: "Slice of Life", icon: "🌸", desc: "Relaxing daily life with gentle choices", color: "#10B981" },
  { id: "preset-8", title: "Thriller", icon: "😱", desc: "High-stakes thriller with time pressure", color: "#DC2626" },
];

// ─── Scene Templates ────────────────────────────────────────────

export const sceneTemplates = [
  { id: "tpl-1", title: "Dialogue Scene", icon: "💬", desc: "Two characters talking", nodes: 2 },
  { id: "tpl-2", title: "Binary Choice", icon: "🔀", desc: "Yes or No decision", nodes: 3 },
  { id: "tpl-3", title: "Triple Branch", icon: "🌿", desc: "Three-way branching", nodes: 4 },
  { id: "tpl-4", title: "Timer Choice", icon: "⏱️", desc: "Timed decision with fallback", nodes: 4 },
  { id: "tpl-5", title: "Hidden Route", icon: "🔐", desc: "Condition-locked secret path", nodes: 3 },
  { id: "tpl-6", title: "Flashback", icon: "⏪", desc: "Memory sequence", nodes: 3 },
  { id: "tpl-7", title: "Montage", icon: "🎬", desc: "Quick scene sequence", nodes: 5 },
  { id: "tpl-8", title: "Confession Scene", icon: "❤️", desc: "Emotional confession with reactions", nodes: 4 },
];
