import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const roughTexture1 = textureLoader.load('/Textures/bark-7635-normal.jpg')
const smoothTexture1 = textureLoader.load('/Textures/silk-5814-normal.jpg')
const grassNormalMap = textureLoader.load("/Textures/grass_normal_map.jpg");

// const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// FLOOR
// for (var i = -50; i <= 50; i += 5) {
//     for (var j = -50; j <= 50; j += 5) {
//         const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 1), new THREE.MeshPhongMaterial({ color: 0x0a7d15, normalMap: grassNormalMap }));
//         plane.position.x = i;
//         plane.position.z = j;
//         plane.rotation.x = - Math.PI / 2
//         scene.add(plane);
//     }
// }

// Objects
const geometry_torus = new THREE.TorusGeometry( .7, .2, 16, 10 );
const geometry_sphere = new THREE.SphereGeometry(1, 32, 16);
const geometry_cube = new THREE.BoxGeometry(1, 1, 1);

// Materials

const material_red = new THREE.MeshStandardMaterial()
material_red.color = new THREE.Color(0xff0000)
material_red.normalMap = smoothTexture1;

const material_green = new THREE.MeshStandardMaterial()
material_green.color = new THREE.Color(0x00ff00)
material_green.normalMap = roughTexture1;

// Mesh
const sphere = new THREE.Mesh(geometry_sphere, material_red)
scene.add(sphere)
const box = new THREE.Mesh(geometry_cube, material_green)
scene.add(box)
box.translateX(2)

gui.add(box.position, 'x').min(-10).max(10).step(.1)
gui.add(box.position, 'y').min(-10).max(10).step(.1)
gui.add(box.position, 'z').min(-10).max(10).step(.1)
gui.add(box.rotation, 'z').min(-10).max(10).step(.1)
gui.add(sphere.position, 'y').min(-10).max(10).step(.1)
gui.add(sphere.position, 'z').min(-10).max(10).step(.1)
gui.add(sphere.position, 'x').min(-10).max(10).step(.1)
gui.add(sphere.rotation, 'y').min(-10).max(10).step(.1)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(-10).max(10).step(.1)
gui.add(pointLight.position, 'y').min(-10).max(10).step(.1)
gui.add(pointLight.position, 'z').min(-10).max(10).step(.1)
gui.add(pointLight, 'intensity').min(-3).max(3).step(.1)

const pointLight2 = new THREE.PointLight(0x0040ff, .1)
pointLight2.position.set(1,1,1)
scene.add(pointLight2)

gui.add(pointLight2.position, 'x').min(-10).max(10).step(.1)
gui.add(pointLight2.position, 'y').min(-10).max(10).step(.1)
gui.add(pointLight2.position, 'z').min(-10).max(10).step(.1)
gui.add(pointLight2, 'intensity').min(-3).max(3).step(.1)

// DIRECTIONAL LIGHT
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.x += 20
// directionalLight.position.y += 20
// directionalLight.position.z += 20
// scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    box.rotation.z = elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()