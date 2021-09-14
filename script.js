const namn = "test";
const lösenord = "1234";

const meny = document.querySelector(".meny");
const logInDiv = document.querySelector("#logIn")
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logInBtn = document.querySelector("#logInBtn");

/*  Om användaren redan har loggat in och inte loggat ut igen så kommer man 
    automatiskt till välkomstsidan */  
function checkLogIn(user, passw) {
    if (localStorage.getItem(user) == passw) {
        logIn(true);
    } 
}

/*  Matar in namn och lösenord i funktionen för att kontrollera om vi är inloggade */
checkLogIn(namn, lösenord);

/*  Skapar click-funktion för inloggningsknappen som hämtar input-värden och jämför
    med namn och lösenord variablerna för att logga in eller inte, sparas i localStorage 
    om true */
logInBtn.addEventListener("click", function(){
    if(username.value == namn && password.value == lösenord) {
        localStorage.setItem(username.value, password.value);
        logIn(true);
    } else {
        logIn(false);
    }
});

/*  Funktion för vart man ska hamna när man har skrivit in användarnamn och lösenord.
    Om inputen är true, alltså rätt lösenord och användarnamn så skapas en ny välkomstsida 
    med utloggningsknapp. Om den är false och fel uppgifter matats in så skapas en 
    felmeddelande-sida och man får en knapp som säger försök igen. */
function logIn(user) {
    logInDiv.parentNode.removeChild(logInDiv);
    const nextHeader = document.createElement("h3");
    const nextPara = document.createElement("p");
    if (user == true) {
        nextHeader.innerText = "Welcome";
        nextPara.innerText = ('Hi there ' + namn + '! "Välkommen in i värmen" as we say in sweden.');
        meny.appendChild(nextHeader);
        meny.appendChild(nextPara);
        logOut();
    }
    else {
        nextHeader.innerText = "Something went wrong";
        nextPara.innerText = "Wrong username and/or password!";
        meny.appendChild(nextHeader);
        meny.appendChild(nextPara);
        tryAgain();
    }
}

/*  Funktion för utloggning - skapar en knapp som vid klick raderar alla element som inte 
    ska finnas på startsidan och återskapar logInDiv som är startsidan/inloggningssidan. 
    När man väljer att logga ut så rensas även localStorage och inputfälten */
function logOut() {
    const logOutBtn = document.createElement("button");
    logOutBtn.innerText = "Logout";
    meny.appendChild(logOutBtn);
    logOutBtn.addEventListener("click", function() {
        localStorage.removeItem(namn);
        username.value = "";
        password.value = "";
        const welcomeHeader = document.querySelector("h3");
        const welcome = document.querySelector("p");
        deleteElement(welcomeHeader);
        deleteElement(welcome);
        deleteElement(logOutBtn);
        meny.appendChild(logInDiv);
    });
}

/*  Funktion för "försök igen knapp", när användaren skriver in fel användarnamn och 
    lösen - skapar en knapp som vid klick raderar elementen på sidan och återskapar 
    logInDiv som är startsidan/inloggningssidan  */
function tryAgain() {
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.innerText = "Try again";
    meny.appendChild(tryAgainBtn);
    tryAgainBtn.addEventListener("click", function() {
        const wrongHeader = document.querySelector("h3");
        const wrong = document.querySelector("p")
        deleteElement(wrongHeader);
        deleteElement(wrong);
        deleteElement(tryAgainBtn);
        meny.appendChild(logInDiv); 
    })
}

/*  Funktion för att ta bort element. */
function deleteElement (elm) {
    elm.parentNode.removeChild(elm);
}