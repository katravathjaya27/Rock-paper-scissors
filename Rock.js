let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
  checkGameOver();
};

const checkGameOver = () => {
    if (userScore >= 25 || compScore >= 25) {
      gameOver = true;
      if (userScore > compScore) {
        msg.innerText = `🎉 Tournament Over! You won the tournament!`;
        msg.style.backgroundColor = "green";
      } else {
        msg.innerText = `💀 Tournament Over! Computer won the tournament!`;
        msg.style.backgroundColor = "red";
      }
    }
  };
  

const playGame = (userChoice) => {
  //Generate computer choice
  if (gameOver) return;
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Game reset. Start playing!";
  msg.style.backgroundColor = "#081b31";
});
