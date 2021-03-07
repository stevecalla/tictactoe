class Game {
  constructor(player) {
    this.player1 = new Player(1);
    this.player2 = new Player(5);
    this.currentPlayer = player || 'player2';
    this.winner = undefined;
  }

  createBoard() {
    this.currentBoard = {zero: 0, one: 0, two: 0, 
                        three: 0, four: 0, five: 0, 
                        six: 0, seven: 0, eight: 0};
  }

  playerTurn(event, targetKey, game) {
    if (this.currentPlayer === 'player2' && event.target.innerText === '') {
      renderNextTurnMessage(this.currentPlayer);
      this.currentPlayer = 'player1';
    } else if (event.target.innerText === '') {
      renderNextTurnMessage(this.currentPlayer);
      this.currentPlayer = 'player2';
    }
    this.updateGameTracker(this.currentPlayer, targetKey, game, event);
  }

  updateGameTracker(player, targetKey, game, event) {
    this.currentBoard[targetKey] = this[player].id;
    renderTokenToBoard(player, this.currentBoard, targetKey, event);
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
    if (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two === winningScore
        || this.currentBoard.three + this.currentBoard.four + this.currentBoard.five === winningScore
        || this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.three + this.currentBoard.six === winningScore
        || this.currentBoard.one + this.currentBoard.four + this.currentBoard.seven === winningScore
        || this.currentBoard.two + this.currentBoard.five + this.currentBoard.eight === winningScore
        || this.currentBoard.zero + this.currentBoard.four + this.currentBoard.eight === winningScore
        || this.currentBoard.two + this.currentBoard.four + this.currentBoard.six === winningScore) {
      this.winner = player;
      winner = this.winner;
    }
    this.winCounter();
    this.checkForGameDraw(game, this.winner);
    this.convertWinBoardToEmoji(winner, this.currentBoard);
    // this.winHistory(winner, this.currentBoard);
    this.disableAllButtons(winner);
    this.resetWinnerAndCurrentBoard();
    this.restartGame(winner, this.currentPlayer);
    // console.log(currentGame.winner);
  }

  convertWinBoardToEmoji(winner, board) {
    var emojiBoard = {zero: "", one: "", two: "", 
                      three: "", four: "", five: "", 
                      six: "", seven: "", eight: ""};
    // var abc = [zero, one, two, three, four, five, six, seven, eight];
    if (board.zero === 5) {
      emojiBoard.zero = this.player2.token;
    } else if (board.zero === 1) {
        emojiBoard.zero = this.player1.token
    }
    if (board.one === 5) {
      emojiBoard.one = this.player2.token;
    } else if (board.one === 1) {
      emojiBoard.one = this.player1.token
    }
    if (board.two === 5) {
      emojiBoard.two = this.player2.token;
    } else if (board.two === 1) {
      emojiBoard.two = this.player1.token
    }
    if (board.three === 5) {
      emojiBoard.three = this.player2.token;
    } else if (board.three === 1) {
      emojiBoard.three = this.player1.token
    }
    if (board.four === 5) {
      emojiBoard.four = this.player2.token;
    } else if (board.four === 1) {
      emojiBoard.four = this.player1.token
    }
    if (board.five === 5) {
      emojiBoard.five = this.player2.token;
    } else if (board.five === 1) {
      emojiBoard.five = this.player1.token
    }
    if (board.six === 5) {
      emojiBoard.six = this.player2.token;
    } else if (board.six === 1) {
      emojiBoard.six = this.player1.token
    }
    if (board.seven === 5) {
      emojiBoard.seven = this.player2.token;
    } else if (board.seven === 1) {
      emojiBoard.seven = this.player1.token
    }
    if (board.eight === 5) {
      emojiBoard.eight = this.player2.token;
    } else if (board.eight === 1) {
      emojiBoard.eight = this.player1.token
    }
    this.winHistory(winner, emojiBoard);

  }

  winHistory(winner, emojiBoard) {
    if (this.winner === 'player1' || this.winner === 'player2') {
      this[this.winner].historicalWins.push(emojiBoard);
      this[this.winner].saveWinsToLocalStorage();
      renderMiniWinCards1();
      renderMiniWinCards2();
    }
  }

  disableAllButtons(winner) {
    if (winner === 'player1' || winner === 'player2') {
      var nodeList = document.querySelectorAll('button');
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].disabled = true;
      }
    }
  }

  checkForGameDraw(game, winner) {
    if(!winner && (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two
      + this.currentBoard.three + this.currentBoard.four + this.currentBoard.five
      + this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight > 24)) {
        console.log('draw');
        this.winner = 'draw';
        winner = this.winner //can't use this in the restart timeout function
        nextTurnMessage.innerText = `It's a draw!`;//move to mainjs
      }
      // this.resetWinnerAndCurrentBoard();
      this.restartGame(winner);
  }

  winCounter() {
    if (this.winner) {
      this[this.winner].wins ++;
      renderWinScore(this[this.winner].wins, this.winner);
      nextTurnMessage.innerText = `${this[this.winner].token} won!`;//move to mainjs
      console.log('winner', this.winner, 'w1', this.player1.wins, 'w2', this.player2.wins);
    }
  }

  resetWinnerAndCurrentBoard() {
    if (this.winner) {
      this.winner = undefined;
      this.createBoard();
    }
  }
  
  restartGame(winner) {
    if (this.currentPlayer === 'player1') {
      var nextPlayer = 'player2';
    } else {
      nextPlayer = 'player1';
    }

    setTimeout( function() { //can't breakup b/f of issue w/ this
    if (winner) {
      renderNextTurnMessage(nextPlayer);
      var nodeList = document.querySelectorAll('.game-tile');
      for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].innerText = "";     //clear dom
        nodeList[i].disabled = false;  //enable buttons
        }
      }
    }, 2000);
  }

}