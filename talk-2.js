//
// TWO
// Fill and stroke
// Export for print
//

const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: [200,200],
  dimensions: 'A4',
  orientation: 'portrait',
  units: 'mm',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#0201D3';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#FF315F';
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 6;
    context.arc(width / 2, height / 2, 40, 0, Math.PI * 2, false);
    context.fill()
    context.stroke()
  };
};

canvasSketch(sketch, settings);
