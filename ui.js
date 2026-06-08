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

accuracy =

Math.round(

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

}
