"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Position = "TOP" | "BOTTOM";

export default function AcknowledgeNavigator() {
  const [activePos, setActivePos] = useState<Position>("TOP");

  useEffect(() => {
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 100) return; // Throttle to 10fps for position checks
      lastScrollTime = now;

      const scrollPos = window.scrollY;
      const threshold = 300; // Pixels from top/bottom to activate
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollPos < threshold) {
        setActivePos("TOP");
      } else if (scrollPos > maxScroll - threshold) {
        setActivePos("BOTTOM");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (pos: Position) => {
    if (pos === "TOP") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <div className="fixed top-8 right-8 z-[110] flex flex-col items-end gap-3 translate-y-[20%] will-change-transform">
      <div className="flex bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-2xl overflow-hidden">
        {["TOP", "BOTTOM"].map((text) => {
          const p = text as Position;
          return (
            <button
              key={p}
              onClick={() => scrollTo(p)}
              className="relative px-6 py-2 transition-colors duration-300 group inline-block"
            >
              {activePos === p && (
                <motion.div
                  layoutId="active-pos"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span 
                className={`relative z-10 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                  activePos === p ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {p}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center gap-2 px-3">
        <div className="h-px w-8 bg-white/10" />
        <AnimatePresence mode="wait">
          <motion.p
            key={activePos}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] font-subheading"
          >
            {activePos === "TOP" ? "Head of the Table" : "The Island"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
