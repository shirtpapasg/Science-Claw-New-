let scene;
let renderer;

let frontCamera;
let topCamera;
let sideCamera;
let activeCamera;

let claw;
let cable;

let finger1;
let finger2;
let finger3;

let prizes=[];

let clawX=0;
let clawZ=0;
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

const container=
document.getElementById(
"canvas-container"
);

container.innerHTML="";

scene=
new THREE.Scene();

scene.background=
new THREE.Color(
0x08131f
);

frontCamera=
new THREE.PerspectiveCamera(
65,
window.innerWidth/window.innerHeight,
0.1,
1000
);

frontCamera.position.set(
0,
5,
9
);

topCamera=
new THREE.PerspectiveCamera(
65,
window.innerWidth/window.innerHeight,
0.1,
1000
);

topCamera.position.set(
0,
10,
0
);

topCamera.lookAt(
0,
0,
0
);

sideCamera=
new THREE.PerspectiveCamera(
65,
window.innerWidth/window.innerHeight,
0.1,
1000
);

sideCamera.position.set(
9,
5,
0
);

sideCamera.lookAt(
0,
0,
0
);

activeCamera=
frontCamera;

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

scene.add(
new THREE.AmbientLight(
0xffffff,
1.8
)
);

const light=
new THREE.PointLight(
0xffffff,
4
);

light.position.set(
5,
10,
5
);

scene.add(light);

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
claw = new THREE.Group();

const clawBody =

new THREE.Mesh(

new THREE.BoxGeometry(
0.6,
0.4,
0.6
),

new THREE.MeshPhongMaterial({
color:0xffffff
})

);

claw.add(clawBody);



finger1 =

new THREE.Mesh(

new THREE.BoxGeometry(
0.12,
0.7,
0.12
),

new THREE.MeshPhongMaterial({
color:0xdddddd
})

);

finger1.position.set(
0.3,
-0.45,
0
);

finger1.rotation.z = 0.4;

claw.add(finger1);



finger2 =

new THREE.Mesh(

new THREE.BoxGeometry(
0.12,
0.7,
0.12
),

new THREE.MeshPhongMaterial({
color:0xdddddd
})

);

finger2.position.set(
-0.3,
-0.45,
0
);

finger2.rotation.z = -0.4;

claw.add(finger2);



finger3 =

new THREE.Mesh(

new THREE.BoxGeometry(
0.12,
0.7,
0.12
),

new THREE.MeshPhongMaterial({
color:0xdddddd
})

);

finger3.position.set(
0,
-0.45,
0.3
);

finger3.rotation.x = 0.4;

claw.add(finger3);



claw.position.set(
0,
4,
0
);

scene.add(claw);

cable=
new THREE.Line(

new THREE.BufferGeometry(),

new THREE.LineBasicMaterial({
color:0xffffff
})

);

scene.add(cable);

}

function makeGeometry(shape){

if(shape==="box")
return new THREE.BoxGeometry(.7,.7,.7);

if(shape==="sphere")
return new THREE.SphereGeometry(.4);

if(shape==="cone")
return new THREE.ConeGeometry(.4,.8);

if(shape==="cylinder")
return new THREE.CylinderGeometry(.25,.25,.8);

return new THREE.OctahedronGeometry(.5);

}

function spawnPrizes(){

prizes=[];

for(let i=0;i<15;i++){

const type=
SCIENCE_TYPES[
Math.floor(
Math.random()*
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

if(dropping||rising){
return;
}

const speed=0.4;

if(
e.key==="ArrowLeft" ||
e.key==="a" ||
e.key==="A"
){
clawX-=speed;
}

if(
e.key==="ArrowRight" ||
e.key==="d" ||
e.key==="D"
){
clawX+=speed;
}

if(
e.key==="ArrowUp" ||
e.key==="w" ||
e.key==="W"
){
clawZ-=speed;
}

if(
e.key==="ArrowDown" ||
e.key==="s" ||
e.key==="S"
){
clawZ+=speed;
}

if(e.key==="1"){
setCameraView("front");
}

if(e.key==="2"){
setCameraView("top");
}

if(e.key==="3"){
setCameraView("side");
}

clawX=Math.max(-4,Math.min(4,clawX));
clawZ=Math.max(-3,Math.min(3,clawZ));

claw.position.x=clawX;
claw.position.z=clawZ;

if(
e.code==="Space" ||
e.key===" "
){
dropClaw();
}

}

function dropClaw(){

if(player.credits<=0){

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

for(const p of prizes){

if(p.userData.caught){
continue;
}

const dx=
Math.abs(
p.position.x-
claw.position.x
);

const dz=
Math.abs(
p.position.z-
claw.position.z
);

const dy=
Math.abs(
p.position.y-
claw.position.y
);

if(
dx<0.7 &&
dz<0.7 &&
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

finger1.rotation.z = 0.7;

finger2.rotation.z = -0.7;

finger3.rotation.x = 0.7;

checkGrab();

if(clawY<=-0.5){

dropping=false;
rising=true;

}

}

if(rising){

clawY+=0.08;
claw.position.y=clawY;

finger1.rotation.z = 0.25;

finger2.rotation.z = -0.25;

finger3.rotation.x = 0.25;
  
if(grabbedPrize){

grabbedPrize.position.x=
claw.position.x;

grabbedPrize.position.y=
claw.position.y-0.6;

grabbedPrize.position.z=
claw.position.z;

}

if(clawY>=4){

clawY=4;
 finger1.rotation.z = 0.4;

finger2.rotation.z = -0.4;

finger3.rotation.x = 0.4;
rising=false;

if(grabbedPrize){

pickupSound.currentTime=0;
pickupSound.play();

shakeFrames=20;

player.prizes++;

if(!player.collection){
player.collection={};
}

const item=
grabbedPrize.userData.type;

player.collection[item]=
(player.collection[item]||0)+1;

updateHUD();
saveLocal();

grabbedPrize.userData.caught=true;
grabbedPrize.visible=false;

grabbedPrize=null;

checkCollectionAchievement();

}

}

}

cable.geometry.setFromPoints([

new THREE.Vector3(
claw.position.x,
5,
claw.position.z
),

new THREE.Vector3(
claw.position.x,
claw.position.y,
claw.position.z
)

]);

}

function setCameraView(view){

if(view==="front"){
activeCamera=frontCamera;
}

if(view==="top"){
activeCamera=topCamera;
}

if(view==="side"){
activeCamera=sideCamera;
}

}

function updateCamera(){

if(activeCamera===frontCamera){

frontCamera.position.x=
Math.sin(
Date.now()*0.001
)*0.5;

frontCamera.lookAt(
0,
1,
0
);

}

if(activeCamera===topCamera){

topCamera.lookAt(
0,
0,
0
);

}

if(activeCamera===sideCamera){

sideCamera.lookAt(
0,
1,
0
);

}

}

function animate(){

requestAnimationFrame(
animate
);

updateClaw();
updateCamera();

renderer.render(
scene,
activeCamera
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

for(const item of items){

if(
player.collection?.[item] > 0
){
found++;
}

}

if(found===items.length){

alert(
"🏆 Scientist Collection Completed!"
);

}

}
