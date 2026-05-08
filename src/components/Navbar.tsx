import { useEffect, useState } from "react";
import { Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#" },
  { label: "Series", href: "#" },
  { label: "Movies", href: "#" },
  { label: "New & Popular", href: "#" },
  { label: "My List", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${
          scrolled
            ? "bg-[#050505]/95 navbar-glass shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-12 lg:px-16 py-3 md:py-4">
          {/* Left Section */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="flex items-center gap-1 cursor-pointer select-none"
            >
              <span className="text-[#E50914] text-2xl md:text-3xl font-black tracking-[-0.05em] leading-none">
                ININ
              </span>
              <span className="text-white text-2xl md:text-3xl font-light tracking-[-0.05em] leading-none">
                TV
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className={`nav-link text-[13px] font-medium transition-colors duration-300 ${
                    i === 0
                      ? "text-white"
                      : "text-[#B3B3B3] hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-white/80 hover:text-white transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.div>

            {/* Notification */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block cursor-pointer text-white/80 hover:text-white transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E50914] rounded-full" />
            </motion.div>

            {/* Profile Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-8 w-8 rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-white/30 transition-all">
                <div className="w-full h-full bg-gradient-to-br from-[#E50914] to-[#8B0000] flex items-center justify-center text-white text-xs font-bold">
                  U
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-white/60 transition-transform group-hover:rotate-180 duration-300 hidden md:block" />
            </motion.div>

            {/* Mobile Menu */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/80 hover:text-white cursor-pointer"
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
            className="fixed inset-0 z-[45] bg-[#050505]/98 navbar-glass lg:hidden pt-20"
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
                  className={`text-xl font-medium ${
                    i === 0 ? "text-white" : "text-[#B3B3B3]"
                  } hover:text-[#E50914] transition-colors`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
