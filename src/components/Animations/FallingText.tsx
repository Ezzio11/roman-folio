"use client";

import React, { useRef, useState, useEffect } from 'react';
import * as Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(true);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    // Effect starts immediately now
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    let engine: Matter.Engine;
    let render: Matter.Render;
    let visibilityObserver: IntersectionObserver | undefined;
    let animId: number | undefined;

    const canvasContainer = canvasContainerRef.current; // Capture ref for safe cleanup ☝️🎬

    const initPhysics = () => {
      const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

      if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;

      if (width <= 0 || height <= 0) return;

      engine = Engine.create();
      engine.world.gravity.y = gravity;

      render = Render.create({
        element: canvasContainerRef.current,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes
        }
      });

      const boundaryOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
      const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
      const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
      const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

      const wordSpans = textRef.current.querySelectorAll<HTMLSpanElement>('.word');
      const wordBodies = Array.from(wordSpans).map(elem => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: 'transparent' },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2
        });

        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

        elem.style.position = 'absolute';
        elem.style.left = '0';
        elem.style.top = '0';
        elem.style.willChange = 'transform';
        elem.style.margin = '0'; 

        return { elem, body };
      });

      const mouse = Mouse.create(containerRef.current);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });
      render.mouse = mouse;

      World.add(engine.world, [floor, leftWall, rightWall, ceiling, mc, ...wordBodies.map(wb => wb.body)]);

      const updateLoop = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        Engine.update(engine, 1000 / 60);
        animId = requestAnimationFrame(updateLoop);
      };
      animId = requestAnimationFrame(updateLoop);
    };

    initPhysics();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (visibilityObserver) visibilityObserver.disconnect();
      if (render) {
        if (render.canvas && canvasContainer) {
          canvasContainer.removeChild(render.canvas);
        }
        // Use static Matter.Render.stop(render)
        Matter.Render.stop(render);
        // and let GC handle the rest if engine/world are local to this effect
      }
      // If engine was successfully created, clear its world
      if (engine) {
        // We can't call World.clear or Engine.clear without Matter being in scope.
        // Assuming render.stop() and garbage collection are sufficient for this dynamic import scenario.
        // If more explicit cleanup is needed, Matter would need to be imported again here or passed.
      }
    };
  }, [effectStarted, text, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
