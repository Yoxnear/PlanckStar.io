import{S as x,c as z,W as P,d as S,e as b,b as C,V as p,f as M,g as T}from"./three.module.DyOAe2fj.js";const o=document.getElementById("three-container3"),f=new x,i=new z(75,o.clientWidth/o.clientHeight,.1,1e3);i.position.z=12;const n=new P({alpha:!0,antialias:!0});n.setSize(o.clientWidth,o.clientHeight);n.setPixelRatio(window.devicePixelRatio);o.appendChild(n.domElement);const l=50,u=40,W=l*u,a=new Float32Array(W*3);let s=0;for(let t=0;t<u;t++)for(let e=0;e<l;e++)a[s]=(e/l-.5)*40,a[s+1]=(t/u-.5)*20,a[s+2]=0,s+=3;const g=new S;g.setAttribute("position",new b(a,3));const A=`
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
    `,H=`
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
    `,d=new C({vertexShader:A,fragmentShader:H,uniforms:{uTime:{value:0},uMouse:{value:new p(0,0)}},transparent:!0}),R=new M(g,d);f.add(R);const r=new p,c=new T;o.addEventListener("mousemove",t=>{const e=o.getBoundingClientRect();r.x=(t.clientX-e.left)/e.width*2-1,r.y=-((t.clientY-e.top)/e.height)*2+1,c.set(r.x,r.y,.5),c.unproject(i);const m=c.sub(i.position).normalize(),h=-i.position.z/m.z,v=i.position.clone().add(m.multiplyScalar(h));d.uniforms.uMouse.value.set(v.x,v.y)});function w(){requestAnimationFrame(w),d.uniforms.uTime.value+=.05,n.render(f,i)}w();function y(){const t=o.clientWidth,e=o.clientHeight;n.setSize(t,e),i.aspect=t/e,i.updateProjectionMatrix()}window.addEventListener("resize",y);y();
