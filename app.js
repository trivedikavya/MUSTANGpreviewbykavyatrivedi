//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// allow to create animation in camera position
import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";

let canvasform = document.getElementById('dCanvas');
let width = canvasform.offsetWidth;
let height =  canvasform.offsetHeight;
//Create a Three.JS Scene
const scene = new THREE.Scene();
//CREATED BY KAVYA TRIVEDI
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(70.5, width / height, 0.1, 1000);
//CREATED BY KAVYA TRIVEDI
//Keep track of the mouse position, so we can make the eye move
let mouseX = width / 2;
let mouseY = height / 2;
//Keep the 3D object on a global variable so we can access it later
let object;
//OrbitControls allow the camera to move around the scene
let controls;
//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();
//CREATED BY KAVYA TRIVEDI
//PORSCHE AHI THI AYII******
loader.load(
  'ford_mustang_shelby_gt500/scene.gltf',
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  }
);
//CREATED BY KAVYA TRIVEDI
//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width , height ); 
//CREATED BY KAVYA TRIVEDI
//Add the renderer to the DOM
document.getElementById("dCanvas").appendChild(renderer.domElement);
//Set how far the camera will be from the 3D model
// initial postion of camera setting 
camera.position.set(3, 1.7, 6.60);
//CREATED BY KAVYA TRIVEDI

//Add lights to the scene, so we can actually see the 3D model
let ambientLight = new THREE.AmbientLight(0x404040,1);
//CREATED BY KAVYA TRIVEDI
scene.add(ambientLight);
let directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,7,0);
directionalLight.castShadow = true;
scene.add(directionalLight);
//CREATED BY KAVYA TRIVEDI
let light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(10,300,500);
scene.add(light);
let light2 = new THREE.PointLight(0xc4c4c4,10);
light2.position.set(500,100,10);
scene.add(light2);
let light3 = new THREE.PointLight(0xc4c4c4,10);
light3.position.set(10,100,-500);
scene.add(light3);
let light4 = new THREE.PointLight(0xc4c4c4,10);
light4.position.set(-5000,300,500);
scene.add(light4);
//CREATED BY KAVYA TRIVEDI
//This adds controls to the camera, so we can rotate / zoom it with the mouse
controls = new OrbitControls(camera, renderer.domElement);
//CREATED BY KAVYA TRIVEDI
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();
//CREATED BY KAVYA TRIVEDI
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  width = canvasform.offsetWidth;
  height =  canvasform.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
//CREATED BY KAVYA TRIVEDI
let btnshowmore = document.getElementById('showmore');
let audioElement = document.getElementById('audio');
let slider = document.querySelector('.slider');
//CREATED BY KAVYA TRIVEDI
function runCamera(x,y,z) {
  // create position camera
    const targetPosition = new THREE.Vector3(x, y, z); 
    // time animation
    const duration = 1200;
//CREATED BY KAVYA TRIVEDI
    const tween = new TWEEN.Tween(camera.position)
        .to(targetPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut) 
        .onUpdate(() => {
            camera.lookAt(scene.position); 
            renderer.render(scene, camera);
        })
        .start();
//CREATED BY KAVYA TRIVEDI
}
function playAudio() {
    audioElement.currentTime = 0;
    audioElement.play();
} 
// button ni system
let statusContent = 'contentOne';
//CREATED BY KAVYA TRIVEDI
btnshowmore.onclick = () => {
    playAudio();
    slider.classList.remove('contentOneAction');
    slider.classList.remove('contentTwoAction');
    switch (statusContent) {
        case 'contentOne':
            // 1st click
            runCamera(0.3, 0.6, 9);
            // let mouseX = 200;
            // width : 210;
            //CREATED BY KAVYA TRIVEDI
            statusContent = 'contentTwo';
            slider.classList.add('contentTwoAction');
            break;
        case 'contentTwo':
            runCamera(4.9, 2.6, 9);
            statusContent = 'fullScreen';
            slider.classList.add('c3');
            break;
            // inital back
        case 'fullScreen':
            runCamera(3, 1.7, 6.60);
            slider.classList.add('contentOneAction');
            statusContent = 'contentOne';
            break;
    //CREATED BY KAVYA TRIVEDI
        default:
            break;
    }
}
//CREATED BY KAVYA TRIVEDI
