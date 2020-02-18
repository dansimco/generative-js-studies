//
// FOUR
// Using linear interpolation to fit it in bounds and keep it even
// Lerp interpolates a value between two points base on an 0..1 input
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
  const points = createGrid(5);
  const radius = 40;
  const margin = 200;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Loop through each point and draw
    points.forEach(([u, v]) => {
      // Interpolate the position between margin, and
      // width minus the margin to get margin-right
      const x = lerp(margin, width-margin, u);
      const y = lerp(margin, height-margin, v);

      // draw a dot
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.strokeWidth = 3;
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
