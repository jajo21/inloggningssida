const username = "test";
const password = "1234";
const userId = "userId";

const menu = document.querySelector(".menu");
const logInDiv = document.querySelector("#logIn")
const userInput = document.querySelector("#userInput");
const passInput = document.querySelector("#passInput");
const logInBtn = document.querySelector("#logInBtn");

/*  Om användaren redan har loggat in och inte loggat ut igen så kommer man 
    automatiskt till välkomstsidan */  
function checkLogIn(userIdCheck, userCheck) {
    if (localStorage.getItem(userIdCheck) == userCheck) {
        logIn(true);
    } 
}

/*  Matar in username och password i funktionen för att kontrollera om vi är inloggade */
checkLogIn(userId, username);

/*  Skapar click-funktion för inloggningsknappen som hämtar input-värden och jämför
    med username och password variablerna för att logga in eller inte, sparas i localStorage 
    om true */
logInBtn.addEventListener("click", function(){
    if(userInput.value == username && passInput.value == password) {
        localStorage.setItem(userId, userInput.value );
        logIn(true);
    } else {
        logIn(false);
    }
});

/*  Funktion för vart man ska hamna när man har skrivit in användarusername och password.
    Om inputen är true, alltså rätt password och användarusername så skapas en ny välkomstsida 
    med utloggningsknapp. Om den är false och fel uppgifter matats in så skapas en 
    felmeddelande-sida och man får en knapp som säger försök igen. */
function logIn(user) {
    logInDiv.parentNode.removeChild(logInDiv);
    const nextHeader = document.createElement("h3");
    const nextPara = document.createElement("p");
    if (user == true) {
        nextHeader.innerText = "Welcome";
        nextPara.innerText = ('Hi there ' + username + '! "Välkommen in i värmen" as we say in sweden.');
        menu.appendChild(nextHeader);
        menu.appendChild(nextPara);
        logOut();
    }
    else {
        nextHeader.innerText = "Something went wrong";
        nextPara.innerText = "Wrong username and/or password!";
        menu.appendChild(nextHeader);
        menu.appendChild(nextPara);
        tryAgain();
    }
}

/*  Funktion för utloggning - skapar en knapp som vid klick raderar alla element som inte 
    ska finnas på startsidan och återskapar logInDiv som är startsidan/inloggningssidan. 
    När man väljer att logga ut så rensas även localStorage och inputfälten */
function logOut() {
    const logOutBtn = document.createElement("button");
    logOutBtn.innerText = "Logout";
    menu.appendChild(logOutBtn);
    logOutBtn.addEventListener("click", function() {
        localStorage.removeItem(userId);
        userInput.value = "";
        passInput.value = "";
        const welcomeHeader = document.querySelector("h3");
        const welcome = document.querySelector("p");
        deleteElement(welcomeHeader);
        deleteElement(welcome);
        deleteElement(logOutBtn);
        menu.appendChild(logInDiv);
    });
}

/*  Funktion för "försök igen knapp", när användaren skriver in fel användarusername och 
    lösen - skapar en knapp som vid klick raderar elementen på sidan och återskapar 
    logInDiv som är startsidan/inloggningssidan  */
function tryAgain() {
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.innerText = "Try again";
    menu.appendChild(tryAgainBtn);
    tryAgainBtn.addEventListener("click", function() {
        const wrongHeader = document.querySelector("h3");
        const wrong = document.querySelector("p")
        deleteElement(wrongHeader);
        deleteElement(wrong);
        deleteElement(tryAgainBtn);
        menu.appendChild(logInDiv); 
    })
}

/*  Funktion för att ta bort element. */
function deleteElement (elm) {
    elm.parentNode.removeChild(elm);
}