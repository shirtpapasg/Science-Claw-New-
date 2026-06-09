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

let shakeFrames=0;

const pickupSound =
new Audio(
"https://actions.google.com/sounds/v1/cartoon/pop.ogg"
);

const failSound =
new Audio(
"https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
);



const SCIENCE_TYPES=[

{name:"Battery",color:0xffff00,shape:"box"},
{name:"Atom",color:0x66ccff,shape:"sphere"},
{name:"Plant",color:0x55ff55,shape:"cone"},
{name:"Magnet",color:0xff5555,shape:"cylinder"},
{name:"Crystal",color:0xff66ff,shape:"diamond"}

];



function initGame(){

const container =

document.getElementById(
"canvas-container"
);

container.innerHTML="";



scene = new THREE.Scene();

scene.background =

new THREE.Color(
0x101820
);



camera =

new THREE.PerspectiveCamera(

65,

window.innerWidth/

window.innerHeight,

0.1,

1000

);

camera.position.set(

0,

7,

13

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



scene.add(

new THREE.AmbientLight(

0xffffff,

1.8

)

);



const light =

new THREE.PointLight(

0xffffff,

4

);

light.position.set(

5,

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

transparent:true,

opacity:0.15,

color:0x88ccff

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

0.3,

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



cable=

new THREE.Line(

new THREE.BufferGeometry(),

new THREE.LineBasicMaterial({

color:0xffffff

})

);

scene.add(
cable
);

}



function makeGeometry(shape){

if(shape==="box")
return new THREE.BoxGeometry(.6,.6,.6);

if(shape==="sphere")
return new THREE.SphereGeometry(.35);

if(shape==="cone")
return new THREE.ConeGeometry(.35,.7);

if(shape==="cylinder")
return new THREE.CylinderGeometry(.2,.2,.7);

return new THREE.OctahedronGeometry(.4);

}



function spawnPrizes(){

prizes=[];

for(let i=0;i<15;i++){

const type=

SCIENCE_TYPES[

Math.floor(

Math.random()

*

SCIENCE_TYPES.length

)

];



const mesh=

new THREE.Mesh(

makeGeometry(
type.shape
),

new THREE.MeshPhongMaterial({

color:type.color

})

);



mesh.position.set(

(Math.random()-0.5)*7,

-0.5,

(Math.random()-0.5)*5

);



mesh.userData={

caught:false,

type:type.name

};



scene.add(mesh);

prizes.push(mesh);

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

||

e.key===" "

){

dropClaw();

}

}


function dropClaw(){

if(

player.credits<=0

){

failSound.currentTime=0;

failSound.play();

return;

}



player.credits--;

updateHUD();

saveLocal();

dropping=true;

}



function checkGrab(){

for(

const p of prizes

){

if(

p.userData.caught

) continue;



const dx=

Math.abs(

p.position.x-

claw.position.x

);



const dy=

Math.abs(

p.position.y-

claw.position.y

);



if(

dx<0.7

&&

dy<0.7

){

grabbedPrize=p;

return;

}

}

}



function updateClaw(){

if(dropping){

clawY-=0.08;

claw.position.y=clawY;

checkGrab();

if(clawY<=-0.5){

dropping=false;

rising=true;

}

}



if(rising){

clawY+=0.08;

claw.position.y=clawY;



if(grabbedPrize){

grabbedPrize.position.x=

claw.position.x;

grabbedPrize.position.y=

claw.position.y-.6;

}



if(clawY>=4){

clawY=4;

rising=false;



if(grabbedPrize){

pickupSound.currentTime=0;

pickupSound.play();

shakeFrames=25;

player.prizes++;

updateHUD();

saveLocal();

grabbedPrize.userData.caught=true;

grabbedPrize.visible=false;

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



function updateCamera(){

camera.position.x =

Math.sin(

Date.now()*0.001

)*0.6;



if(

shakeFrames>0

){

camera.position.x +=

(Math.random()-0.5)*0.8;

camera.position.y +=

(Math.random()-0.5)*0.5;

shakeFrames--;

}



camera.lookAt(

0,

1,

0

);

}



function animate(){

requestAnimationFrame(

animate

);

updateClaw();

updateCamera();

renderer.render(

scene,

camera

);

}

function checkCollectionAchievement(){

const items=[

"Battery",

"Atom",

"Plant",

"Magnet",

"Crystal"

];



let found=0;



for(

const item of items

){

if(

player.collection?.[item] > 0

){

found++;

}

}



if(

found===items.length

){

alert(

"🏆 Scientist Collection Completed!"

);

}

}
