let player = {

name:"",

studentClass:"",

credits:0,

streak:0,

prizes:0,

questionsCorrect:0,

questionsAttempted:0,

topicStats:{},

collection:{},

achievements:{}

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

player.name.trim()===""

){

alert(

"Enter name"

);

return;

}



player.credits = 3;



document.getElementById(
"registration-screen"
).style.display="none";

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

const saved =

localStorage.getItem(

"sciencePlayer"

);



if(

!saved

){

return;

}



player =

JSON.parse(saved);



document.getElementById(

"registration-screen"

).style.display="none";

const guide =
document.getElementById(
"controls-guide"
);

if(guide){
guide.remove();
}

updateHUD();



initGame();

}



function updateHUD(){

const accuracy =

player.questionsAttempted===0

?

0

:

Math.round(

player.questionsCorrect

/

player.questionsAttempted

*

100

);



const playerTag =

document.getElementById(
"player-hud-tag"
);

if(playerTag)

playerTag.innerText=

player.name;



const credits=

document.getElementById(
"credit-display"
);

if(credits)

credits.innerText=

player.credits;



const streak=

document.getElementById(
"streak-display"
);

if(streak)

streak.innerText=

player.streak;



const prizes=

document.getElementById(
"prizes-display"
);

if(prizes)

prizes.innerText=

player.prizes;



const acc=

document.getElementById(
"accuracy-display"
);

if(acc)

acc.innerText=

accuracy + "%";

const collection =

player.collection || {};

const book =

document.getElementById(
"collection-book"
);

if(book){

book.innerHTML =

"🔋 Battery x" +
(collection.Battery || 0)

+ "<br>" +

"⚛️ Atom x" +
(collection.Atom || 0)

+ "<br>" +

"🌱 Plant x" +
(collection.Plant || 0)

+ "<br>" +

"🧲 Magnet x" +
(collection.Magnet || 0)

+ "<br>" +

"💎 Crystal x" +
(collection.Crystal || 0);

}


}



function resetPlayer(){

localStorage.removeItem(

"sciencePlayer"

);

location.reload();

}



window.onload=()=>{

loadLocal();

};
