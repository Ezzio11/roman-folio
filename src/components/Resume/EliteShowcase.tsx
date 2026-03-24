"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnet from "@/components/Animations/Magnet";

const designs = [
  { title: "THE 1316 LEGACY (DARK)", path: "/designs/1316 - Dark.webp" },
  { title: "THE 1316 LEGACY (LIGHT)", path: "/designs/1316 - Light.webp" },
  { title: "I QUIT", path: "/designs/IQUIT.webp" },
  { title: "MODERN TRIBAL CHIEF", path: "/designs/RomanReigns.webp" },
  { title: "WE THE ONES", path: "/designs/WeTheOnes.webp" },
];

export default function EliteShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto py-12 px-4 space-y-24"
    >
      {/* 🚀 Legacy Site Portal */}
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-[--accent] uppercase tracking-[0.5em] font-subheading">
            Live Deployment
          </h3>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic font-heading">
            1316: THE REIGN
          </h2>
        </div>

        {/* ☝️ Visual Hook */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-2xl aspect-video relative rounded-xl overflow-hidden shadow-[0_0_50px_rgba(230,0,0,0.2)] border border-white/10"
        >
          <Image 
            src="/designs/intro.webp" 
            alt="The Reign Intro" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <Magnet strength={0.3}>
          <a
            href="https://1316.ezzio.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-[--accent-gold] transition-all duration-500 rounded-sm overflow-hidden"
          >
            <span className="relative z-10">Enter the Legacy</span>
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1 bg-[--accent]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
            />
          </a>
        </Magnet>
      </div>

      {/* 🎨 Poster Gallery */}
      <div className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-white/10" />
          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.8em] font-subheading">
            Elite Art Gallery
          </h3>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/4] bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={design.path}
                alt={design.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] font-bold text-[--accent] uppercase tracking-[0.4em] mb-2">
                  Elite Production
                </span>
                <h4 className="text-xl font-black text-white uppercase font-heading leading-none">
                  {design.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
