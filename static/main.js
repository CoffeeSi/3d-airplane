import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 
    window.innerWidth/window.innerHeight, 0.1, 1000 );

const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 15 );
camera.add( pointLight );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild( renderer.domElement );

function onProgress( xhr ) {
    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        document.getElementsByClassName("progress")[0].textContent =  
        percentComplete.toFixed( 2 ) + "%";
    }
}

const loader = new GLTFLoader();
loader.load("models/plane.glb", (gltf) => scene.add(gltf.scene), 
            onProgress, (error) => console.log(error));

renderer.setClearColor( 0xffffff );
camera.position.set(6,5,9);

camera.rotateY(.7);
camera.rotateX(-.3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 15;
controls.addEventListener('change', render);

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();