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
    event.target.classList.add('disable');
  }
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

id='zero'
id='three'
d='six'
id='one'
id='four'
id='seven'
id='two'
id='five'
id='eight'