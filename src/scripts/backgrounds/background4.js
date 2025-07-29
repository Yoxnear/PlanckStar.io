        import * as THREE from 'three';

        const container = document.getElementById('three-container4');
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
            uniform vec2 uMouse;
            varying vec2 vUv;

            // Función de ruido simple
            float random(vec2 st) {
                return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            void main() {
                vec2 uv = vUv * uResolution / min(uResolution.x, uResolution.y);

                // Ondas más grandes (menor frecuencia para textura más amplia)
                float wave1 = sin(uv.x * 2.0 + uTime * 0.2) * cos(uv.y * 2.0 + uTime * 0.15) * 0.2;
                float wave2 = sin(uv.x * 1.0 - uTime * 0.3) * cos(uv.y * 1.0 - uTime * 0.2) * 0.15;

                // Combinar ondas
                float wave = wave1 + wave2;

                // Paleta de colores más oscuros
                vec3 baseColor = vec3(0.01, 0.02, 0.01); // Azul muy oscuro
                vec3 accentColor = vec3(0.03, 0.05, 0.1); // Púrpura muy oscuro
                vec3 glowColor = vec3(0.1, 0.1, 0.2); // Brillo azulado oscuro

                // Gradiente basado en ondas
                vec3 color = mix(baseColor, accentColor, wave * 0.5 + 0.5);

                // Efecto de brillo con mayor radio de interacción
                float distToMouse = distance(uv, uMouse * uResolution / min(uResolution.x, uResolution.y));
                float glow = exp(-distToMouse * 2.0) * 0.4; // Mayor radio y brillo más pronunciado
                color += glowColor * glow * (sin(uTime * 1.2) * 0.2 + 0.8);

                // Textura más grande con ruido menos denso
                float noise = random(uv * 0.5 + uTime * 0.03) * 0.05; // Escala reducida para textura más grande
                color += vec3(noise);

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
                uResolution: { value: new THREE.Vector2(width, height) },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) }
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

        // Interacción con el ratón
        container.addEventListener('mousemove', (event) => {
            const rect = container.getBoundingClientRect();
            material.uniforms.uMouse.value.set(
                (event.clientX - rect.left) / rect.width,
                1 - (event.clientY - rect.top) / rect.height
            );
        });

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            renderer.setSize(newWidth, newHeight);
            material.uniforms.uResolution.value.set(newWidth, newHeight);
});