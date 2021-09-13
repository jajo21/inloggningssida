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

checkLogIn(namn, lösenord);

/*  Skapar click-funktion för inloggningsknappen som ska utföra hämtningen av 
    inputs + utföra inloggingen, samt sparande i localStorage till slut */
logInBtn.addEventListener("click", function(){
    if(username.value == namn && password.value == lösenord) {
        localStorage.setItem(username.value, password.value);
        logIn(true);
    } else {
        logIn(false);
    }
});

/*  Funktion för vart man ska hamna när man har skrivit in användarnamn och lösenord.
    om inputen är true så skapas en ny välkomstsida med utloggningsknapp. Om den är
    false så skapas ett felmeddelande och man får en knapp som säger försök igen. */
function logIn(user) {
    if (user == true) {
        logInDiv.parentNode.removeChild(logInDiv);
        const welcomeHeader = document.createElement("h3");
        welcomeHeader.innerText = "Welcome";
        const welcome = document.createElement("p");
        welcome.innerText = ('Hi there ' + namn + '! "Välkommen in i värmen" as we say in sweden.');
        meny.appendChild(welcomeHeader);
        meny.appendChild(welcome);
        logOut();
    }
    else {
        logInDiv.parentNode.removeChild(logInDiv); 
        const wrongHeader = document.createElement("h3");
        wrongHeader.innerText = "Something went wrong";
        const wrong = document.createElement("p");
        wrong.innerText = "Wrong username and/or password!";
        meny.appendChild(wrongHeader);
        meny.appendChild(wrong);
        tryAgain();
    }
}

/*  Funktion för utloggning som tar en tillbaka till inloggningssidan när man klickar 
    på knappen, samt så ska localStorage rensas när man loggas ut */
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

/*  Funktion för när man skriver in fel användarnamn och lösenord så ska man trycka på en 
    knapp för att komma tillbaka till startsidan */
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


