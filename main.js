// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');

// global variables below
var currentGame;

// event listeners below
window.addEventListener('load', startGame);
gameBoard.addEventListener('click', playGame);

//functions below
function startGame() {
  // var currentGame;
  currentGame = new Game('player2');
  currentGame.createBoard();
  currentGame.player1.token = '✖️'; 
  currentGame.player2.token = '⭕';
}

function playGame(event) {
  var targetKey = event.target.id;
  currentGame.playerTurn(event, targetKey, currentGame)
}

function renderTokenToBoard(player, game, event) {
  event.target.innerText = currentGame[player].token;
  event.target.disabled = true;
  
}