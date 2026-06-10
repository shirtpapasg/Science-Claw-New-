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
const GRAB_CHANCE = 0.70;

const pickupSound =
new Audio(
"https://actions.google.com/sounds/v1/cartoon/pop.ogg"
);

const missSound =
new Audio(
"https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
);

const SCIENCE_TYPES=[

const SCIENCE_TYPES=[

{
name:"Battery",
color:0xffff00,
shape:"box",
grabChance:0.80
},

{
name:"Atom",
color:0x66ccff,
shape:"sphere",
grabChance:0.75
},

{
name:"Plant",
color:0x55ff55,
shape:"cone",
grabChance:0.70
},

{
name:"Magnet",
color:0xff5555,
shape:"cylinder",
grabChance:0.60
},

{
name:"Crystal",
color:0xff66ff,
shape:"diamond",
grabChance:0.50
}

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
8,
0.01
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
2,
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
2.4
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
function getRandomPrizeType(){

const roll =
Math.random()*100;

if(roll < 40){

return SCIENCE_TYPES[0];

}

if(roll < 70){

return SCIENCE_TYPES[1];

}

if(roll < 85){

return SCIENCE_TYPES[2];

}

if(roll < 95){

return SCIENCE_TYPES[3];

}

return SCIENCE_TYPES[4];

}
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

const glass =

new THREE.Mesh(

new THREE.BoxGeometry(
10,
6,
8
),

new THREE.MeshPhongMaterial({
transparent:true,
opacity:0.25,
color:0x88ccff
})

);

glass.position.set(
0,
2,
0
);

scene.add(glass);

const floor =

new THREE.Mesh(

new THREE.BoxGeometry(
10,
0.3,
8
),

new THREE.MeshPhongMaterial({
color:0x111111
})

);

floor.position.set(
0,
-1,
0
);

scene.add(floor);

const cabinetBase =

new THREE.Mesh(

new THREE.BoxGeometry(
12,
2,
10
),

new THREE.MeshPhongMaterial({
color:0x204060
})

);

cabinetBase.position.set(
0,
-2,
0
);

scene.add(cabinetBase);

const topSign =

new THREE.Mesh(

new THREE.BoxGeometry(
12,
1,
2
),

new THREE.MeshPhongMaterial({
color:0x0066ff
})

);

topSign.position.set(
0,
5.5,
0
);

//scene.add(topSign);
const neonLight =

new THREE.PointLight(
0x00ffff,
5,
20
);

neonLight.position.set(
0,
5,
2
);

scene.add(neonLight);
const leftWall =

new THREE.Mesh(

new THREE.BoxGeometry(
0.5,
6,
8
),

new THREE.MeshPhongMaterial({
color:0x224488,
transparent:true,
opacity:0.25
})
);

leftWall.position.set(
-5.25,
2,
0
);

//scene.add(leftWall);


const rightWall =

new THREE.Mesh(

new THREE.BoxGeometry(
0.5,
6,
8
),

new THREE.MeshPhongMaterial({
color:0x224488,
transparent:true,
opacity:0.25
})

);

rightWall.position.set(
5.25,
2,
0
);

//scene.add(rightWall);

const prizeChute =

new THREE.Mesh(

new THREE.BoxGeometry(
3,
1,
1.5
),

new THREE.MeshPhongMaterial({
color:0xffcc00,
emissive:0xaa7700,
emissiveIntensity:0.8
})
);

prizeChute.position.set(
0,
-1.2,
4.2
);

scene.add(prizeChute);

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

cable =

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

const type =
getRandomPrizeType();

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
type:type.name,
grabChance:type.grabChance
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

if(
Math.random() < p.userData.grabChance
){

grabbedPrize = p;

}

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
if(!grabbedPrize){

missSound.currentTime = 0;
missSound.play();

}

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

topCamera.position.set(
0,
8,
0.01
);

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
