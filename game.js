let clawX = 400;

let clawY = 0;

let dropping = false;

let rising = false;

let prizes = [];

let floatingText = "";

let floatingTimer = 0;

const GAME_WIDTH = 800;

const GAME_HEIGHT = 500;

const GRAB_CHANCE = 0.65;



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
border:4px solid white;
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

canvas.getContext(
"2d"
);

for(

let i=0;

i<12;

i++

){

let rarity = "common";

let value = 1;

let color = "gold";

const roll = Math.random();

if(

roll > 0.85

){

rarity="legend";

value=5;

color="cyan";

}

else if(

roll > 0.60

){

rarity="rare";

value=3;

color="violet";

}

prizes.push({

x:

Math.random()*700+50,

y:

350+Math.random()*70,

caught:false,

grabbed:false,

rarity,

value,

color

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

if(

dropping ||

rising

){

return;

}

if(

e.key==="ArrowLeft"

){

clawX-=25;

}

if(

e.key==="ArrowRight"

){

clawX+=25;

}

clawX =

Math.max(

40,

Math.min(

760,

clawX

)

);

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

setMessage(

"NO CREDITS"

);

return;

}

player.credits--;

updateHUD();

saveLocal();

dropping=true;

}



function setMessage(text){

floatingText=text;

floatingTimer=120;

}



function checkCatch(){

for(

const p of prizes

){

if(

p.caught

) continue;

const dx =

Math.abs(

p.x-clawX

);

const dy =

Math.abs(

p.y-clawY

);

if(

dx<28

&&

dy<30

){

if(

Math.random()

<

GRAB_CHANCE

){

p.grabbed=true;

}

return;

}

}

}



function updateClaw(){

if(

dropping

){

clawY+=8;

checkCatch();

if(

clawY>=420

){

dropping=false;

rising=true;

}

}



if(

rising

){

clawY-=8;

if(

clawY<=0

){

clawY=0;

rising=false;

completeGrab();

}

}

}



function completeGrab(){

let success=false;

for(

const p of prizes

){

if(

p.grabbed

){

success=true;

p.grabbed=false;

p.caught=true;

player.prizes += p.value;

player.streak++;

updateHUD();

saveLocal();

setMessage(

`${p.rarity.toUpperCase()} +${p.value}`

);

break;

}

}

if(

!success

){

player.streak=0;

updateHUD();

setMessage(

"MISS"

);

}

}



function drawMachine(ctx){

ctx.fillStyle="#111";

ctx.fillRect(

0,
0,

GAME_WIDTH,
GAME_HEIGHT

);

ctx.strokeStyle="#666";

ctx.lineWidth=8;

ctx.strokeRect(

10,
10,

780,
480

);

ctx.fillStyle="#444";

ctx.fillRect(

0,
440,

800,
60

);

ctx.strokeStyle="white";

ctx.lineWidth=3;

ctx.beginPath();

ctx.moveTo(

clawX,

20

);

ctx.lineTo(

clawX,

clawY

);

ctx.stroke();

ctx.fillStyle="white";

ctx.fillRect(

clawX-20,

clawY,

40,

15

);

ctx.fillRect(

clawX-15,

clawY+15,

5,

20

);

ctx.fillRect(

clawX+10,

clawY+15,

5,

20

);

}



function drawPrizes(ctx){

for(

const p of prizes

){

if(

p.caught

){

continue;

}

let drawY = p.y;

if(

p.grabbed

){

drawY = clawY + 35;

p.x = clawX;

}

ctx.fillStyle=p.color;

ctx.beginPath();

ctx.arc(

p.x,

drawY,

18,

0,

Math.PI*2

);

ctx.fill();

}

}



function drawMessages(ctx){

if(

floatingTimer<=0

){

return;

}

ctx.fillStyle="white";

ctx.font="28px Arial";

ctx.textAlign="center";

ctx.fillText(

floatingText,

400,

100

);

floatingTimer--;

}



function loop(ctx){

requestAnimationFrame(

()=>loop(ctx)

);

updateClaw();

drawMachine(ctx);

drawPrizes(ctx);

drawMessages(ctx);

}
