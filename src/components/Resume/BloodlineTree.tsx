"use client";

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { bloodlineData, FamilyNode } from '@/data/bloodline';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GENERATION_HEIGHT = 200;
const NODE_WIDTH = 260;
const NODE_HEIGHT = 120;
const HORIZONTAL_GAP = 60;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2;

const BloodlineTree: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Zoom & Pan State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.8);

  const springConfig = { damping: 50, stiffness: 90, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const generations = useMemo(() => {
    const gens: Record<number, FamilyNode[]> = {};
    bloodlineData.forEach(node => {
      if (!gens[node.generation]) gens[node.generation] = [];
      gens[node.generation].push(node);
    });
    return gens;
  }, []);

  const totalGens = Object.keys(generations).length;
  const maxNodes = Math.max(...Object.values(generations).map(n => n.length));
  const totalWidth = maxNodes * (NODE_WIDTH + HORIZONTAL_GAP) + 1200;
  const totalHeight = totalGens * GENERATION_HEIGHT + 1200;

  const getNodePos = useCallback((node: FamilyNode) => {
    const nodesInGen = generations[node.generation];
    const index = nodesInGen.indexOf(node);
    const genWidth = nodesInGen.length * (NODE_WIDTH + HORIZONTAL_GAP);
    const startX = (totalWidth - genWidth) / 2;

    return {
      x: startX + index * (NODE_WIDTH + HORIZONTAL_GAP) + NODE_WIDTH / 2,
      y: (node.generation - 1) * GENERATION_HEIGHT + 150 + NODE_HEIGHT / 2, // Reduced from 800 to bring tree up ☝️🎬
    };
  }, [generations, totalWidth]);

  const toggleSelection = useCallback((nodeId: string) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      setSelectedNode(nodeId);
    }
  }, [selectedNode]);

  const getLineage = useCallback((startId: string | null) => {
    if (!startId) return new Set<string>();
    const set = new Set<string>();
    const findLineage = (id: string, dir: 'up' | 'down') => {
      set.add(id);
      const node = bloodlineData.find(n => n.id === id);
      if (!node) return;
      if (dir === 'up' && node.parents) node.parents.forEach(p => findLineage(p, 'up'));
      if (dir === 'up' && node.isBloodBrother) findLineage("amituana_anoai", 'up');
      if (dir === 'down') {
        bloodlineData.filter(n => n.parents?.includes(id)).forEach(c => findLineage(c.id, 'down'));
        if (id === "amituana_anoai") bloodlineData.filter(n => n.isBloodBrother).forEach(b => findLineage(b.id, 'down'));
      }
    };
    findLineage(startId, 'up');
    findLineage(startId, 'down');

    // Sibling detection
    const nodeObj = bloodlineData.find(n => n.id === startId);
    if (nodeObj?.parents) {
      nodeObj.parents.forEach(p => {
        bloodlineData.filter(n => n.parents?.includes(p)).forEach(sib => set.add(sib.id));
      });
    }

    nodeObj?.spouse?.forEach(s => set.add(s));
    return set;
  }, []);

  const highlightedNodes = useMemo(() => {
    const hoverSet = getLineage(hoveredNode);
    const selectSet = getLineage(selectedNode);
    return new Set([...Array.from(hoverSet), ...Array.from(selectSet)]);
  }, [hoveredNode, selectedNode, getLineage]);

  const connections = useMemo(() => {
    const lines: { from: { x: number, y: number }, to: { x: number, y: number }, type: 'parent' | 'spouse' | 'blood', id: string }[] = [];
    bloodlineData.forEach(node => {
      const pos = getNodePos(node);
      if (node.parents) node.parents.forEach(parentId => {
        const parent = bloodlineData.find(n => n.id === parentId);
        if (parent) lines.push({ from: getNodePos(parent), to: pos, type: 'parent', id: `${parent.id}-${node.id}` });
      });
      if (node.spouse) node.spouse.forEach(spouseId => {
        const spouse = bloodlineData.find(n => n.id === spouseId);
        if (spouse && spouseId > node.id) lines.push({ from: getNodePos(node), to: getNodePos(spouse), type: 'spouse', id: `${node.id}-${spouseId}` });
      });
      if (node.isBloodBrother) {
        const amituana = bloodlineData.find(n => n.id === "amituana_anoai");
        if (amituana) lines.push({ from: getNodePos(amituana), to: pos, type: 'blood', id: `blood-${node.id}` });
      }
    });
    return lines;
  }, [getNodePos]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.005;
      const newScale = Math.min(Math.max(scale.get() + delta, MIN_SCALE), MAX_SCALE);
      scale.set(newScale);
    }
  };

  useEffect(() => {
    let lastDist = 0;
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
        if (lastDist > 0) {
          const delta = (dist - lastDist) * 0.01;
          const newScale = Math.min(Math.max(scale.get() + delta, MIN_SCALE), MAX_SCALE);
          scale.set(newScale);
        }
        lastDist = dist;
      }
    };
    const handleTouchEnd = () => { lastDist = 0; };
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale]);

  useEffect(() => {
    // Center the whole tree area ☝️🚀
    const timer = setTimeout(() => {
      const centerX = totalWidth / 2;
      // Calculate active populated center 
      const populatedHeight = (totalGens - 1) * GENERATION_HEIGHT + NODE_HEIGHT;
      const centerY = 150 + populatedHeight / 2; // Match the 150 offset in getNodePos ☝️🚀
      const s = scale.get();

      const targetX = -centerX * s + window.innerWidth / 2;
      const targetY = -centerY * s + window.innerHeight / 2;

      x.set(targetX);
      y.set(targetY);
    }, 100);
    return () => clearTimeout(timer);
  }, [totalWidth, totalHeight, totalGens, scale, x, y]);

  return (
    <section
      id="bloodline"
      className="h-screen w-full bg-black overflow-hidden relative selection:bg-[--accent-gold] selection:text-black cursor-move active:cursor-grabbing"
      onWheel={handleWheel}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedNode(null);
      }}
    >
      <div className="absolute inset-0 opacity-10 tribal-texture pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,134,11,0.1),transparent_80%)] pointer-events-none" />

      <div className="absolute top-12 left-12 z-50 pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.3em] text-white font-subheading mb-2">
            The <span className="bg-gradient-to-b from-white via-[#ffcc00] to-[#b8860b] bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(255,204,0,0.3)]">Bloodline</span>
          </h2>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-medium leading-relaxed">
            Legacy of the Anoa&apos;i Dynasty & the Maivia Blood Pact
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-50 flex flex-col items-end gap-4 pointer-events-none">
        <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-[9px] text-gray-400 uppercase tracking-[0.3em]">
          Drag to pan • Pinch / Ctrl+Scroll to zoom • Click to focus
        </div>
        {selectedNode && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
            className="pointer-events-auto px-6 py-2 bg-[--accent] text-white text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-red-600 transition-colors"
          >
            Reset View
          </motion.button>
        )}
      </div>

      <motion.div
        drag
        dragMomentum={false}
        style={{ x: springX, y: springY, scale: springScale }}
        className="w-fit h-fit relative cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()} // Only allow unclicking by clicking node again ☝️🎬
      >
        <div style={{ width: totalWidth, height: totalHeight }} className="relative">
          <svg className="absolute inset-0 pointer-events-none" width={totalWidth} height={totalHeight}>
            <defs>
              <filter id="gold-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {connections.map((line) => {
              const nodes = line.id.split('-');
              const isHighlight = highlightedNodes.has(nodes[0]) && highlightedNodes.has(nodes[1]);
              return (
                <motion.path key={line.id}
                  d={line.type === 'spouse' ? `M ${line.from.x} ${line.from.y} L ${line.to.x} ${line.to.y}` : `M ${line.from.x} ${line.from.y} V ${(line.from.y + line.to.y) / 2} H ${line.to.x} V ${line.to.y}`}
                  stroke={isHighlight ? "#ffcc00" : "rgba(184,134,11,0.15)"} strokeWidth={isHighlight ? 4 : 1.5}
                  strokeDasharray={line.type === 'blood' ? "8,8" : "none"} fill="none"
                  filter={isHighlight ? "url(#gold-glow)" : "none"}
                />
              );
            })}
          </svg>

          {bloodlineData.map((node) => {
            const pos = getNodePos(node);
            const isSelect = selectedNode === node.id;
            const isHighlight = highlightedNodes.has(node.id);

            return (
              <motion.div key={node.id}
                onClick={(e) => { e.stopPropagation(); toggleSelection(node.id); }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                style={{ left: pos.x - NODE_WIDTH / 2, top: pos.y - NODE_HEIGHT / 2, width: NODE_WIDTH, height: NODE_HEIGHT }}
                className={cn(
                  "absolute flex flex-col p-5 rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer backdrop-blur-sm",
                  node.isBloodline ? "bg-gradient-to-br from-[#100c00]/90 to-black/95 border-[#b30000]/40" : "bg-black/70 border-white/5",
                  isHighlight && "border-[#ffcc00]/60 shadow-[0_0_40px_rgba(255,204,0,0.1)] bg-black/95",
                  isSelect && "border-[#ffcc00] shadow-[0_0_50px_rgba(255,204,0,0.3)] z-50 ring-2 ring-[#ffcc00]/30",
                  !isHighlight && (hoveredNode || selectedNode) && "opacity-30 blur-[1px]"
                )}
              >
                <div className="absolute inset-0 opacity-[0.05] tribal-texture scale-150" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className={cn("font-black text-[13px] uppercase tracking-[0.2em]", isHighlight ? "text-white" : "text-gray-400")}>{node.name}</h3>
                    {node.alias && <p className="text-[--accent-gold] font-black text-[11px] uppercase tracking-tighter italic font-subheading">&quot;{node.alias}&quot;</p>}
                  </div>
                  <div className="mt-auto">
                    {node.role && <div className="flex items-center gap-2 mb-1.5 font-black text-[9px] text-gray-500 uppercase tracking-widest leading-none">
                      <div className={cn("w-0.5 h-3 rounded-full", node.isBloodline ? "bg-[#b30000]" : "bg-gray-700")} /> {node.role}
                    </div>}
                    <span className="text-[8px] font-mono text-gray-600 opacity-70">{node.years}</span>
                  </div>
                </div>
                {node.isBloodline && <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#ffcc00]/10 to-transparent rounded-bl-full pointer-events-none" />}
                {node.alias === "Roman Reigns" && (
                  <motion.div className="absolute inset-0 border-2 border-[#b30000] rounded-2xl"
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      boxShadow: [
                        "0 0 10px rgba(179, 0, 0, 0.2)",
                        "0 0 40px rgba(179, 0, 0, 0.6)",
                        "0 0 10px rgba(179, 0, 0, 0.2)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                {node.alias === "Roman Reigns" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b30000] rounded-full shadow-[0_0_10px_#b30000] z-20" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default BloodlineTree;
