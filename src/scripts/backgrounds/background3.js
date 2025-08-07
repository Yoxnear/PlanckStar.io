        import * as THREE from 'three';

  
        const container = document.getElementById('three-container3');
        const scene = new THREE.Scene();

        // Tamaño del canvas según el contenedor
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Cámara perspectiva para profundidad
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 10; // Distancia para ver el grid completo

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Sistema de partículas para el grid
        const gridSizeX = 50; // Número de rectángulos en X
        const gridSizeY = 30; // Número de rectángulos en Y
        const particleCount = gridSizeX * gridSizeY;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        // Crear grid 2D
        let index = 0;
        for (let y = 0; y < gridSizeY; y++) {
            for (let x = 0; x < gridSizeX; x++) {
                positions[index] = (x / gridSizeX - 0.5) * 40; // x (-10 a 10)
                positions[index + 1] = (y / gridSizeY - 0.5) * 20; // y (-5 a 5)
                positions[index + 2] = 0; // z (inicialmente plano)
                index += 3;
            }
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Shaders para partículas
        const vertexShader = `
            uniform float uTime;
            uniform vec2 uMouse;
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                vec3 pos = position;

                // Movimiento ambiental suave
                pos.z += sin(pos.x * 0.3 + uTime * 0.5) * cos(pos.y * 0.3 + uTime * 0.4) * 0.2;

                // Efecto hover: acercar a la cámara
                vec2 mouse3D = uMouse * vec2(20.0, 10.0) - vec2(10.0, 5.0); // Mapear a espacio 2D
                float dist = distance(pos.xy, mouse3D);
                if (dist < 2.5) {
                    pos.z += (2.0 - dist) * 2.0 * (sin(uTime * 1.0) * 0.3 + 0.6); // Suave y amplio
                }

                gl_PointSize = 4.0; // Tamaño para rectángulos pequeños
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            varying vec3 vPosition;
            void main() {
                // Simular forma rectangular
                vec2 uv = gl_PointCoord - vec2(0.5);
                if (abs(uv.x) > 0.4 || abs(uv.y) > 0.4) discard; // Forma rectangular

                // Colores oscuros con brillo
                vec3 baseColor = vec3(0.002, 0.005, 0.03); // Azul casi negro
                vec3 glowColor = vec3(0.08, 0.1, 0.25); // Brillo azulado-púrpura
                float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
                vec3 color = mix(baseColor, glowColor, intensity);
                gl_FragColor = vec4(color, 0.7); // Transparencia para suavidad
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

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            particleMaterial.uniforms.uTime.value += 0.05;
            renderer.render(scene, camera);
        }
        animate();

        // Interacción con el ratón
        container.addEventListener('mousemove', (event) => {
            const rect = container.getBoundingClientRect();
            particleMaterial.uniforms.uMouse.value.set(
                (event.clientX - rect.left) / rect.width,
                1- (event.clientY - rect.top) / rect.height
            );
        });

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        });