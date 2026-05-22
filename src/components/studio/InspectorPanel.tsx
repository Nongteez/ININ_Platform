// ─── Inspector Panel — Enhanced ───────────────────────────────────

import { useState } from "react";
import { ChevronDown, ChevronRight, X, Plus, Trash2, Brain } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import type { StoryNodeData, DialogueLine, MemoryEffect } from "@/types";

function Section({ title, children, defaultOpen = true, accent }: { title: string; children: React.ReactNode; defaultOpen?: boolean; accent?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.05]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] transition-colors cursor-pointer">
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent || "rgba(255,255,255,0.6)" }}>{title}</span>
        {open ? <ChevronDown className="w-3 h-3 text-white/30" /> : <ChevronRight className="w-3 h-3 text-white/30" />}
      </button>
      {open && <div className="px-3 pb-3 space-y-2">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[9px] font-semibold text-white/35 uppercase tracking-wider mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/80 placeholder:text-white/20 outline-none focus:border-purple-500/30 transition-colors" />;
}

function TextArea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={2} className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/80 placeholder:text-white/20 outline-none focus:border-purple-500/30 transition-colors resize-none" />;
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/80 outline-none focus:border-purple-500/30 transition-colors cursor-pointer">
      {options.map((o) => <option key={o.value} value={o.value} className="bg-[#0B1020]">{o.label}</option>)}
    </select>
  );
}

function SliderInput({ value, onChange, min, max, step }: { value: number; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <div className="flex items-center gap-2">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 h-1 rounded-full appearance-none bg-white/[0.08] accent-purple-500 cursor-pointer" />
      <span className="text-[9px] text-white/40 font-mono w-8 text-right">{value}</span>
    </div>
  );
}

