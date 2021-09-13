const namn = "test";
const lösenord = "1234";

const meny = document.querySelector(".meny");
const logInDiv = document.querySelector("#logIn")
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logInBtn = document.querySelector("#logInBtn");


/*  Om användaren redan har loggat in och inte loggat ut igen så går man automatiskt
    till Välkomstsidan */
    
if (localStorage.getItem("test") == "1234") {
    logIn(true);
} 

/* Skapar en function som ska utföra hämtningen av inputs + utföra inloggingen,
 samt sparande i localStorage till slut */
logInBtn.addEventListener("click", function(){
    const usernameInput = username.value;
    const passwordInput = password.value;
    let user = false;
    if(usernameInput == namn && passwordInput == lösenord) {
        user = true;
        localStorage.setItem(usernameInput, passwordInput);
        logIn(user);
    } else {
        user = false;
        logIn(user);
    }
});

/*  Funktion för vart man ska hamna när man har skrivit in användarnamn och lösenord.
    om inputen är true så skapas en ny välkomstsida med utloggningsknapp. Om den är
    false så skapas ett felmeddelande och man får en knapp som säger försök igen. */
function logIn(user) {
    if (user == true) {
        logInDiv.style.display = "none";
        const welcome = document.createElement("h2")
        welcome.innerText = "Välkommen in i värmen";
        meny.appendChild(welcome);
        logOut();
    }
    else {
        logInDiv.style.display = "none";
        const welcome = document.createElement("h2")
        welcome.innerText = "Du har tyvärr skrivit fel användarnamn eller lösenord";
        meny.appendChild(welcome);
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
        const welcome = document.querySelector("h2")
        welcome.parentNode.removeChild(welcome);
        logOutBtn.parentNode.removeChild(logOutBtn);  
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
        const welcome = document.querySelector("h2")
        welcome.parentNode.removeChild(welcome);
        tryAgainBtn.parentNode.removeChild(tryAgainBtn);  
    })
}


