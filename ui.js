function updateHUD(){

document
.getElementById(
"player-hud-tag"
)
.innerText=
player.name;

document
.getElementById(
"credit-display"
)
.innerText=
player.credits;

document
.getElementById(
"streak-display"
)
.innerText=
player.streak;

document
.getElementById(
"prizes-display"
)
.innerText=
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
.innerText=
accuracy+"%";

renderInstructions();

renderCollection();

renderAchievements();

}



function renderInstructions(){

let box=

document.getElementById(
"instructions-box"
);

if(!box){

box=
document.createElement(
"div"
);

box.id=
"instructions-box";

box.style.position=
"fixed";

box.style.bottom=
"20px";

box.style.right=
"20px";

box.style.background=
"black";

box.style.padding=
"12px";

box.style.color=
"white";

document.body.appendChild(
box
);

}

box.innerHTML=

`

⬅️ ➡️ Move

<br>

SPACE Drop

`;

}



function renderCollection(){

let box=

document.getElementById(
"collection-box"
);

if(!box){

box=
document.createElement(
"div"
);

box.id=
"collection-box";

box.style.position=
"fixed";

box.style.top=
"20px";

box.style.right=
"20px";

box.style.background=
"black";

box.style.padding=
"12px";

box.style.color=
"white";

document.body.appendChild(
box
);

}

let html=

"<b>Collection</b><br>";

for(

const item in player.collection

){

html +=

`${item}: ${player.collection[item]}<br>`;

}

box.innerHTML=html;

}



function renderAchievements(){

let box=

document.getElementById(
"achievement-box"
);

if(!box){

box=
document.createElement(
"div"
);

box.id=
"achievement-box";

box.style.position=
"fixed";

box.style.left=
"20px";

box.style.bottom=
"20px";

box.style.background=
"black";

box.style.padding=
"12px";

box.style.color=
"gold";

document.body.appendChild(
box
);

}

let html=

"<b>Badges</b><br>";

for(

const badge in player.achievements

){

html +=

`🏆 ${badge}<br>`;

}

box.innerHTML=html;

}
