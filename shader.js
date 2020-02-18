const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

  void main () {
    // vec3 colorA = vec3(0.0, 0.5, 0.0);
    // vec3 colorB = vec3(0.8, 0.0, 0.0);

    vec2 center = vUv - 0.5;
    // center.x *= aspect;
    float dist = length(center);
    // float alpha = smoothstep(0.2505, 0.25, dist); // fake antialias

    // vec3 color = mix(colorA, colorB, vUv.y);
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(center * 1.0, time));
    
    vec3 color = hsl2rgb(
      0.6 + n * 0.2,
      0.5,
      0.5
    );

    float noise_alpha = smoothstep(0.1001, 0.1, n);
    float alpha = smoothstep(0.251, 0.25, dist);

    gl_FragColor = vec4(color, alpha); 
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: false,
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time/10,
      aspect: ({ width, height }) => width / height,
    }
  });
};

canvasSketch(sketch, settings);