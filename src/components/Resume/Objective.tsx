"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const headlineLines = [
  { text: "SEEKING", size: "text-7xl md:text-9xl", accent: false, delay: 0 },
  { text: "ABSOLUTE", size: "text-8xl md:text-[11rem]", accent: true, delay: 0.1 },
  { text: "DOMINANCE", size: "text-9xl md:text-[13rem]", accent: true, delay: 0.2 },
  { text: "OVER THE", size: "text-5xl md:text-7xl", accent: false, delay: 0.3 },
  { text: "CORPORATE", size: "text-7xl md:text-9xl", accent: false, delay: 0.4 },
  { text: "STRUCTURE.", size: "text-6xl md:text-8xl", accent: false, delay: 0.5 },
];

const sideStats = [
  { value: "11×", label: "WrestleMania\nMain Events" },
  { value: "1316", label: "Day Universal\nReign" },
  { value: "6×", label: "World\nChampion" },
];

export default function Objective() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-48 px-8 bg-black border-b border-white/5 scroll-mt-24" id="objective">

      {/* ☝️📊 THE FAR LEFT DATA STREAM — Tactical positioning (No boxes) */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 flex-col gap-10 z-30">
        {sideStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
            className="space-y-1"
          >
            <div className="text-3xl font-heading font-black text-white/90" style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}>{stat.value}</div>
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] whitespace-pre-line leading-relaxed border-l border-[--accent]/20 pl-3">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Scroll-triggered headline — Wide Freedom */}
        <div className="lg:w-[90%] relative z-10">
          <div ref={headlineRef} className="relative z-10">
            {headlineLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-heading tracking-tighter uppercase leading-[0.82] ${line.size} ${line.accent ? "text-[--accent]" : "text-white"}`}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Heyman testimony card — Positioned for visual flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="relative z-30 max-w-xl mt-16"
          >
            <div className="text-[80px] leading-none font-heading text-[--accent] opacity-10 select-none absolute -top-4 -left-4">&ldquo;</div>
            <div className="border border-white/10 bg-black/60 backdrop-blur-md rounded-xl p-8 pl-10 space-y-6 shadow-2xl">
              <p className="text-xl md:text-2xl text-white/70 font-medium leading-snug font-body italic">
                We aren&apos;t here to participate. We are here to take over. Ensure all shareholders acknowledge the strategic relevance of the Island.
              </p>
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-8">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-white uppercase tracking-widest font-heading">Paul Heyman</p>
                  <p className="text-[10px] font-bold text-[--accent-gold] uppercase tracking-[0.2em] font-data">Executive Counsel · The Wiseman</p>
                </div>
                <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-subheading">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-pulse" />
                    <p className="text-[10px] font-bold text-[--accent] uppercase tracking-[0.2em] font-data">Authenticated / Active</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ☝️🏙️ THE GUARDIAN PORTRAIT — Overlapping Depth Evolution (Foreground) */}
      <div className="absolute right-0 bottom-0 w-full lg:w-[50%] h-full z-20 pointer-events-none select-none overflow-visible">
        <motion.div
          className="relative w-full h-full"
          initial={{ x: 150, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/images/RomanReigns-medium.webp"
            alt="Roman Reigns Professional Portrait"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-right brightness-[0.8] contrast-[1.1] grayscale"
            priority
          />
          {/* Subtle light leak/glow on the edge */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[--accent]/5 to-transparent" />
        </motion.div>
      </div>

    </section>
  );
}
