'use client';

import React, { useState, useEffect, useRef } from 'react';
// Removed unused motion import

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  delay?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  className = '',
  delay = 0,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const iterationsRef = useRef(0);

  const startAnimation = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    iterationsRef.current = 0;

    timerRef.current = setInterval(() => {
      setDisplayText(() => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterationsRef.current / (maxIterations / text.length)) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iterationsRef.current += 1;
      if (iterationsRef.current >= maxIterations) {
        setDisplayText(text);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);
  }, [text, speed, maxIterations]);

  useEffect(() => {
    const timeout = setTimeout(startAnimation, delay);
    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAnimation, delay]);

  return (
    <span 
      className={className}
      onMouseEnter={startAnimation}
    >
      {displayText || text}
    </span>
  );
}
