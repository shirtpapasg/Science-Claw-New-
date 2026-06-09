let currentQuestion=null;

let selectedAnswer=null;

let pendingReward=0;



function showTopUpMenu(){

document.getElementById(
"topup-modal"
).style.display="block";

}



function startQuiz(

questionCount,

reward

){

pendingReward = reward;

document.getElementById(
"topup-modal"
).style.display="none";

document.getElementById(
"quiz-modal"
).style.display="block";

loadQuestion();

}



function loadQuestion(){

const levels =

QUESTIONS[
player.studentClass
];



if(

!levels ||

levels.length===0

){

alert(
"No questions loaded"
);

return;

}



currentQuestion =

levels[
Math.floor(

Math.random()

*

levels.length

)

];



selectedAnswer = null;



document.getElementById(
"question-title"
).innerText="Question";



document.getElementById(
"question-text"
).innerText=

currentQuestion.question;



const answerArea=

document.getElementById(
"answer-area"
);

answerArea.innerHTML="";



currentQuestion.options.forEach(

option=>{

const btn=

document.createElement(
"button"
);

btn.innerText=option;

btn.style.display="block";

btn.style.margin="10px 0";

btn.onclick=()=>{

selectedAnswer=option;



document

.querySelectorAll(
"#answer-area button"
)

.forEach(

b=>b.style.background=""

);



btn.style.background=

"lightgreen";

};



answerArea.appendChild(
btn
);

}

);

}



function submitAnswer(){

if(

selectedAnswer===null

){

alert(
"Choose answer"
);

return;

}



player.questionsAttempted++;



if(

selectedAnswer===

currentQuestion.correct

){

player.questionsCorrect++;

player.credits += pendingReward;

alert(

"Correct! +" +

pendingReward +

" credits"

);

}



else{

alert(

"Wrong Answer"

);

}



updateHUD();

saveLocal();



document.getElementById(
"quiz-modal"
).style.display="none";

}
