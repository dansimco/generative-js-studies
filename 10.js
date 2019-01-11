const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math"); // Linear Interpolation
const random  = require("canvas-sketch-util/random"); // Linear Interpolation
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048]
};

random.setSeed("a")
const palette = random.shuffle(random.pick(palettes).slice(0, 5))

const createGrid = count => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1);
      const radius = random.noise2D(u, v);
      points.push({
        radius: Math.abs(radius) * 0.1, // Gaussian is more interesting!
        position: [u, v],
        rotation: random.noise2D(u, v),
        color: random.pick(palette)
      });
    }
  }
  return points;
};

const sketch = () => {

  const points = createGrid(50).filter(() => random.value() > 0.5)
  const margin = 100;
  return ({ context, width, height }) => {
    // Fill paper colour, otherwise it's a transparent png
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Loop through each point and draw
    points.forEach((data) => {
      const {
        position,
        radius,
        color,
        rotation
      } = data;
      const [u, v] = position;
      // translate UV into pixel space
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // draw a dot
      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = "black";
      // context.strokeWidth = 3;
      // context.fillStyle = color;
      // context.fill();

      context.save()
      context.fillStyle = color
      context.font = `${radius * width}px "Helvetica"`
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText("⌵", 0, 0)
      context.restore()

    });
  };
};

canvasSketch(sketch, settings);
