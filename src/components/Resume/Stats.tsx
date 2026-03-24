"use client";

import CountUp from "@/components/Animations/CountUp";
import ScrollReveal from "@/components/Animations/ScrollReveal";

export default function Stats({ triggerOnMount = false }: { triggerOnMount?: boolean }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-8 grid grid-cols-3 gap-4 text-center items-center">
      <ScrollReveal triggerOnMount={triggerOnMount}>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline text-[--accent-gold] font-data">
            <CountUp
              to={1316}
              separator=","
              duration={2.5}
              className="text-[32px] md:text-[40px] font-black"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 font-subheading">Days Unbeaten</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} triggerOnMount={triggerOnMount}>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline text-[--accent] font-data">
            <CountUp
              to={10}
              duration={2}
              className="text-[32px] md:text-[40px] font-black"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 font-subheading">Championships</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2} triggerOnMount={triggerOnMount}>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline text-white font-data">
            <CountUp
              to={11}
              duration={3}
              className="text-[32px] md:text-[40px] font-black"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 font-subheading">WM Main Events</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
