class Game {
  constructor(player) {
    this.player1 = new Player(1);
    this.player2 = new Player(5);
    this.currentPlayer = player || 'player2';
    // this.currentBoard = {zero: 0, one: 0, two: 0, 
    //                     three: 0, four: 0, five: 0, 
    //                     six: 0, seven: 0, eight: 0};
  }

  playerTurn(event, targetKey, game) {
    var token = null;
    var number; 
    if (this.currentPlayer === 'player2' && event.target.innerText === '') {
      this.currentPlayer = 'player1';
      number = 1;
      token = '✖️'; 
    } else if (event.target.innerText === '') {
      this.currentPlayer = 'player2';
      number = 5;
      token = '⭕';
    }
    this.updateGameTracker(this.currentPlayer, number, token, targetKey, game, event);
  }

  updateGameTracker(player, number, token, targetKey, game, event) {
    console.log(event.target)
    currentBoard[targetKey] = number;
    console.log('b', currentBoard)
    renderTokenToBoard(player, currentBoard, token, event);
    this.determineWinner(player, game)
  }

  determineWinner(player, game) {
    var winner;
    var winningScore = 3;
    if (player === 'player2') {
      var winningScore = 15;
    } 
    this.checkForPlayerWin(player, game, winner, winningScore);
  }

  checkForPlayerWin(player, game, winner, winningScore) {
    console.log('d', currentBoard)
    if (currentBoard.zero + currentBoard.one + currentBoard.two === winningScore
        || currentBoard.three + currentBoard.four + currentBoard.five === winningScore
        || currentBoard.six + currentBoard.seven + currentBoard.eight === winningScore
        || currentBoard.zero + currentBoard.three + currentBoard.six === winningScore
        || currentBoard.one + currentBoard.four + currentBoard.seven === winningScore
        || currentBoard.two + currentBoard.five + currentBoard.eight === winningScore
        || currentBoard.zero + currentBoard.four + currentBoard.eight === winningScore
        || currentBoard.two + currentBoard.four + currentBoard.six === winningScore) {
      winner = player;
    }
    console.log('winner', winner);

    if (winner === 'player1') {
      this.player1.wins ++;
    } else if (winner === 'player2') {
      this.player2.wins ++
    }
    console.log('w1', this.player1.wins);
    console.log('w2', this.player2.wins);

    this.checkForGameDraw(game, winner);
    this.disableAllButtons(winner);
  }

  checkForGameDraw(game, winner) {
    if(!winner && (currentBoard.zero + currentBoard.one + currentBoard.two
      + currentBoard.three + currentBoard.four + currentBoard.five
      + currentBoard.six + currentBoard.seven + currentBoard.eight > 24)) {
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