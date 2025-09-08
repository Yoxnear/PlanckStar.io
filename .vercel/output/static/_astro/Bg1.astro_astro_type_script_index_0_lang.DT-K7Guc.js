import{S as p,c as v,W as w,d as h,e as f,b as g,f as y}from"./three.module.DyOAe2fj.js";const t=document.getElementById("three-container1"),r=t.dataset.particles,s=new p,c=t.clientWidth,l=t.clientHeight,n=new v(75,c/l,.1,1e3);n.position.z=8;const i=new w({alpha:!0,antialias:!0});i.setSize(c,l);i.setPixelRatio(window.devicePixelRatio);t.appendChild(i.domElement);const m=new h,o=new Float32Array(r*3);for(let e=0;e<r*3;e+=3)o[e]=(Math.random()-.5)*35,o[e+1]=(Math.random()-.5)*20,o[e+2]=(Math.random()-.5)*3;m.setAttribute("position",new f(o,3));const P=`
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            vec3 pos = position;

            pos.y += sin(pos.x * 0.4 + uTime * 0.5) * cos(pos.z * 0.4 + uTime * 0.4) * 0.5;

            gl_PointSize = 2.2; // Large particles
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,b=`
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
    `,d=new g({vertexShader:P,fragmentShader:b,uniforms:{uTime:{value:0}},transparent:!0}),x=new y(m,d);s.add(x);function u(){requestAnimationFrame(u),d.uniforms.uTime.value+=.05,i.render(s,n)}u();window.addEventListener("resize",()=>{const e=t.clientWidth,a=t.clientHeight;i.setSize(e,a),n.aspect=e/a,n.updateProjectionMatrix()});
