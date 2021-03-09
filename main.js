// variables for querySelectors below
var clearWinsButton = document.querySelector('#clearWinsButton');
var gameBoard = document.querySelector('#gameBoard');
var gameTile = document.querySelectorAll('.game-tile');
var miniGameBoardsPlayer1 = document.querySelector('.mini-boards-player1');
var miniGameBoardsPlayer2 = document.querySelector('.mini-boards-player2');
var nextTurnMessage = document.querySelector('#turnMessage');
var renderplayerOneEmoji = document.querySelector('#player1Emoji');
var renderplayerTwoEmoji = document.querySelector('#player2Emoji');
var renderWinsPlayerOne = document.querySelector('#playerOneWins');
var renderWinsPlayerTwo = document.querySelector('#playerTwoWins');
var restartGameButton = document.querySelector('#restartGameButton');

// global variables below
var currentGame;

// event listeners below
window.addEventListener('load', startGame);
gameBoard.addEventListener('click', playGame);
restartGameButton.addEventListener('click', restartGame);
clearWinsButton.addEventListener('click', clearWins);

//functions below
function startGame() {
  currentGame = new Game('player2');
  setPlayerEmoji();
  renderWinTextOnLoad();
  renderNextTurnMessageOnLoad();
  getWinsFromLocalStorage();
  getEmojisFromLocalStorage();
}

function setPlayerEmoji() {
  currentGame.player1.token = '🥵';
  currentGame.player2.token = '🥶';
  renderplayerOneEmoji.innerText = currentGame.player1.token;
  renderplayerTwoEmoji.innerText = currentGame.player2.token;
}

function renderWinTextOnLoad() {
  renderWinsPlayerOne.innerText = `0 win`;
  renderWinsPlayerTwo.innerText = `0 win`;
}

function renderNextTurnMessageOnLoad() {
  nextTurnMessage.innerText = `It\'s ${currentGame.player1.token}\'s turn!`;
}

function getWinsFromLocalStorage() {
  currentGame.player1.getWinsFromLocalStorage('player1', '1');
  currentGame.player2.getWinsFromLocalStorage('player2', '5');
}

function getEmojisFromLocalStorage() {
  currentGame.player1.getEmojisFromLocalStorage('player1', 'a');
  currentGame.player2.getEmojisFromLocalStorage('player2', 'b');
}

function playGame(event) {
  event.preventDefault();
  var targetKey = event.target.id;
  currentGame.assignPlayerTurn(event, targetKey)
}

function renderTokenToBoard(player, targetKey, event) {
  if (targetKey !== 'gameBoard') {
    event.target.innerText = currentGame[player].token;
    disableSingleTilePointerEvent(event) 
  }
}

function renderNextTurnMessage(player, targetKey) {
  if (targetKey !== 'gameBoard') {
    nextTurnMessage.innerText = `It\'s ${currentGame[player].token}\'s turn!`;
  }
}

function renderWinMessage(winner) {
  nextTurnMessage.innerText = `${this.currentGame[winner].token} won!`;
}

function renderWinScore(wins, winner) {
  if (wins !== 1 && winner === 'player1') {
    renderWinsPlayerOne.innerText = `${wins} wins`;
  } else if (winner === 'player1') {
    renderWinsPlayerOne.innerText = `${wins} win`;
  } 

  if (wins !== 1 && winner === 'player2') {
    renderWinsPlayerTwo.innerText = `${wins} wins`;
  } else if (winner === 'player2') {
    renderWinsPlayerTwo.innerText = `${wins} win`;
  } 
}

function renderDrawMessage() {
  nextTurnMessage.innerText = `It's a draw!`;
}

function createMiniWinBoards(winner) {
  var createMiniBoardCards = '';
  for (var i = 0; i < currentGame[winner].historicalEmojis.length; i++) {
    createMiniBoardCards += 
      `          
        <div class="mini-game-board" id="miniGameBoard">
          <article class='mini-game-tile' id='zero'>${currentGame[winner].historicalEmojis[i].zero}</article>
          <article class='mini-game-tile' id='three'>${currentGame[winner].historicalEmojis[i].three}</article>
          <article class='mini-game-tile' id='six'>${currentGame[winner].historicalEmojis[i].six}</article>
          <article class='mini-game-tile' id='one'>${currentGame[winner].historicalEmojis[i].one}</article>
          <article class='mini-game-tile' id='four'>${currentGame[winner].historicalEmojis[i].four}</article>
          <article class='mini-game-tile' id='seven'>${currentGame[winner].historicalEmojis[i].seven}</article>
          <article class='mini-game-tile' id='two'>${currentGame[winner].historicalEmojis[i].two}</article>
          <article class='mini-game-tile' id='five'>${currentGame[winner].historicalEmojis[i].five}</article>
          <article class='mini-game-tile' id='eight'>${currentGame[winner].historicalEmojis[i].eight}</article>
        </div>
        `;
  }
  renderMiniWinCards(winner, createMiniBoardCards);
}

function renderMiniWinCards(winner, miniCards) {
  if (winner === 'player1') {
    miniGameBoardsPlayer1.innerHTML = miniCards;
  } else if (winner === 'player2') {
      miniGameBoardsPlayer2.innerHTML = miniCards;
  }
}

function restartGame() {
  document.location.reload();
  startGame();
}

function clearWins() {
  localStorage.clear();
  document.location.reload();
  startGame();
}

function startNewGameOnDelay(winner, nextPlayer) {
  setTimeout( function() {
    if (winner) {
      renderNextTurnMessage(nextPlayer);
      clearEachTile();
      enableAllTilePointerEvents();
    }
  }, 3000);
}

function enableAllTilePointerEvents() {
  for (var i = 0; i < gameTile.length; i++) {
    gameTile[i].classList.remove('disable');
    }
}

function disableAllTilePointerEvents(winner) {
  if (winner) {
    for (var i = 0; i < gameTile.length; i++) {
      gameTile[i].classList.add('disable');
    }
  }
}

function disableSingleTilePointerEvent(event) {
  event.target.classList.add('disable');
}

function clearEachTile() {
  for (var i = 0; i < gameTile.length; i++) {
    gameTile[i].innerText = "";
    }
}