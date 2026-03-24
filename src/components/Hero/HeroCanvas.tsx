"use client";

import React, { useEffect, useRef } from "react";
import { vertexShader, baseFragmentShader } from "./shaders";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: any;
    let camera: any;
    let animId: number;
    let observer: IntersectionObserver;

    const init = async () => {
      if (!container) return;
      
      const THREE = await import('three');
      const { WebGLRenderer, Scene, PerspectiveCamera, ShaderMaterial, TextureLoader, PlaneGeometry, Mesh } = THREE;

      console.time("HeroCanvas-Init");

      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const scene = new Scene();
      camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const loader = new TextureLoader();
      const tribalTex = loader.load("/images/tribal_chief.webp");
      const depthTex = loader.load("/images/roman_depth.webp");

      const tuning = {
        baseScale: 7.5,
        yOffset: -1.0,
        parallaxStrength: 0.015,
      };

      const baseGeometry = new PlaneGeometry(tuning.baseScale, tuning.baseScale);
      const baseMaterial = new ShaderMaterial({
        uniforms: {
          uTexture: { value: tribalTex },
          uDepthMap: { value: depthTex },
          uMouse: { value: mouseRef.current },
          uParallaxStrength: { value: tuning.parallaxStrength }
        },
        vertexShader,
        fragmentShader: baseFragmentShader,
        transparent: true
      });

      const basePlane = new Mesh(baseGeometry, baseMaterial);
      basePlane.position.set(0, tuning.yOffset, 0);
      scene.add(basePlane);

      let isVisible = true;
      observer = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; },
        { threshold: 0 }
      );
      observer.observe(container);

      const animate = () => {
        if (isVisible) {
          baseMaterial.uniforms.uMouse.value.copy(mouseRef.current);
          renderer.render(scene, camera);
        }
        animId = requestAnimationFrame(animate);
      };

      animate();
      console.timeEnd("HeroCanvas-Init");
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const timer = setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => {
          init().catch(console.error);
        });
      } else {
        init().catch(console.error);
      }
    }, 100);

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      if (renderer) {
        renderer.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
