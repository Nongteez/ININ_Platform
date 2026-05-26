import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, BookmarkPlus, User, TrendingUp, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { key: "home", label: "Home", icon: Home },
  { key: "interactive", label: "Interactive", icon: Compass },
  { key: "trending", label: "Trending", icon: TrendingUp },
  { key: "community", label: "Community", icon: Users },
  { key: "contact", label: "Contact", icon: Mail },
];

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollAttemptsRef = useRef(0);

  const activeKey = useMemo(() => {
    const pathname = location.pathname;
    const hash = location.hash || "";

    if (pathname === "/" && hash === "#trending-now") return "trending";
    if (pathname === "/") return "home";

    if (pathname.startsWith("/studio")) return "interactive";

    if (pathname === "/contact" && hash.includes("community-section")) return "community";
    if (pathname === "/contact") return "contact";

    return "home";
  }, [location.hash, location.pathname]);

  const scrollToTrendingRow = useCallback(() => {
    // Retry because the homepage rows may mount after initial render.
    const title = "Trending Now";
    const tryFind = () => {
      scrollAttemptsRef.current += 1;
      const headers = Array.from(document.querySelectorAll("h2"));
      const el = headers.find((h) => (h.textContent || "").trim() === title);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    scrollAttemptsRef.current = 0;
    const timers = Array.from({ length: 4 }).map((_, i) =>
      window.setTimeout(() => {
        if (tryFind()) return;
      }, i * 250),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#trending-now") {
      void scrollToTrendingRow();
    }
  }, [location.hash, location.pathname, scrollToTrendingRow]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden mobile-nav">
      {/* Gradient glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9D4DFF]/25 to-transparent" />

      <div className="flex items-center justify-between px-1 pt-1.5 pb-[max(0.55rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeKey === tab.key;

          return (
            <motion.button
              key={tab.label}
              onClick={() => {
                if (tab.key === "home") navigate("/");
                if (tab.key === "interactive") navigate("/");
                if (tab.key === "trending") navigate("/");
                if (tab.key === "community") navigate("/");
                if (tab.key === "contact") navigate("/contact");
              }}
              whileTap={{ scale: 0.88 }}
              className={`relative flex-1 min-w-0 flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-[#9D4DFF]"
                  : "text-[#AAB0C5]/40 active:text-[#AAB0C5]/70"
              }`}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-bg"
                  className="absolute inset-0 rounded-2xl bg-[#9D4DFF]/[0.08] border border-[#9D4DFF]/[0.12]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className="relative z-10 h-[20px] w-[20px]"
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={`relative z-10 text-[10px] font-semibold tracking-wide ${
                  isActive ? "text-[#9D4DFF]" : ""
                }`}
              >
                {tab.label}
              </span>

              {/* Active glow dot */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#9D4DFF] shadow-[0_0_8px_rgba(157,77,255,0.6)]"
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
