import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/Logo/ICON_ININ.png";
import {
  puppyLoveAssets,
  videoByPhase,
  getDialogueForPhase,
  type GamePhase,
} from "@/data/puppyLove";
import { ChalkChoice } from "@/components/puppyLove/ChalkChoice";
import { PuppyLovePlayControls } from "@/components/puppyLove/PuppyLovePlayControls";
import { PuppyLovePauseMenu } from "@/components/puppyLove/PuppyLovePauseMenu";
import { PuppyLoveGameOverMenu } from "@/components/puppyLove/PuppyLoveGameOverMenu";

const DEFAULT_VOLUME = 1;
const CONTROLS_IDLE_MS = 2000;
const CHOICE_FADE_MS = 600;

function freezeVideoFrame(video: HTMLVideoElement) {
  const { duration } = video;
  if (Number.isFinite(duration) && duration > 0) {
    video.currentTime = Math.max(0, duration - 0.001);
  }
  video.pause();
}

export default function PuppyLovePlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [videoSrc, setVideoSrc] = useState(puppyLoveAssets.introVideo);
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueExiting, setDialogueExiting] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [volumePanelOpen, setVolumePanelOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const isGameOver = gamePhase === "game_over";
  const isVideoPlaying = !showDialogue && !isGameOver && !isPaused;
  const dialogue = showDialogue ? getDialogueForPhase(gamePhase) : null;

  const resetIdleTimer = useCallback(() => {
    setControlsVisible(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!isPaused && !volumePanelOpen && !isGameOver) {
        setControlsVisible(false);
      }
    }, CONTROLS_IDLE_MS);
  }, [isPaused, volumePanelOpen, isGameOver]);

  const playCurrentVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isGameOver) return;

    video.volume = volume;
    video.muted = volume === 0;

    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play().catch(() => {});
    }
  }, [volume, isGameOver]);

  const handleVideoEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) freezeVideoFrame(video);

    if (gamePhase === "intro" || gamePhase === "stair_route" || gamePhase === "canteen_route") {
      setShowDialogue(true);
    } else if (gamePhase === "bad_ending") {
      setGamePhase("game_over");
    }
  }, [gamePhase]);

  const transitionToPhase = useCallback((nextPhase: Exclude<GamePhase, "game_over">) => {
    setDialogueExiting(true);
    videoRef.current?.pause();
    setTimeout(() => {
      setShowDialogue(false);
      setDialogueExiting(false);
      setGamePhase(nextPhase);
      setVideoSrc(videoByPhase[nextPhase]);
      setVideoVisible(false);
    }, CHOICE_FADE_MS);
  }, []);

  const handleChoice = useCallback(
    (choiceId: string) => {
      if (gamePhase === "intro") {
        if (choiceId === "gentle") transitionToPhase("stair_route");
        else if (choiceId === "direct") transitionToPhase("bad_ending");
      } else if (gamePhase === "stair_route") {
        if (choiceId === "help") transitionToPhase("canteen_route");
        else if (choiceId === "no_help") transitionToPhase("bad_ending");
      }
    },
    [gamePhase, transitionToPhase],
  );

  const restartGame = useCallback(() => {
    setGamePhase("intro");
    setVideoSrc(puppyLoveAssets.introVideo);
    setShowDialogue(false);
    setDialogueExiting(false);
    setVideoVisible(false);
    setIsPaused(false);
    setVolumePanelOpen(false);
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
  }, []);

  const resumePlayback = useCallback(() => {
    const video = videoRef.current;
    setIsPaused(false);
    if (video && !isGameOver && !showDialogue && !video.ended) {
      void video.play();
    }
    resetIdleTimer();
  }, [showDialogue, isGameOver, resetIdleTimer]);

  const togglePause = useCallback(() => {
    if (isGameOver) return;

    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
      resumePlayback();
    } else {
      video.pause();
      setIsPaused(true);
      setVolumePanelOpen(false);
    }
  }, [isPaused, isGameOver, resumePlayback]);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      /* unsupported */
    }
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setVideoVisible(true);
      void playCurrentVideo();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      onLoaded();
    } else {
      video.addEventListener("loadeddata", onLoaded, { once: true });
      return () => video.removeEventListener("loadeddata", onLoaded);
    }
  }, [videoSrc, isGameOver, playCurrentVideo]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (isPaused || volumePanelOpen || isGameOver) {
      setControlsVisible(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      return;
    }
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isPaused, volumePanelOpen, isGameOver, resetIdleTimer]);

  useEffect(() => {
    if (!volumePanelOpen && !isPaused && !isGameOver) {
      resetIdleTimer();
    }
  }, [volumePanelOpen, isPaused, isGameOver, resetIdleTimer]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPaused && !isGameOver) resumePlayback();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPaused, isGameOver, resumePlayback]);

  const handlePointerActivity = () => resetIdleTimer();

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handlePointerActivity}
      onTouchStart={handlePointerActivity}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoVisible ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          autoPlay
          preload="auto"
          onEnded={handleVideoEnded}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      <AnimatePresence>
        {(isPaused || isGameOver) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`absolute inset-0 z-[25] pointer-events-none ${isGameOver ? "bg-black/55" : "bg-black/45"}`}
          />
        )}
      </AnimatePresence>

      <motion.header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-8 py-5"
        initial={false}
        animate={{
          opacity: controlsVisible || isPaused || isGameOver ? 1 : 0,
          y: controlsVisible || isPaused || isGameOver ? 0 : -12,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: controlsVisible || isPaused || isGameOver ? "auto" : "none" }}
      >
        <Link
          to="/game/puppy-love"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <img src={logo} alt="ININ" className="h-6 w-auto opacity-70 group-hover:opacity-100" />
        </Link>

        {!isGameOver && (
          <PuppyLovePlayControls
            visible={controlsVisible || isPaused || volumePanelOpen}
            isPaused={isPaused}
            volume={volume}
            volumePanelOpen={volumePanelOpen}
            isFullscreen={isFullscreen}
            onTogglePause={togglePause}
            onToggleVolumePanel={() => setVolumePanelOpen((open) => !open)}
            onCloseVolumePanel={() => setVolumePanelOpen(false)}
            onVolumeChange={handleVolumeChange}
            onToggleFullscreen={toggleFullscreen}
          />
        )}
      </motion.header>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-12 pb-10 md:pb-14 pointer-events-none">
        <AnimatePresence mode="wait">
          {dialogue && !dialogueExiting && (
            <motion.div
              key={`${gamePhase}-dialogue`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-300/60 mb-2 drop-shadow-[0_0_12px_rgba(251,207,232,0.25)]">
                  {dialogue.characterName}
                </p>
                <p className="text-base md:text-xl leading-relaxed text-white/90 font-light drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)] [text-shadow:0_0_40px_rgba(255,200,220,0.15)]">
                  {dialogue.subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 md:mt-10 flex flex-col gap-3 max-w-lg"
              >
                {dialogue.choices.map((choice, i) => (
                  <ChalkChoice
                    key={choice.id}
                    label={choice.label}
                    delay={0.35 + i * 0.15}
                    onClick={() => handleChoice(choice.id)}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            key="watching"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2, repeat: Infinity },
              exit: { duration: 0.3 },
            }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPaused && !isGameOver && <PuppyLovePauseMenu onResume={resumePlayback} />}
      </AnimatePresence>

      <AnimatePresence>
        {isGameOver && <PuppyLoveGameOverMenu onRestart={restartGame} />}
      </AnimatePresence>
    </motion.div>
  );
}
