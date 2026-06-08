let clawX = 400;

let clawY = 0;

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
height="500"
style="
border:2px solid white;
display:block;
margin:20px auto;
background:#111;
">
</canvas>

`;

prizes = [];

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

Math.random()*700 + 50,

y:

360 + Math.random()*70,

caught:false

});

}

document.removeEventListener(

"keydown",

handleControls

);

document.addEventListener(

"keydown",

handleControls

);

loop(ctx);

}


function handleControls(e){

if(dropping) return;

if(

e.key === "ArrowLeft"

){

clawX -= 25;

}

if(

e.key === "ArrowRight"

){

clawX += 25;

}

clawX =

Math.max(

30,

Math.min(

770,

clawX

)

);

if(

e.key === " "

){

dropClaw();

}

}


function dropClaw(){

if(

player.credits <= 0

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


function checkCatch(){

for(

const p of prizes

){

if(

p.caught

) continue;

const dist =

Math.abs(

p.x - clawX

);

if(

dist < 30

&&

Math.abs(

p.y - clawY

) < 35

){

p.caught = true;

player.prizes++;

alert(

"You caught one!"

);

updateHUD();

saveLocal();

return;

}

}

}


function updateClaw(){

if(

dropping

){

clawY += 8;

if(

clawY > 420

){

checkCatch();

dropping = false;

}

}

else{

if(

clawY > 0

){

clawY -= 8;

}

}

}


function drawMachine(ctx){

ctx.fillStyle = "#111";

ctx.fillRect(

0,
0,

GAME_WIDTH,
GAME_HEIGHT

);

ctx.fillStyle = "#444";

ctx.fillRect(

0,
440,

GAME_WIDTH,
60

);

ctx.strokeStyle = "white";

ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(

clawX,

0

);

ctx.lineTo(

clawX,

clawY

);

ctx.stroke();

ctx.fillStyle = "white";

ctx.fillRect(

clawX-20,

clawY,

40,

15

);

}


function drawPrizes(ctx){

ctx.fillStyle = "gold";

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

}


function loop(ctx){

requestAnimationFrame(

()=>loop(ctx)

);

updateClaw();

drawMachine(ctx);

drawPrizes(ctx);

}
