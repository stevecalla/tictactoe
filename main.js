// variables for querySelectors below
var gameBoard = document.querySelector('#gameBoard');
var gameTile = document.querySelectorAll('.game-tile');
var miniGameBoardsPlayer1 = document.querySelector('.mini-boards-player1');
var miniGameBoardsPlayer2 = document.querySelector('.mini-boards-player2');
var nextTurnMessage = document.querySelector('#turnMessage');
var renderplayerOneEmoji = document.querySelector('#player1Emoji');
var renderplayerTwoEmoji = document.querySelector('#player2Emoji');
var renderWinsPlayerOne = document.querySelector('#playerOneWins');
var renderWinsPlayerTwo = document.querySelector('#playerTwoWins');

// global variables below
var currentGame;

// event listeners below
window.addEventListener('load', startGame);
gameBoard.addEventListener('click', playGame);

//functions below
function startGame() {
  currentGame = new Game('player2');
  setPlayerEmoji();
  renderWinTextOnLoad();
  currentGame.player1.getWinsFromLocalStorage();
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

function renderDrawMessage() {
  nextTurnMessage.innerText = `It's a draw!`;
}

function renderWinMessage(winner) {
  nextTurnMessage.innerText = `${this.currentGame[winner].token} won!`;
}

function renderWinTextOnLoad() {
  playerOneWins.innerText = `0 win`;
  playerTwoWins.innerText = `0 win`;
}

function renderWinScore(wins, winner) {
  if (wins !== 1 && winner === 'player1') {
    playerOneWins.innerText = `${wins} wins`;
  } else if (winner === 'player1') {
    playerOneWins.innerText = `${wins} win`;
  } 

  if (wins !== 1 && winner === 'player2') {
    playerTwoWins.innerText = `${wins} wins`;
  } else if (winner === 'player2') {
    playerTwoWins.innerText = `${wins} win`;
  } 
}

function convertWinBoardToEmojis(board) {
  var emojiBoard = {zero: "", one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: ""};
  var boardKeys = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  for (var i = 0; i < boardKeys.length; i++) {
    if (board[boardKeys[i]] === 5) {
      emojiBoard[boardKeys[i]] = currentGame.player2.token;
    } else if (board[boardKeys[i]] === 1) {
      emojiBoard[boardKeys[i]] = currentGame.player1.token;
    }
  }
  currentGame.winHistory(emojiBoard);
}

function createMiniWinBoards(winner) {
  var createMiniBoardCards = '';
  for (var i = 0; i < currentGame[winner].historicalWins.length; i++) {
    createMiniBoardCards += 
      `          
        <div class="mini-game-board" id="miniGameBoard">
          <article class='mini-game-tile' id='zero'>${currentGame[winner].historicalWins[i].zero}</article>
          <article class='mini-game-tile' id='three'>${currentGame[winner].historicalWins[i].three}</article>
          <article class='mini-game-tile' id='six'>${currentGame[winner].historicalWins[i].six}</article>
          <article class='mini-game-tile' id='one'>${currentGame[winner].historicalWins[i].one}</article>
          <article class='mini-game-tile' id='four'>${currentGame[winner].historicalWins[i].four}</article>
          <article class='mini-game-tile' id='seven'>${currentGame[winner].historicalWins[i].seven}</article>
          <article class='mini-game-tile' id='two'>${currentGame[winner].historicalWins[i].two}</article>
          <article class='mini-game-tile' id='five'>${currentGame[winner].historicalWins[i].five}</article>
          <article class='mini-game-tile' id='eight'>${currentGame[winner].historicalWins[i].eight}</article>
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

function callTimeOut(winner, nextPlayer) {
  setTimeout( function() {
    if (winner) {
      renderNextTurnMessage(nextPlayer);
      clearEachTile();
      enableAllTilePointerEvents();
    }
  }, 2000);
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

function setPlayerEmoji() {
  currentGame.player1.token = '🥵';
  currentGame.player2.token = '🥶';
  renderplayerOneEmoji.innerText = currentGame.player1.token;
  renderplayerTwoEmoji.innerText = currentGame.player2.token;
}
