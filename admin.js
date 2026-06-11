const ADMIN_PASSWORD = "Shirtpapasg";

function openAdminLogin(){

const password = prompt(
"Enter Admin Password"
);

if(password !== ADMIN_PASSWORD){

alert("Wrong Password");

return;

}

openAdminPanel();

}

function openAdminPanel(){

document.getElementById(
"admin-modal"
).style.display="block";

loadAdminData();

}

function closeAdminPanel(){

document.getElementById(
"admin-modal"
).style.display="none";

}

function loadAdminData(){

const facts = JSON.parse(

localStorage.getItem(
"scienceFacts"
)

||

"[]"

);

const questions = JSON.parse(

localStorage.getItem(
"scienceQuestions"
)

||

"[]"

);

document.getElementById(
"admin-facts"
).value=

JSON.stringify(
facts,
null,
2
);

document.getElementById(
"admin-questions"
).value=

JSON.stringify(
questions,
null,
2
);

}

function saveAdminData(){

try{

const facts = JSON.parse(

document.getElementById(
"admin-facts"
).value

);

const questions = JSON.parse(

document.getElementById(
"admin-questions"
).value

);

localStorage.setItem(
"scienceFacts",
JSON.stringify(facts)
);

localStorage.setItem(
"scienceQuestions",
JSON.stringify(questions)
);

alert(
"Admin Data Saved"
);

}

catch(e){

alert(
"Invalid JSON Format"
);

}

}
