"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue } from 'framer-motion';
import './CircularText.css';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  audioSrc?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  audioSrc = '/audio/tribal_theme.mp3'
}) => {
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Normalize text to repeat for full circle if needed, or just append spaces
  const displayLabels = useMemo(() => {
    // We expect the user to provide a proper string with a separator, e.g., "ACKNOWLEDGE ME • 1316 • "
    return text;
  }, [text]);

  const handleHoverStart = () => {
    if (!onHover) return;
    const start = rotation.get();
    let duration = spinDuration;

    switch (onHover) {
      case 'slowDown': duration = spinDuration * 2; break;
      case 'speedUp': duration = spinDuration / 4; break;
      case 'pause': 
        controls.stop(); 
        return;
      case 'goBonkers': duration = spinDuration / 20; break;
    }

    controls.start({
      rotate: start + 360,
      transition: { 
        duration, 
        ease: 'linear', 
        repeat: Infinity,
        from: start
      }
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      transition: { 
        duration: isPlaying ? spinDuration / 2 : spinDuration, 
        ease: 'linear', 
        repeat: Infinity,
        from: start
      }
    });
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
      setIsPlaying(true);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = rotation.get();
    const duration = isPlaying ? spinDuration / 2 : spinDuration;
    
    controls.start({
      rotate: start + 360,
      transition: { 
        duration, 
        ease: 'linear', 
        repeat: Infinity,
        from: start
      }
    });
  }, [isPlaying, spinDuration, controls, rotation]);

  return (
    <motion.div
      ref={containerRef}
      className={`circular-text-container cursor-pointer select-none ${className} ${isPlaying ? 'playing-glow' : ''}`}
      onClick={handleToggleAudio}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0)' }}
      animate={controls}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="fill-white font-black uppercase text-[10px] tracking-[0.2em] font-subheading">
          <textPath href="#circlePath" startOffset="0%">
            {displayLabels}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
};

export default CircularText;
