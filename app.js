const gameSection = document.querySelector(".GameSection");
const playButtons = document.querySelectorAll(".GameSection__button");
const resultNode = document.querySelector(".Result__title");
localStorage.clear();

// define game object
const gameStatus = {
  step: "StepOne",
  player: {
    currentPick: {
      selection: "",
      beats: "",
    },
    overallScore: 0,
  },
  computer: {
    currentPick: {
      selection: "",
      beats: "",
    },
    overallScore: null,
  },
};

//define rules
const rules = [
  { selection: "paper", beats: "rock" },
  { selection: "scissors", beats: "paper" },
  { selection: "rock", beats: "scissors" },
];

//helper functions
const findBeats = (el) => {
  return rules.filter((obj) => obj.selection == el)[0].beats;
};

const updateScoreDOM = () => {
  document.querySelector(".Card__score").textContent =
    storedGame.player.overallScore;
};

//make random selection
const randomSelect = () => {
  let randomNumber = Math.floor(Math.random() * 2) + 1;
  let obj = rules[randomNumber];
  if (obj.selection != storedGame.player.currentPick.selection) {
    console.log({ randomNumber, obj });
    return obj;
  }
  randomSelect();
};

//delay function
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//find winner
const playerWins = () => {
  const playerBeats = storedGame.player.currentPick.beats;
  const computerSelection = storedGame.computer.currentPick.selection;
  if (playerBeats === computerSelection) {
    storedGame.player.overallScore += 1;
    return true;
  }
  storedGame.computer.overallScore += 1;
  return false;
};

//SETUP
//sets initial localStorage
let storedGame = JSON.parse(localStorage.getItem("RPS"));
if (!storedGame) {
  localStorage.setItem("RPS", JSON.stringify(gameStatus));
  storedGame = JSON.parse(JSON.stringify(gameStatus));
}
updateScoreDOM();

//THE GAME
//1 - Update selection
const updateSelectionObject = (player, str) => {
  storedGame[player].currentPick = {
    selection: str,
    beats: findBeats(str),
  };
};

//Update DOM
const updateDOM = (nodeEl, oldClass, newClass) => {
  nodeEl.classList.toggle(oldClass);
  nodeEl.classList.toggle(newClass);
};

const updateButtonDOM = (nodeEl, oldClass, selection) => {
  const buttonEl = nodeEl.childNodes[1];
  updateDOM(nodeEl, oldClass, `button--${selection}`);
  updateDOM(buttonEl, buttonEl.classList[1], `btn-${selection}`);
  buttonEl.setAttribute("aria-label", selection);
};

//handle game button click
const handlePlay = (e) => {
  const playerSelection = e.target.parentNode;
  e.preventDefault();
  updateSelectionObject("player", playerSelection.classList[1].substring(8));
  updateDOM(gameSection, "StepOne", "StepTwo");

  updateButtonDOM(
    playButtons[0],
    playButtons[0].classList[1],
    storedGame.player.currentPick.selection
  );
  updateButtonDOM(playButtons[1], playButtons[1].classList[1], "loading");

  delay(1000)
    .then(() => randomSelect())
    .then((selectObj) => {
      updateSelectionObject("computer", selectObj.selection);
    })
    .then(() =>
      updateButtonDOM(
        playButtons[1],
        playButtons[1].classList[1],
        storedGame.computer.currentPick.selection
      )
    )
    .then(() => {
      setTimeout(500);
    })
    .then(() => {
      updateDOM(gameSection, "StepTwo", "StepThree");
      storedGame.player.currentWin = playerWins();
      console.log(storedGame.player.currentWin);
      storedGame.player.currentWin
        ? (resultNode.textContent = "You Win")
        : (resultNode.textContent = "Computer Wins");
      updateScoreDOM();
      localStorage.setItem("RPS", JSON.stringify(storedGame));
    });
};

const closeRules = (e) => {
  e.preventDefault();
  document.querySelector(".RulesPopup").classList.toggle("RulesPopup--hidden");
};

//toggle rules
const toggleRulesPopup = (e) => {
  e.preventDefault();
  document.querySelector(".RulesPopup").classList.toggle("RulesPopup--hidden");
};

//game reset
const gameReset = (e) => {
  e.preventDefault();
  updateDOM(gameSection, "StepThree", "StepOne");
  playButtons.forEach((el, i) => {
    updateButtonDOM(el, el.classList[1], rules[i].selection);
  });
  storedGame.player.currentPick = {
    selection: "",
    beats: "",
  };
  storedGame.computer.currentPick = {
    selection: "",
    beats: "",
  };
  console.log(storedGame);
};

// add event listeners to all  buttons
document.addEventListener("DOMContentLoaded", function () {
  const playButtons = document.querySelectorAll(".GameSection__button");
  playButtons.forEach((btn) => btn.addEventListener("click", handlePlay));
  const playAgainButton = document.querySelector(".Result__button");
  const rulesButton = document.querySelector(".LegendSection__button");
  const closeRulesButtons = document.querySelectorAll(".RulesPopup__button");
  playAgainButton.addEventListener("click", gameReset);
  rulesButton.addEventListener("click", toggleRulesPopup);
  closeRulesButtons.forEach((btn) =>
    btn.addEventListener("click", toggleRulesPopup)
  );
});
