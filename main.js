// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');

// global variables below
var currentGame;
var currentBoard = {zero: 0, one: 0, two: 0, 
                  three: 0, four: 0, five: 0, 
                  six: 0, seven: 0, eight: 0};

// event listeners below
window.addEventListener('load', startGame);
gameBoard.addEventListener('click', playGame);

function startGame() {
  // var currentGame;
  currentGame = new Game('player2');
  currentGame.player1.token = '✖️'; 
  currentGame.player2.token = '⭕';

  // get player from local storage
  // currentGame.startGame('player from local storage');
}

function playGame(event) {
  // var currentGame;
  var targetKey = event.target.id;
  // currentGame = new Game();
  console.log(event.target)
  console.log(targetKey)
  currentGame.playerTurn(event, targetKey, currentGame)
  // currentGame.determineWinner(player, game)
}

function renderTokenToBoard(player, game, event) {
  // render from data model
  event.target.innerText = currentGame[player].token;
  event.target.disabled = true;
  
}