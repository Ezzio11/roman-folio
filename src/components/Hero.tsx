"use client";

import Stats from "@/components/Resume/Stats";
import DecryptedText from "@/components/Animations/DecryptedText"
import Magnet from "@/components/Animations/Magnet";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import HeroCanvas from "@/components/Hero/HeroCanvas";
import NoiseBackground from "@/components/Animations/NoiseBackground";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Kinetic Typography Logic ☝️🎬✨
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax Multipliers — different speeds for each word for depth
  const romanX = useTransform(smoothMouseX, (v) => v * -30);
  const romanY = useTransform(smoothMouseY, (v) => v * -30);

  const reignsX = useTransform(smoothMouseX, (v) => v * -50);
  const reignsY = useTransform(smoothMouseY, (v) => v * -50);

  const chiefX = useTransform(smoothMouseX, (v) => v * -15);
  const chiefY = useTransform(smoothMouseY, (v) => v * -15);

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
      className="relative w-full h-[200vh] overflow-visible bg-black perspective-[1500px]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ rotateX, scale, opacity, translateZ, transformStyle: "preserve-3d" }}
          className="relative w-full h-full flex flex-col justify-between"
        >
          {/* 3D Background & Depth Evolution */}
          <div className="absolute inset-0 z-0 text-white">
            <NoiseBackground
              colorA="#000000"
              colorB="#ff0000"
              noiseScale={100}
              amplitude={83}
              skew={50}
              phase={35}
              threshold={50}
              bulgeAmount={53}
              bulgeScale={0.5}
              trackMouse={10}
            />
            <HeroCanvas />

            {/* Branding Cover - Covers potential canvas attributions 
            <div className="absolute bottom-0 left-0 w-full h-20 bg-black z-10" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20" /> */}
          </div>

          {/* Main Branding - Left Aligned & Vertical Approach */}
          <div className="relative z-20 flex-1 flex flex-col justify-center px-8 md:px-16 pointer-events-none">
            <div className="max-w-4xl space-y-6">
              <div className="space-y-0 text-[--accent-gold] drop-shadow-[0_0_30px_rgba(255,204,0,0.2)]">
                <h1 className="text-7xl md:text-[10rem] font-heading tracking-tighter uppercase leading-[0.8]">
                  <div className="overflow-hidden">
                    <motion.div
                      style={{ x: romanX, y: romanY }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    >
                      ROMAN
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      style={{ x: reignsX, y: reignsY }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                    >
                      REIGNS
                    </motion.div>
                  </div>
                </h1>
              </div>

              <motion.div
                style={{ x: chiefX, y: chiefY }}
                className="flex items-center gap-6"
              >
                <div className="h-0.5 w-12 bg-[--accent]" />
                <p className="text-xl md:text-2xl font-subheading uppercase text-white">
                  <DecryptedText text="THE TRIBAL CHIEF" speed={100} delay={1000} />
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Info Bar - Widgets Style */}
          <div className="relative z-30 px-8 md:px-16 pb-12 flex flex-col md:flex-row items-end justify-between gap-12">
            {/* Progress Widget (Bottom Left - Lando Style) */}
            <div className="w-full md:w-64 space-y-4">
              <div className="p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 font-subheading">
                  <span>Next Defense</span>
                  <span className="text-[--accent]">WRESTLEMANIA</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white uppercase font-heading">Island Status</h4>
                  <p className="text-[10px] text-white/50 font-body uppercase leading-tight">
                    Acknowledgment levels reaching critical capacity (+98.2%)
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <Magnet strength={0.4}>
                    <button className="w-full py-3 bg-[--accent] text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-300 rounded-sm">
                      ACKNOWLEDGE ME
                    </button>
                  </Magnet>
                </div>
              </div>
            </div>

            {/* Legend Stats (Bottom Right) */}
            <div className="flex-1 max-w-2xl">
              <Stats triggerOnMount />
            </div>
          </div>

          {/* Aesthetic Accents */}
          <div className="absolute top-10 left-10 z-30 pointer-events-none">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] vertical-rl font-subheading">
              est. 11/18/2012 | ACKNOWLEDGE ME
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}