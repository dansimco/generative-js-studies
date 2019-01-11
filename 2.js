const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [200,200],
  orientation: 'portrait',
  units: 'mm',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'orange';
    context.arc(width / 2, height / 2, 20, 0, Math.PI * 2, false);
    context.fill()
  };
};

canvasSketch(sketch, settings);
