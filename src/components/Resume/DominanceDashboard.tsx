"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "@/components/Animations/CountUp";

const stats = [
  { value: 1316, unit: "DAYS", label: "Longest Reign", sub: "Since 1988", accent: true },
  { value: 10, unit: "TITLES", label: "Total Championships", sub: "Grand Slam Elite", accent: false },
  { value: 11, unit: "EVENTS", label: "WrestleMania Main Events", sub: "All-Time Record", accent: false },
  { value: 2, unit: "WINS", label: "Royal Rumble Victor", sub: "2015 · 2026", accent: false },
  { value: 30, unit: "DEFENSES", label: "Title Defenses", sub: "2020–2024 Reign", accent: false },
  { value: 1380, unit: "DAYS", label: "Combined Universal Title Days", sub: "Most In History", accent: false },
  { value: 2, unit: "YEARS", label: "PWI #1 Ranked", sub: "2016 · 2022", accent: false },
  { value: 4, unit: "YEARS", label: "Consecutive WrestleMania Main Events", sub: "2015–2018", accent: false },
];

const milestones = [
  { label: "Shield Debut", date: "18.11.2012", detail: "Survivor Series Ambush" },
  { label: "Royal Rumble Win", date: "25.01.2015", detail: "First Rumble Victory" },
  { label: "First WWE Title", date: "29.03.2015", detail: "WrestleMania 31 — Rollins Cash-In" },
  { label: "Leukemia Announcement", date: "22.10.2018", detail: "The Real Fight Begins" },
  { label: "Tribal Chief Begins", date: "30.08.2020", detail: "Payback — Universal Title Won" },
  { label: "I Quit — Jey Uso", date: "25.10.2020", detail: "Hell in a Cell — Family or Title" },
  { label: "Bloodline Unification", date: "03.04.2022", detail: "WrestleMania 38 — Beats Lesnar" },
  { label: "1000 Day Milestone", date: "19.11.2023", detail: "Modern Era Peak" },
  { label: "End of an Era", date: "07.04.2024", detail: "WrestleMania 40 — Cody Finishes the Story" },
  { label: "Royal Rumble Return", date: "2026", detail: "Full Circle — Second Rumble Win" },
];

// Data points for the "Eternal Ascent" Area Chart
const ascentData = [
  { x: 0, y: 85, year: "2010", event: "Genesis" },
  { x: 8, y: 70, year: "2012", event: "Shield Debut" },
  { x: 16, y: 55, year: "2013", event: "Tag Champion" },
  { x: 24, y: 50, year: "2014", event: "Breakout" },
  { x: 32, y: 42, year: "2015", event: "Rumble Winner" },
  { x: 40, y: 44, year: "2016-18", event: "Face of WWE" },
  { x: 48, y: 60, year: "2018", event: "Leukemia Battle" },
  { x: 54, y: 52, year: "2019", event: "The Return" },
  { x: 62, y: 25, year: "2020", event: "Tribal Chief Turn" },
  { x: 72, y: 12, year: "2021-22", event: "Bloodline Peak" },
  { x: 82, y: 5, year: "2023", event: "1,000 Days" },
  { x: 90, y: 2, year: "2024", event: "Mountaintop" },
  { x: 100, y: 0, year: "2024", event: "1316 Milestone" },
];

