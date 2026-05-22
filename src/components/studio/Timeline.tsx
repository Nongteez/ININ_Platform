// ─── Timeline Editor — Enhanced ───────────────────────────────────

import { useRef, useState, useCallback } from "react";
import { Film, Music, GitBranch, Sparkles, Lock, Unlock, Volume2, VolumeX } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import { initialTimeline } from "@/data/sampleStory";
import type { TimelineTrack, TimelineClip } from "@/types";

const trackIcons: Record<string, typeof Film> = {
  video: Film, audio: Music, choices: GitBranch, effects: Sparkles,
};

const PIXELS_PER_SECOND = 18;
const TOTAL_DURATION = 60;

function TimeRuler({ onClick }: { onClick: (time: number) => void }) {
  const marks: number[] = [];
  for (let i = 0; i <= TOTAL_DURATION; i += 5) marks.push(i);
  return (
    <div className="h-6 flex items-end border-b border-white/[0.06] cursor-pointer relative select-none" style={{ width: TOTAL_DURATION * PIXELS_PER_SECOND }}
      onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); onClick(Math.max(0, Math.min((e.clientX - rect.left) / PIXELS_PER_SECOND, TOTAL_DURATION))); }}>
      {marks.map((t) => (
        <div key={t} className="absolute bottom-0 flex flex-col items-center" style={{ left: t * PIXELS_PER_SECOND }}>
          <span className="text-[8px] text-white/25 font-mono mb-0.5">{formatTime(t)}</span>
          <div className="w-px h-2 bg-white/[0.08]" />
        </div>
      ))}
      {Array.from({ length: TOTAL_DURATION }, (_, i) => i).map((t) => (
        <div key={`m-${t}`} className="absolute bottom-0 w-px h-1 bg-white/[0.04]" style={{ left: t * PIXELS_PER_SECOND }} />
      ))}
    </div>
  );
}

function DraggableClip({ clip, onUpdate }: { clip: TimelineClip; onUpdate: (id: string, patch: Partial<TimelineClip>) => void }) {
  const width = (clip.endTime - clip.startTime) * PIXELS_PER_SECOND;
  const left = clip.startTime * PIXELS_PER_SECOND;
  const [dragging, setDragging] = useState<"move" | "left" | "right" | null>(null);
  const dragStart = useRef({ x: 0, start: clip.startTime, end: clip.endTime });

  const onPointerDown = (e: React.PointerEvent, type: "move" | "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);
    dragStart.current = { x: e.clientX, start: clip.startTime, end: clip.endTime };
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dt = dx / PIXELS_PER_SECOND;

    if (dragging === "move") {
      const dur = dragStart.current.end - dragStart.current.start;
      const newStart = Math.max(0, Math.round((dragStart.current.start + dt) * 2) / 2);
      onUpdate(clip.id, { startTime: newStart, endTime: newStart + dur });
    } else if (dragging === "left") {
      const newStart = Math.max(0, Math.min(Math.round((dragStart.current.start + dt) * 2) / 2, clip.endTime - 0.5));
      onUpdate(clip.id, { startTime: newStart });
    } else if (dragging === "right") {
      const newEnd = Math.max(clip.startTime + 0.5, Math.round((dragStart.current.end + dt) * 2) / 2);
      onUpdate(clip.id, { endTime: newEnd });
    }
  };

  const onPointerUp = () => setDragging(null);

  return (
    <div
      className={`absolute top-1 bottom-1 rounded-lg border group overflow-hidden transition-shadow ${dragging ? "z-20 shadow-lg" : ""}`}
      style={{ left, width: Math.max(width, 20), background: `${clip.color}20`, borderColor: dragging ? `${clip.color}80` : `${clip.color}40` }}
    >
      {/* Left resize handle */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-white/20 transition-colors rounded-l-lg z-10"
        onPointerDown={(e) => onPointerDown(e, "left")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      {/* Move area */}
      <div className="absolute left-1.5 right-1.5 top-0 bottom-0 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => onPointerDown(e, "move")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="px-1.5 py-0.5 h-full flex items-center overflow-hidden">
          <span className="text-[8px] font-semibold truncate" style={{ color: clip.color }}>{clip.label}</span>
        </div>
      </div>
      {/* Right resize handle */}
      <div className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-white/20 transition-colors rounded-r-lg z-10"
        onPointerDown={(e) => onPointerDown(e, "right")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `${clip.color}08` }} />
    </div>
  );
}

function Track({ track, onClipUpdate }: { track: TimelineTrack; onClipUpdate: (id: string, patch: Partial<TimelineClip>) => void }) {
  const [muted, setMuted] = useState(track.muted);
  const [locked, setLocked] = useState(track.locked);
  const Icon = trackIcons[track.type] || Film;

  return (
    <div className="flex border-b border-white/[0.04] group">
      <div className="w-28 shrink-0 flex items-center gap-2 px-2 py-1.5 border-r border-white/[0.06] bg-[#050816]/50">
        <Icon className="w-3 h-3 text-white/30 shrink-0" />
        <span className="text-[9px] font-semibold text-white/50 truncate">{track.label}</span>
        <div className="ml-auto flex items-center gap-0.5">
          <button onClick={() => setMuted(!muted)} className="p-0.5 rounded text-white/15 hover:text-white/40 cursor-pointer transition-colors">
            {muted ? <VolumeX className="w-2.5 h-2.5" /> : <Volume2 className="w-2.5 h-2.5" />}
          </button>
          <button onClick={() => setLocked(!locked)} className="p-0.5 rounded text-white/15 hover:text-white/40 cursor-pointer transition-colors">
            {locked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
          </button>
        </div>
      </div>
      <div className="flex-1 relative h-8" style={{ width: TOTAL_DURATION * PIXELS_PER_SECOND }}>
        {track.clips.map((clip) => (
          <DraggableClip key={clip.id} clip={clip} onUpdate={locked ? () => {} : onClipUpdate} />
        ))}
      </div>
    </div>
  );
}

export function Timeline() {
  const { playhead, setPlayhead } = useStudioStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<TimelineTrack[]>(initialTimeline);

  const handleRulerClick = useCallback((time: number) => setPlayhead(time), [setPlayhead]);

  const handleClipUpdate = useCallback((clipId: string, patch: Partial<TimelineClip>) => {
    setTracks((prev) =>
      prev.map((track) => ({
        ...track,
        clips: track.clips.map((clip) =>
          clip.id === clipId ? { ...clip, ...patch } : clip
        ),
      }))
    );
  }, []);

  const playheadLeft = playhead * PIXELS_PER_SECOND;

  return (
    <div className="h-full flex flex-col bg-[#050816]/80">
      <div className="flex-1 overflow-auto scrollbar-hide" ref={scrollRef}>
        <div className="flex">
          <div className="w-28 shrink-0" />
          <div className="flex-1 relative"><TimeRuler onClick={handleRulerClick} /></div>
        </div>
        <div className="relative">
          {tracks.map((track) => <Track key={track.id} track={track} onClipUpdate={handleClipUpdate} />)}
          {/* Playhead */}
          <div className="absolute top-0 bottom-0 w-px bg-red-500 z-10 pointer-events-none" style={{ left: 112 + playheadLeft }}>
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
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
