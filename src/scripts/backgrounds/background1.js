import * as THREE from 'three';

const container = document.getElementById('three-container1');

// Canvas size according to the container
const scene = new THREE.Scene();

// Canvas size according to the container
const width = container.clientWidth;
const height = container.clientHeight;

// Perspective camera adjusted to cover the whole screen
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 8; // Farther away to cover more area

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Particle system
const particleCount = 5000; // Particles to cover the screen
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

// Initial positions to cover more area
for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 35; // x (wide)
    positions[i + 1] = (Math.random() - 0.5) * 20; // y (tall)
    positions[i + 2] = (Math.random() - 0.5) * 3; // z (depth)
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle shaders
const vertexShader = `
    uniform float uTime;
    varying vec3 vPosition;
    void main() {
        vPosition = position;
        vec3 pos = position;

        // Softer wave-like movement
        pos.y += sin(pos.x * 0.4 + uTime * 0.5) * cos(pos.z * 0.4 + uTime * 0.4) * 0.5;

        gl_PointSize = 2.2; // Large particles
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

    const fragmentShader = `
        uniform float uTime;
        varying vec3 vPosition;
        void main() {

            // Dark colors with soft glow
            vec3 baseColor = vec3(0.014, 0.017, 0.1); // <---- Base black blue
            vec3 glowColor = vec3(0.34, 0.44, 0.85); // <---- Dark bluish glow
            float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
            vec3 color = mix(baseColor, glowColor, intensity);
            gl_FragColor = vec4(color, 0.9); // <---- Transparency for softness

        }
    `;

const particleMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 }
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

// Handle resize
window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});