export function InspectorPanel() {
  const { selectedNodeId, nodes, updateNodeData, storyMemory, addMemoryVar, removeMemoryVar, updateMemoryVar } = useStudioStore();
  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node) {
    return (
      <div className="h-full overflow-y-auto scrollbar-hide">
        {/* No node selected — show Story Memory editor */}
        <div className="px-3 pt-3 pb-2 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <Brain className="w-3.5 h-3.5 text-purple-400/70" />
            <span className="text-xs font-bold text-white/80">Story Memory</span>
          </div>
          <p className="text-[9px] text-white/30 mt-0.5">Track choices and emotions across scenes</p>
        </div>
        <div className="px-3 py-3 space-y-2">
          {storyMemory.map((m) => (
            <div key={m.key} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] group">
              <span className="text-sm">{m.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-white/70">{m.label}</p>
                <p className="text-[8px] text-white/25 font-mono">{m.key} = {m.value}</p>
              </div>
              <button onClick={() => removeMemoryVar(m.key)} className="opacity-0 group-hover:opacity-100 p-1 rounded text-white/20 hover:text-red-400 transition-all cursor-pointer">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const key = `var_${Date.now()}`;
              addMemoryVar(key, "New Memory", "💡");
            }}
            className="w-full py-1.5 rounded-lg text-[9px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Memory Variable
          </button>
        </div>
        <div className="px-3 py-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] text-white/20">Select a node to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  const d = node.data as unknown as StoryNodeData;
  const update = (patch: Partial<StoryNodeData>) => updateNodeData(node.id, patch);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${d.type === "start" ? "bg-purple-400" : d.type === "scene" ? "bg-blue-400" : d.type === "choice" ? "bg-orange-400" : d.endingType === "good" ? "bg-green-400" : "bg-red-400"}`} />
          <span className="text-xs font-bold text-white/80 capitalize">{d.type} Node</span>
        </div>
        <p className="text-[9px] text-white/30 mt-0.5">ID: {node.id}</p>
      </div>

      {/* Scene Section */}
      <Section title="Scene">
        <Field label="Title"><TextInput value={d.title} onChange={(v) => update({ title: v })} /></Field>
        <Field label="Description"><TextArea value={d.description} onChange={(v) => update({ description: v })} /></Field>
        <Field label="Emotion">
          <SelectInput value={d.emotion} onChange={(v) => update({ emotion: v })} options={[
            { value: "neutral", label: "😐 Neutral" }, { value: "happy", label: "😊 Happy" },
            { value: "sad", label: "😢 Sad" }, { value: "tense", label: "😰 Tense" },
            { value: "curious", label: "🤔 Curious" }, { value: "mystery", label: "🔮 Mystery" },
            { value: "relief", label: "😌 Relief" }, { value: "despair", label: "😱 Despair" },
            { value: "surprise", label: "😲 Surprise" }, { value: "romantic", label: "❤️ Romantic" },
          ]} />
        </Field>
      </Section>

      {/* Media Section */}
      <Section title="Media">
        <Field label="Video Source"><TextInput value={d.videoSrc} onChange={(v) => update({ videoSrc: v })} placeholder="Enter video URL" /></Field>
        <Field label="Duration (seconds)"><SliderInput value={d.duration} onChange={(v) => update({ duration: v })} min={0} max={120} step={1} /></Field>
      </Section>

      {/* Choices Section */}
      {d.type === "choice" && (
        <Section title="Choices" accent="rgba(249,115,22,0.8)">
          {d.choices.map((choice, i) => (
            <div key={choice.id} className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[8px] font-bold text-orange-300">{String.fromCharCode(65 + i)}</div>
                  <span className="text-[9px] font-bold text-orange-300/70">Choice {String.fromCharCode(65 + i)}</span>
                </div>
                {d.choices.length > 2 && (
                  <button onClick={() => { const nc = d.choices.filter((_, idx) => idx !== i); update({ choices: nc }); }} className="p-0.5 text-white/15 hover:text-red-400 cursor-pointer"><Trash2 className="w-2.5 h-2.5" /></button>
                )}
              </div>
              <TextInput value={choice.text} onChange={(v) => { const nc = [...d.choices]; nc[i] = { ...nc[i], text: v }; update({ choices: nc }); }} placeholder="Choice text..." />
              {/* Memory effects for this choice */}
              <div className="space-y-1">
                <p className="text-[8px] text-white/25 font-semibold uppercase tracking-wider">Memory Effects</p>
                {Object.entries(choice.memoryEffects || {}).map(([key, val]) => {
                  const mem = storyMemory.find((m) => m.key === key);
                  return (
                    <div key={key} className="flex items-center gap-1.5">
                      <span className="text-[10px]">{mem?.icon || "💡"}</span>
                      <span className="text-[9px] text-white/50 flex-1">{mem?.label || key}</span>
                      <input type="number" value={val} onChange={(e) => { const nc = [...d.choices]; nc[i] = { ...nc[i], memoryEffects: { ...nc[i].memoryEffects, [key]: Number(e.target.value) } }; update({ choices: nc }); }}
                        className="w-12 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] text-white/70 text-center outline-none"
                      />
                    </div>
                  );
                })}
                {storyMemory.filter((m) => !Object.keys(choice.memoryEffects || {}).includes(m.key)).length > 0 && (
                  <select onChange={(e) => { if (!e.target.value) return; const nc = [...d.choices]; nc[i] = { ...nc[i], memoryEffects: { ...(nc[i].memoryEffects || {}), [e.target.value]: 1 } }; update({ choices: nc }); e.target.value = ""; }}
                    className="w-full px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] text-[8px] text-white/30 outline-none cursor-pointer" defaultValue="">
                    <option value="" className="bg-[#0B1020]">+ Add memory effect...</option>
                    {storyMemory.filter((m) => !Object.keys(choice.memoryEffects || {}).includes(m.key)).map((m) => (
                      <option key={m.key} value={m.key} className="bg-[#0B1020]">{m.icon} {m.label}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
          <button onClick={() => update({ choices: [...d.choices, { id: `c${Date.now()}`, text: "New option", targetNodeId: null, memoryEffects: {}, condition: null }] })} className="w-full py-1.5 rounded-lg text-[9px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 transition-all cursor-pointer">+ Add Choice</button>
        </Section>
      )}

      {/* Dialogue / Subtitles Section */}
      <Section title="Dialogue" accent="rgba(59,130,246,0.8)" defaultOpen={false}>
        {(d.dialogue || []).map((line, i) => (
          <div key={line.id} className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-blue-300/70">Line {i + 1}</span>
              <button onClick={() => { const nd = (d.dialogue || []).filter((_, idx) => idx !== i); update({ dialogue: nd }); }} className="p-0.5 text-white/15 hover:text-red-400 cursor-pointer"><Trash2 className="w-2.5 h-2.5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[7px] text-white/20 uppercase">Speaker</label>
                <input type="text" value={line.speaker} onChange={(e) => { const nd = [...(d.dialogue || [])]; nd[i] = { ...nd[i], speaker: e.target.value }; update({ dialogue: nd }); }} placeholder="Narrator" className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/70 outline-none" />
              </div>
              <div>
                <label className="text-[7px] text-white/20 uppercase">Emotion</label>
                <input type="text" value={line.emotion} onChange={(e) => { const nd = [...(d.dialogue || [])]; nd[i] = { ...nd[i], emotion: e.target.value }; update({ dialogue: nd }); }} placeholder="neutral" className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/70 outline-none" />
              </div>
            </div>
            <textarea value={line.text} onChange={(e) => { const nd = [...(d.dialogue || [])]; nd[i] = { ...nd[i], text: e.target.value }; update({ dialogue: nd }); }} rows={2} className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/70 outline-none resize-none" placeholder="Dialogue text..." />
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[7px] text-white/20 uppercase">Start (s)</label>
                <input type="number" value={line.startTime} step={0.5} onChange={(e) => { const nd = [...(d.dialogue || [])]; nd[i] = { ...nd[i], startTime: Number(e.target.value) }; update({ dialogue: nd }); }} className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/70 outline-none" />
              </div>
              <div>
                <label className="text-[7px] text-white/20 uppercase">End (s)</label>
                <input type="number" value={line.endTime} step={0.5} onChange={(e) => { const nd = [...(d.dialogue || [])]; nd[i] = { ...nd[i], endTime: Number(e.target.value) }; update({ dialogue: nd }); }} className="w-full px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/70 outline-none" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => update({ dialogue: [...(d.dialogue || []), { id: `dl_${Date.now()}`, speaker: "", text: "", startTime: 0, endTime: 3, emotion: "neutral" }] })} className="w-full py-1.5 rounded-lg text-[9px] font-semibold text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/15 transition-all cursor-pointer">+ Add Dialogue Line</button>
      </Section>

      {/* Story Memory Effects (on enter) */}
      <Section title="Story Memory" accent="rgba(168,85,247,0.8)" defaultOpen={false}>
        <p className="text-[8px] text-white/25 mb-1">Changes applied when entering this scene</p>
        {(d.onEnterEffects || []).map((effect, i) => {
          const mem = storyMemory.find((m) => m.key === effect.key);
          return (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <span className="text-[10px]">{mem?.icon || "💡"}</span>
              <span className="text-[9px] text-white/50 flex-1">{mem?.label || effect.key}</span>
              <input type="number" value={effect.delta} onChange={(e) => { const ne = [...(d.onEnterEffects || [])]; ne[i] = { ...ne[i], delta: Number(e.target.value) }; update({ onEnterEffects: ne }); }}
                className="w-12 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] text-white/70 text-center outline-none" />
              <button onClick={() => { const ne = (d.onEnterEffects || []).filter((_, idx) => idx !== i); update({ onEnterEffects: ne }); }} className="p-0.5 text-white/15 hover:text-red-400 cursor-pointer"><Trash2 className="w-2.5 h-2.5" /></button>
            </div>
          );
        })}
        {storyMemory.length > 0 && (
          <select onChange={(e) => { if (!e.target.value) return; update({ onEnterEffects: [...(d.onEnterEffects || []), { key: e.target.value, delta: 1 }] }); e.target.value = ""; }}
            className="w-full px-1.5 py-1 rounded bg-white/[0.02] border border-white/[0.04] text-[8px] text-white/30 outline-none cursor-pointer" defaultValue="">
            <option value="" className="bg-[#0B1020]">+ Add memory effect on enter...</option>
            {storyMemory.map((m) => <option key={m.key} value={m.key} className="bg-[#0B1020]">{m.icon} {m.label}</option>)}
          </select>
        )}
      </Section>

      {/* Ending Section */}
      {d.type === "ending" && (
        <Section title="Ending">
          <Field label="Ending Type">
            <SelectInput value={d.endingType || "good"} onChange={(v) => update({ endingType: v as "good" | "bad" | "neutral" })} options={[{ value: "good", label: "🌅 Good Ending" }, { value: "bad", label: "💀 Bad Ending" }, { value: "neutral", label: "🌫️ Neutral Ending" }]} />
          </Field>
        </Section>
      )}

      {/* Transitions Section */}
      <Section title="Transitions" defaultOpen={false}>
        <Field label="Transition Type">
          <SelectInput value={d.transitionType} onChange={(v) => update({ transitionType: v as any })} options={[{ value: "cut", label: "Cut" }, { value: "fade", label: "Fade" }, { value: "dissolve", label: "Dissolve" }, { value: "wipe", label: "Wipe" }]} />
        </Field>
        <Field label="Duration"><SliderInput value={d.transitionDuration} onChange={(v) => update({ transitionDuration: v })} min={0} max={3} step={0.1} /></Field>
      </Section>

      {/* Metadata Section */}
      <Section title="Metadata" defaultOpen={false}>
        <Field label="Tags"><TextInput value={d.tags.join(", ")} onChange={(v) => update({ tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} placeholder="tag1, tag2" /></Field>
      </Section>
    </div>
  );
}
