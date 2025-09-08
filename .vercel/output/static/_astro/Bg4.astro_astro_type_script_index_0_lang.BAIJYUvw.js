import{S as c,O as v,W as d,P as m,b as w,V as a,a as g}from"./three.module.DyOAe2fj.js";const o=document.getElementById("three-container4"),r=new c,s=o.clientWidth,l=o.clientHeight,f=new v(-1,1,1,-1,0,1),n=new d({alpha:!0,antialias:!0});n.setSize(s,l);n.setPixelRatio(window.devicePixelRatio);o.appendChild(n.domElement);const h=new m(2,2),p=`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,x=`
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // Simple random noise function
        float random(vec2 st) {
            return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
            vec2 uv = vUv * uResolution / min(uResolution.x, uResolution.y);

            // Larger waves (lower frequency for a wider texture)
            float wave1 = sin(uv.x * 2.0 + uTime * 0.2) * cos(uv.y * 2.0 + uTime * 0.15) * 0.2;
            float wave2 = sin(uv.x * 1.0 - uTime * 0.3) * cos(uv.y * 1.0 - uTime * 0.2) * 0.15;

            // Combine waves
            float wave = wave1 + wave2;

            // Darker color palette
            vec3 baseColor = vec3(0.01, 0.02, 0.01); // Very dark blue
            vec3 accentColor = vec3(0.03, 0.05, 0.1); // Very dark purple
            vec3 glowColor = vec3(0.1, 0.1, 0.2); // Dark bluish glow

            // Gradient based on waves
            vec3 color = mix(baseColor, accentColor, wave * 0.5 + 0.5);

            // Glow effect with a larger interaction radius
            float distToMouse = distance(uv, uMouse * uResolution / min(uResolution.x, uResolution.y));
            float glow = exp(-distToMouse * 2.0) * 0.4; // Larger radius and stronger glow
            color += glowColor * glow * (sin(uTime * 1.2) * 0.2 + 0.8);

            // Bigger texture with less dense noise
            float noise = random(uv * 0.5 + uTime * 0.03) * 0.05; // Reduced scale for a larger texture
            color += vec3(noise);

            // Clamp colors to avoid exceeding 1.0
            color = clamp(color, 0.0, 1.0);

            gl_FragColor = vec4(color, 1.0);
        }
    `,i=new w({vertexShader:p,fragmentShader:x,uniforms:{uTime:{value:0},uResolution:{value:new a(s,l)},uMouse:{value:new a(.5,.5)}}}),R=new g(h,i);r.add(R);function u(){requestAnimationFrame(u),i.uniforms.uTime.value+=.05,n.render(r,f)}u();o.addEventListener("mousemove",t=>{const e=o.getBoundingClientRect();i.uniforms.uMouse.value.set((t.clientX-e.left)/e.width,1-(t.clientY-e.top)/e.height)});window.addEventListener("resize",()=>{const t=o.clientWidth,e=o.clientHeight;n.setSize(t,e),i.uniforms.uResolution.value.set(t,e)});
