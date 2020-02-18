// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require('nice-color-palettes/100.json');
const glslify = require('glslify');

const settings = {
  // Make the loop animated
  animate: true,
  // attributes: {antialias: true},
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  pallete = random.pick(palettes)
  renderer.setClearColor("#eaeaea", 1);
  renderer.setClearColor(pallete[0], 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());


  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const fragmentShader = glslify(`
    varying vec2 vUv;
    uniform vec3 color;

    #pragma glslify: noise = require('glsl-noise/simplex/4d');

    void main () {
      gl_FragColor = vec4(vec3(color * vUv.x), 1.0);
    }
  `)

  const vertexShader = glslify(`
    varying vec2 vUv;
    uniform float time;
    #pragma glslify: noise = require('glsl-noise/simplex/4d');

    void main () {
      vUv = uv;
      vec3 pos = position.xyz * sin(time);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
    }
  `)

  const meshes = []
  for (let i=0; i<64; i++) {
    // const material = new THREE.MeshStandardMaterial({
    //   color: random.pick(pallete),
    //   wireframe: false
    // });

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        color: {value: new THREE.Color(random.pick(pallete))},
        time: {value: 0}
      }
    });
    

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    )
    mesh.scale.multiplyScalar(0.4)
    mesh.position.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    )
    meshes.push(mesh)
    scene.add(mesh);
  }

  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(0,4,2)
  scene.add(light);

  const ambient = new THREE.AmbientLight("white", 1);
  scene.add(ambient);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.5;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead, time }) {

      meshes.forEach(mesh => {
        mesh.material.uniforms.time.value = time;
      // mesh.rotate.y = time
      });
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
