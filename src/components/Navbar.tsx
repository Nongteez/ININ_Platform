import { useEffect, useState, useCallback } from "react";
import { Bell, Search, ChevronDown, Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo/ICON_ININ.png";
import { ProfileDropdown } from "./ProfileDropdown";

const links = [
  { label: "Home", href: "#" },
  { label: "Interactive", href: "#" },
  { label: "Trending", href: "#" },
  { label: "Community", href: "#" },
  { label: "My List", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleProfile = useCallback(() => setProfileOpen((p) => !p), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled
          ? "bg-[#050816]/95 navbar-glass shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-[#050816]/70 via-[#050816]/30 to-transparent"
          }`}
      >
        <div className="relative flex items-center justify-between px-4 md:px-12 lg:px-16 py-3 md:py-4">

          {/* LEFT — Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex items-center cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="ININ"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* CENTER — Desktop Navigation (absolutely centered) */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className={`nav-link text-[13px] font-medium transition-colors duration-300 whitespace-nowrap ${i === 0
                  ? "text-white"
                  : "text-[#AAB0C5] hover:text-white"
                  }`}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* RIGHT — Actions */}
          <div className="relative z-10 flex items-center gap-2.5 md:gap-3">

            {/* Coin Balance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] cursor-pointer hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
            >
              <span className="text-sm leading-none">💎</span>
              <span className="text-xs font-semibold text-white/90 tabular-nums">100</span>
            </motion.div>

            {/* Studio Button */}
            <Link to="/studio">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all studio-btn"
              >
                <Plus className="h-3.5 w-3.5" />
                Studio
              </motion.div>
            </Link>

            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer text-white/60 hover:text-white transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </motion.div>

            {/* Notification */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block cursor-pointer text-white/60 hover:text-white transition-colors relative"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#9D4DFF] rounded-full" />
            </motion.div>

            {/* Profile Avatar + Dropdown */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={toggleProfile}
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                  <div className="w-full h-full bg-gradient-to-br from-[#7B5CFF] to-[#9D4DFF] flex items-center justify-center text-white text-[11px] font-bold">
                    U
                  </div>
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-white/40 transition-transform duration-300 hidden md:block ${profileOpen ? "rotate-180" : ""}`} />
              </motion.div>

              <AnimatePresence>
                {profileOpen && <ProfileDropdown onClose={closeProfile} />}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/70 hover:text-white cursor-pointer"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-[#050816]/98 navbar-glass lg:hidden pt-20"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl font-medium ${i === 0 ? "text-white" : "text-[#AAB0C5]"
                    } hover:text-white transition-colors`}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile Studio + Coins */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-base leading-none">🪙</span>
                  <span className="text-sm font-semibold text-white/90">100</span>
                </div>
                <button className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer studio-btn">
                  <Plus className="h-4 w-4" />
                  Studio
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
