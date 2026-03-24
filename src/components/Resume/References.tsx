"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import LightRays from "@/components/Animations/LightRays";

const references = [
  {
    name: "John Cena",
    title: "17x Champion, Retired Legend",
    quote: "I don't think there is a better breathing example of the best the business has ever been than Roman Reigns. Roman as the Tribal Chief is the greatest of all time.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "The Undertaker",
    title: "The Deadman, Torch Passer",
    quote: "Roman Reigns never asked me for my help, that's not who he is. He's a really good dude, he deserved it and I just wanted to be able to give the best to him that I could.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Triple H",
    title: "Chief Content Officer, WWE",
    quote: "He transcends the world title, he transcends the Royal Rumble. He is just a legend unto himself. He changed the industry, both in front of and behind the camera.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Sami Zayn",
    title: "Honorary Uce (Former)",
    quote: "It's with the person that the audience has the highest investment in, in the whole company, in the whole industry in the last decade.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Cody Rhodes",
    title: "The American Nightmare",
    quote: "Every now and then, you find somebody that you stand across from in the ring that there's a spark, there's a magic. He brings something out of me.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Paul Heyman",
    title: "The Wiseman",
    quote: "People pay to see Roman Reigns. They pay to react to Roman Reigns. The most confident performer. The one guy that can handle Brock Lesnar.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    name: "Randy Orton",
    title: "The Viper, Legend Killer",
    quote: "The older I get and the harder it is to maintain a six pack, the more I wish I wore a tactical vest and cargo pants like Roman Reigns.",
    rating: "⭐⭐⭐⭐⭐"
  }
];

export default function References() {
  return (
    <section className="relative py-48 px-8 bg-black border-b border-white/5" id="references">

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER: VOICES OF ACKNOWLEDGMENT */}
        <div className="mb-24 flex justify-end">
          <div className="text-right border-b border-white/5 pb-8 min-w-[300px]">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] font-subheading">
              VOICES OF ACKNOWLEDGMENT
            </h2>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] font-subheading mt-2">
              The Peer-Reviewed Legacy of the Head of the Table
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-stretch">

          {/* ☝️📢 REFERENCE CARDS — Left Staging (Scrollable) */}
          <div className="space-y-32 py-24">
            {references.map((ref, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "0px" }}
                className="group relative"
              >
                <div className="absolute -left-12 top-4 text-[10px] font-mono text-white/5 rotate-90 tracking-widest hidden md:block">
                  REF.0{index + 1}
                </div>

                <div className="space-y-6 border-l-2 border-white/5 pl-12 group-hover:border-[--accent] transition-colors duration-500">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-white font-heading uppercase tracking-tight group-hover:text-[--accent] transition-colors">
                        {ref.name}
                      </h3>
                      <p className="text-[10px] font-black text-[--accent-gold] uppercase tracking-[0.2em] font-data">
                        {ref.title}
                      </p>
                    </div>
                    <span className="text-[8px] text-white/20 font-mono italic">{ref.rating}</span>
                  </div>

                  <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed font-body max-w-xl">
                    &ldquo;{ref.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ☝️🏙️ THE PERSISTENT MONOLITH — Right Staging (Sticky) */}
          <div className="relative h-full"> {/* Parent must not have overflow-hidden for sticky to work */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none">
              <div className="relative w-full h-full max-w-none [mask-image:radial-gradient(ellipse_at_top,_black_40%,_transparent_100%)]">

                {/* ☝️🎇 LIGHT RAYS — The Heavenly Spotlight (Amplified) */}
                <div className="absolute inset-0 z-10 overflow-hidden mix-blend-screen opacity-100 [mask-image:radial-gradient(ellipse_at_top,_black_20%,_transparent_70%)]">
                  <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    lightSpread={2.5}
                    rayLength={2.0}
                    raysSpeed={0.5}
                    className="w-full h-full"
                  />
                </div>

                {/* Secondary Luminous Flare — Tightened and Masked */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2)_0%,_transparent_50%)] z-10 pointer-events-none" />

                <Image
                  src="/onestothesky.webp"
                  alt="The Tribal Chief"
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="relative z-0 object-contain brightness-[0.95] contrast-[1.1] scale-[1.8] pointer-events-none"
                  style={{
                    filter: "drop-shadow(0 0 40px rgba(0,0,0,0.8))",
                    objectPosition: "center center"
                  }}
                />

                {/* ☝️🏷️ TAGLINE — Minimal archival label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full text-center pointer-events-none"
                >
                </motion.div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ☝️💡 AMBIENT LIGHTING */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[--accent]/5 to-transparent pointer-events-none" />
    </section>
  );
}
