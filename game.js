
function playMachine(){

if(

player.credits<=0

){

alert(

"No credits left"

);

return;

}

player.credits--;

const success =

Math.random();

if(

success > 0.65

){

player.prizes++;

alert(

"You won a prize!"

);

}else{

alert(

"Missed!"

);

}

updateHUD();

saveLocal();

}
