//
// ELEVEN
// If you can type you can 👩‍💻
// 
//

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random  = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048]
};

// random.setSeed(875407)
random.setSeed(random.getRandomSeed())
console.log(random.getSeed())

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      const pointSize = random.noise2D(u, v);
      const emojis = ['🐹', '🐰', '🦊', '🐻', '🐼', '🐤'];
      // const emojis = ['🍇', '🍑', '🍉', '🍋', '🍍', '🥥', '🍐', '🍒'];
      points.push({
        pointSize: Math.abs(pointSize) * 0.3,
        position: [u, v],
        rotation: random.noise2D(u, v),
        emoji: random.pick(emojis)
      });
    }
  }
  return points;
};

const sketch = () => {

  const points = createGrid(8).filter(() => random.value() > 0.5)
  const margin = 200;
  return ({ context, width, height }) => {
    // Fill paper colour, otherwise it's a transparent png
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Loop through each point and draw
    points.forEach((data) => {
      const {
        position,
        pointSize,
        rotation,
        emoji
      } = data;
      const [u, v] = position;
      // translate UV into pixel space
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save()
      context.font = `${pointSize * width}px 'Helvetica'`
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText(emoji, 0, 0)
      context.restore()

    });
  };
};

canvasSketch(sketch, settings);
