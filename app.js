const gameSection = document.querySelector(".GameSection");
const playButtons = document.querySelectorAll(".GameSection__button");
console.log(localStorage);

// define game object
const gameStatus = {
  step: "StepOne",
  player: {
    currentPick: {
      selection: "",
      beats: "",
    },
    currentWin: false,
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
  { selection: "scissors", beats: "paper" },
  { selection: "paper", beats: "stone" },
  { selection: "rock", beats: "scissors" },
];

const findBeats = (el) => {
  return rules.filter((obj) => obj.selection == el)[0].beats;
};

//SETUP
//sets initial localStorage
let storedGame = JSON.parse(localStorage.getItem("RPS"));
if (!storedGame) {
  localStorage.setItem("RPS", JSON.stringify(gameStatus));
  storedGame = JSON.parse(JSON.stringify(gameStatus));
}

//adds player.overallScore from localStorage to DOM
const score = storedGame.player.overallScore;
document.querySelector(".Card__score").textContent = score;

//THE GAME
//1 - Update selection
const updateGameObj = (str) => {
  console.log({ str });
  storedGame.player.currentPick = {
    selection: str.substring(8),
    // beats: findBeats(str.substring(5)),
  };
};

//2 & 4 - Update DOM
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

//score change

//3 -  Update game.computer

//5 - Update local storage

//handle game button click
const handlePlay = (e) => {
  const playerSelection = e.target.parentNode;
  e.preventDefault();
  updateGameObj(playerSelection.classList[1]);
  updateDOM(gameSection, "StepOne", "StepTwo");
  updateButtonDOM(
    playButtons[0],
    playButtons[0].classList[1],
    storedGame.player.currentPick.selection
  );
  updateButtonDOM(playButtons[1], playButtons[1].classList[1], "loading");

  //Create Promise that
  //1. Updates game.player
  //2. Updates GameSection DOM with new game.gameStatus and game.player
  //3. Calls timeout function to set game.computer.currentPick & game.gameStatus
  //4. Updates GameSection & HeaderSection DOM with game.gameStatus, game.player, game.computer
  //5. Updates local storage
};

const closeRules = (e) => {
  console.log("Playing");
  e.preventDefault();
  document.querySelector(".RulesPopup").classList.toggle("RulesPopup--hidden");
};

//toggle rules
const toggleRulesPopup = (e) => {
  e.preventDefault();
  document.querySelector(".RulesPopup").classList.toggle("RulesPopup--hidden");
};

// add event listeners to all  buttons
document.addEventListener("DOMContentLoaded", function () {
  const playButtons = document.querySelectorAll(".GameSection__button");
  playButtons.forEach((btn) => btn.addEventListener("click", handlePlay));

  const rulesButton = document.querySelector(".LegendSection__button");
  const closeRulesButtons = document.querySelectorAll(".RulesPopup__button");
  rulesButton.addEventListener("click", toggleRulesPopup);
  closeRulesButtons.forEach((btn) =>
    btn.addEventListener("click", toggleRulesPopup)
  );
});
