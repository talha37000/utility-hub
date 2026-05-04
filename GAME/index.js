const btnEls = document.querySelectorAll(".move-btn");
const resultEl = document.getElementById("result");
const userScoreEl = document.getElementById("myscore");
const cpuScoreEl = document.getElementById("computerscore");
const roundEl = document.getElementById("round-num");
const highScoreEl = document.getElementById("high-score");
const resetBtn = document.getElementById("reset-game");

// Load saved scores
let userScore = parseInt(localStorage.getItem("rps_userScore")) || 0;
let cpuScore = parseInt(localStorage.getItem("rps_cpuScore")) || 0;
let roundCount = 1;
let highScore = localStorage.getItem("rps_highScore") || 0;

// Initialize UI
userScoreEl.innerText = userScore;
cpuScoreEl.innerText = cpuScore;
highScoreEl.innerText = highScore;

btnEls.forEach((button) => {
    button.addEventListener("click", () => {
        if (roundCount <= 5) {
            const playerSelection = button.id;
            const computerSelection = computerPlay();
            const result = playRound(playerSelection, computerSelection);

            resultEl.textContent = result;
            roundCount++;

            if (roundCount > 5) {
                endSeries();
            } else {
                roundEl.innerText = roundCount;
            }
        }
    });
});

function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(player, cpu) {
    if (player === cpu) return `Tie! Both chose ${player}`;

    const winMap = { rock: "scissors", paper: "rock", scissors: "paper" };

    if (winMap[player] === cpu) {
        userScore++;
        updateScores();
        return `Victory! ${player} crushes ${cpu}`;
    } else {
        cpuScore++;
        updateScores();
        return `Defeat! ${cpu} beats ${player}`;
    }
}

function updateScores() {
    userScoreEl.innerText = userScore;
    cpuScoreEl.innerText = cpuScore;
    localStorage.setItem("rps_userScore", userScore);
    localStorage.setItem("rps_cpuScore", cpuScore);

    if (userScore > highScore) {
        highScore = userScore;
        highScoreEl.innerText = highScore;
        localStorage.setItem("rps_highScore", highScore);
    }
}

function endSeries() {
    if (userScore > cpuScore) {
        resultEl.innerHTML = "<span style='color:#00f2ff'>SERIES WON! CHAMPION!</span>";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else if (cpuScore > userScore) {
        resultEl.innerHTML = "<span style='color:#ff00e6'>SERIES LOST! TRY AGAIN.</span>";
    } else {
        resultEl.innerText = "SERIES TIED!";
    }

    setTimeout(() => {
        roundCount = 1;
        roundEl.innerText = roundCount;
        resultEl.innerText = "Starting New Series...";
    }, 3000);
}

resetBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});