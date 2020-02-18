//
// ONE
// hello circle
//
//

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.arc(width / 2, height / 2, 500, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill()
    context.font = '120px helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = 'white'
    context.fillText('hello.', width / 2, height / 2)
  };
};

canvasSketch(sketch, settings);
