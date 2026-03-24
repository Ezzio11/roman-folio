"use client";

import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef<boolean>(false);
  const xPositionsRef = useRef<number[]>([0, 0, 0, 0]);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const updateMotion = (): void => {
      const speed = isHoveredRef.current ? 0.3 : 1.2; // 🎢 Slow down on hover instead of pause 👑🛠️

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          xPositionsRef.current[index] += speed * direction;
          
          // Looping Logic: ☝️🧭
          // Since we triple the items, the 'cycle' of one set of 7 is the width / 3
          // For right-scrolling (direction = 1): Reset if it goes too far right.
          // For left-scrolling (direction = -1): Reset if it goes too far left.
          
          const rowWidth = row.scrollWidth;
          const cycleWidth = rowWidth / 3;
          
          let x = xPositionsRef.current[index];

          if (direction === 1) {
            // Right-moving: Reset when it has moved exactly one cycle width
            if (x >= 0) {
              x = -cycleWidth;
              xPositionsRef.current[index] = x;
            }
          } else {
            // Left-moving: Reset when it has moved exactly one cycle width
            if (Math.abs(x) >= cycleWidth) {
              x = 0;
              xPositionsRef.current[index] = x;
            }
          }

          gsap.set(row, { x: x });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mouseenter', () => { isHoveredRef.current = true; });
      grid.addEventListener('mouseleave', () => { isHoveredRef.current = false; });
    }

    return () => {
      if (grid) {
        grid.removeEventListener('mouseenter', () => { isHoveredRef.current = true; });
        grid.removeEventListener('mouseleave', () => { isHoveredRef.current = false; });
      }
      removeAnimationLoop();
    };
  }, []);

  return (
    <div className="noscroll loading" ref={gridRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="gridMotion-container">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={el => {
                rowRefs.current[rowIndex] = el;
              }}
            >
              {[...combinedItems.slice(rowIndex * 7, (rowIndex + 1) * 7), 
                ...combinedItems.slice(rowIndex * 7, (rowIndex + 1) * 7), 
                ...combinedItems.slice(rowIndex * 7, (rowIndex + 1) * 7)].map((content, itemIndex) => {
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                      {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/') || content.includes('.jpg') || content.includes('.png')) ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${content})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(1) contrast(1.2)'
                          }}
                        ></div>
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
