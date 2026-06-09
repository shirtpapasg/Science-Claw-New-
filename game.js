let scene;

let camera;

let renderer;

let claw;

let prizes=[];

let clawX=0;



function initGame(){

const container =

document.getElementById(
"canvas-container"
);

container.innerHTML="";



scene =

new THREE.Scene();

scene.background =

new THREE.Color(
0x111111
);



camera =

new THREE.PerspectiveCamera(

75,

window.innerWidth /

window.innerHeight,

0.1,

1000

);

camera.position.set(

0,

8,

14

);



renderer =

new THREE.WebGLRenderer({

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

container.appendChild(

renderer.domElement

);



const light =

new THREE.PointLight(

0xffffff,

2

);

light.position.set(

5,

10,

5

);

scene.add(light);



const machine =

new THREE.Mesh(

new THREE.BoxGeometry(

10,

6,

8

),

new THREE.MeshPhongMaterial({

wireframe:true

})

);

machine.position.y=2;

scene.add(machine);



claw =

new THREE.Mesh(

new THREE.BoxGeometry(

0.8,

0.4,

0.8

),

new THREE.MeshPhongMaterial({

color:0xffffff

})

);

claw.position.y=4;

scene.add(claw);



spawnPrizes();

document.addEventListener(

"keydown",

controls

);



animate();

}



function spawnPrizes(){

for(

let i=0;

i<12;

i++

){

const prize =

new THREE.Mesh(

new THREE.SphereGeometry(

0.3

),

new THREE.MeshPhongMaterial({

color:

Math.random()

*0xffffff

})

);

prize.position.set(

(Math.random()-0.5)*7,

-0.5,

(Math.random()-0.5)*5

);

scene.add(prize);

prizes.push(prize);

}

}



function controls(e){

if(

e.key==="ArrowLeft"

){

clawX -=0.5;

}

if(

e.key==="ArrowRight"

){

clawX +=0.5;

}

claw.position.x=

clawX;

}



function animate(){

requestAnimationFrame(

animate

);

renderer.render(

scene,

camera

);

}
