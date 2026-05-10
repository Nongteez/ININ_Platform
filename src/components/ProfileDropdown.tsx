import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Globe,
  Palette,
  Bell,
  Clock,
  Heart,
  Clapperboard,
  LayoutDashboard,
  BarChart3,
  Wallet,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ProfileDropdownProps {
  onClose: () => void;
}

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href?: string;
  accent?: boolean;
};

const accountItems: MenuItem[] = [
  { icon: User, label: "Profile Settings" },
  { icon: Globe, label: "Language" },
  { icon: Palette, label: "Appearance" },
  { icon: Bell, label: "Notifications" },
  { icon: Clock, label: "Watch History" },
  { icon: Heart, label: "Favorites" },
];

const creatorItems: MenuItem[] = [
  { icon: Clapperboard, label: "Creator Studio" },
  { icon: LayoutDashboard, label: "Creator Dashboard" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Wallet, label: "Monetization" },
];

const supportItems: MenuItem[] = [
  { icon: HelpCircle, label: "Help Center" },
  { icon: Shield, label: "Terms & Privacy" },
];

function MenuSection({ label, items }: { label: string; items: MenuItem[] }) {
  return (
    <div className="px-2 py-1.5">
      <p className="text-[10px] font-semibold text-[#AAB0C5]/50 uppercase tracking-[0.12em] px-3 mb-1">
        {label}
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href || "#"}
            className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#B9C2FF]/80 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            <Icon className="h-4 w-4 text-[#B9C2FF]/50 group-hover:text-[#9D4DFF] transition-colors flex-shrink-0" />
            <span className="flex-1 font-medium">{item.label}</span>
            <ChevronRight className="h-3.5 w-3.5 text-white/0 group-hover:text-white/20 transition-all -translate-x-1 group-hover:translate-x-0" />
          </a>
        );
      })}
    </div>
  );
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full right-0 mt-2 w-[320px] rounded-2xl overflow-hidden profile-dropdown z-[60]"
    >
      {/* Profile Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3.5">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#7B5CFF] to-[#C961FF] flex items-center justify-center text-white text-base font-bold flex-shrink-0 ring-2 ring-[#7B5CFF]/20">
          U
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">Username</p>
          <p className="text-xs text-[#AAB0C5] truncate">user@inin.io</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7B5CFF]/15 to-[#C961FF]/15 border border-[#7B5CFF]/20">
          <Sparkles className="h-3 w-3 text-[#C961FF]" />
          <span className="text-[10px] font-semibold text-[#C961FF]">Premium</span>
        </div>
      </div>

      <div className="h-px bg-white/[0.06] mx-4" />

      {/* Menu Sections */}
      <div className="py-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
        <MenuSection label="Account" items={accountItems} />
        <div className="h-px bg-white/[0.04] mx-4 my-1" />
        <MenuSection label="Creator" items={creatorItems} />
        <div className="h-px bg-white/[0.04] mx-4 my-1" />
        <MenuSection label="Support" items={supportItems} />
      </div>

      <div className="h-px bg-white/[0.06] mx-4" />

      {/* Logout */}
      <div className="px-2 py-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#FF6B8A]/80 hover:text-[#FF6B8A] hover:bg-[#FF6B8A]/[0.06] transition-all cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </motion.div>
  );
}
