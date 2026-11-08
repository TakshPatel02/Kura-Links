"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.77, 0, 0.175, 1] as const;

type Phase = "checking" | "text" | "open" | "done";

export default function IntroShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const timers = useRef<number[]>([]);
  const soundRef = useRef<HTMLAudioElement>(null);

  const playDoorSound = () => {
    const sound = soundRef.current;
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = 1;
    const playback = sound.play();
    playback.catch(() => undefined);
  };

  useEffect(() => {
    if (phase === "open") {
      playDoorSound();
      return;
    }

    if (phase === "done") {
      const sound = soundRef.current;
      sound?.pause();
      if (sound) sound.currentTime = 0;
    }
  }, [phase]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setPhase("done");
      return;
    }

    setPhase("text");
    const openTimer = window.setTimeout(() => {
      setPhase("open");
    }, 1800);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, 3600);
    timers.current = [openTimer, doneTimer];

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, []);

  const skipIntro = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    soundRef.current?.pause();
    if (soundRef.current) soundRef.current.currentTime = 0;
    setPhase("open");
    const doneTimer = window.setTimeout(() => setPhase("done"), 1800);
    timers.current = [doneTimer];
  };

  const showIntro = phase !== "done";
  const doorsOpen = phase === "open";

  return (
    <>
      <audio
        aria-hidden="true"
        preload="auto"
        ref={soundRef}
        src="/door-opening-sound.m4a"
      />
      <motion.div
        animate={{ scale: showIntro && !doorsOpen ? 1.06 : 1 }}
        className="flex min-h-0 flex-1 flex-col"
        initial={false}
        transition={{ duration: 1.1, ease }}
      >
        {children}
      </motion.div>

      {showIntro && (
        <div
          aria-label="Welcome to Kura"
          className="fixed inset-0 z-100 overflow-hidden bg-transparent"
          onClick={skipIntro}
          role="dialog"
        >
          <motion.div
            animate={{ x: doorsOpen ? "-105%" : "0%" }}
            className="absolute inset-y-0 left-0 w-1/2 bg-no-repeat will-change-transform"
            style={{
              backgroundImage: "url(/door.webp)",
              backgroundPosition: "left",
              backgroundSize: "200% 100%",
            }}
            transition={{ duration: 1.8, ease }}
          >
            <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-black/40 to-transparent" />
          </motion.div>
          <motion.div
            animate={{ x: doorsOpen ? "105%" : "0%" }}
            className="absolute inset-y-0 right-0 w-1/2 bg-no-repeat will-change-transform"
            style={{
              backgroundImage: "url(/door.png)",
              backgroundPosition: "right",
              backgroundSize: "200% 100%",
            }}
            transition={{ duration: 1.8, ease }}
          >
            <div className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-black/40 to-transparent" />
          </motion.div>
          <motion.div
            animate={{ opacity: doorsOpen ? 0 : 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-[#FFF7E8] drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="bg-black/25 px-8 py-6 text-center">
              <span className="text-lg font-medium tracking-[0.35em] text-[#F2B66D] sm:text-xl">
                蔵 · storehouse
              </span>
              <h1 className="mt-4 font-heading text-5xl font-medium sm:text-6xl">
                Welcome to Kura
              </h1>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[#F7D7A8]">
                opening the kura
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
