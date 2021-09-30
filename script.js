const userId = "userId";

const menu = document.querySelector(".menu");
const logInDiv = document.querySelector("#logIn")
const userInput = document.querySelector("#userInput");
const passInput = document.querySelector("#passInput");
const logInBtn = document.querySelector("#logInBtn");

/*  Funktion för att hämta data från fil eller url */
const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
/*  Om användaren redan har loggat in och inte loggat ut igen så kommer man 
    automatiskt till välkomstsidan */
function checkLogIn() {
    if (localStorage.getItem(userId) !== null) {
        logIn(true);
    }
}
checkLogIn();

/*  Skapar click-funktion för inloggningsknappen som hämtar input-värden och jämför
    med json fil för att logga in eller inte, sparas i localStorage 
    om true */
logInBtn.addEventListener("click", async function () {
    const usersData = await getData("users.json");

    for (i = 0; i < usersData.length; i++) {
        if (userInput.value == usersData[i].userLogin && passInput.value == usersData[i].userPassword) {
            localStorage.setItem(userId, i);
        }
    }
    if (localStorage.getItem("userId") !== null) {
        logIn(true);
    }
    else {
        logIn(false);
    }
});

/*  Funktion för vart man ska hamna när man har skrivit in username och password.
    Om inputen är true, alltså rätt password och username så skapas en ny välkomstsida 
    med utloggningsknapp. Om den är false och fel uppgifter matats in så skapas en 
    felmeddelande-sida och man får en knapp som säger försök igen. */
async function logIn(user) {
    const usersData = await getData("users.json");
    logInDiv.parentNode.removeChild(logInDiv);
    const nextHeader = document.createElement("h3");
    const nextPara = document.createElement("p");
    if (user) {
        nextHeader.innerText = "Welcome";
        nextPara.innerText = ('Hi there ' + usersData[localStorage.getItem(userId)].userName + '! "Välkommen in i värmen" as we say in sweden.');
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
    logOutBtn.addEventListener("click", function () {
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
    tryAgainBtn.addEventListener("click", function () {
        const wrongHeader = document.querySelector("h3");
        const wrong = document.querySelector("p")
        deleteElement(wrongHeader);
        deleteElement(wrong);
        deleteElement(tryAgainBtn);
        menu.appendChild(logInDiv);
    })
}

/*  Funktion för att ta bort element. */
function deleteElement(elm) {
    elm.parentNode.removeChild(elm);
}