let currentReward = 0;

let currentQuestion = null;

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

currentReward = reward;

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

currentQuestion =

QUESTIONS[

Math.floor(

Math.random()

* QUESTIONS.length

)

];

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
value="${option}"
>

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

if(!selected){

alert(

"Choose answer"

);

return;

}

player.questionsAttempted++;

if(

selected.value===

currentQuestion.correct

){

player.questionsCorrect++;

player.credits +=

currentReward;

alert(

`Correct! +${currentReward} credits`

);

}else{

alert(

"Wrong answer"

);

}

document
.getElementById(
"quiz-modal"
)
.style.display=
"none";

updateHUD();

saveLocal();

}
