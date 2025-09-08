import{S as A,c as b,W as P,d as S,e as l,b as x,A as y,f as z}from"./three.module.DyOAe2fj.js";const n=document.getElementById("spark-container"),h=new A,f=n.clientWidth,m=n.clientHeight,t=new b(75,f/m,.1,1e3);t.position.z=5;const a=new P({alpha:!0,antialias:!0});a.setSize(f,m);a.setPixelRatio(window.devicePixelRatio);n.appendChild(a.domElement);const s=n.dataset.count,i=new Float32Array(s*3),p=new Float32Array(s),V=t.fov*Math.PI/180,u=2*Math.tan(V/2)*t.position.z,F=u*t.aspect;for(let e=0;e<s;e++)i[e*3]=(Math.random()-.5)*F,i[e*3+1]=(Math.random()-.5)*u,i[e*3+2]=(Math.random()-.5)*2,p[e]=Math.random()*100;const r=new S;r.setAttribute("position",new l(i,3));r.setAttribute("offset",new l(p,1));const W=`
  uniform float uTime;
  attribute float offset;
  varying float vAlpha;

  void main() {
    float sparkLife = sin(uTime * 2.0 + offset);
    vAlpha = max(sparkLife, 0.0);

    gl_PointSize = vAlpha * 6.0; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,k=`
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if(d > 0.5) discard;

    vec3 color = vec3(1.0, 0.8, 0.8);
    gl_FragColor = vec4(color, vAlpha);
  }
`,v=new x({uniforms:{uTime:{value:0}},vertexShader:W,fragmentShader:k,transparent:!0,blending:y,depthWrite:!1}),C=new z(r,v);h.add(C);function w(){requestAnimationFrame(w),v.uniforms.uTime.value+=.02,a.render(h,t)}w();window.addEventListener("resize",()=>{const e=n.clientWidth,c=n.clientHeight;a.setSize(e,c),t.aspect=e/c,t.updateProjectionMatrix();const g=t.fov*Math.PI/180,d=2*Math.tan(g/2)*t.position.z,M=d*t.aspect;for(let o=0;o<s;o++)i[o*3]=(Math.random()-.5)*M,i[o*3+1]=(Math.random()-.5)*d;r.attributes.position.needsUpdate=!0});
