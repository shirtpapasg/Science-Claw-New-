let player = {

name: "",

studentClass: "",

credits: 0,

streak: 0,

prizes: 0,

questionsCorrect: 0,

questionsAttempted: 0,

topicStats: {}

};



function authorizeStudentLogin(){

player.name =

document.getElementById(
"student-name"
).value;

player.studentClass =

document.getElementById(
"student-class"
).value;

if(

player.name.trim() === ""

){

alert(

"Enter your name"

);

return;

}

player.credits = 3;

document
.getElementById(
"registration-screen"
)
.style.display =
"none";

updateHUD();

initGame();

saveLocal();

}



function saveLocal(){

localStorage.setItem(

"sciencePlayer",

JSON.stringify(player)

);

}



function loadLocal(){

const data =

localStorage.getItem(
"sciencePlayer"
);

if(

!data

){

return;

}

player =

JSON.parse(data);



player.topicStats ??= {};

player.questionsCorrect ??= 0;

player.questionsAttempted ??= 0;

player.prizes ??= 0;

player.streak ??= 0;



document
.getElementById(
"registration-screen"
)
.style.display =
"none";

updateHUD();

initGame();

}



function resetPlayer(){

localStorage.removeItem(

"sciencePlayer"

);

location.reload();

}



window.onload = ()=>{

loadLocal();

};
