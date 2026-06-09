function unlockAchievement(

id,

label

){

if(

player.achievements[id]

){

return;

}

player.achievements[id]=true;

saveLocal();

setMessage(

`🏆 ${label}`

);

}



function evaluateAchievements(){

if(

player.prizes >= 5

){

unlockAchievement(

"collector5",

"Collected 5 Items"

);

}

if(

player.prizes >= 20

){

unlockAchievement(

"collector20",

"Master Collector"

);

}

if(

player.streak >= 5

){

unlockAchievement(

"streak5",

"Hot Streak"

);

}

const uniqueItems =

Object.keys(

player.collection

).length;

if(

uniqueItems >= 5

){

unlockAchievement(

"scienceSet",

"Scientist Collection"

);

}

}



function getAccuracy(){

if(

player.questionsAttempted===0

){

return 0;

}

return Math.round(

player.questionsCorrect /

player.questionsAttempted

*100

);

}



function getWeakTopics(){

const weak=[];

for(

const topic in player.topicStats

){

const stats=

player.topicStats[
topic
];

const percent=

Math.round(

stats.correct /

stats.attempted

*100

);

if(

percent < 70

){

weak.push(

`${topic} (${percent}%)`

);

}

}

return weak;

}



function openDashboard(){

let weakTopics=

getWeakTopics();

if(

weakTopics.length===0

){

weakTopics=["None"];

}

alert(

`

Student:

${player.name}

Class:

${player.studentClass}

Accuracy:

${getAccuracy()}%

Credits:

${player.credits}

Prizes:

${player.prizes}

Achievements:

${Object.keys(player.achievements).length}

Collection:

${Object.keys(player.collection).length}

Weak Topics:

${weakTopics.join(", ")}

`

);

}



function saveGameReport(){

const blob=

new Blob(

[

JSON.stringify(

player,

null,

2

)

],

{

type:

"application/json"

}

);

const link=

document.createElement(
"a"
);

link.href=

URL.createObjectURL(
blob
);

link.download=

`${player.name}_report.json`;

link.click();

}
