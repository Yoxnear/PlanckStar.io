import * as THREE from "three";

// Get the container element where the scene will be rendered
const container = document.getElementById("canvas-container1");

// Create a new Three.js scene
const scene = new THREE.Scene();

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  container.clientWidth / container.clientHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

// Create and configure the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Adjust renderer and camera when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});

// Aurora Borealis shader setup
const planeGeometry = new THREE.PlaneGeometry(10, 10); // Plane to display the shader
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv; // Pass UV coordinates to fragment shader
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time;
    uniform vec2 resolution;

    // 2D Perlin noise implementation (adapted from https://github.com/ashima/webgl-noise)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Normalize UV coordinates according to resolution
      vec2 uv = vUv * resolution / resolution.y;

      // Animation speed control
      float t = time * 0.3;

      // Animated Perlin noise for dynamic patterns
      float noise = snoise(uv * 2.0 + vec2(t, t * 0.5));

      // Smooth sine waves for aurora movement
      float wave = sin(uv.y * 5.0 + noise + t) * 0.2 + 0.5;

      // Gradient mix between deep blue and teal-green
      vec3 color = mix(vec3(0.0, 0.01, 0.1), vec3(0.01, 0.7, 0.5), wave);

      // Add extra noise-based detail to the aurora
      color += vec3(0.1, 0.3, 0.2) * noise * 1.0;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    time: { value: 0.0 }, // Controls animation over time
    resolution: {
      value: new THREE.Vector2(container.clientWidth, container.clientHeight), // Keeps resolution consistent
    },
  },
});

// Create the mesh and add it to the scene
const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(plane);

// Move camera back so the plane is visible
camera.position.z = 5;

// Main render loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update the time uniform for animation
  shaderMaterial.uniforms.time.value += 0.01;
  
  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}
animate();
