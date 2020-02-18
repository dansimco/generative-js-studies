const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random  = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048]
};

random.setSeed(random.getRandomSeed())
//This is a string, if you put a number in setSeed it wont match
console.log(random.getSeed()) 

const palette = random.shuffle(random.pick(palettes).slice(0, 5))
const characters = ['|','°']

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      const pointSize = random.noise2D(u, v);
      points.push({
        pointSize: Math.abs(pointSize) * 0.1,
        position: [u, v],
        rotation: random.noise2D(u, v),
        color: random.pick(palette),
        character: random.pick(characters)
      });
    }
  }
  return points;
};


const sketch = () => {

  const points = createGrid(50).filter(() => random.value() > 0.5)
  const margin = 100;
  return ({ context, width, height }) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const {
        position,
        pointSize,
        color,
        character,
        rotation
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.save()
      context.fillStyle = color
      context.font = `${pointSize * width}px 'helvetica'`
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText(character, 0, 0)
      context.restore()
    });
  };
};

canvasSketch(sketch, settings);
