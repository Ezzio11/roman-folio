// GLSL Shaders for the Hero Depth Effect
export const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const baseFragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uParallaxStrength;
  varying vec2 vUv;

  void main() {
    // Aggressive depth sampling for aliasing removal ☝️🎬
    float d = 0.003; // Increased spread for softer transitions
    float depth = 0.0;
    
    // Weighted 9-tap kernel (Softer Gaussian)
    depth += texture2D(uDepthMap, vUv + vec2(-d, -d)).r * 0.09;
    depth += texture2D(uDepthMap, vUv + vec2(0.0, -d)).r * 0.12;
    depth += texture2D(uDepthMap, vUv + vec2( d, -d)).r * 0.09;
    
    depth += texture2D(uDepthMap, vUv + vec2(-d,  0.0)).r * 0.12;
    depth += texture2D(uDepthMap, vUv + vec2( 0.0,  0.0)).r * 0.16;
    depth += texture2D(uDepthMap, vUv + vec2( d,  0.0)).r * 0.12;
    
    depth += texture2D(uDepthMap, vUv + vec2(-d,  d)).r * 0.09;
    depth += texture2D(uDepthMap, vUv + vec2( 0.0,  d)).r * 0.12;
    depth += texture2D(uDepthMap, vUv + vec2( d,  d)).r * 0.09;

    vec2 parallax = uMouse * depth * uParallaxStrength;
    
    // Clamping with 0.01 inner boundary to avoid "hard edge" artifacts
    vec2 displacedUv = clamp(vUv + parallax, 0.01, 0.99);
    
    vec4 color = texture2D(uTexture, displacedUv);
    
    // Bonus: Fade out edges of the displaced texture to avoid "cut" appearance
    float edgeMask = smoothstep(0.0, 0.02, displacedUv.x) * 
                     smoothstep(1.0, 0.98, displacedUv.x) * 
                     smoothstep(0.0, 0.02, displacedUv.y) * 
                     smoothstep(1.0, 0.98, displacedUv.y);
                     
    gl_FragColor = color * edgeMask;
  }
`;
