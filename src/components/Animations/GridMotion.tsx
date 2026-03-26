"use client";

import { useEffect, useRef, FC, useMemo } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import './GridMotion.css';

interface GridMoment {
  src: string;
  title: string;
  desc: string;
}

interface GridMotionProps {
  items?: (string | GridMoment)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'transparent' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef<boolean>(false);
  const xPositionsRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const rowWidthsRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const speedRef = useRef<number>(1.2);

  const randomizedItems = useMemo(() => {
    // Helper shuffle function
    const shuffleArray = (array: (string | GridMoment)[]) => {
      const a = [...array];
      for (let i = a.length - 1; i > 0; i--) {
        // eslint-disable-next-line react-hooks/purity
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const images = items.filter(item => typeof item !== 'string') as GridMoment[];
    const texts = items.filter(item => typeof item === 'string') as string[];
    
    // Create a large, high-diversity pool by shuffling multiple sets ☝️🚀
    const set1 = shuffleArray([...images, ...texts]);
    const set2 = shuffleArray([...images, ...texts]);
    const set3 = shuffleArray([...images, ...texts]);
    return [...set1, ...set2, ...set3];
  }, [items]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const updateRowWidths = () => {
      rowRefs.current.forEach((row, index) => {
        if (row) rowWidthsRef.current[index] = row.scrollWidth;
      });
    };

    const updateMotion = (): void => {
      // Smoothly interpolate speed for a premium feel ☝️🚀
      const targetSpeed = isHoveredRef.current ? 0.2 : 1.2;
      speedRef.current = gsap.utils.interpolate(speedRef.current, targetSpeed, 0.1);

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          xPositionsRef.current[index] += speedRef.current * direction;
          
          const rowWidth = rowWidthsRef.current[index];
          const cycleWidth = rowWidth / 2;
          let x = xPositionsRef.current[index];

          if (direction === 1) {
            if (x >= 0) {
              x = -cycleWidth;
              xPositionsRef.current[index] = x;
            }
          } else {
            if (Math.abs(x) >= cycleWidth) {
              x = 0;
              xPositionsRef.current[index] = x;
            }
          }

          // Removed Velocity Skew for a cleaner, straightened look ☝️🎬
          gsap.set(row, { 
            x: x, 
            force3D: true 
          });
        }
      });
    };

    updateRowWidths();
    window.addEventListener('resize', updateRowWidths);
    const removeAnimationLoop = gsap.ticker.add(updateMotion);

    const handleMouseEnter = () => { isHoveredRef.current = true; };
    const handleMouseLeave = () => { isHoveredRef.current = false; };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mouseenter', handleMouseEnter);
      grid.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', updateRowWidths);
      if (grid) {
        grid.removeEventListener('mouseenter', handleMouseEnter);
        grid.removeEventListener('mouseleave', handleMouseLeave);
      }
      removeAnimationLoop();
    };
  }, []);

  return (
    <div className="noscroll loading overflow-hidden" ref={gridRef}>
      <section
        className="intro h-full w-full relative"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="gridMotion-container">
          {Array.from({ length: 6 }, (_, rowIndex) => {
            // Offset each row to ensure visual diversity across the grid ☝️🚀
            // This prevents the same image from appearing vertically aligned in different rows.
            const rowOffset = rowIndex * 10;
            const rowItems = randomizedItems.slice(rowOffset, rowOffset + 7);

            return (
              <div
                key={rowIndex}
                className="row"
                ref={el => {
                  rowRefs.current[rowIndex] = el;
                }}
              >
                {[...rowItems, ...rowItems].map((item, itemIndex) => {
                  const isObject = typeof item !== 'string';
                  const content = isObject ? (item as GridMoment).src : item as string;
                  const isImage = typeof content === 'string' && (content.startsWith('http') || content.startsWith('/') || content.includes('.webp') || content.includes('.jpg'));

                  return (
                    <div key={itemIndex} className="row__item group">
                      <div className="row__item-inner overflow-hidden rounded-xl bg-[--card-bg] border border-white/5 relative">
                        {isImage ? (
                          <>
                            <div className="row__item-img relative w-full h-full overflow-hidden transition-all duration-700 filter grayscale contrast-[1.2] group-hover:grayscale-0 group-hover:scale-110">
                              <Image
                                src={content}
                                alt={isObject ? (item as GridMoment).title : "Bloodline Moment"}
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover"
                                loading="lazy"
                                unoptimized
                              />
                            </div>
                            {isObject && (
                              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h3 className="text-[--accent-gold] font-black uppercase tracking-tighter text-lg leading-tight mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                  {(item as GridMoment).title}
                                </h3>
                                <p className="text-[10px] text-white/70 uppercase font-subheading tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                  {(item as GridMoment).desc}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="row__item-content w-full h-full flex items-center justify-center p-8 text-center">
                            <span className="font-heading text-2xl md:text-3xl uppercase tracking-tighter text-white/20 group-hover:text-[--accent] group-hover:scale-110 transition-all duration-500 cursor-default">
                              {content}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,#000_100%)]" />
      </section>
    </div>
  );
};

export default GridMotion;
