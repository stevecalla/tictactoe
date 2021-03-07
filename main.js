// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');
var nextTurnMessage = document.querySelector('#turnMessage');
var renderWinsPlayerOne = document.querySelector('#playerOneWins');
var renderWinsPlayerTwo = document.querySelector('#playerTwoWins');

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
  currentGame.player1.getWinsFromLocalStorage1();
  currentGame.player2.getWinsFromLocalStorage2();
}

function playGame(event) {
  event.preventDefault();
  console.log(event);
  var targetKey = event.target.id;
  currentGame.playerTurn(event, targetKey, currentGame)
}

function renderTokenToBoard(player, game, event) {
  event.target.innerText = currentGame[player].token;
  event.target.disabled = true; 
}

function renderNextTurnMessage(player) {
  console.log('mainjs', player)
  nextTurnMessage.innerText = `It\'s ${currentGame[player].token}\'s turn!`;
}

function renderWinScore(wins, winner) {
  if (wins !== 1 && winner === 'player1') {
    playerOneWins.innerText = `${this.currentGame.player1.wins} wins`;
  } else if (winner === 'player1') {
    playerOneWins.innerText = `${this.currentGame.player1.wins} win`;
  }

  if (wins !== 1 && winner === 'player2') {
    playerTwoWins.innerText = `${this.currentGame.player2.wins} wins`;
  } else if (winner === 'player2') {
    playerTwoWins.innerText = `${this.currentGame.player2.wins} win`;
  }
}