import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { numberToColorHex } from "./util.js";
import * as bricks from "./data.json";

function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  new OrbitControls(camera, renderer.domElement);

  const camPos = {
    x: 0,
    y: 0,
    z: 20,
  };
  camera.position.set(camPos.x, camPos.y, camPos.z);

  return { scene, camera, renderer };
}

function addBricks(scene, bricks) {
  let i = 0;
  for (let brick of bricks) {
    const [x1, y1, z1] = brick[1];
    const [x2, y2, z2] = brick[0];

    var coord1 = new THREE.Vector3(x1, y1, z1);
    var coord2 = new THREE.Vector3(x2, y2, z2);

    var center = new THREE.Vector3();
    center.addVectors(coord1, coord2).multiplyScalar(0.5);
    var distance = coord1.distanceTo(coord2);

    var solidGeometry = new THREE.BoxGeometry(
      Math.abs(x2 - x1) + 1,
      Math.abs(y2 - y1) + 1,
      Math.abs(z2 - z1) + 1
    );
    const solidMaterial = new THREE.MeshBasicMaterial({
      color: numberToColorHex(i),
    });
    var solidBox = new THREE.Mesh(solidGeometry, solidMaterial);
    scene.add(solidBox);

    var wireframeGeometry = new THREE.EdgesGeometry(solidGeometry);
    var wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1,
    });
    var wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );
    solidBox.add(wireframe);

    solidBox.position.copy(center);
    i++;
  }
}

const { scene, camera, renderer } = initScene();
addBricks(scene, bricks.default);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
