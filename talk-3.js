//
// THREE
// Loop it
//
//

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048,2048],
};

// returns a grid of points, count-per-row
const createGrid = (count) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y= 0; y < count; y++) {
      // Must add -1 to the count divisor otherwise due
      // to the full width/height is divided it never
      // reaches the end

      // Also, better guard against /0 values now it's -1
      // just put a single item in the middle
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push([u, v]);
    }
  }
  return points;
}

const sketch = () => {
  // Start a looooop
  const points = createGrid(1);
  const radius = 40;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect (0, 0, width, height);

    // Loop through each point and draw
    points.forEach(([u, v]) => {

      // translate UV into pixel space
      const x = u * width;
      const y = v * height;

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
