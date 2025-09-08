import{S as v,c as p,W as w,d as f,e as h,b as g,f as y}from"./three.module.DyOAe2fj.js";const t=document.getElementById("three-container1"),r=new v,s=t.clientWidth,c=t.clientHeight,n=new p(75,s/c,.1,1e3);n.position.z=8;const o=new w({alpha:!0,antialias:!0});o.setSize(s,c);o.setPixelRatio(window.devicePixelRatio);t.appendChild(o.domElement);const l=5e3,m=new f,i=new Float32Array(l*3);for(let e=0;e<l*3;e+=3)i[e]=(Math.random()-.5)*35,i[e+1]=(Math.random()-.5)*20,i[e+2]=(Math.random()-.5)*3;m.setAttribute("position",new h(i,3));const P=`
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
`,S=`
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
    `,d=new g({vertexShader:P,fragmentShader:S,uniforms:{uTime:{value:0}},transparent:!0}),b=new y(m,d);r.add(b);function u(){requestAnimationFrame(u),d.uniforms.uTime.value+=.05,o.render(r,n)}u();window.addEventListener("resize",()=>{const e=t.clientWidth,a=t.clientHeight;o.setSize(e,a),n.aspect=e/a,n.updateProjectionMatrix()});
