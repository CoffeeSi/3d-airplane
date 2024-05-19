// import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 
    window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0xE30B5C } );
const material_line = new THREE.LineBasicMaterial( { color: 0x0000ff });

const points = [];
points.push( new THREE.Vector3( -1, 0, 0 ));
points.push( new THREE.Vector3( 0 , 1, 0 ));
points.push( new THREE.Vector3( 1, 0, 0 ));
points.push( new THREE.Vector3( 0, -1, 0 ));
points.push( new THREE.Vector3( -1, 0, 0 ));

const geometry_line = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry_line, material_line );

const cube = new THREE.Mesh( geometry, material );
scene.add(cube);
scene.add(line);

renderer.setClearColor( 0xffffff );
camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.z += 0.01;
	cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
