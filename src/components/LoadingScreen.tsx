"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const WORDS = ["YOU", "WILL", "ACKNOWLEDGE", "ME"];
const MIN_DISPLAY_TIME = 2500; // Minimum time before allowed exit ☝️🚀

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "declare" | "exit" | "done">("loading");
  const [wordIndex, setWordIndex] = useState(-1);
  const [loadComplete, setLoadComplete] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);

  useEffect(() => {
    // Track minimum cinematic buildup time ☝️🚀
    const timer = setTimeout(() => setMinTimeReached(true), MIN_DISPLAY_TIME);

    const handleLoad = () => setLoadComplete(true);
    if (document.readyState === "complete") {
      setLoadComplete(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    // Initial delay for the OTC logo to pulse
    const t1 = setTimeout(() => setPhase("declare"), 300);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "declare") return;
    let i = 0;
    const next = () => {
      setWordIndex(i);
      i++;
      if (i < WORDS.length) {
        setTimeout(next, 350); // Slower, more deliberate buildup ☝️🎬
      }
    };
    setTimeout(next, 200);
  }, [phase]);

  useEffect(() => {
    // Only exit when ALL conditions are met:
    // 1. All words declared
    // 2. Minimum cinematic time elapsed
    // 3. Real page resources loaded ☝️🚀
    if (wordIndex === WORDS.length - 1 && minTimeReached && loadComplete) {
      const wait = setTimeout(() => setPhase("exit"), 600);
      return () => clearTimeout(wait);
    }
  }, [wordIndex, minTimeReached, loadComplete]);

  // Safety net: Always exit after 10 seconds to avoid bricking the UX ☝️🚀
  useEffect(() => {
    const t = setTimeout(() => {
      if (phase !== "done") setPhase("exit");
    }, 10000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => setPhase("done"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-1000 ease-in-out ${phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* ── LEFT/RIGHT PANELS ── */}
      <div className={`absolute inset-y-0 left-0 w-1/2 bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${phase === "exit" ? "-translate-x-full" : "translate-x-0"}`} />
      <div className={`absolute inset-y-0 right-0 w-1/2 bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${phase === "exit" ? "translate-x-full" : "translate-x-0"}`} />

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-1000 ${phase === "exit" ? "opacity-0 scale-[0.9] blur-sm" : "opacity-100 scale-100"}`}>
        
        {/* Tribal Pattern Emblem (OTC logo) */}
        <div className="relative mb-8 w-40 h-40 md:w-56 md:h-56">
          <div 
            className="absolute inset-2 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(230,0,0,0.3) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-[0_0_15px_rgba(230,0,0,0.3)]">
            <Image src="/otc1.webp" alt="One True Chief" fill priority className="object-contain" />
          </div>
        </div>

        {/* ROMAN REIGNS wordmark - Simplified & Dimmed */}
        <div className="text-center mb-16 transition-opacity duration-1000">
          <div className="text-5xl md:text-7xl font-black tracking-tighter leading-none font-bebas opacity-40">
            <span className="text-white">ROMAN</span>
            <span className="text-[#e60000]">REIGNS</span>
          </div>
        </div>

        {/* THE CINEMATIC DECLARATION ☝️🚀🎬 */}
        <div className="flex gap-4 md:gap-8 items-center h-24 font-bebas">
          {WORDS.map((word, i) => (
            <span 
              key={i}
              className={`text-4xl md:text-7xl font-black tracking-[0.2em] transition-all duration-700 ${wordIndex >= i ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-8 blur-md scale-95'} ${word === "ME" ? "text-[#e60000]" : "text-white"}`}
            >
              {word}
            </span>
          ))}
        </div>

        {/* No fake progress bar, just a subtle acknowledgment of the chief ☝️🎬 */}
        <div className={`mt-12 transition-opacity duration-1000 ${wordIndex >= 0 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] tracking-[0.8em] text-white/20 uppercase font-inter text-center whitespace-nowrap">
            HEAD OF THE TABLE · TRIBAL CHIEF
          </p>
        </div>
      </div>
    </div>
  );
}
