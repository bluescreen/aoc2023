import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { numberToColorHex } from "./util.js";
import * as bricks from "./data.json";

const DEBUG = false;

function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);
  if (DEBUG) scene.add(new THREE.AxesHelper(5));

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.position.set(10, 10, 20);
  camera.lookAt(0, 1, 0);
  camera.logarithmicDepthBuffer = true;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  setupLights(scene);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  plane.receiveShadow = true;
  scene.add(plane);

  return { scene, camera, renderer };
}

function setupLights(scene) {
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemiLight.position.set(0, 0, 20);
  hemiLight.castShadow = true;

  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.shadow.mapSize.width = 512; // default
  dirLight.shadow.mapSize.height = 512; // default
  dirLight.shadow.camera.near = 0.5; // default
  dirLight.shadow.camera.far = 600; // default
  dirLight.castShadow = true;
  dirLight.position.set(50, 50, 50);
  dirLight.lookAt(0, 1, 20);

  scene.add(dirLight);
  if (DEBUG) scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
}

function addBricks(scene, bricks) {
  let i = 0;
  for (let brick of bricks) {
    const [x1, y1, z1] = brick[0];
    const [x2, y2, z2] = brick[1];

    var coord1 = new THREE.Vector3(x1, y1, z1);
    var coord2 = new THREE.Vector3(x2, y2, z2);

    var center = new THREE.Vector3();
    center.addVectors(coord1, coord2).multiplyScalar(0.5);

    const solidGeometry = new THREE.BoxGeometry(
      Math.abs(x2 - x1) + 1,
      Math.abs(y2 - y1) + 1,
      Math.abs(z2 - z1) + 1
    );
    const solidMaterial = new THREE.MeshBasicMaterial({
      color: numberToColorHex(i),
    });
    const solidBox = new THREE.Mesh(solidGeometry, solidMaterial);
    solidBox.castShadow = true;
    solidBox.receiveShadow = true;

    scene.add(solidBox);

    const wireframeGeometry = new THREE.EdgesGeometry(solidGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(
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
