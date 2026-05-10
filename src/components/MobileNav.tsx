import { useState } from "react";
import { Home, Compass, BookmarkPlus, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "My List", icon: BookmarkPlus },
  { label: "Profile", icon: User },
];

export function MobileNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden mobile-nav">
      <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = active === i;

          return (
            <motion.button
              key={tab.label}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors cursor-pointer ${
                isActive ? "text-[#9D4DFF]" : "text-[#AAB0C5]/50"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] font-medium ${isActive ? "text-[#9D4DFF]" : ""}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-0 w-8 h-0.5 rounded-full bg-[#9D4DFF]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
