let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

let score = document.querySelector("#score");

let highScore = 0;


// Start Game
document.addEventListener("keypress", function () {
    if (!start) {
        console.log("Game Started");
        start = true;
        levelUp();
    }
});

// Flash for Game
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash for User
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Next Level
function levelUp() {
    userSeq = [];
    level++;
    score.innerText = level;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    gameFlash(randBtn);
}

// Check User Answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `
            Game Over!<br>
            Score: ${level}<br>
            High Score: ${highScore}<br>
            Press Any Key To Restart
        `;

        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button Click
function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

// Add Click Events
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset Game
function reset() {
    start = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}




