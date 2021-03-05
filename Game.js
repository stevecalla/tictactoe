class Game {
  constructor() {
    this.player1 = 1; //new Player(id);
    this.player2 = 5; //new Player(id);
    this.currentBoard = {zero: 0, one: 0, two: 0, 
                        three: 0, four: 0, five: 0, 
                        six: 0, seven: 0, eight: 0};
    // this.TBD;
  }

  playerTurn(event, targetKey, game) {
    var token = null;
    var number; 
    if (player === 'player2' && event.target.innerText === '') {
      player = 'player1';
      number = 1;
      token = '✖️'; 
    } else if (event.target.innerText === '') {
      player = 'player2';
      number = 5;
      token = '⭕';
    }
    this.updateGameTracker(player, number, token, targetKey, game, event);
  }

  updateGameTracker(player, number, token, targetKey, game, event) {
    console.log(event.target)
    // var targetKey = event.target.id;
    this.currentBoard[targetKey] = number;
    console.log('b', this.currentBoard)
    renderTokenToBoard(player, game, token, event);
  }

  determineWinner(player, game) {
    // var nodeList = document.querySelectorAll('button');
    var winner;
    var winningScore = 3;
    if (player === 'player2') {
      var winningScore = 15;
    } 
    this.checkForPlayerWin(player, game, winner, winningScore);
  }

  checkForPlayerWin(player, game, winner, winningScore) {
    console.log('d', this.currentBoard)
    if (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two === winningScore
        || this.currentBoard.three + this.currentBoard.four + this.currentBoard.five === winningScore
        || this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.three + this.currentBoard.six === winningScore
        || this.currentBoard.one + this.currentBoard.four + this.currentBoard.seven === winningScore
        || this.currentBoard.two + this.currentBoard.five + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.four + this.currentBoard.eight === winningScore
        || this.currentBoard.two + this.currentBoard.four + this.currentBoard.six === winningScore) {
      winner = player;
    }
    console.log('winner', winner);
    this.checkForGameDraw(this.currentBoard, winner);
    this.disableAllButtons(winner);
  }


  checkForGameDraw(game, winner) {
    if(!winner && (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two 
      + this.currentBoard.three + this.currentBoard.four + this.currentBoard.five
      + this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight > 24)) {
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