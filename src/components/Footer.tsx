import { motion } from "framer-motion";

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
        {/* Social Links */}
        <div className="flex items-center gap-5 mb-8">
          {["Facebook", "Instagram", "Twitter", "YouTube"].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-[#B3B3B3] hover:text-white transition-colors text-sm font-medium"
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
                  className="block text-xs text-[#B3B3B3]/70 hover:text-[#B3B3B3] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Service Code */}
        <button className="text-xs text-[#B3B3B3]/50 border border-[#B3B3B3]/20 px-3 py-1.5 rounded hover:text-[#B3B3B3]/80 hover:border-[#B3B3B3]/40 transition-all mb-6 cursor-pointer">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-[11px] text-[#B3B3B3]/40">
          © 2026 ININ TV · Premium Streaming Platform · Demo Only
        </p>
      </div>
    </motion.footer>
  );
}
