import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 
    window.innerWidth/window.innerHeight, 0.1, 1000 );

const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 15 );
camera.add( pointLight );

let object;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild( renderer.domElement );

function load_model() {
    object.traverse( function (child) {
        if ( child.isMesh ) child.material.map = texture;
    });
    scene.add(object);
}

const manager = new THREE.LoadingManager( load_model );

const texture_loader = new THREE.TextureLoader( manager );
const texture = texture_loader.load('image/fuselage_albd.png', animate);
texture.colorSpace = THREE.SRGBColorSpace;

function onProgress( xhr ) {

    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + percentComplete.toFixed( 2 ) + '% downloaded' );

    }

}

function onError() {}

const loader = new OBJLoader( manager );
loader.load('models/cessna-cj4-06.obj', function (obj) {
    object = obj;
}, onProgress, onError);

renderer.setClearColor( 0xffffff );
camera.position.set(6,5,9);

camera.rotateY(.7);
camera.rotateX(-.3);

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 10;
controls.maxDistance = 15;
controls.addEventListener('change', animate);

window.addEventListener('resize',onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}

animate();