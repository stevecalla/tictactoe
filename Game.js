class Game {
  constructor() {
    this.player1 = 1;
    this.player2 = 5;
    // this.TBD;
  }

playerTurn(event) {
  var token = null;
  if (player === 'player2' && event.target.innerText === '') {
    player = 'player1';
    number = 1;
    token = '✖️'; 
  } else if (event.target.innerText === '') {
    player = 'player2';
    number = 5;
    token = '⭕';
  }
  updateGameTracker(player, number, token);
}

function updateGameTracker(player, number, token) {
  var targetKey = event.target.id;
  currentGame[targetKey] = number;
  renderTokenToBoard(player, currentGame, token);
}

  determineWinner(player, game) {
    var nodeList = document.querySelectorAll('button');
    var winner;
    var winningScore = 3;

    if (player === 'player2') {
      var winningScore = 15;
    } 
    checkForPlayerWin(player, game, winner, winningScore);
  }

  checkForPlayerWin(player, game, winner, winningScore) {
    // console.log(game);
    if (game.zero + game.one + game.two === winningScore
        || game.three + game.four + game.five === winningScore
        || game.six + game.seven + game.eight === winningScore
        || game.zero + game.three + game.six === winningScore
        || game.one + game.four + game.seven === winningScore
        || game.two + game.five + game.eight === winningScore
        || game.zero + game.four + game.eight === winningScore
        || game.two + game.four + game.six === winningScore) {
      winner = player;
    }
    console.log('winner', winner);
    checkForGameDraw(game, winner);
    disableAllButtons(winner);
  }


  checkForGameDraw(game, winner) {
    if(!winner && (game.zero + game.one + game.two 
      + game.three + game.four + game.five
      + game.six + game.seven + game.eight > 24)) {
        console.log('draw')
      }
  }

  disableAllButtons(winner) {
    if (winner) {
      var nodeList = document.querySelectorAll('button');
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].disabled = true;
      }
    }
  }

}

// GAME CLASS
// PROPERTIES
// 1) Two Player instances                                          DONE
// 2) A way to keep track of the data for the game board
// 3) A way to keep track of which player’s turn it currently is

// METHODS
// 1) A way to check the Game’s board data for win conditions
// 2) A way to detect when a game is a draw (no one has won)
// 3) A way to reset the Game’s board to begin a new game