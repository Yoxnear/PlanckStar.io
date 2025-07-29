        import * as THREE from 'three';

        const container = document.getElementById('three-container2');
        const scene = new THREE.Scene();

        // Tamaño del canvas según el contenedor
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Cámara ortográfica
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Geometría del plano
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Shaders
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uResolution;
            varying vec2 vUv;

            // Función de ruido Perlin 2D
            float random(vec2 st) {
                return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(
                    mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x),
                    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
                    u.y
                );
            }

            // Ruido fbm (fractional Brownian motion) para patrones más complejos
            float fbm(vec2 st) {
                float v = 0.0;
                float a = 0.5;
                vec2 shift = vec2(100.0);
                for (int i = 0; i < 6; ++i) {
                    v += a * noise(st);
                    st = st * 2.0 + shift;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = vUv * uResolution / min(uResolution.x, uResolution.y);

                // Crear flujo cósmico con ruido fbm
                vec2 flowUv = uv * 1.2 + uTime * 0.3; // Movimiento dinámico
                float flow = fbm(flowUv);

                // Añadir vórtices suaves
                vec2 vortexUv = uv * 1.5 + vec2(cos(uTime * 0.2), sin(uTime * 0.2)) * 0.5;
                float vortex = fbm(vortexUv + flow * 0.5) * 0.5;

                // Combinar patrones
                float pattern = flow + vortex * 0.3;

                // Paleta de colores ultra oscuros
                vec3 baseColor = vec3(0.005, 0.01, 0.02); // Azul extremadamente oscuro
                vec3 accentColor = vec3(0.03, 0.02, 0.04); // Púrpura casi negro
                vec3 glowColor = vec3(0.1, 0.1, 0.1); // Brillo azulado muy oscuro


                // Gradiente dinámico
                vec3 color = mix(baseColor, accentColor, pattern * 0.7 + 0.3);

                // Efecto de brillo pulsante
                float glow = sin(uTime * 0.5 + pattern * 3.0) * 0.3 + 0.7;
                color += glowColor * glow * 0.35;

                // Añadir ruido fino para textura
                float fineNoise = noise(uv * 3.0 + uTime * 0.15) * 0.02;
                color += vec3(fineNoise);

                // Asegurar que el color no supere 1.0
                color = clamp(color, 0.0, 1.0);

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        // Material con shaders
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                uResolution: { value: new THREE.Vector2(width, height) }
            }
        });

        // Crear el plano y añadirlo a la escena
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            material.uniforms.uTime.value += 0.05;
            renderer.render(scene, camera);
        }
        animate();

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            material.uniforms.uResolution.value.set(newWidth, newHeight);
        });