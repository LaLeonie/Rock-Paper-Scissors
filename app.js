let closeRulesButton;

// define game object
const initialGame = {
  gameStatus: "firstStep",
  player: {
    currentPick: {
      selectiion: "",
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

//SETUP
//sets initial localStorage
let storedGame = JSON.parse(localStorage.getItem("RPS"));
if (!storedGame) {
  localStorage.setItem("RPS", JSON.stringify(initialGame));
  storedGame = JSON.parse(JSON.stringify(initialGame));
}

//adds player.overallScore from localStorage to DOM
const score = storedGame.player.overallScore;
document.querySelector(".Card__score").textContent = score;

//THE GAME
//1 - Update game.player
const updatePlayer = (e) => {
  //get class that is selected
  //set currentPick
};

//2 & 4 - Update DOM
//upon gamestatus change

//score change

//3 -  Update game.computer

//5 - Update local storage

//handle game button click
const handlePlay = (e) => {
  e.preventDefault();
  console.log(e.target);
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
  const paperButton = document.querySelector(".button--paper");
  const scissorsButton = document.querySelector(".button--scissors");
  const rockButton = document.querySelector(".button--rock");
  const rulesButton = document.querySelector(".LegendSection__button");
  const closeRulesButtons = document.querySelectorAll(".RulesPopup__button");
  console.log(closeRulesButtons);
  paperButton.addEventListener("click", handlePlay);
  scissorsButton.addEventListener("click", handlePlay);
  rockButton.addEventListener("click", handlePlay);
  rulesButton.addEventListener("click", toggleRulesPopup);
  closeRulesButtons.forEach((btn) =>
    btn.addEventListener("click", toggleRulesPopup)
  );
});
