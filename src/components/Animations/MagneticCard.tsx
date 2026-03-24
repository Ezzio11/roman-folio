'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function MagneticCard({
  children,
  className = '',
  glowColor = 'rgba(255, 0, 0, 0.2)',
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    x.set(dx);
    y.set(dy);
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group bg-white/5 border border-white/10 rounded-2xl p-8 transition-colors hover:bg-white/[0.08] hover:border-white/20 ${className}`}
    >
      {/* Background Glow */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
        }}
      />
      
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
