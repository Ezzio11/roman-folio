"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";

/* ─────────────────────────────────────────────
   The "Acknowledgment" Loading Screen
   5-phase cinematic sequence:
   1. Blackout + tribal glyph fades in
   2. Light rays bloom from glyph
   3. Text: "YOU WILL ACKNOWLEDGE" slashes in
   4. Crimson blade sweeps across bottom
   5. Split-door exit → site revealed
───────────────────────────────────────────── */

const WORDS = ["YOU", "WILL", "ACKNOWLEDGE", "ME"];
const MIN_DISPLAY = 3200; // ms minimum before we can exit

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "declare" | "exit" | "done">("loading");
  const [wordIndex, setWordIndex] = useState(-1);
  const [loadComplete, setLoadComplete] = useState(false);
  const startTime = useRef(Date.now());
  const progress = useMotionValue(0);
  const bladeWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Drive progress bar animation
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: MIN_DISPLAY / 1000,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [progress]);

  // Listen for actual page load
  useEffect(() => {
    const handleLoad = () => setLoadComplete(true);
    if (document.readyState === "complete") {
      setLoadComplete(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Phase: loading → declare (after glyph)
  useEffect(() => {
    const t = setTimeout(() => setPhase("declare"), 800);
    return () => clearTimeout(t);
  }, []);

  // Phase: stagger the words in
  useEffect(() => {
    if (phase !== "declare") return;
    let i = 0;
    const next = () => {
      setWordIndex(i);
      i++;
      if (i < WORDS.length) {
        setTimeout(next, 320);
      }
    };
    setTimeout(next, 300);
  }, [phase]);

  // Phase: trigger exit once words done + min time elapsed + page loaded
  useEffect(() => {
    if (wordIndex < WORDS.length - 1) return;
    const check = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = MIN_DISPLAY - elapsed;
      if (loadComplete || elapsed > MIN_DISPLAY + 500) {
        setTimeout(() => setPhase("exit"), Math.max(0, remaining));
      } else {
        setTimeout(check, 100);
      }
    };
    setTimeout(check, 300);
  }, [wordIndex, loadComplete]);

  // Phase: exit → done (unmount after animation)
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setPhase("done"), 1000);
    return () => clearTimeout(t);
  }, [phase]);

  const isVisible = phase !== "done";

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" aria-hidden>
          {/* ── LEFT PANEL ── */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-black origin-left"
            animate={phase === "exit" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* ── RIGHT PANEL ── */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-black origin-right"
            animate={phase === "exit" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* ── CONTENT (stays centered, fades as panels exit) ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            animate={phase === "exit" ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Tribal Pattern Emblem */}
            <motion.div
              className="relative mb-12 select-none w-48 h-48 md:w-64 md:h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Pulsing Glow behind the pattern */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(230,0,0,0.4) 0%, transparent 70%)",
                  filter: "blur(32px)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* The OTC logo — centered, no rotation */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-[0_0_30px_rgba(230,0,0,0.3)]"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div 
                  className="w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: "url('/otc1.webp')",
                    filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))"
                  }}
                />
              </motion.div>
              
              {/* Outer decorative ring */}
              <motion.div
                className="absolute -inset-4 border border-[--accent]/20 rounded-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </motion.div>

            {/* ROMAN REIGNS wordmark */}
            <motion.div
              className="text-center mb-12 select-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
                style={{ fontFamily: "var(--font-bebas), var(--font-anton), sans-serif" }}
              >
                <span className="text-white">ROMAN</span>
                <span className="text-[#e60000]">REIGNS</span>
              </div>
              <div
                className="text-sm tracking-[0.6em] text-white/40 uppercase mt-2"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Tribal Chief · Head of the Table
              </div>
            </motion.div>

            {/* THE DECLARATION */}
            <div
              className="flex gap-4 md:gap-6 items-center mb-14 h-20 select-none"
              style={{ fontFamily: "var(--font-bebas), var(--font-anton), sans-serif" }}
            >
              {WORDS.map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    className={`block text-3xl md:text-5xl font-black tracking-[0.15em] leading-none ${
                      word === "ME" ? "text-[#e60000] drop-shadow-[0_0_15px_rgba(230,0,0,0.5)]" : "text-white/95"
                    }`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={wordIndex >= i ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* PROGRESS BLADE */}
            <div className="w-72 md:w-[400px] h-[3px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#e60000]"
                style={{ width: bladeWidth }}
              />
              {/* Trailing glow */}
              <motion.div
                className="absolute inset-y-0 h-full w-12 bg-gradient-to-r from-transparent to-[#e60000]/80 blur-md"
                style={{ left: bladeWidth }}
              />
            </div>

            {/* Fine text under blade */}
            <motion.p
              className="mt-6 text-[12px] tracking-[0.5em] text-white/30 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Entering the Island of Relevancy
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
