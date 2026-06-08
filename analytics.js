function generateReport(){

let accuracy = 0;

if(

player.questionsAttempted > 0

){

accuracy =

Math.round(

player.questionsCorrect /

player.questionsAttempted

*100

);

}

return {

name:

player.name,

class:

player.studentClass,

credits:

player.credits,

prizes:

player.prizes,

streak:

player.streak,

attempted:

player.questionsAttempted,

correct:

player.questionsCorrect,

accuracy:

accuracy,

topics:

player.topicStats

};

}



function saveGameReport(){

const report =

generateReport();

const blob =

new Blob(

[

JSON.stringify(

report,

null,

2

)

],

{

type:

"application/json"

}

);

const link =

document.createElement(
"a"
);

link.href =

URL.createObjectURL(
blob
);

link.download =

`${player.name}_report.json`;

link.click();

}



function getWeakTopics(){

const stats =

player.topicStats;

const weak = [];

for(

const topic in stats

){

const data =

stats[topic];

const percent =

Math.round(

data.correct /

data.attempted

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
