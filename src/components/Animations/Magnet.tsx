"use client";

import { useRef, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  strength?: number;
}

export default function Magnet({ children, strength = 0.5 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (!rectRef.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const { clientX, clientY } = e;
    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    rectRef.current = null; // Clear cache for next interaction
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
