import { motion } from "framer-motion";
import logo from "@/assets/Logo/ICON_ININ.png";

const footerLinks = [
  ["Audio Description", "Help Center", "Gift Cards", "Media Center"],
  ["Investor Relations", "Jobs", "Terms of Use", "Privacy"],
  ["Legal Notices", "Cookie Preferences", "Corporate Info", "Contact Us"],
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-4 md:px-12 lg:px-16 pt-16 pb-10 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="ININ" className="h-6 w-auto opacity-40" />
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 mb-8">
          {["Facebook", "Instagram", "Twitter", "YouTube"].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ scale: 1.05, y: -1 }}
              className="text-[#AAB0C5]/60 hover:text-[#AAB0C5] transition-colors text-sm font-medium"
            >
              {social}
            </motion.a>
          ))}
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((group, gi) => (
            <div key={gi} className="space-y-3">
              {group.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-xs text-[#AAB0C5]/50 hover:text-[#AAB0C5]/80 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Service Code */}
        <button className="text-xs text-[#AAB0C5]/40 border border-white/8 px-3 py-1.5 rounded-lg hover:text-[#AAB0C5]/70 hover:border-white/15 transition-all mb-6 cursor-pointer">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-[11px] text-[#AAB0C5]/30">
          © 2026 ININ · Next-Gen FMV Interactive Entertainment Platform
        </p>
      </div>
    </motion.footer>
  );
}
