    import * as THREE from 'three';

    const container = document.getElementById('three-container3');
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particle system
    const gridSizeX = 50;
    const gridSizeY = 40;
    const particleCount = gridSizeX * gridSizeY;
    const positions = new Float32Array(particleCount * 3);

    let index = 0;
    for (let y = 0; y < gridSizeY; y++) {
        for (let x = 0; x < gridSizeX; x++) {
            positions[index] = (x / gridSizeX - 0.5) * 40; // x
            positions[index + 1] = (y / gridSizeY - 0.5) * 20; // y
            positions[index + 2] = 0; // z
            index += 3;
        }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Shaders
    const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            vec3 pos = position;

            // Ambient movement
            pos.z += sin(pos.x * 0.3 + uTime * 0.5) * cos(pos.y * 0.3 + uTime * 0.4) * 0.2;

            // Hover effect
            vec2 mouse3D = uMouse; // ya está en coordenadas de mundo
            float dist = distance(pos.xy, mouse3D);
            if (dist < 2.5) {
                pos.z += (2.0 - dist) * 2.0 * (sin(uTime * 1.0) * 0.3 + 0.6);
            }


            gl_PointSize = 4.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            if (abs(uv.x) > 0.4 || abs(uv.y) > 0.4) discard;

            vec3 baseColor = vec3(0.002, 0.005, 0.03);
            vec3 glowColor = vec3(0.1, 0.12, 0.27);
            float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
            vec3 color = mix(baseColor, glowColor, intensity);
            gl_FragColor = vec4(color, 0.9);
        }
    `;

    const particleMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) }
        },
        transparent: true
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

const mouse = new THREE.Vector2();
const vector = new THREE.Vector3();

container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    // Normalizar a -1 a 1
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Convertir de clip space a coordenadas de mundo en z = 0
    vector.set(mouse.x, mouse.y, 0.5); // z = 0.5 en clip space
    vector.unproject(camera); // pasa a coordenadas de mundo
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z; // plano z = 0
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    // Actualizar uniform
    particleMaterial.uniforms.uMouse.value.set(pos.x, pos.y);
});

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particleMaterial.uniforms.uTime.value += 0.05;
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    function updateRendererSize() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', updateRendererSize);
    updateRendererSize();