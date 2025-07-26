  const canvas = document.getElementById('grid-bg');
  const ctx = canvas.getContext('2d');

  let gridSize = 8; // Cambia este valor para hacer el grid más grande o más pequeño

  function drawGrid(size = gridSize, color = 'rgba(0,0,0,2)') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  window.addEventListener('resize', drawGrid);
  drawGrid();