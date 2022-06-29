import * as THREE from './three.js'
import { TextGeometry } from './TextGeometry.js';
import { FontLoader } from './FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let nameText = new THREE.Mesh();
let stars, starGeo;

lighting();
name();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );

    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

//reset star field
function animateParticles() {
  starGeo.verticesNeedUpdate = true;
  stars.position.y -= 0.9;
  if (stars.position.y <= -220) {
    stars.position.y = 220;

  }
}
//change star colors
function colorChange() {
  stars.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));

  setTimeout(colorChange, 3000);
}

colorChange();


function name () {
  
  const texture = new THREE.TextureLoader().load("/assets/textures/wooden.jpg");
  const loader = new FontLoader();
  loader.load( '/assets/fonts/FAST-TRACK_Regular.json', function ( font ) 
  {
     const textGeometry = new TextGeometry( 'Ronald ', {
      font: font,
      size: 2,
      height: 1,
      
      
    } );
  
    const textMaterial = new THREE.MeshBasicMaterial({ map: texture });
    nameText = new THREE.Mesh( textGeometry, textMaterial );
  
    nameText.castShadow= true;
    nameText.position.z= -5;
    camera.position.z = 15;
  
    scene.add(nameText);
  
  } );

}

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  nameText.rotation.x += 0.008;
  nameText.rotation.y += 0.008;
  renderer.render(scene, camera);
}

animate();
