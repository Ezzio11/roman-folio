"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Magnet from "@/components/Animations/Magnet";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("@/components/Animations/Antigravity"), { ssr: false });
import TextType from "@/components/Animations/TextType";
import EliteShowcase from "@/components/Resume/EliteShowcase";
import { createPortal } from "react-dom";

export default function Contact() {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // ☝️ Lock body scroll when overlay is open to prevent double scrollbars
  useEffect(() => {
    if (isAcknowledged) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAcknowledged]);

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
  };

  const handleTypingComplete = () => {
    // After Wise Man's speech finishes, wait 2 seconds then show showcase
    setTimeout(() => {
      setShowShowcase(true);
    }, 2000);
  };

  const closeOverlay = () => {
    setIsAcknowledged(false);
    setShowShowcase(false);
  };

  return (
    <div className="relative overflow-hidden w-full border-t border-white/5" id="contact">
      {/* ☝️🌌 Antigravity Red Void Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Antigravity
          color="#ff0000"
          count={500}
          particleSize={0.5}
          autoAnimate={true}
          magnetRadius={12}
          particleShape="capsule"
        />
      </div>

      <section className="relative z-10 py-32 px-8 max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic font-heading">
            Interested in working with Roman Reigns?
          </h2>
          <p className="text-2xl text-[--accent] font-bold uppercase tracking-widest font-subheading">
            He is not interested in working with you.
          </p>
          <p className="text-white/40 font-bold uppercase text-xs font-subheading tracking-[0.3em]">
            However, if you&apos;d like to acknowledge him:
          </p>
        </div>

        <div className="pt-8">
          <Magnet strength={0.4}>
            <button
              onClick={handleAcknowledge}
              className="px-16 py-6 bg-white text-black text-3xl font-black uppercase tracking-widest hover:bg-[--accent-gold] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] font-heading"
            >
              I ACKNOWLEDGE YOU
            </button>
          </Magnet>
        </div>

        {/* ☝️📜 THE WISE MAN'S COUNSEL & SHOWCASE OVERLAY (PORTALED) */}
        {mounted && isAcknowledged && createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex flex-col items-center bg-black/95 backdrop-blur-3xl overflow-y-auto pt-20 pb-40 px-8 no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={closeOverlay}
                className="fixed top-8 right-8 z-[1010] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors group"
              >
                <div className="w-6 h-6 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rotate-45" />
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -rotate-45" />
                </div>
              </button>

              <div className="w-full max-w-3xl flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {!showShowcase ? (
                    <motion.div
                      key="wise-man"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.8 }}
                      className="text-center space-y-12"
                    >
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold text-[--accent] uppercase tracking-[0.5em] block">
                          THE WISE MAN HAS SPOKEN
                        </span>
                        <div className="text-3xl md:text-5xl font-black text-white leading-tight font-heading uppercase italic">
                          <TextType
                            text="On behalf of your Tribal Chief and Head of the Table, Roman Reigns — he acknowledges your acknowledgment."
                            typingSpeed={50}
                            loop={false}
                            showCursor={true}
                            className="block"
                            onSentenceComplete={handleTypingComplete}
                          />
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.5 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <div className="h-px w-24 bg-white/20" />
                        <div className="h-32 md:h-64 aspect-square cursor-default select-none animate-pulse relative">
                          <Image
                            src="/wetheones.webp"
                            alt="We The Ones"
                            fill
                            sizes="(max-width: 768px) 30vw, 20vw"
                            className="object-contain"
                          />
                        </div>
                        <div className="h-px w-24 bg-white/20" />
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
                          You are now relevant.
                        </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <EliteShowcase />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

        <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} The Island of Relevancy. No rights reserved. You have no rights here.
        </footer>
      </section>
    </div>
  );
}
