// define DOM element variables
const paperButton = document.querySelector(".button--paper");

// define game object
const game = {
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

//sets initial localStorage

//adds player.overallScore from localStorage to DOM

//THE GAME
//1. Update game.player

//1. Update game.player

//change DOM depending on game object - takes in player.currentPick, computer.currentPick, player.currentWin

//delayer computer play function - sets computer.currentPick to random selection

//calculate game result for player - function to return boolean depending on player's win

//update score

//update local storage

//handle game button click
const handlePlay = (e) => {
  //Create Promise that
  //1. Updates game.player
  //2. Updates DOM with new game.gameStatus and game.player
  //3. Calls timeout function to set game.computer.currentPick
  //Update game.player according to e.target
  //change DOM
  //create promise that
  //1. waits on timeOut function to change game.computer.currentPick
  //2. changes game.player.currentWin depending on game result
  //3. changes DOM to third screen and displays result
  //4. updates score
  //5. updates local storage
};

// add event listeners to all playing buttons
paperButton.addEventListener("click", buttonClick);
