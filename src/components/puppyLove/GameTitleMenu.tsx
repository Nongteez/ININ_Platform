import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Play,
  FolderOpen,
  Image,
  Settings,
  LogOut,
} from "lucide-react";

export type MenuAction = "new" | "load" | "gallery" | "settings" | "exit";

interface MenuItem {
  id: MenuAction;
  label: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { id: "new", label: "NEW GAME", icon: Play },
  { id: "load", label: "LOAD GAME", icon: FolderOpen },
  { id: "gallery", label: "GALLERY", icon: Image },
  { id: "settings", label: "SETTINGS", icon: Settings },
  { id: "exit", label: "EXIT", icon: LogOut },
];

interface GameTitleMenuProps {
  onSelect: (action: MenuAction) => void;
}

export function GameTitleMenu({ onSelect }: GameTitleMenuProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="vn-menu-panel w-[min(100%,320px)] rounded-r-2xl py-2.5"
      aria-label="Game menu"
    >
      {menuItems.map((item, i) => (
        <div key={item.id}>
          <motion.button
            type="button"
            onClick={() => onSelect(item.id)}
            className="vn-menu-item group relative w-full flex items-center gap-3.5 px-6 py-4 text-left cursor-pointer overflow-hidden"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.07, duration: 0.5 }}
            whileHover={{ x: 4 }}
          >
            <span className="vn-menu-sweep" aria-hidden />
            <item.icon className="w-[18px] h-[18px] shrink-0 text-pink-300/70 group-hover:text-pink-200 transition-colors relative z-10" />
            <span className="vn-menu-label relative z-10 text-[13px] font-bold tracking-[0.16em] text-white/55 group-hover:text-pink-100 transition-colors">
              {item.label}
            </span>
          </motion.button>
          {i < menuItems.length - 1 && <div className="vn-menu-divider mx-5" />}
        </div>
      ))}
    </motion.nav>
  );
}
