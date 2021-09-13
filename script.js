const namn = "test";
const lösenord = "1234";

const meny = document.querySelector(".meny");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logInBtn = document.querySelector("#logInBtn");

/* Skapar en function som ska utföra hämtningen av inputs + utföra inloggingen,
 samt sparande i localStorage till slut */
logInBtn.addEventListener("click", function(){
    const usernameInput = username.value;
    const passwordInput = password.value;
    let user = false;
    if(usernameInput == "test" && passwordInput == "1234") {
        user = true;
        localStorage.setItem(usernameInput, passwordInput);
        logIn(user);
    } else {
        user = false;
        logIn(user);
    }
});

function logIn(user) {
    if (user == true) {
        meny.textContent = "";
        const welcome = document.createElement("h2")
        welcome.innerText = "Välkommen in i värmen";
        meny.appendChild(welcome);
    }
    else {
        meny.textContent = "";
        const welcome = document.createElement("h2")
        welcome.innerText = "Du har tyvärr skrivit fel användarnamn eller lösenord";
        meny.appendChild(welcome);
    }
}

/*function logOut() {
    localStorage
}*/