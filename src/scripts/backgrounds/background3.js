import * as THREE from 'three';

const container = document.getElementById('three-container3');
const scene = new THREE.Scene();

// Canvas size based on container dimensions
const width = container.clientWidth;
const height = container.clientHeight;

// Perspective camera for depth
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 10; // Distance to see the full grid

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Particle system for the grid
const gridSizeX = 50; // Number of rectangles in X
const gridSizeY = 30; // Number of rectangles in Y
const particleCount = gridSizeX * gridSizeY;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

// Create 2D grid
let index = 0;
for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
        positions[index] = (x / gridSizeX - 0.5) * 40; // x (-10 to 10)
        positions[index + 1] = (y / gridSizeY - 0.5) * 20; // y (-5 to 5)
        positions[index + 2] = 0; // z (initially flat)
        index += 3;
    }
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle shaders
const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec3 vPosition;
    void main() {
        vPosition = position;
        vec3 pos = position;

        // Smooth ambient movement
        pos.z += sin(pos.x * 0.3 + uTime * 0.5) * cos(pos.y * 0.3 + uTime * 0.4) * 0.2;

        // Hover effect: bring particles closer to the camera
        vec2 mouse3D = uMouse * vec2(20.0, 10.0) - vec2(10.0, 5.0); // Map to 2D space
        float dist = distance(pos.xy, mouse3D);
        if (dist < 2.5) {
            pos.z += (2.0 - dist) * 2.0 * (sin(uTime * 1.0) * 0.3 + 0.6); // Smooth and wide
        }

        gl_PointSize = 4.0; // Size for small rectangles
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = `
    uniform float uTime;
    varying vec3 vPosition;
    void main() {
        // Simulate rectangular shape
        vec2 uv = gl_PointCoord - vec2(0.5);
        if (abs(uv.x) > 0.4 || abs(uv.y) > 0.4) discard; // Rectangular form

        // Dark colors with glow
        vec3 baseColor = vec3(0.002, 0.005, 0.03); // Almost black blue
        vec3 glowColor = vec3(0.08, 0.1, 0.25); // Bluish-purple glow
        float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
        vec3 color = mix(baseColor, glowColor, intensity);
        gl_FragColor = vec4(color, 0.7); // Transparency for softness
    }
`;

const particleMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    transparent: true
});

const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particleSystem);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particleMaterial.uniforms.uTime.value += 0.05;
    renderer.render(scene, camera);
}
animate();

// Mouse interaction
container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    particleMaterial.uniforms.uMouse.value.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
    );
});

// Handle resizing
window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});
