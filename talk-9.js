//
// NINE
// Colour!
// 
//

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math'); 
const random  = require('canvas-sketch-util/random');

// Give me free colour palettes because I'm lazy
const palettes = require('nice-color-palettes/100.json');

const settings = {
  dimensions: [2048, 2048]
};

random.setSeed(random.getRandomSeed())
console.log(random.getSeed())

const palette = random.pick(palettes).slice(0, 3)
// const palette = ['#0201D3', '#FF315F', '#ffffff', '#dddddd']

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push({
        // radius: random.value() * 0.02,
        radius: Math.abs(random.gaussian() * 0.02),
        position: [u, v],
        color: random.pick(palette)
      });
    }
  }
  return points;
};

const sketch = () => {

  const points = createGrid(30).filter(() => random.value() > 0.5)
  const margin = 100;
  return ({ context, width, height }) => {
    // Use a random colour for the bg as well!
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const {
        position,
        radius,
        color
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.strokeWidth = 3;
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
