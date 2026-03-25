"use client";
/* eslint-disable react-hooks/immutability */

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uScale;
  uniform float uAmplitude;
  uniform float uSkew;
  uniform float uPhase;
  uniform float uThreshold;
  uniform float uBulgeAmount;
  uniform float uBulgeScale;
  uniform float uTrackMouse;

  // Simplex 2D noise implementation
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    for (int i = 0; i < 2; ++i) { 
      v += a * snoise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 ratio = vec2(max(uResolution.x / uResolution.y, 1.0), max(uResolution.y / uResolution.x, 1.0));
    vec2 p = (vUv - 0.5) * ratio;
    vec2 m = uMouse * ratio * 0.5;
    
    p += m * uTrackMouse * 0.01;
    float d = distance(p, m);
    float bulge = smoothstep(uBulgeScale, 0.0, d) * uBulgeAmount * 0.005;
    p -= normalize(p - m + 0.0001) * bulge;
    p.x += p.y * uSkew * 0.01;
    
    float time = uTime * 0.1 + uPhase * 0.1;
    float n1 = fbm(p * uScale * 0.01 + time);
    float n = fbm(p * uScale * 0.01 + n1 * 0.5 + time);

    n *= (uAmplitude * 0.01) * 2.0;
    float thresh = (uThreshold * 0.01) - 0.5;
    float alpha = smoothstep(thresh - 0.2, thresh + 0.2, n);
    
    vec3 color = mix(uColorA, uColorB, alpha);
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface NoiseBackgroundProps {
  colorA?: string;
  colorB?: string;
  noiseScale?: number;
  amplitude?: number;
  skew?: number;
  phase?: number;
  threshold?: number;
  bulgeAmount?: number;
  bulgeScale?: number;
  trackMouse?: number;
  className?: string;
}

function NoisePlane(props: NoiseBackgroundProps) {
  const { size } = useThree();
  const meshRef = useRef<Mesh>(null);
  const mousePos = useRef(new THREE.Vector2(0, 0));

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uColorA: { value: new THREE.Color(props.colorA || "#000000") },
        uColorB: { value: new THREE.Color(props.colorB || "#ff0000") },
        uScale: { value: props.noiseScale ?? 100 },
        uAmplitude: { value: props.amplitude ?? 83 },
        uSkew: { value: props.skew ?? 50 },
        uPhase: { value: props.phase ?? 35 },
        uThreshold: { value: props.threshold ?? 50 },
        uBulgeAmount: { value: props.bulgeAmount ?? 53 },
        uBulgeScale: { value: props.bulgeScale ?? 0.5 },
        uTrackMouse: { value: props.trackMouse ?? 10 },
      },
      transparent: true,
    });
  }, [vertexShader, fragmentShader, size.width, size.height]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep uniforms in sync with props during re-renders ☝️🚀
  useEffect(() => {
    const u = material.uniforms;
    if (props.colorA) u.uColorA.value.set(props.colorA);
    if (props.colorB) u.uColorB.value.set(props.colorB);
    if (props.noiseScale !== undefined) u.uScale.value = props.noiseScale;
    if (props.amplitude !== undefined) u.uAmplitude.value = props.amplitude;
    if (props.skew !== undefined) u.uSkew.value = props.skew;
    if (props.phase !== undefined) u.uPhase.value = props.phase;
    if (props.threshold !== undefined) u.uThreshold.value = props.threshold;
    if (props.bulgeAmount !== undefined) u.uBulgeAmount.value = props.bulgeAmount;
    if (props.bulgeScale !== undefined) u.uBulgeScale.value = props.bulgeScale;
    if (props.trackMouse !== undefined) u.uTrackMouse.value = props.trackMouse;
  }, [
    props.colorA, props.colorB, props.noiseScale, props.amplitude, 
    props.skew, props.phase, props.threshold, props.bulgeAmount, 
    props.bulgeScale, props.trackMouse, material
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Sync with global clock but allow for a small kick if paused ☝️🚀
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.lerp(mousePos.current, 0.1);
      material.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  // Force re-render on visibility change ☝️🚀
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && meshRef.current) {
        // Just being here forces the effect to wake up
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function NoiseBackground(props: NoiseBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${props.className}`}>
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, stencil: false, depth: false }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
      >
        <NoisePlane {...props} />
      </Canvas>
    </div>
  );
}
