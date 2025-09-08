import{S as s,O as v,W as m,P as u,b as f,V as d,a as w}from"./three.module.DyOAe2fj.js";const e=document.getElementById("three-container2"),r=new s,a=e.clientWidth,c=e.clientHeight,h=new v(-1,1,1,-1,0,1),o=new m({alpha:!0,antialias:!0});o.setSize(a,c);o.setPixelRatio(window.devicePixelRatio);e.appendChild(o.domElement);const g=new u(2,2),x=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,p=`
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // 2D Perlin noise function
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

    // fbm noise (fractional Brownian motion) for more complex patterns
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

        // Create cosmic flow with fbm noise
        vec2 flowUv = uv * 1.2 + uTime * 0.3; // Dynamic movement
        float flow = fbm(flowUv);

        // Add soft vortices
        vec2 vortexUv = uv * 1.5 + vec2(cos(uTime * 0.2), sin(uTime * 0.2)) * 0.5;
        float vortex = fbm(vortexUv + flow * 0.5) * 0.5;

        // Combine patterns
        float pattern = flow + vortex * 0.3;

        // Ultra dark color palette
        vec3 baseColor = vec3(0.01, 0.01, 0.02); // Extremely dark blue
        vec3 accentColor = vec3(0.04, 0.04, 0.05); // Almost black purple
        vec3 glowColor = vec3(0.06, 0.06, 0.07); // Very dark bluish glow

        // Dynamic gradient
        vec3 color = mix(baseColor, accentColor, pattern * 0.7 + 0.3);

        // Pulsating glow effect
        float glow = sin(uTime * 0.5 + pattern * 3.0) * 0.3 + 0.7;
        color += glowColor * glow * 0.35;

        // Add fine noise for texture
        float fineNoise = noise(uv * 3.0 + uTime * 0.15) * 0.02;
        color += vec3(fineNoise);

        // Ensure the color doesn't exceed 1.0
        color = clamp(color, 0.0, 1.0);

        gl_FragColor = vec4(color, 1.0);
    }
`,t=new f({vertexShader:x,fragmentShader:p,uniforms:{uTime:{value:0},uResolution:{value:new d(a,c)}}}),b=new w(g,t);r.add(b);function l(){requestAnimationFrame(l),t.uniforms.uTime.value+=.05,o.render(r,h)}l();window.addEventListener("resize",()=>{const n=e.clientWidth,i=e.clientHeight;o.setSize(n,i),t.uniforms.uResolution.value.set(n,i)});
