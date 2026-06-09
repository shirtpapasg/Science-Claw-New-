function updateHUD(){

document
.getElementById(
"player-hud-tag"
)
.innerText =
player.name;

document
.getElementById(
"credit-display"
)
.innerText =
player.credits;

document
.getElementById(
"streak-display"
)
.innerText =
player.streak;

document
.getElementById(
"prizes-display"
)
.innerText =
player.prizes;

let accuracy = 0;

if(

player.questionsAttempted > 0

){

accuracy = Math.round(

player.questionsCorrect /

player.questionsAttempted

*100

);

}

document
.getElementById(
"accuracy-display"
)
.innerText =
accuracy + "%";

renderInstructions();

renderCollection();

}



function renderInstructions(){

let box =

document.getElementById(
"instructions-box"
);

if(!box){

box =
document.createElement(
"div"
);

box.id =
"instructions-box";

box.style.position =
"fixed";

box.style.right =
"20px";

box.style.bottom =
"20px";

box.style.background =
"rgba(0,0,0,.8)";

box.style.padding =
"12px";

box.style.color =
"white";

document.body.appendChild(
box
);

}

box.innerHTML =

`

<b>Controls</b>

<br><br>

⬅️ ➡️ Move

<br>

SPACE = Drop

<br><br>

🧠 Earn Credits

`;

}



function renderCollection(){

let box =

document.getElementById(
"collection-box"
);

if(!box){

box =
document.createElement(
"div"
);

box.id =
"collection-box";

box.style.position =
"fixed";

box.style.right =
"20px";

box.style.top =
"20px";

box.style.width =
"220px";

box.style.background =
"rgba(0,0,0,.8)";

box.style.padding =
"12px";

box.style.color =
"white";

document.body.appendChild(
box
);

}

let html =

"<b>Science Collection</b><br><br>";

for(

const item in player.collection

){

html +=

`${item} x ${player.collection[item]}<br>`;

}

box.innerHTML = html;

}
