let clawX = 300;

let dropping = false;

let prizes = [];

const GAME_WIDTH = 800;

const GAME_HEIGHT = 500;

function initGame(){

const container =

document.getElementById(
"canvas-container"
);

container.innerHTML =

`

<canvas
id="gameCanvas"
width="800"
height="500">
</canvas>

`;

const canvas =

document.getElementById(
"gameCanvas"
);

const ctx =

canvas.getContext("2d");

for(

let i=0;
i<10;
i++

){

prizes.push({

x:

Math.random()*700+40,

y:

350+

Math.random()*80,

caught:false

});

}

document.addEventListener(

"keydown",

handleControls

);

loop(ctx);

}

function handleControls(e){

if(dropping) return;

if(

e.key==="ArrowLeft"

){

clawX -= 25;

}

if(

e.key==="ArrowRight"

){

clawX += 25;

}

if(

e.key===" "

){

dropClaw();

}

}

function dropClaw(){

if(

player.credits<=0

){

alert(
"No credits"
);

return;

}

player.credits--;

updateHUD();

saveLocal();

dropping = true;

}

function loop(ctx){

requestAnimationFrame(
()=>loop(ctx)
);

ctx.clearRect(

0,
0,

GAME_WIDTH,
GAME_HEIGHT

);

ctx.fillStyle="white";

ctx.fillRect(

clawX,
0,

10,
150

);

ctx.fillRect(

clawX-20,
150,

50,
20

);

for(

const p of prizes

){

if(
p.caught
) continue;

ctx.beginPath();

ctx.arc(

p.x,
p.y,

18,

0,

Math.PI*2

);

ctx.fill();

}

if(

dropping

){

const claw =

document.querySelector(
"#gameCanvas"
);

}

}
