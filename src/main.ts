import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'lil-gui'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true, })

// init
camera.position.z = 8;
camera.position.y = 5;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight,)
renderer.shadowMap.enabled = true;

// add to dom
document.body.appendChild(renderer.domElement)

//controls
const controls = new OrbitControls(camera, renderer.domElement)

// resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// stats
const stats = new Stats()
document.body.appendChild(stats.dom)


// light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 10, 0)
light.castShadow = true;
scene.add(light)

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

//plane
const planeGeometry = new THREE.PlaneGeometry(100, 100, 100)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane)

// cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.castShadow = true;
cube.position.y = 2;
scene.add(cube)

// helpers

cube.add(new THREE.AxesHelper(1))
const helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper)


// gui
const gui = new GUI();
const lightFolder = gui.addFolder('Light');
lightFolder.add(light.position, 'x', -5, 5, 0.01);
lightFolder.add(light.position, 'y', -5, 5, 0.01);
lightFolder.add(light.position, 'z', -5, 5, 0.01);
lightFolder.open();

const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.position, 'x', -5, 5, 0.01);
cubeFolder.add(cube.position, 'y', -5, 5, 0.01);
cubeFolder.add(cube.position, 'z', -5, 5, 0.01);
cubeFolder.add(cube.rotation, 'x', -Math.PI, Math.PI, 0.01).name('rotationX');
cubeFolder.add(cube.rotation, 'y', -Math.PI, Math.PI, 0.01).name('rotationY');
cubeFolder.add(cube.rotation, 'z', -Math.PI, Math.PI, 0.01).name('rotationZ');
cubeFolder.close()

const planeFolder = gui.addFolder('Plane');
planeFolder.add(plane.position, 'x', -5, 5, 0.01);
planeFolder.add(plane.position, 'y', -5, 5, 0.01);
planeFolder.add(plane.position, 'z', -5, 5, 0.01);
planeFolder.add(plane.rotation, 'x', -Math.PI, Math.PI, 0.01).name('rotationX');
planeFolder.add(plane.rotation, 'y', -Math.PI, Math.PI, 0.01).name('rotationY');
planeFolder.add(plane.rotation, 'z', -Math.PI, Math.PI, 0.01).name('rotationZ');
planeFolder.close()


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  stats.update();
}
animate()