        import * as THREE from 'three';

        const container = document.getElementById('three-container1');

        // Tamaño del canvas según el contenedor
const scene = new THREE.Scene();

        // Tamaño del canvas según el contenedor
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Cámara perspectiva ajustada para cubrir toda la pantalla
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 8; // Más lejos para cubrir más área

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Sistema de partículas
        const particleCount = 5000; // Partículas para cubrir la pantalla
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        // Posiciones iniciales para cubrir más área
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 35; // x (amplio)
            positions[i + 1] = (Math.random() - 0.5) * 20; // y (alto)
            positions[i + 2] = (Math.random() - 0.5) * 3; // z (profundidad)
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Shaders para partículas
        const vertexShader = `
            uniform float uTime;
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                vec3 pos = position;

                // Movimiento de oleaje más suave
                pos.y += sin(pos.x * 0.4 + uTime * 0.5) * cos(pos.z * 0.4 + uTime * 0.4) * 0.5;

                gl_PointSize = 2.2; // Partículas grandes
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            varying vec3 vPosition;
            void main() {
                // Colores oscuros con brillo suave
                vec3 baseColor = vec3(0.002, 0.005, 0.03); // Azul casi negro
                vec3 glowColor = vec3(0.08, 0.12, 0.25); // Brillo azulado oscuro
                float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
                vec3 color = mix(baseColor, glowColor, intensity);
                gl_FragColor = vec4(color, 0.7); // Transparencia para suavidad
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

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            particleMaterial.uniforms.uTime.value += 0.05;
            renderer.render(scene, camera);
        }
        animate();

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        });