"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  triggerOnMount?: boolean;
}

export default function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0,
  triggerOnMount = false 
}: ScrollRevealProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={!triggerOnMount ? { opacity: 1, x: 0, y: 0 } : undefined}
      animate={triggerOnMount ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={!triggerOnMount ? { once: true, margin: "-100px" } : undefined}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
