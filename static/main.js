import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import info from './info.json' assert { type: 'json' };

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

//Adding model to the scene
const loader = new GLTFLoader();
loader.load("models/plane.glb", (gltf) => scene.add(gltf.scene), 
            null, (error) => console.log(error));

//Raycaster configuring
const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', mouseclick);

let fixed = 0;
let elem = null;

function mouseclick(event) {
    const coords = new THREE.Vector2(
        (event.clientX / window.innerWidth)*2 - 1,
        (-(event.clientY / window.innerHeight)*2 + 1),);
    raycaster.setFromCamera(coords, camera);

    const intersection = raycaster.intersectObjects(scene.children);

    if (intersection.length > 0 && fixed == 0) {
        const clear_color = new THREE.Color("white");
        const color = new THREE.Color("red");
        const selectedObject = intersection[0].object;
        elem = selectedObject;
        selectedObject.material.color = color;
        console.log(intersection);

        // Floating window setting
        const floating_window = document.body.getElementsByClassName("floating-window")[0];
        floating_window.style.display = 'block';

        if (event.clientY + 420 > document.body.clientHeight) {
            floating_window.style.top = event.clientY - (event.clientY + 420 - document.body.clientHeight) + "px";
        } else {
            floating_window.style.top = event.clientY + "px";
        }
        if (event.clientX + 440 > document.body.clientWidth) {
            floating_window.style.left = event.clientX - (event.clientX + 440 - document.body.clientWidth) + "px";
        } else {
            floating_window.style.left = event.clientX + "px";
        }

        // Change floating window information
        const name_window = document.body.getElementsByClassName("name-window")[0];
        name_window.innerText = info['details'][selectedObject.name]['name'];

        const main_window = document.body.getElementsByClassName("main-window")[0];
        main_window.innerText = info['details'][selectedObject.name]['desc'];

        if (info['details'][selectedObject.name]['img'] != null) {
            const img_window = main_window.appendChild(document.createElement("img"));
            img_window.className = "img-window";
            img_window.src = info['details'][selectedObject.name]['img'];
        }
        
        // Block screen when floating window is shown
        const block = document.body.getElementsByClassName("screen-block")[0];
        block.style.display = 'block';
        fixed = 1;

        // Close floating window
        const cross = document.body.getElementsByClassName("close-window")[0];
        cross.addEventListener("click", () => {
            block.style.display = 'none';
            floating_window.style.display = 'none';
            fixed = 0;
            elem.material.color = clear_color;
        });
    }
};

//Render entire scene
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

}

render();