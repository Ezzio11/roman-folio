"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MagneticCard from "@/components/Animations/MagneticCard";

const experiences = [
  {
    title: "TRIBAL CHIEF",
    company: "The Bloodline Inc.",
    period: "2020 – PRESENT",
    description: "Architected the most dominant championship reign of the modern era, consolidating power through strategic family alliances and high-stakes performance management.",
    highlights: ["1,316 Day Reign", "Chief Executive Prowess", "Market Integration"],
    glow: "rgba(230, 0, 0, 0.2)"
  },
  {
    title: "THE BIG DOG",
    company: "WWE Global",
    period: "2015 – 2020",
    description: "Spearheaded the frontline offensive for the world's premier sports entertainment conglomerate. Consistent headline performer with unmatched resilience.",
    highlights: ["Multi-time World Champion", "Royal Rumble Winner", "Main Event Staple"],
    glow: "rgba(255, 255, 255, 0.05)"
  },
  {
    title: "SHIELD OPERATIVE",
    company: "The Shield LLC",
    period: "2012 – 2014",
    description: "Specialized in tactical group operations and surgical intervention. Established a multi-industry reputation for efficiency and disruption.",
    highlights: ["Tactical Expert", "Grand Slam Contender", "Hound of Justice"],
    glow: "rgba(0, 100, 255, 0.1)"
  }
];

export default function Experience() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto border-b border-[--border-color] relative z-10">
      {/* Zigzag Asset: Roman on the Left 🩸 */}
      <div className="absolute top-0 -left-20 w-[500px] h-full opacity-95 pointer-events-none z-0">
        {/* Base Roman image — static, dimmed */}
        <Image
          src="/images/roman_full_body.webp"
          alt="Roman Reigns"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-left scale-110 brightness-50"
          priority
        />

        {/* Isolated pulsing sacred glow — Composited via opacity/scale 🍷🔥✨ */}
        <div className="absolute inset-0 w-full h-full scale-110 flex items-center justify-center pointer-events-none">
          {/* Animated Glow Halo */}
          <motion.div
            className="absolute w-[300px] h-[300px] bg-[--accent] rounded-full blur-[100px]"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="relative w-full h-full"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/ulafala.webp"
              alt="Sacred Ulafala"
              fill
              sizes="(max-width: 1024px) 30vw, 20vw"
              className="object-contain object-left brightness-125"
            />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl ml-auto lg:mr-32">
        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] mb-16 font-subheading text-right">
          CHRONICLES OF DOMINANCE
        </h2>
        <div className="space-y-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MagneticCard glowColor={exp.glow}> {/* Added glowColor prop back */}
                <div className="p-8 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-[--accent-gold] font-heading uppercase tracking-tight drop-shadow-sm">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-bold text-white font-subheading uppercase tracking-widest mt-1 opacity-80">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-black text-[--accent] font-data bg-[--accent]/10 px-3 py-1 rounded-full border border-[--accent]/20">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-white/60 font-medium leading-relaxed font-body">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.highlights.map((h, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-white/40 px-2.5 py-1 border border-white/5 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
