class Game {
  constructor(player) {
    this.player1 = new Player(1);
    this.player2 = new Player(5);
    this.currentPlayer = player || 'player2';
    this.winner = null;
  }

  createBoard() {
    this.currentBoard = {zero: 0, one: 0, two: 0, 
                        three: 0, four: 0, five: 0, 
                        six: 0, seven: 0, eight: 0};
  }

  playerTurn(event, targetKey, game) {
    if (this.currentPlayer === 'player2' && event.target.innerText === '') {
      this.currentPlayer = 'player1';
    } else if (event.target.innerText === '') {
      this.currentPlayer = 'player2';
    }
    this.updateGameTracker(this.currentPlayer, targetKey, game, event);
  }

  updateGameTracker(player, targetKey, game, event) {
    this.currentBoard[targetKey] = this[player].id;
    renderTokenToBoard(player, this.currentBoard, event);
    this.determineWinner(player, game)
  }

  determineWinner(player, game) {
    var winner;
    var winningScore = 3;
    if (player === 'player2') {
      var winningScore = 15;
    } 
    this.checkForPlayerWin2(player, game, winner, winningScore);
  }

  checkForPlayerWin2(player, game, winner, winningScore) {
    console.log('d', this.currentBoard)
    if (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two === winningScore
        || this.currentBoard.three + this.currentBoard.four + this.currentBoard.five === winningScore
        || this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.three + this.currentBoard.six === winningScore
        || this.currentBoard.one + this.currentBoard.four + this.currentBoard.seven === winningScore
        || this.currentBoard.two + this.currentBoard.five + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.four + this.currentBoard.eight === winningScore
        || this.currentBoard.two + this.currentBoard.four + this.currentBoard.six === winningScore) {
      this.winner = player;
    }
    console.log('winner', this.winner);
    this.winCounter(this.winner);
    this.checkForGameDraw2(game, this.winner);
    this.winHistory2(this.winner, this.currentBoard);
    this.disableAllButtons(winner);
    this.resetWinnerANDCurrentBoard();
    this.restartGame2(winner);
    console.log('e', this.currentBoard)
  }

  checkForGameDraw2(game, winner) {
    if(!this.winner && (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two
      + this.currentBoard.three + this.currentBoard.four + this.currentBoard.five
      + this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight > 24)) {
        console.log('draw');
        this.winner = 'draw';
        winner = this.winner //can't use this in the restart timeout function
      }
      this.resetWinnerANDCurrentBoard();
      this.restartGame2(winner);
  }

  winCounter(winner) {
    if (this.winner === 'player1') {
      this.player1.wins ++;
    } else if (this.winner === 'player2') {
      this.player2.wins ++
    }
    console.log('w1', this.player1.wins);
    console.log('w2', this.player2.wins);
  }


  winHistory2(winner, currentBoard) {
    if (this.winner === 'player1') {
      this.player1.historicalWins.push(this.currentBoard);
    } else if (this.winner === 'player2') {
      this.player2.historicalWins.push(this.currentBoard);
    }
    console.log('w3', this.player1.historicalWins);
    console.log('w4', this.player2.historicalWins);
  }

  resetWinnerANDCurrentBoard() {
    if (this.winner) {
      // //reset winner
      this.winner = null;
      //clear data model
      this.currentBoard = {zero: 0, one: 0, two: 0, 
                          three: 0, four: 0, five: 0, 
                          six: 0, seven: 0, eight: 0};
    // gameBoard.removeEventListener('click', playGame);
    // var nodeList = document.querySelectorAll('button');
    // for (var i = 0; i < nodeList.length; i++) {
    //   nodeList[i].disabled = false;  //enable buttons
    // }
    }
  }

  restartGame2(winner) {
    setTimeout( function() { //can't breakup b/f of issue w/ this
      if (winner) {
        //clear dom
        var nodeList = document.querySelectorAll('button');
        for (var i = 0; i < nodeList.length; i++) {
          nodeList[i].innerText = "";     //clear dom
          nodeList[i].disabled = false;  //enable buttons
        }
      }
    }, 2000);
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