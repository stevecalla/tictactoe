// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');

// global variables below
var player = 'player2'
var currentBoard = {zero: 0, one: 0, two: 0, 
                  three: 0, four: 0, five: 0, 
                  six: 0, seven: 0, eight: 0};

// event listeners below
window.addEventListener('load', startGame);
gameBoard.addEventListener('click', playerTurn);

function startGame() {
  var currentGame = new Game();
}


function renderTokenToBoard(player, game, token, event) {
  event.target.innerText = token;
  event.target.disabled = true;
  determineWinner(player, game)
}