const namn = "test";
const lösenord = "1234";

const meny = document.querySelector(".meny");
const logInDiv = document.querySelector("#logIn")
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logInBtn = document.querySelector("#logInBtn");


/*  Om användaren redan har loggat in och inte loggat ut igen så går man automatiskt
    till Välkomstsidan */  
if (localStorage.getItem(namn) == lösenord) {
    logIn(true);
} 

/* Skapar en function som ska utföra hämtningen av inputs + utföra inloggingen,
 samt sparande i localStorage till slut */
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
        logInDiv.style.display = "none";
        const welcome = document.createElement("p")
        welcome.innerText = ('Hej "' + namn + '" välkommen in i värmen!');
        meny.appendChild(welcome);
        logOut();
    }
    else {
        logInDiv.style.display = "none";
        const wrong = document.createElement("p")
        wrong.innerText = "Du har tyvärr skrivit fel användarnamn eller lösenord!";
        meny.appendChild(wrong);
        tryAgain();
    }
}

/* Funktion för utloggning som ska ta en till inloggningssidan när man klickar på knappen,
    samt så ska localStorage rensas när man loggas ut */
function logOut() {
    const logOutBtn = document.createElement("button");
    logOutBtn.innerText = "Log out";
    meny.appendChild(logOutBtn);
    logOutBtn.addEventListener("click", function() {
        localStorage.removeItem(namn);
        logInDiv.style.display = "block";
        username.value = "";
        password.value = "";
        const welcome = document.querySelector("p")
        deleteElement(welcome);
        deleteElement(logOutBtn);
    });
}

/*  Funktion för när man skriver in fel användarnamn och lösenord så ska man trycka på en 
    knapp för att komma tillbaka till startsidan */
function tryAgain() {
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.innerText = "Try again";
    meny.appendChild(tryAgainBtn);
    tryAgainBtn.addEventListener("click", function() {
        logInDiv.style.display = "block";
        const wrong = document.querySelector("p")
        deleteElement(wrong);
        deleteElement(tryAgainBtn); 
    })
}

/*  Funktion för att ta bort element. */
function deleteElement (elm) {
    elm.parentNode.removeChild(elm);
}
