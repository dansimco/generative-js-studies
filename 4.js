const canvasSketch = require("canvas-sketch");
const { lerp } = require('canvas-sketch-util/math'); // Linear Interpolation

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
  const points = createGrid(20);
  const margin = 100;
  return ({ context, width, height }) => {
    // Fill paper colour, otherwise it's a transparent png
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Loop through each point and draw
    points.forEach(([u, v]) => {
      // translate UV into pixel space
      const x = lerp(margin, width-margin, u);
      const y = lerp(margin, height-margin, v);

      // draw a dot
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.strokeStyle = "black";
      context.strokeWidth = 3;
      context.fillStyle = "black";
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
