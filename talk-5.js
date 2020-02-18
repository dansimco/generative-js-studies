//
// FIVE
// Breaking it
// Sometimes you get some Bob Ross happy accidents
//

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [2048, 2048]
};

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
  const points = createGrid(10);
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Loop through each point and draw
    points.forEach(([u, v]) => {
      // Forgot to remove the u multiplier here
      const x = u * lerp(margin, width-margin, u);
      const y = v * height;

      // draw a dot
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.strokeWidth = 3;
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
