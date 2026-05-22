import { motion, AnimatePresence } from "framer-motion";
import { Film, Music, GitBranch, Sparkles, Wand2, FolderOpen, Search, Upload, Clock, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import type { SidebarTab } from "@/types";
import { sampleAssets } from "@/data/sampleStory";

const tabs: { id: SidebarTab; icon: typeof Film; label: string }[] = [
  { id: "media", icon: Film, label: "Media" },
  { id: "audio", icon: Music, label: "Audio" },
  { id: "choices", icon: GitBranch, label: "Choices" },
  { id: "effects", icon: Sparkles, label: "Effects" },
  { id: "ai", icon: Wand2, label: "AI Tools" },
  { id: "assets", icon: FolderOpen, label: "Assets" },
];

function AssetCard({ title, duration, type }: { title: string; duration?: number; type: string }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="group rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-grab">
      <div className="relative aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/80 flex items-center justify-center">
        {type === "video" && <Film className="w-6 h-6 text-blue-400/30" />}
        {type === "audio" && <Music className="w-6 h-6 text-cyan-400/30" />}
        {type === "image" && <Image className="w-6 h-6 text-purple-400/30" />}
        {duration && (
          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/70">
            <Clock className="w-2 h-2 text-white/50" /><span className="text-[8px] font-semibold text-white/70">{duration}s</span>
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <p className="text-[10px] font-semibold text-white/80 truncate">{title}</p>
        <p className="text-[9px] text-white/30 mt-0.5 capitalize">{type}</p>
      </div>
    </motion.div>
  );
}

function AIToolCard({ title, desc, icon: Icon }: { title: string; desc: string; icon: typeof Wand2 }) {
  return (
    <div className="rounded-xl border border-purple-500/15 bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-3 cursor-pointer hover:border-purple-500/25 transition-all group">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-purple-400" /></div>
        <div><p className="text-[11px] font-bold text-white/80">{title}</p><p className="text-[9px] text-white/40 mt-0.5">{desc}</p></div>
      </div>
      <button className="mt-2.5 w-full py-1.5 rounded-lg text-[9px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 transition-all">Generate</button>
    </div>
  );
}

export function LeftSidebar() {
  const { sidebarTab, setSidebarTab, sidebarCollapsed, toggleSidebar } = useStudioStore();
  const mediaAssets = sampleAssets.filter((a) => a.type === "video" || a.type === "image");
  const audioAssets = sampleAssets.filter((a) => a.type === "audio");

  return (
    <div className="flex h-full">
      <div className="w-12 flex flex-col items-center py-2 gap-1 border-r border-white/[0.06] bg-[#050816]/50 shrink-0">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setSidebarTab(id)} title={label} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${sidebarTab === id ? "bg-purple-500/15 text-purple-400" : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"}`}>
            <Icon className="w-4 h-4" />
            {sidebarTab === id && <motion.div layoutId="sidebar-indicator" className="absolute left-0 w-0.5 h-4 rounded-full bg-purple-400" />}
          </button>
        ))}
        <div className="mt-auto"><button onClick={toggleSidebar} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all cursor-pointer">{sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}</button></div>
      </div>
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-r border-white/[0.06] bg-[#0B1020]/60">
            <div className="w-[240px] h-full flex flex-col">
              <div className="px-3 pt-3 pb-2"><p className="text-xs font-bold text-white/80 capitalize">{sidebarTab === "ai" ? "AI Tools" : sidebarTab}</p></div>
              <div className="px-3 mb-2">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <Search className="w-3 h-3 text-white/30 shrink-0" />
                  <input type="text" placeholder="Search..." className="bg-transparent text-[10px] text-white/70 placeholder:text-white/25 outline-none w-full" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-hide">
                {sidebarTab === "media" && (<div className="space-y-2"><div className="border-2 border-dashed border-white/[0.08] rounded-xl py-5 flex flex-col items-center gap-2 hover:border-purple-500/20 transition-colors cursor-pointer"><Upload className="w-5 h-5 text-white/20" /><p className="text-[9px] text-white/30 font-medium">Drop files or click to upload</p></div><div className="grid grid-cols-2 gap-2">{mediaAssets.map((a) => <AssetCard key={a.id} title={a.title} duration={a.duration} type={a.type} />)}</div></div>)}
                {sidebarTab === "audio" && (<div className="space-y-2">{audioAssets.map((a) => <AssetCard key={a.id} title={a.title} duration={a.duration} type={a.type} />)}</div>)}
                {sidebarTab === "choices" && (<div className="space-y-2.5">{[{l:"Binary Choice",o:["Option A","Option B"]},{l:"Triple Choice",o:["Path 1","Path 2","Path 3"]},{l:"Moral Dilemma",o:["Help them","Ignore them"]}].map(c=>(<div key={c.l} className="rounded-xl border border-orange-500/15 bg-orange-500/5 p-3 cursor-grab hover:border-orange-500/25 transition-all"><p className="text-[10px] font-bold text-orange-300/80 mb-2">{c.l}</p><div className="space-y-1.5">{c.o.map((opt,i)=>(<div key={i} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05]"><div className="w-3.5 h-3.5 rounded-full bg-orange-500/20 flex items-center justify-center text-[7px] font-bold text-orange-300 shrink-0">{String.fromCharCode(65+i)}</div><span className="text-[9px] text-white/60 font-medium">{opt}</span></div>))}</div></div>))}</div>)}
                {sidebarTab === "effects" && (<div className="grid grid-cols-2 gap-2">{["Fade In","Fade Out","Dissolve","Glitch","Blur","Zoom","Shake","Flash"].map(e=>(<div key={e} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center cursor-grab hover:border-purple-500/20 hover:bg-purple-500/5 transition-all"><Sparkles className="w-4 h-4 text-purple-400/40 mx-auto mb-1.5" /><p className="text-[9px] font-semibold text-white/60">{e}</p></div>))}</div>)}
                {sidebarTab === "ai" && (<div className="space-y-2.5"><AIToolCard icon={Wand2} title="Generate Story" desc="AI creates a branching story outline" /><AIToolCard icon={GitBranch} title="Generate Choices" desc="Auto-generate choices for any scene" /><AIToolCard icon={Sparkles} title="Generate Ending" desc="Create endings for story branches" /><AIToolCard icon={Film} title="Generate Dialogue" desc="AI writes character dialogue" /></div>)}
                {sidebarTab === "assets" && (<div className="grid grid-cols-2 gap-2">{sampleAssets.map((a) => <AssetCard key={a.id} title={a.title} duration={a.duration} type={a.type} />)}</div>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
