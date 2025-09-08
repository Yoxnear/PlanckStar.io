import{S as x,c as z,W as P,d as S,e as b,b as C,V as p,f as M,g as T}from"./three.module.DyOAe2fj.js";const t=document.getElementById("three-container3"),f=new x,o=new z(75,t.clientWidth/t.clientHeight,.1,1e3);o.position.z=12;const n=new P({alpha:!0,antialias:!0});n.setSize(t.clientWidth,t.clientHeight);n.setPixelRatio(window.devicePixelRatio);t.appendChild(n.domElement);const l=t.dataset.gridx,d=t.dataset.gridy,W=l*d,a=new Float32Array(W*3);let s=0;for(let i=0;i<d;i++)for(let e=0;e<l;e++)a[s]=(e/l-.5)*40,a[s+1]=(i/d-.5)*20,a[s+2]=0,s+=3;const g=new S;g.setAttribute("position",new b(a,3));const A=`
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            vec3 pos = position;

            // Ambient movement
            pos.z += sin(pos.x * 0.3 + uTime * 0.5) * cos(pos.y * 0.3 + uTime * 0.4) * 0.2;

            // Hover effect
            vec2 mouse3D = uMouse; 
            float dist = distance(pos.xy, mouse3D);
            if (dist < 2.5) {
                pos.z += (2.0 - dist) * 2.0 * (sin(uTime * 1.0) * 0.3 + 0.6);
            }
            gl_PointSize = 4.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,H=`
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            if (abs(uv.x) > 0.4 || abs(uv.y) > 0.4) discard;

            vec3 baseColor = vec3(0.8, 0.8, 0.8); 
            vec3 glowColor = vec3(0.8, 0.8, 0.8);   
            float intensity = sin(uTime * 0.2 + vPosition.x * 0.2 + vPosition.y * 0.2) * 0.2 + 0.8;
            vec3 color = mix(baseColor, glowColor, intensity);
            gl_FragColor = vec4(color, 0.3);
        }
    `,u=new C({vertexShader:A,fragmentShader:H,uniforms:{uTime:{value:0},uMouse:{value:new p(0,0)}},transparent:!0}),R=new M(g,u);f.add(R);const r=new p,c=new T;t.addEventListener("mousemove",i=>{const e=t.getBoundingClientRect();r.x=(i.clientX-e.left)/e.width*2-1,r.y=-((i.clientY-e.top)/e.height)*2+1,c.set(r.x,r.y,.5),c.unproject(o);const m=c.sub(o.position).normalize(),h=-o.position.z/m.z,v=o.position.clone().add(m.multiplyScalar(h));u.uniforms.uMouse.value.set(v.x,v.y)});function w(){requestAnimationFrame(w),u.uniforms.uTime.value+=.05,n.render(f,o)}w();function y(){const i=t.clientWidth,e=t.clientHeight;n.setSize(i,e),o.aspect=i/e,o.updateProjectionMatrix()}window.addEventListener("resize",y);y();
