import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';

// document.addEventListener("click", (event) => {
//     console.log(event.clientX, event.clientY);
// });

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

//Setup scene and camera
const scene = new THREE.Scene();

//Camera configure
const camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(6,5,9);
camera.rotation.set(-.3,.7,0)

//Window resize listener
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//Adding light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 15);
camera.add(pointLight);

//Setup rotation camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 15;

const stats = new Stats();
document.body.appendChild(stats.dom);

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        document.getElementsByClassName("progress")[0].textContent =  
        percentComplete.toFixed(2) + "%";
    }
}

//Adding model to the scene
const loader = new GLTFLoader();
loader.load("models/plane.glb", (gltf) => scene.add(gltf.scene), 
            onProgress, (error) => console.log(error));

//Raycaster configuring
const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', mouseclick);

function mouseclick(event){
    console.log("Mouse was clicked");
    const coords = new THREE.Vector2(
        (event.clientX / window.innerWidth)*2 - 1,
        (-(event.clientY / window.innerHeight)*2 + 1),);
    raycaster.setFromCamera(coords, camera);

    const intersection = raycaster.intersectObjects(scene.children);
    
    if (intersection.length > 0) {
        const color = new THREE.Color(255, 0, 0);
        intersection[0].object.material.color.set(0xff0000);
        console.log(intersection);
        console.log(event.clientX, event.clientY);

        const block = document.body.getElementsByClassName("screen-block");
        block.item(0).s;

        // selectedObject.material.color = null;
    }
}

//Render entire scene
function render() {
    stats.begin();

    renderer.render(scene, camera);

    stats.end();
    requestAnimationFrame(render);

}

render();