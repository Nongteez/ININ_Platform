import { useEffect, useState, useCallback } from "react";
import { Bell, Search, ChevronDown, Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/Logo/ICON_ININ.png";
import { ProfileDropdown } from "./ProfileDropdown";

const links = [
  { label: "Home", href: "/" },
  { label: "Interactive", href: "#" },
  { label: "Trending", href: "#" },
  { label: "Community", href: "#" },
  { label: "Contact", href: "/contact" },
];

/** Check whether a nav link matches the current pathname */
function isActive(href: string, pathname: string): boolean {
  if (href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();

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
          <nav className="hidden lg:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
            {links.map((link, i) => {
              const isRoute = link.href.startsWith("/");
              const active = isActive(link.href, pathname);

              const baseClasses = "relative text-[13px] whitespace-nowrap transition-all duration-250 ease-out px-3.5 py-1.5 rounded-full";
              const activeClasses = "font-semibold text-white bg-purple-500/[0.15] border border-purple-400/20 shadow-[0_0_12px_rgba(157,77,255,0.2),inset_0_0_12px_rgba(157,77,255,0.05)] backdrop-blur-sm";
              const inactiveClasses = "font-medium text-zinc-400 border border-transparent hover:text-white hover:bg-white/[0.05]";

              const className = `${baseClasses} ${active ? activeClasses : inactiveClasses}`;

              return isRoute ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <Link to={link.href} className={className}>
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-purple-500/[0.15] border border-purple-400/20 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className={className}
                >
                  {link.label}
                </motion.a>
              );
            })}
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
            <Link to="/studio-intro">
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
            className="fixed inset-0 z-[45] bg-[#050816]/[0.97] navbar-glass lg:hidden pt-16"
          >
            <nav className="flex flex-col px-6 py-6">
              {/* Mobile menu branding */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2.5 mb-6 pb-5 border-b border-white/[0.06]"
              >
                <img src={logo} alt="ININ" className="h-6 w-auto opacity-60" />
                <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase">Menu</span>
              </motion.div>

              {/* Mobile account quick action (bottom nav keeps navigation links) */}
              <div className="flex flex-col gap-2 mt-1">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => {
                    setProfileOpen(true);
                    setMobileOpen(false);
                  }}
                  className="text-lg font-medium text-white/70 border border-white/[0.08] bg-white/[0.03] px-4 py-3 rounded-xl w-full text-left hover:text-white hover:border-white/[0.15] transition-colors cursor-pointer"
                >
                  Profile
                </motion.button>
              </div>

              {/* Mobile Studio + Coins */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.06]"
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-base leading-none">💎</span>
                  <span className="text-sm font-semibold text-white/90">100</span>
                </div>
                <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer studio-btn">
                  <Plus className="h-4 w-4" />
                  Studio
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
