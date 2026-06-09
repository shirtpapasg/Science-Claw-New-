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
"Enter your name"
);

return;

}

player.credits =

player.credits || 3;

document.getElementById(
"registration-screen"
).style.display="none";
