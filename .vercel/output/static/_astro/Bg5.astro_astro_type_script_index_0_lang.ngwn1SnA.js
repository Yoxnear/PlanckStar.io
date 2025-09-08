import{S as P,c as S,W as C,V as w,g as V,d as D,e as W,b as A,f as B}from"./three.module.DyOAe2fj.js";const e=document.getElementById("dynamic-bg"),h=new P,t=new S(75,e.clientWidth/e.clientHeight,.1,1e3);t.position.z=20;const v=new C({alpha:!0,antialias:!0});v.setPixelRatio(window.devicePixelRatio);e.appendChild(v.domElement);let l=e.dataset.gridx,p=e.dataset.gridy,d=null,f=null;function y(){const s=t.fov*Math.PI/180,i=2*Math.tan(s/2)*t.position.z,a=i*t.aspect,o=new Float32Array(l*p*3);for(let r=0;r<p;r++)for(let c=0;c<l;c++){const m=(r*l+c)*3;o[m]=(c/(l-1)-.5)*a,o[m+1]=(r/(p-1)-.5)*i,o[m+2]=0}const n=new D;n.setAttribute("position",new W(o,3));const z=`
    uniform vec2 uMouse;
    varying float vDist;

    void main() {
        vec3 pos = position;
        vec2 mouse3D = uMouse;
        float dist = distance(pos.xy, mouse3D);
        vDist = dist;

        // Hover: elevar partículas cercanas al cursor
        if(dist < 6.0){
          pos.z += (6.0 - dist) * 0.6;
        }

        gl_PointSize = 4.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }`,M=`
    varying float vDist;

    void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        if(length(uv) > 0.5) discard;

        vec3 baseColor = vec3(0.05, 0.05, 0.2);
        vec3 highlight = vec3(0.3, 0.6, 1.0);
        float intensity = smoothstep(0.0, 5.0, 5.0 - vDist);
        vec3 color = mix(baseColor, highlight, intensity);

        gl_FragColor = vec4(color, 0.9);
    }`;f=new A({vertexShader:z,fragmentShader:M,uniforms:{uMouse:{value:new w(0,0)}},transparent:!0}),d&&h.remove(d),d=new B(n,f),h.add(d)}y();const u=new w,g=new V;e.addEventListener("mousemove",s=>{const i=e.getBoundingClientRect();u.x=(s.clientX-i.left)/i.width*2-1,u.y=-((s.clientY-i.top)/i.height)*2+1,g.set(u.x,u.y,.5),g.unproject(t);const a=g.sub(t.position).normalize(),o=-t.position.z/a.z,n=t.position.clone().add(a.multiplyScalar(o));f.uniforms.uMouse.value.set(n.x,n.y)});function x(){requestAnimationFrame(x),v.render(h,t)}x();function b(){v.setSize(e.clientWidth,e.clientHeight),t.aspect=e.clientWidth/e.clientHeight,t.updateProjectionMatrix(),y()}window.addEventListener("resize",b);b();
