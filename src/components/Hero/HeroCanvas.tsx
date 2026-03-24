"use client";

import React, { useEffect, useRef } from "react";
import { WebGLRenderer, Scene, PerspectiveCamera, ShaderMaterial, TextureLoader, PlaneGeometry, Vector2, Mesh } from "three";
import { vertexShader, baseFragmentShader } from "./shaders";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Removed typeof window check
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement); // Kept containerRef as mountRef was not defined

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // Kept 45, snippet had 75
    camera.position.z = 5;

    // 2. Load Assets
    const loader = new TextureLoader();
    const tribalTex = loader.load("/images/tribal_chief.webp");
    const depthTex = loader.load("/images/roman_depth.webp");

    // 3. Visual Tuning Parameters 🎨
    const tuning = {
      baseScale: 7.5,         // Size of Tribal Chief
      yOffset: -1.0,          // Base vertical position
      parallaxStrength: 0.015, // Intensity of the 3D depth effect
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

    // 4. Interaction
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove);

    // 5. Animation Loop
    let animId: number;
    const animate = () => {
      baseMaterial.uniforms.uMouse.value.copy(mouseRef.current);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
