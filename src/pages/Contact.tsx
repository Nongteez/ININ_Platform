// ─── Contact / About / Team / Vision — Cinematic Page ────────────

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap, Sparkles, GitBranch, Palette, BarChart3,
  ArrowRight, ExternalLink, ArrowUpRight, Play,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import logo from "@/assets/Logo/ICON_ININ.png";

// ─── Assets ──────────────────────────────────────────────────────

import person1 from "@/assets/Image/Contact/Person1.jpg";
import person2 from "@/assets/Image/Contact/Person2.jpg";
import person3 from "@/assets/Image/Contact/Person3.jpg";
import person4 from "@/assets/Image/Contact/Person4.jpg";
import logoDiscord from "@/assets/Image/Contact/Logo_Discord.png";
import logoFacebook from "@/assets/Image/Contact/Logo_Facebook.png";
import logoInstagram from "@/assets/Image/Contact/Logo_Instragram.png";
import logoTiktok from "@/assets/Image/Contact/Logo_Tiktok.png";
import logoYoutube from "@/assets/Image/Contact/Logo_Youtube.png";

// ─── Animation Variants ─────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── SECTION 1 — Hero Intro ─────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute top-[15%] left-[5%] w-[700px] h-[700px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7B5CFF, transparent 70%)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C961FF, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 w-full px-4 md:px-12 lg:px-16 pt-24 pb-6 md:pt-28 md:pb-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2.5 mb-7">
              <img src={logo} alt="ININ" className="h-4 w-auto opacity-70" />
              <div className="h-4 w-px bg-white/15" />
              <span className="text-[#AAB0C5] text-xs font-semibold tracking-widest uppercase">Platform</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.08}
              className="text-[2rem] sm:text-4xl md:text-[2.8rem] font-black text-white leading-[1.1] tracking-[-0.025em]"
            >
              Building The Future Of{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C961FF] to-[#3B82F6] bg-clip-text text-transparent">
                Interactive Storytelling
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mt-4 text-[14px] md:text-[15px] text-[#AAB0C5] max-w-[480px] leading-[1.65]"
            >
              ININ is a next-generation interactive FMV platform where audiences shape cinematic stories
              through real-time choices.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.24} className="mt-6 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer btn-play"
              >
                <Zap className="h-4 w-4" />
                Explore Platform
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById("community-section")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white cursor-pointer btn-info"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Join Community
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Floating visual composition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Large glow ring */}
            <div className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-white/[0.04] opacity-60" />
            <div className="absolute w-[210px] h-[210px] md:w-[260px] md:h-[260px] rounded-full border border-purple-500/[0.08]" />

            {/* Central logo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center glass-card shadow-[0_0_60px_rgba(123,92,255,0.12)]">
                <img src={logo} alt="ININ" className="h-12 md:h-14 w-auto" />
              </div>
            </motion.div>

            {/* Floating glass cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-4 right-4 md:top-2 md:right-8 px-4 py-3 rounded-xl glass-card shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-purple-500/15 flex items-center justify-center">
                  <GitBranch className="h-3 w-3 text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/80">Story Branches</p>
                  <p className="text-[9px] text-white/30">24 paths active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-0 md:bottom-4 md:left-4 px-4 py-3 rounded-xl glass-card shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <BarChart3 className="h-3 w-3 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/80">Engagement</p>
                  <p className="text-[9px] text-white/30">94% completion</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-4 right-0 md:bottom-0 md:right-12 px-3 py-2 rounded-lg glass-card shadow-lg"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[#C961FF]" />
                <span className="text-[9px] font-semibold text-white/60">Interactive FMV</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2 — What Is ININ ───────────────────────────────────

const whatIsCards = [
  {
    icon: Play,
    title: "Interactive Stories",
    desc: "Experience cinematic narratives driven by audience choices.",
    color: "#8B5CF6",
  },
  {
    icon: Palette,
    title: "Creator Studio",
    desc: "Build branching FMV experiences visually without coding.",
    color: "#3B82F6",
  },
  {
    icon: BarChart3,
    title: "Emotional Analytics",
    desc: "Track viewer decisions, replay behavior, and engagement.",
    color: "#C961FF",
  },
];

function WhatIsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="px-4 md:px-12 lg:px-16 py-8 md:py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest mb-3">
            About
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            What Is ININ?
          </motion.h2>
        </div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-5">
          {whatIsCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 40px ${card.color}08, inset 0 0 0 1px ${card.color}12` }}
                />
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500"
                  style={{ background: `${card.color}10` }}
                >
                  <Icon className="h-5 w-5 transition-colors duration-500" style={{ color: `${card.color}CC` }} />
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2.5 tracking-tight">{card.title}</h3>
                <p className="text-[13px] text-[#AAB0C5]/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 3 — Team ───────────────────────────────────────────

const teamMembers = [
  {
    img: person1,
    name: "Alex Montclair",
    role: "Chief Executive Officer",
    tagline: "Building the future of interactive storytelling.",
    link: "https://linkedin.com/",
  },
  {
    img: person2,
    name: "Sophia Ramirez",
    role: "Chief Design Officer",
    tagline: "Crafting cinematic creator experiences.",
    link: "https://instagram.com/",
  },
  {
    img: person3,
    name: "Daniel Kim",
    role: "Chief Technology Officer",
    tagline: "Developing scalable interactive platform systems.",
    link: "https://github.com/",
  },
  {
    img: person4,
    name: "Mia Takahashi",
    role: "Chief Data Officer",
    tagline: "Transforming audience behavior into insight.",
    link: "https://discord.com/",
  },
];

function TeamSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative px-4 md:px-12 lg:px-16 py-8 md:py-14 overflow-hidden"
    >
      {/* Ambient glow behind team section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest mb-3">
            Team
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            Meet The Team
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.1} className="mt-3 text-sm text-[#AAB0C5]/60 max-w-md mx-auto">
            The people behind the platform shaping the future of interactive entertainment.
          </motion.p>
        </div>

        <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={cardUp}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group relative flex gap-4 p-4 rounded-2xl transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: "0 0 40px rgba(139,92,246,0.08), 0 8px 32px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  borderRadius: "1rem",
                }}
              />

              {/* Portrait Image */}
              <div className="relative shrink-0 w-[100px] h-[120px] md:w-[110px] md:h-[132px] rounded-xl overflow-hidden ring-1 ring-white/[0.06] group-hover:ring-purple-500/20 transition-all duration-500">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                {/* Subtle bottom gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center min-w-0 py-1">
                <p className="text-[15px] md:text-base font-bold text-white tracking-tight leading-tight">{member.name}</p>
                <p className="text-[11px] font-semibold text-[#8B5CF6] mt-1 tracking-wide uppercase">{member.role}</p>
                <p className="text-[12px] text-[#AAB0C5]/50 mt-2.5 leading-relaxed">{member.tagline}</p>

                {/* Glass Connect Button */}
                <motion.a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-semibold text-white/40 w-fit transition-all duration-300 hover:text-white/90 hover:border-purple-500/25 hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ArrowUpRight className="h-2.5 w-2.5" />
                  Connect
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 4 — Vision ─────────────────────────────────────────

function VisionSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative px-4 md:px-12 lg:px-16 py-8 md:py-14 overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest mb-4">
          Vision
        </motion.p>
        <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
          Our Vision
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={0.12}
          className="mt-4 text-base md:text-lg text-white/70 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          Transforming passive viewers into active participants through cinematic interactive storytelling.
        </motion.p>
        <motion.p
          variants={fadeUp}
          custom={0.18}
          className="mt-2 text-[13px] text-[#AAB0C5]/60 leading-relaxed max-w-lg mx-auto"
        >
          We believe the future of entertainment is interactive, emotional, and creator-driven.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          variants={fadeUp}
          custom={0.24}
          className="mt-6 mx-auto w-16 h-0.5 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)" }}
        />
      </div>
    </motion.section>
  );
}

// ─── SECTION 5 — Community & Socials ────────────────────────────

const socials = [
  { name: "TikTok", icon: logoTiktok, href: "https://tiktok.com" },
  { name: "YouTube", icon: logoYoutube, href: "https://youtube.com" },
  { name: "Discord", icon: logoDiscord, href: "https://discord.com" },
  { name: "Instagram", icon: logoInstagram, href: "https://instagram.com" },
  { name: "Facebook", icon: logoFacebook, href: "https://facebook.com" },
];

function CommunitySection() {
  return (
    <motion.section
      id="community-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="px-4 md:px-12 lg:px-16 py-8 md:py-12 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest mb-3">
          Community
        </motion.p>
        <motion.h2 variants={fadeUp} custom={0.05} className="text-2xl md:text-4xl font-bold text-white tracking-tight">
          Join The ININ Community
        </motion.h2>
        <motion.p variants={fadeUp} custom={0.1} className="text-sm text-[#AAB0C5] mt-3 max-w-md mx-auto">
          Follow the evolution of interactive storytelling
        </motion.p>

        <motion.div variants={stagger} className="mt-8 flex items-center justify-center gap-5 md:gap-7 flex-wrap">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardUp}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.06] group-hover:border-purple-500/25 group-hover:bg-white/[0.06] transition-all duration-400 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
                <img src={social.icon} alt={social.name} className="w-7 h-7 md:w-8 md:h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-[10px] font-semibold text-white/30 group-hover:text-white/60 transition-colors">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── SECTION 6 — Final CTA ──────────────────────────────────────

function FinalCTASection() {
  const navigate = useNavigate();
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative px-4 md:px-12 lg:px-16 py-10 md:py-14 overflow-hidden"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse at center, #8B5CF6, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#C961FF]" />
          <span className="text-[11px] font-semibold text-white/60">Start Your Journey</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          custom={0.06}
          className="text-2xl md:text-4xl font-black text-white tracking-tight leading-[1.08]"
        >
          Ready To Create{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C961FF] to-[#3B82F6] bg-clip-text text-transparent">
            Interactive Stories?
          </span>
        </motion.h2>

        <motion.div variants={fadeUp} custom={0.14} className="mt-7 flex flex-wrap justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/studio")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white cursor-pointer btn-play"
          >
            <Zap className="h-4 w-4" />
            Open ININ Studio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white cursor-pointer btn-info"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            Explore Interactive Stories
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <WhatIsSection />
      <TeamSection />
      <VisionSection />
      <CommunitySection />
      <FinalCTASection />
      <Footer />
      <ScrollToTop />
      <MobileNav />
    </div>
  );
}
