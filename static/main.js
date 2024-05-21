import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 
    window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild( renderer.domElement );

const texture = new 
THREE.TextureLoader().load('image/fuselage_albd.png');

const material = new THREE.MeshBasicMaterial( {map:texture} );

const loader = new GLTFLoader();
loader.load( 'models/cessna-cj4-06.glb', 
    function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.log( error );
});

renderer.setClearColor( 0xffffff );
camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 6;

camera.rotateY(.7);
camera.rotateX(-.3);

function animate() {
    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}

animate();