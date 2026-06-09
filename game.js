let scene;

let camera;

let renderer;

let claw;

let cable;

let prizes=[];

let clawX=0;

let clawY=4;

let dropping=false;

let rising=false;

let grabbedPrize=null;



function initGame(){

const container=

document.getElementById(
"canvas-container"
);

container.innerHTML="";



scene=

new THREE.Scene();

scene.background=

new THREE.Color(
0x0f1720
);



camera=

new THREE.PerspectiveCamera(

70,

window.innerWidth/

window.innerHeight,

0.1,

1000

);

camera.position.set(

0,

8,

14

);

camera.lookAt(

0,

1,

0

);



renderer=

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



const ambient=

new THREE.AmbientLight(

0xffffff,

1.8

);

scene.add(
ambient
);



const light=

new THREE.PointLight(

0xffffff,

3

);

light.position.set(

4,

10,

5

);

scene.add(
light
);



buildMachine();

spawnPrizes();

document.removeEventListener(

"keydown",

controls

);

document.addEventListener(

"keydown",

controls

);

animate();

}



function buildMachine(){

const glass=

new THREE.Mesh(

new THREE.BoxGeometry(

10,

6,

8

),

new THREE.MeshPhongMaterial({

color:0x66ccff,

transparent:true,

opacity:0.18

})

);

glass.position.y=2;

scene.add(
glass
);



const floor=

new THREE.Mesh(

new THREE.BoxGeometry(

10,

0.2,

8

),

new THREE.MeshPhongMaterial({

color:0x333333

})

);

floor.position.y=-1;

scene.add(
floor
);



claw=

new THREE.Mesh(

new THREE.BoxGeometry(

0.8,

0.5,

0.8

),

new THREE.MeshPhongMaterial({

color:0xffffff

})

);

claw.position.set(

0,

4,

0

);

scene.add(
claw
);



const cableGeo=

new THREE.BufferGeometry();

cableGeo.setFromPoints([

new THREE.Vector3(0,5,0),

new THREE.Vector3(0,4,0)

]);

cable=

new THREE.Line(

cableGeo,

new THREE.LineBasicMaterial({

color:0xffffff

})

);

scene.add(
cable
);

}



function spawnPrizes(){

prizes=[];

const colors=[

0xff5555,

0xffff00,

0x66ff66,

0x66ccff,

0xff66ff

];



for(

let i=0;

i<15;

i++

){

const prize=

new THREE.Mesh(

new THREE.DodecahedronGeometry(

0.35

),

new THREE.MeshPhongMaterial({

color:

colors[

Math.floor(

Math.random()

*colors.length

)

]

})

);

prize.position.set(

(Math.random()-0.5)*7,

-0.5,

(Math.random()-0.5)*5

);

prize.userData.caught=false;

scene.add(
prize
);

prizes.push(
prize
);

}

}



function controls(e){

if(

dropping ||

rising

){

return;

}



if(

e.key==="ArrowLeft"

){

clawX-=0.5;

}



if(

e.key==="ArrowRight"

){

clawX+=0.5;

}



clawX=

Math.max(

-4,

Math.min(

4,

clawX

)

);



claw.position.x=

clawX;



if(

e.code==="Space"

){

dropClaw();

}

}



function dropClaw(){

if(

player.credits<=0

){

return;

}



player.credits--;

updateHUD();

saveLocal();

dropping=true;

}



function checkGrab(){

for(

const prize of prizes

){

if(

prize.userData.caught

){

continue;

}



const dx=

Math.abs(

prize.position.x-

claw.position.x

);



const dy=

Math.abs(

prize.position.y-

claw.position.y

);



if(

dx<0.7

&&

dy<0.7

){

grabbedPrize=

prize;

return;

}

}

}



function updateClaw(){

if(

dropping

){

clawY-=0.08;

claw.position.y=clawY;

checkGrab();

if(

clawY<=-0.5

){

dropping=false;

rising=true;

}

}



if(

rising

){

clawY+=0.08;

claw.position.y=clawY;



if(

grabbedPrize

){

grabbedPrize.position.x=

claw.position.x;

grabbedPrize.position.y=

claw.position.y-0.6;

}



if(

clawY>=4

){

clawY=4;

rising=false;



if(

grabbedPrize

){

grabbedPrize.userData.caught=true;

player.prizes++;

player.collection ??= {};

player.collection["Science Item"] ??=0;

player.collection["Science Item"]++;

evaluateAchievements?.();

updateHUD();

saveLocal();

grabbedPrize=null;

}

}

}



cable.geometry.setFromPoints([

new THREE.Vector3(

claw.position.x,

5,

0

),

new THREE.Vector3(

claw.position.x,

claw.position.y,

0

)

]);

}



function animate(){

requestAnimationFrame(

animate

);

updateClaw();

renderer.render(

scene,camera);

}