export default function DominanceDashboard() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-48 bg-black border-b border-white/5 overflow-hidden"
      id="dominance"
    >
      {/* ☝️ ARCHIVAL BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-1000">
        <motion.div style={{ y: bgY }} className="absolute inset-0 flex items-center justify-center">
          <span className="text-[35vw] font-black text-white/[0.03] font-heading select-none italic">
            1316
          </span>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* HEADER: MONUMENTS OF DOMINANCE */}
        <div className="mb-24 flex justify-end">
          <div className="text-right border-b border-white/5 pb-8 min-w-[300px]">
            <div>
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] font-subheading">
                MONUMENTS OF DOMINANCE
              </h2>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] font-subheading mt-2">
                The Ledger of the Anoa&apos;i Dynasty
              </p>
            </div>
          </div>
        </div>

        {/* ☝️ DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* LEFT: THE ETERNAL ASCENT (CHART) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="relative bg-white/[0.02] border border-white/5 p-12 rounded-3xl overflow-hidden group/chart hover:border-[--accent]/30 transition-all duration-700">
              <div className="relative z-10 mb-12 flex justify-between items-start font-heading">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic">The Eternal Ascent</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Cumulative Days at the Head of the Table</p>
                </div>
                <div className="text-right">
                  <CountUp to={1316} className="text-4xl font-black text-[--accent]" />
                  <p className="text-[10px] text-[--accent]/60 uppercase tracking-widest font-subheading">Certified Days</p>
                </div>
              </div>

              {/* ☝️ CUSTOM SVG CHART */}
              <div className="relative h-[300px] w-full group/svg">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  {/* Fill Area */}
                  <motion.path
                    d={`M 0 100 ${ascentData.map(p => `L ${p.x} ${p.y}`).join(' ')} L 100 100 Z`}
                    fill="url(#ascentGradient)"
                    className="opacity-10 group-hover/chart:opacity-20 transition-opacity duration-700"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {/* The Line */}
                  <motion.path
                    d={`M 0 100 ${ascentData.map(p => `L ${p.x} ${p.y}`).join(' ')}`}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  
                  {/* Interactive Hit Zones */}
                  {ascentData.map((p, i) => (
                    <g key={i}>
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r="3" 
                        fill="transparent" 
                        onMouseEnter={() => setHoveredPoint(i)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                      />
                      {hoveredPoint === i && (
                        <motion.circle 
                          cx={p.x} 
                          cy={p.y} 
                          r="1" 
                          fill="var(--accent)" 
                          initial={{ r: 0 }} 
                          animate={{ r: 1.5 }}
                          className="pointer-events-none shadow-[0_0_10px_var(--accent)]"
                        />
                      )}
                    </g>
                  ))}

                  <defs>
                    <linearGradient id="ascentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* ☝️ FLOATING TOOLTIP */}
                {hoveredPoint !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    style={{ 
                      left: `${ascentData[hoveredPoint].x}%`, 
                      top: `${ascentData[hoveredPoint].y}%`,
                      transform: 'translate(-50%, -120%)'
                    }}
                    className="absolute z-30 pointer-events-none"
                  >
                    <div className="bg-black/90 backdrop-blur-md border border-[--accent]/30 px-4 py-3 rounded-xl shadow-2xl space-y-1 min-w-[120px]">
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] font-mono text-[--accent]">{ascentData[hoveredPoint].year}</span>
                        <div className="h-2 w-2 rounded-full bg-[--accent] shadow-[0_0_5px_var(--accent)]" />
                      </div>
                      <div className="text-xs font-black text-white uppercase tracking-wider font-heading truncate">
                        {ascentData[hoveredPoint].event}
                      </div>
                      <div className="h-px w-full bg-white/10 mt-1" />
                      <div className="text-[8px] text-white/30 uppercase tracking-widest font-subheading">
                        Ledger Authenticated
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Horizontal Year Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-white/[0.1]" />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                <span>2010.GENESIS</span>
                <span>2024.OTC</span>
              </div>
            </div>

            {/* QUICK STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-[--accent]/5 transition-all duration-700">
                  <div className={`text-4xl md:text-5xl font-black font-heading italic leading-none ${stat.accent ? "text-[--accent]" : "text-white"}`}>
                    <CountUp to={stat.value} duration={2} />{stat.value === 10 || stat.value === 11 ? "×" : ""}
                  </div>
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-2 font-subheading">
                    {stat.unit}
                  </div>

                  <div className="mt-6 mb-4 h-[1px] w-8 bg-white/10 group-hover:w-full group-hover:bg-[--accent]/40 transition-all duration-700" />

                  <p className="text-xs font-black text-white uppercase tracking-wider font-heading leading-tight group-hover:text-[--accent] transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-white/40 font-body italic mt-1 leading-tight">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE CHRONICLED MILESTONES */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex-grow bg-white/[0.02] border border-white/5 p-8 rounded-3xl flex flex-col">
              <div className="mb-12">
                <h3 className="text-xl font-black text-white uppercase italic font-heading">The Ledger</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Verifying Key Benchmarks</p>
                <div className="h-px w-full bg-white/5 mt-6" />
              </div>

              <div className="space-y-4 flex-grow">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="group relative p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] font-mono text-[--accent] opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                      <div className="flex-1">
                        <div className="text-xs font-black text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                          {m.label}
                        </div>
                        <div className="flex justify-between items-end mt-1">
                          <span className="text-[9px] text-white/20 uppercase font-subheading italic">{m.detail}</span>
                          <span className="text-[9px] font-mono text-[--accent] group-hover:text-[--accent-gold] transition-colors">{m.date}</span>
                        </div>
                      </div>
                    </div>
                    {/* Hover indicator side line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-[--accent] group-hover:h-full transition-all duration-500 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" />
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] font-subheading">Ledger Certified</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ☝️ AMBIENT LIGHTING */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[--accent]/5 to-transparent pointer-events-none" />
    </section>
  );
}
