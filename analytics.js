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



function saveGameReport(){

const blob =

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

const link =

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
