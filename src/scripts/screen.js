import * as THREE from 'three';

const container = document.getElementById('three-container');
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); // aspecto se define después
camera.position.z = 5;

// Tamaño inicial
function resizeRendererToDisplaySize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const htmlCanvas = document.createElement('canvas');
htmlCanvas.width = 1080;
htmlCanvas.height = 720;
const htmlCtx = htmlCanvas.getContext('2d');

function renderHTMLToCanvas() {
  htmlCtx.fillStyle = 'white';
  htmlCtx.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
  htmlCtx.fillStyle = 'black';
  htmlCtx.font = '20px sans-serif';
  htmlCtx.fillText('Planckstar UI - Vista Web', 10, 50);
}

const texture = new THREE.CanvasTexture(htmlCanvas);
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.PlaneGeometry(3, 4);
const screenMesh = new THREE.Mesh(geometry, material);
screenMesh.rotation.y = -0.3;
scene.add(screenMesh);

function animate() {
  resizeRendererToDisplaySize();
  renderHTMLToCanvas();
  texture.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();