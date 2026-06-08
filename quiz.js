let currentReward=0;

let currentQuestion=null;



function showTopUpMenu(){

document
.getElementById(
"topup-modal"
)
.style.display=
"block";

}



function startQuiz(

questions,

reward

){

currentReward=reward;

document
.getElementById(
"topup-modal"
)
.style.display=
"none";

document
.getElementById(
"quiz-modal"
)
.style.display=
"block";

loadQuestion();

}



function loadQuestion(){

const pool =

QUESTIONS[
player.studentClass
];

currentQuestion=

pool[

Math.floor(

Math.random()

* pool.length

)

];

document
.getElementById(
"question-title"
)
.innerText=

currentQuestion.topic;

document
.getElementById(
"question-text"
)
.innerText=

currentQuestion.question;

const area=

document
.getElementById(
"answer-area"
);

area.innerHTML="";

currentQuestion.options
.forEach(

option=>{

area.innerHTML +=

`

<label>

<input
type="radio"
name="ans"
value="${option}">

${option}

</label>

<br>

`;

}

);

}



function submitAnswer(){

const selected=

document.querySelector(

'input[name="ans"]:checked'

);

if(

!selected

){

alert(

"Choose answer"

);

return;

}

player.questionsAttempted++;

const topic=

currentQuestion.topic;

if(

!player.topicStats[topic]

){

player.topicStats[topic]={

attempted:0,

correct:0

};

}

player.topicStats[
topic
].attempted++;

if(

selected.value===

currentQuestion.correct

){

player.questionsCorrect++;

player.credits+=currentReward;

player.streak++;

player.topicStats[
topic
].correct++;

}

else{

player.streak=0;

}

updateHUD();

saveLocal();

document
.getElementById(
"quiz-modal"
)
.style.display=
"none";

}
