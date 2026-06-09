let currentQuestion = null;

let selectedAnswer = null;

let pendingReward = 0;



function showTopUpMenu(){

document.getElementById(
"topup-modal"
).style.display = "block";

}



function startQuiz(

questionCount,

reward

){

pendingReward = reward;

document.getElementById(
"topup-modal"
).style.display = "none";

document.getElementById(
"quiz-modal"
).style.display = "block";

loadQuestion();

}



function loadQuestion(){

selectedAnswer = null;



const pool =

QUESTIONS[
player.studentClass
];



if(

!pool ||

pool.length===0

){

alert(
"No questions found"
);

return;

}



currentQuestion =

pool[
Math.floor(

Math.random()

*

pool.length

)

];



document.getElementById(
"question-title"
).innerText=

"Science Question";



document.getElementById(
"question-text"
).innerText=

currentQuestion.question;



const area =

document.getElementById(
"answer-area"
);

area.innerHTML = "";



for(

const option of currentQuestion.options

){

const btn =

document.createElement(
"button"
);

btn.innerText = option;

btn.style.display="block";

btn.style.margin="8px 0";

btn.style.width="100%";



btn.onclick = ()=>{

selectedAnswer = option;



document

.querySelectorAll(
"#answer-area button"
)

.forEach(

b=>{

b.style.background="";

}

);



btn.style.background=

"lime";

};



area.appendChild(
btn
);

}

}



function submitAnswer(){

if(

selectedAnswer===null

){

alert(
"Select an answer first"
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

"Wrong answer"

);

}



updateHUD();

saveLocal();



document.getElementById(
"quiz-modal"
).style.display="none";

}
