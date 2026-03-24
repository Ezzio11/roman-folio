"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecryptedText from "@/components/Animations/DecryptedText";
import Image from "next/image";
import { FaInstagram, FaTwitter, FaTiktok, FaFacebook } from "react-icons/fa";

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- TRANSFORMS (UNBOXED LTR) ☝️🎬🧨 ---
  // The Spear cuts from the VERY edge of the screen
  const spearX = useTransform(scrollYProgress, [0.05, 0.95], ["-120vw", "120vw"]);

  // 1. Text Shattering - Title ("ROMAN REIGNS")
  const romanX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "150%"]);
  const romanY = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "-150%"]);
  const romanRotate = useTransform(scrollYProgress, [0.4, 0.6], [0, 45]);
  const romanOpacity = useTransform(scrollYProgress, [0.4, 0.52], [1, 0]);

  const reignsX = useTransform(scrollYProgress, [0.42, 0.62], ["0%", "-100%"]);
  const reignsY = useTransform(scrollYProgress, [0.42, 0.62], ["0%", "50%"]);
  const reignsRotate = useTransform(scrollYProgress, [0.42, 0.62], [0, -90]);
  const reignsOpacity = useTransform(scrollYProgress, [0.42, 0.58], [1, 0]);

  // 2. Beyond Name - Shattering everything else 🧨
  const metaY = useTransform(scrollYProgress, [0.38, 0.58], ["0%", "-200%"]);
  const metaRotate = useTransform(scrollYProgress, [0.38, 0.58], [0, -30]);
  const metaOpacity = useTransform(scrollYProgress, [0.38, 0.52], [1, 0]);

  const descX = useTransform(scrollYProgress, [0.44, 0.64], ["0%", "-200%"]);
  const descY = useTransform(scrollYProgress, [0.44, 0.64], ["0%", "100%"]);
  const descRotate = useTransform(scrollYProgress, [0.44, 0.64], [0, -15]);
  const descOpacity = useTransform(scrollYProgress, [0.44, 0.56], [1, 0]);

  const bioX = useTransform(scrollYProgress, [0.46, 0.66], ["0%", "200%"]);
  const bioY = useTransform(scrollYProgress, [0.46, 0.66], ["0%", "-50%"]);
  const bioRotate = useTransform(scrollYProgress, [0.46, 0.66], [0, 60]);
  const bioOpacity = useTransform(scrollYProgress, [0.46, 0.54], [1, 0]);

  const emailX = useTransform(scrollYProgress, [0.48, 0.68], ["0%", "150%"]);
  const emailY = useTransform(scrollYProgress, [0.48, 0.68], ["0%", "200%"]);
  const emailRotate = useTransform(scrollYProgress, [0.48, 0.68], [0, 120]);
  const emailOpacity = useTransform(scrollYProgress, [0.48, 0.52], [1, 0]);

  const socialX = useTransform(scrollYProgress, [0.47, 0.67], ["0%", "-150%"]);
  const socialY = useTransform(scrollYProgress, [0.47, 0.67], ["0%", "180%"]);
  const socialRotate = useTransform(scrollYProgress, [0.47, 0.67], [0, -80]);
  const socialOpacity = useTransform(scrollYProgress, [0.47, 0.53], [1, 0]);

  // Flash Effect 🧨
  const impactFlash = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 0.9, 0]);

  return (
    <div 
      ref={containerRef} 
      style={{ position: 'relative' }}
      className="relative h-[400vh] bg-black border-b border-white/5 overflow-visible z-10"
    >

      {/* Sticky Full-Width Container (No max-width here to allow unboxed spear) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* IMPACT FLASH (Scoped to Header only) 🎨 */}
        <motion.div
          style={{ opacity: impactFlash }}
          className="absolute inset-0 bg-red-600 mix-blend-overlay z-50 pointer-events-none"
        />

        {/* Content Wrapper (max-width for text alignment) */}
        <div className="px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 relative z-20">

          {/* Left Column ☝️🎬🧨 */}
          <div className="space-y-6">
            <motion.div
              style={{ y: metaY, rotate: metaRotate, opacity: metaOpacity }}
              className="flex items-center gap-3 origin-left"
            >
              <div className="h-[2px] w-8 bg-[--accent]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">
                Professional Portfolio
              </span>
            </motion.div>

            <div className="relative">
              <h1 className="text-7xl md:text-[8.5rem] font-black tracking-tighter uppercase leading-[0.8] text-white font-heading mix-blend-difference">
                <div className="overflow-visible">
                  <motion.div style={{ x: romanX, y: romanY, rotate: romanRotate, opacity: romanOpacity }} className="origin-bottom-left inline-block will-change-transform">
                    LEATI JOSEPH
                  </motion.div>
                </div>
                <div className="overflow-visible">
                  <motion.div style={{ x: reignsX, y: reignsY, rotate: reignsRotate, opacity: reignsOpacity }} className="text-[--accent-gold] origin-top-right inline-block will-change-transform">
                    ANOA&apos;I
                  </motion.div>
                </div>
              </h1>
            </div>

            <motion.p
              style={{ x: descX, y: descY, rotate: descRotate, opacity: descOpacity }}
              className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-white/60 font-subheading origin-top-left"
            >
              <DecryptedText text="ANOA'I DYNASTY" speed={80} delay={500} />
            </motion.p>
          </div>

          {/* Right Column ☝️🎬🧨 */}
          <motion.div
            className="lg:text-right space-y-8"
          >
            <motion.div style={{ x: bioX, y: bioY, rotate: bioRotate, opacity: bioOpacity }} className="space-y-4 font-mono text-xs uppercase tracking-widest text-white/40 origin-center">
              <div className="group/meta cursor-default">
                <span className="text-[--accent] block mb-1">Residence</span>
                <p className="text-white font-medium group-hover/meta:text-[--accent-gold] transition-colors">The Island of Relevancy</p>
              </div>
              <div className="group/meta cursor-default">
                <span className="text-[--accent] block mb-1">Status</span>
                <p className="text-white font-medium group-hover/meta:text-[--accent-gold] transition-colors">10× World Champion</p>
              </div>
            </motion.div>

            {/* Tribal Socials ☝️🎬🧨 */}
            <motion.div 
              style={{ x: socialX, y: socialY, rotate: socialRotate, opacity: socialOpacity }}
              className="flex items-center gap-6 lg:justify-end origin-right"
            >
              <a href="https://www.instagram.com/romanreigns" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[--accent-gold] transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/WWERomanReigns" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[--accent-gold] transition-colors text-2xl">
                <FaTwitter />
              </a>
              <a href="https://www.tiktok.com/@romanreigns" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[--accent-gold] transition-colors text-2xl">
                <FaTiktok />
              </a>
              <a href="https://www.facebook.com/PowerhouseRomanReigns" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[--accent-gold] transition-colors text-2xl">
                <FaFacebook />
              </a>
            </motion.div>

            <motion.div style={{ x: emailX, y: emailY, rotate: emailRotate, opacity: emailOpacity }} className="pt-8 border-t border-white/5 origin-bottom-right">
              <a
                href="mailto:ezzeldinahmad96@gmail.com"
                className="text-lg font-black text-white hover:text-[--accent-gold] transition-all duration-300 flex items-center lg:justify-end gap-4 group/mail"
              >
                <span className="h-[1px] w-0 bg-[--accent] group-hover/mail:w-8 transition-all duration-300" />
                romanreigns@islandofrelevancy.com
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* UNBOXED SPEAR IMAGE (LTR) - Z-30 above everything 🧨 */}
        <motion.div
          style={{
            x: spearX,
            y: "-50%",
            rotate: 8
          }}
          // Note: w-[100vw] to ensure it covers everything at impact
          className="absolute top-1/2 w-[90vw] md:w-[70vw] aspect-video z-30 pointer-events-none will-change-transform"
        >
          <div className="w-full h-full relative group">
            {/* 1. Motion Blur Trail */}
            <div className="absolute inset-0 w-full h-full opacity-30 blur-[8px] translate-x-[-40px]">
              <Image
                src="/spear.webp"
                alt=""
                fill
                className="object-contain"
              />
            </div>

            {/* 2. Main High-Impact Image */}
            <Image
              src="/spear.webp"
              alt="Roman Reigns Spear"
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-contain relative z-10"
              style={{
                filter: "contrast(1.1) brightness(1.1) drop-shadow(0px 0px 30px rgba(255, 0, 0, 0.4))"
              }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
