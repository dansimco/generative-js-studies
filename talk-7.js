//
// SEVEN
// get   r   n d   m
//
//

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [2048, 2048]
};

const bias = 0; // 0 all 1 none

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push([u, v]);
    }
  }
  return points;
};

const sketch = () => {
  const points = createGrid(20).filter(() => Math.random() > bias)
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, 13, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.strokeWidth = 3;
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
