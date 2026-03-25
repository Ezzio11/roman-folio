"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, baseFragmentShader } from "./shaders";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true // Keep buffer to prevent flicker on resume
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add "Bleed" to prevent parallax clipping ☝️🎬
    const bleed = 1.1;
    renderer.setSize(window.innerWidth * bleed, window.innerHeight * bleed);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "-5%";
    renderer.domElement.style.left = "-5%";
    renderer.domElement.style.width = "110%";
    renderer.domElement.style.height = "110%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 2. Load Assets
    const loader = new THREE.TextureLoader();
    const tribalTex = loader.load("/images/tribal_chief.webp");
    const depthTex = loader.load("/images/roman_depth.webp");

    // Force Linear Filtering for smooth interpolation ☝️🎬
    tribalTex.minFilter = THREE.LinearFilter;
    tribalTex.magFilter = THREE.LinearFilter;
    depthTex.minFilter = THREE.LinearFilter;
    depthTex.magFilter = THREE.LinearFilter;

    // Anisotropy for sharper details at parallax angles
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    tribalTex.anisotropy = maxAnisotropy;

    // 3. Visual Tuning Parameters 🎨
    const tuning = {
      baseScale: 7.5,         // Size of Tribal Chief
      xOffset: 1.5,           // Shifted to the right to avoid text overlap ☝️🚀
      yOffset: -1.0,          // Base vertical position
      parallaxStrength: 0.015, // Intensity of the 3D depth effect
    };

    const baseGeometry = new THREE.PlaneGeometry(tuning.baseScale, tuning.baseScale);

    const baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: tribalTex },
        uDepthMap: { value: depthTex },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uParallaxStrength: { value: tuning.parallaxStrength }
      },
      vertexShader,
      fragmentShader: baseFragmentShader,
      transparent: true
    });

    const basePlane = new THREE.Mesh(baseGeometry, baseMaterial);
    basePlane.position.set(tuning.xOffset, tuning.yOffset, 0);
    scene.add(basePlane);

    // 4. Interaction
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 5. Animation Loop
    const animate = () => {
      baseMaterial.uniforms.uTime.value = performance.now() * 0.001;
      baseMaterial.uniforms.uMouse.value.lerp(mouseRef.current, 0.1);
      
      renderer.render(scene, camera);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 6. Resize
    const handleResize = () => {
      const bleed = 1.1;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * bleed, window.innerHeight * bleed);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      
      // Thorough disposal to prevent memory leaks ☝️🚀
      baseGeometry.dispose();
      baseMaterial.dispose();
      tribalTex.dispose();
      depthTex.dispose();
      renderer.dispose();
      
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />;
}
