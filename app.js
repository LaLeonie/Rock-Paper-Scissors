console.log(localStorage);

// define game object
const gameStatus = {
  step: "StepOne",
  player: {
    currentPick: {
      selection: "",
      selectionClass: "",
      beats: "",
    },
    currentWin: false,
    overallScore: 0,
  },
  computer: {
    currentPick: {
      selectiion: "",
      selectionClass: "",
      beats: "",
    },
    overallScore: null,
  },
};

//define rules
const rules = [
  { selection: "scissors", selectionClass: "button--scissors", beats: "paper" },
  { selection: "paper", selectionClass: "button--paper", beats: "stone" },
  { selection: "rock", selectionClass: "button--rock", beats: "scissors" },
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
//1 - Update game.player
const updatePlayer = (arr) => {
  storedGame.player.currentPick = {
    selection: arr[1].substring(5),
    selectionClass: arr[1],
    beats: findBeats(arr[1].substring(5)),
  };
  console.log("storedGame", storedGame);
};

//2 & 4 - Update DOM
const updateDOM = (buttonEl, gameObj, newClass) => {
  const gameSection = document.querySelector(".GameSection");
  gameSection.classList.remove(gameObj.step);
  gameSection.classList.add(newClass);
  buttonEl.classList.remove(buttonEl.classList.item(1));
};

//upon gamestatus change

//score change

//3 -  Update game.computer

//5 - Update local storage

//handle game button click
const handlePlay = (e) => {
  e.preventDefault();
  console.log(e.target.classList);
  updatePlayer(e.target.classList);
  updateDOM(e.target, gameStatus, "StepTwo");
  gameStatus.step = "StepTwo";

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
