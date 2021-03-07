// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');
var nextTurnMessage = document.querySelector('#turnMessage');
var renderWinsPlayerOne = document.querySelector('#playerOneWins');
var renderWinsPlayerTwo = document.querySelector('#playerTwoWins');
var miniGameBoardsPlayer1 = document.querySelector('.mini-boards-player1');
var miniGameBoardsPlayer2 = document.querySelector('.mini-boards-player2');

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
  currentGame.player1.getWinsFromLocalStorage();
}

function playGame(event) {
  event.preventDefault();
  var targetKey = event.target.id;
  currentGame.playerTurn(event, targetKey, currentGame)
}

function renderTokenToBoard(player, game, targetKey, event) {
  if (targetKey !== 'gameBoard') {
    event.target.innerText = currentGame[player].token;
  }
  event.target.disabled = true; 
}

function renderNextTurnMessage(player) {
  nextTurnMessage.innerText = `It\'s ${currentGame[player].token}\'s turn!`;
}

function renderWinScore(wins, winner) {
  //can i just display wins? rather than this.current....?
  if (wins !== 1 && winner === 'player1') {
    playerOneWins.innerText = `${this.currentGame[winner].wins} wins`;
  } else if (winner === 'player1') {
    playerOneWins.innerText = `${this.currentGame[winner].wins} win`;
  }

  if (wins !== 1 && winner === 'player2') {
    playerTwoWins.innerText = `${this.currentGame[winner].wins} wins`;
  } else if (winner === 'player2') {
    playerTwoWins.innerText = `${this.currentGame[winner].wins} win`;
  }
}

function renderMiniWinCards1() {
  miniGameBoardsPlayer1.innerHTML = "";
  console.log(currentGame.player1.historicalWins);
  for (var i = 0; i < currentGame.player1.historicalWins.length; i++) {
    miniGameBoardsPlayer1.innerHTML += 
    `          
      <div class="mini-game-board" id="miniGameBoard">
        <button class='mini-game-tile' id='zero'>${currentGame.player1.historicalWins[i].zero}</button>
        <button class='mini-game-tile' id='one'>${currentGame.player1.historicalWins[i].one}</button>
        <button class='mini-game-tile' id='two'>${currentGame.player1.historicalWins[i].two}</button>
        <button class='mini-game-tile' id='three'>${currentGame.player1.historicalWins[i].three}</button>
        <button class='mini-game-tile' id='four'>${currentGame.player1.historicalWins[i].four}</button>
        <button class='mini-game-tile' id='five'>${currentGame.player1.historicalWins[i].five}</button>
        <button class='mini-game-tile' id='six'>${currentGame.player1.historicalWins[i].six}</button>
        <button class='mini-game-tile' id='seven'>${currentGame.player1.historicalWins[i].seven}</button>
        <button class='mini-game-tile' id='eight'>${currentGame.player1.historicalWins[i].eight}</button>
      </div>
      `;
  }
}

function renderMiniWinCards2() {
  miniGameBoardsPlayer2.innerHTML = "";
  console.log(currentGame.player2.historicalWins);
  for (var i = 0; i < currentGame.player2.historicalWins.length; i++) {
    miniGameBoardsPlayer2.innerHTML += 
    `          
      <div class="mini-game-board" id="miniGameBoard">
        <button class='mini-game-tile' id='zero'>${currentGame.player2.historicalWins[i].zero}</button>
        <button class='mini-game-tile' id='one'>${currentGame.player2.historicalWins[i].one}</button>
        <button class='mini-game-tile' id='two'>${currentGame.player2.historicalWins[i].two}</button>
        <button class='mini-game-tile' id='three'>${currentGame.player2.historicalWins[i].three}</button>
        <button class='mini-game-tile' id='four'>${currentGame.player2.historicalWins[i].four}</button>
        <button class='mini-game-tile' id='five'>${currentGame.player2.historicalWins[i].five}</button>
        <button class='mini-game-tile' id='six'>${currentGame.player2.historicalWins[i].six}</button>
        <button class='mini-game-tile' id='seven'>${currentGame.player2.historicalWins[i].seven}</button>
        <button class='mini-game-tile' id='eight'>${currentGame.player2.historicalWins[i].eight}</button>
      </div>
      `;
  }
}