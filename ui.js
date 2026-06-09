function updateHUD(){

const accuracy =

player.questionsAttempted===0

?

0

:

Math.round(

player.questionsCorrect /

player.questionsAttempted

*100

);



document.getElementById(
"player-hud-tag"
).innerText=

player.name || "Guest";



document.getElementById(
"credit-display"
).innerText=

player.credits;



document.getElementById(
"streak-display"
).innerText=

player.streak;



document.getElementById(
"prizes-display"
).innerText=

player.prizes;



document.getElementById(
"accuracy-display"
).innerText=

accuracy + "%";



renderCollectionBook();

}



function renderCollectionBook(){

let panel =

document.getElementById(
"collection-panel"
);



if(!panel){

panel =

document.createElement(
"div"
);

panel.id="collection-panel";

panel.style.position="fixed";

panel.style.top="20px";

panel.style.right="20px";

panel.style.width="280px";

panel.style.background="rgba(0,0,0,0.85)";

panel.style.color="white";

panel.style.padding="15px";

panel.style.borderRadius="12px";

panel.style.zIndex="50";

document.body.appendChild(
panel
);

}



const allItems=[

"Battery",

"Atom",

"Plant",

"Magnet",

"Crystal"

];



let collected=0;



let html=

"<h3>Science Collection</h3>";



for(

const item of allItems

){

const count=

player.collection?.[item] || 0;



if(count>0){

collected++;

html +=

`✅ ${item} x${count}<br>`;

}

else{

html +=

`⬜ ${item}<br>`;

}

}



const percent =

Math.round(

(collected /

allItems.length)

*100

);



html +=

"<hr>";



html +=

`Progress: ${collected}/${allItems.length}<br>`;



html +=

`${percent}% Complete<br><br>`;



if(

collected===allItems.length

){

html +=

"🏆 Scientist Collection Complete";

}



panel.innerHTML=html;

}
