function showTopUpMenu(){

document
.getElementById(
"topup-modal"
)
.style.display="block";

}

function startQuiz(

questions,

reward

){

document
.getElementById(
"topup-modal"
)
.style.display="none";

const pass =

confirm(

`Pretend quiz complete?\nReward: ${reward}`

);

if(!pass) return;

player.credits += reward;

player.questionsAttempted += questions;

player.questionsCorrect += questions;

updateHUD();

saveLocal();

alert(

`+${reward} credits`

);

}
