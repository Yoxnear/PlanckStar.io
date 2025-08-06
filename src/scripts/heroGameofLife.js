  import * as THREE from "three";
  const container = document.getElementById("canvas-container");

  const scene = new THREE.Scene();

  const aspect = container.clientWidth / container.clientHeight;
  const viewSize = 20; 
  const camera = new THREE.OrthographicCamera(
    -viewSize * aspect, 
    viewSize * aspect, 
    viewSize, 
    -viewSize, 
    0.1, 
    10 
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    const aspect = container.clientWidth / container.clientHeight;
    camera.left = -viewSize * aspect;
    camera.right = viewSize * aspect;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  const gridSize = 50; // Size of the grid
  const cellSize = 1; // Size of each cell
  let grid = [];
  let cubes = [];

  const material = new THREE.MeshBasicMaterial({ color: 0x2a6065 }); // Color

  function initGrid() {
    for (let i = 0; i < gridSize; i++) {
      grid[i] = [];
      cubes[i] = [];
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = Math.random() > 0.7 ? 1 : 0;
        const geometry = new THREE.BoxGeometry(
          cellSize * 0.8,
          cellSize * 0.8,
          cellSize * 0.8
        );
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
          i * cellSize - gridSize / 2,
          j * cellSize - gridSize / 2,
          0
        );
        cube.visible = grid[i][j] === 1; 
        scene.add(cube);
        cubes[i][j] = cube;
      }
    }
  }

  function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const ni = (x + i + gridSize) % gridSize;
        const nj = (y + j + gridSize) % gridSize;
        count += grid[ni][nj];
      }
    }
    return count;
  }

  function updateGrid() {
    const newGrid = grid.map((row) => [...row]);
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const neighbors = countNeighbors(i, j);
        if (grid[i][j] === 1) {
          newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          newGrid[i][j] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    grid = newGrid;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        cubes[i][j].visible = grid[i][j] === 1;
      }
    }
  }

  camera.position.z = 10; // Camera position

  initGrid();

  let frameCount = 0;
  const updateInterval = 10; //Frames

  function animate() {
    requestAnimationFrame(animate);

    if (frameCount % updateInterval === 0) {
      updateGrid();
    }

    renderer.render(scene, camera);
    frameCount++;
  }

  animate();