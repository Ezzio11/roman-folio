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
    float depth = texture2D(uDepthMap, vUv).r;
    vec2 parallax = uMouse * depth * uParallaxStrength;
    vec4 color = texture2D(uTexture, vUv + parallax);
    gl_FragColor = color;
  }
`;
