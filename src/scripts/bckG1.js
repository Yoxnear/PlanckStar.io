import * as THREE from 'three';

export function createParticleGrid(canvasId = 'three-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with id "${canvasId}" not found.`);
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Crear partículas en cuadrícula
  const cols = 80;
  const rows = 40;
  const spacing = 3;
  const positions = [];
  const baseZ = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const posX = (x - cols / 2) * spacing;
      const posY = (y - rows / 2) * spacing;
      const posZ = 0;

      positions.push(posX, posY, posZ);
      baseZ.push(posX, posY); // guardamos X e Y para el efecto onda
    }
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttr = new THREE.Float32BufferAttribute(positions, 3);
  geometry.setAttribute('position', positionAttr);

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.35,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Animación con efecto de onda
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.02;

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = baseZ[i * 2];
      const y = baseZ[i * 2 + 1];
      const z = Math.sin((x + time * 5) * 0.1) * Math.cos((y + time * 5) * 0.1) * 1.5;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}