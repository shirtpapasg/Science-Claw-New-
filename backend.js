let player = {

name:"",

studentClass:"",

credits:0,

streak:0,

prizes:0,

questionsCorrect:0,

questionsAttempted:0

};

function authorizeStudentLogin(){
  initGame();

player.name =

document.getElementById(
"student-name"
).value;

player.studentClass =

document.getElementById(
"student-class"
).value;

if(

player.name.trim()===""

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

if(!data) return;

player =

JSON.parse(data);

document
.getElementById(
"registration-screen"
)
.style.display =
"none";

updateHUD();

}

window.onload=()=>{

loadLocal();

};
