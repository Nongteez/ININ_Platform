import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/Logo/ICON_ININ.png";
import { puppyLoveAssets, puppyLoveMeta } from "@/data/puppyLove";
import { PuppyLoveAtmosphere } from "@/components/puppyLove/PuppyLoveAtmosphere";
import { PuppyLoveBackground } from "@/components/puppyLove/PuppyLoveBackground";
import { PuppyLoveCinematicControls } from "@/components/puppyLove/PuppyLoveCinematicControls";
import { GameTitleMenu, type MenuAction } from "@/components/puppyLove/GameTitleMenu";
import {
  LoadGameModal,
  GalleryModal,
  SettingsModal,
} from "@/components/puppyLove/PuppyLoveModals";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function PuppyLove() {
  const navigate = useNavigate();
  const [loadOpen, setLoadOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMenu = (action: MenuAction) => {
    switch (action) {
      case "new":
        navigate("/game/puppy-love/play");
        break;
      case "load":
        setLoadOpen(true);
        break;
      case "gallery":
        setGalleryOpen(true);
        break;
      case "settings":
        setSettingsOpen(true);
        break;
      case "exit":
        navigate("/");
        break;
    }
  };

  return (
    <motion.div
      className="puppy-love-page relative min-h-screen w-full overflow-hidden bg-[#0a0612] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <PuppyLoveBackground src={puppyLoveAssets.background} />

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0612]/95 via-[#0a0612]/40 to-[#0a0612]/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0612]/90 via-transparent to-[#0a0612]/50" />

      <PuppyLoveAtmosphere />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="absolute top-0 left-0 z-20 px-6 md:px-8 pt-5 md:pt-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="ININ"
              className="h-6 w-auto opacity-75 group-hover:opacity-100 transition-opacity"
            />
            <p className="text-[9px] font-medium tracking-[0.15em] text-white/35 uppercase hidden sm:block">
              Interactive FMV
            </p>
          </Link>
        </header>

        <main className="flex flex-1 items-stretch min-h-screen overflow-visible">
          <div className="vn-title-column flex flex-col justify-center py-24 md:py-16 shrink-0 overflow-visible">
            <div className="vn-sidebar-stack">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                }}
                className="vn-title-block"
              >
                <motion.p
                  variants={itemVariants}
                  className="vn-title-eyebrow"
                >
                  Original Interactive Romance
                </motion.p>
                <motion.h1 variants={itemVariants} className="vn-title-heading vn-title-glow">
                  <span className="bg-gradient-to-br from-white via-pink-50 to-pink-300/70 bg-clip-text text-transparent">
                    {puppyLoveMeta.title}
                  </span>
                </motion.h1>
                <motion.p variants={itemVariants} className="vn-title-subtitle">
                  {puppyLoveMeta.subtitle}
                </motion.p>
                <motion.p variants={itemVariants} className="vn-title-desc">
                  {puppyLoveMeta.description}
                </motion.p>
              </motion.div>

              <GameTitleMenu onSelect={handleMenu} />
            </div>
          </div>

          <div className="flex-1 hidden md:block" aria-hidden />
        </main>

        <footer className="vn-title-footer absolute bottom-0 left-0 right-0 z-20 pb-5 md:pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="vn-tags-row"
          >
            {puppyLoveMeta.tags.map((tag) => (
              <span key={tag} className="vn-tag-pill">
                {tag}
              </span>
            ))}
          </motion.div>
        </footer>
      </div>

      <PuppyLoveCinematicControls />

      <LoadGameModal open={loadOpen} onClose={() => setLoadOpen(false)} />
      <GalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </motion.div>
  );
}
