//
// SEVEN
// get   rAndOmer
//
//

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

// Using canvas-sketch's random tool for more random goodness
const random  = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048]
};

// random.setSeed(random.getRandomSeed())
// console.log(random.getSeed())

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push({
        radius: random.value() * 0.02,
        // radius: Math.abs(random.gaussian() * 0.015),
        position: [u, v]
      });
    }
  }
  return points;
};

const sketch = () => {
  const points = createGrid(20).filter(() => random.value() > 0.5)
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const {
        position,
        radius
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.strokeWidth = 3;
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
