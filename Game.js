class Game {
  constructor(player) {
    this.player1 = new Player(1);
    this.player2 = new Player(5);
    this.currentPlayer = player || 'player2';
    this.winner = undefined;
    this.currentBoard = {zero: 0, one: 0, two: 0, 
      three: 0, four: 0, five: 0, 
      six: 0, seven: 0, eight: 0};
  }


  playerTurn(event, targetKey, game) {
    if (this.currentPlayer === 'player2' && event.target.innerText === '') {
      renderNextTurnMessage(this.currentPlayer, targetKey);
      this.currentPlayer = 'player1';
    } else if (event.target.innerText === '') {
      renderNextTurnMessage(this.currentPlayer, targetKey);
      this.currentPlayer = 'player2';
    }
    this.updateGameTracker(this.currentPlayer, targetKey, game, event);
  }

  updateGameTracker(player, targetKey, game, event) {
    this.currentBoard[targetKey] = this[player].id;
    renderTokenToBoard(player, targetKey, event);
    this.setWinningScore(player, game);
  }

  setWinningScore(player, game) {
    var winningScore = 3;
    if (player === 'player2') {
      var winningScore = 15;
    } 
    this.setWinnngCombinations(player, game, winningScore)
  }

  setWinnngCombinations(player, game, winningScore) {
    var winningCombos = [['zero', 'one', 'two'], ['three', 'four', 'five'], ['six', 'seven', 'eight'], 
                         ['zero', 'three', 'six'], ['one', 'four', 'seven'], ['two', 'five', 'eight'],
                         ['zero', 'four', 'eight'], ['two', 'four', 'six']];
    this.determineWinner(player, game, winningScore, winningCombos);
  }

  determineWinner(player, game, winningScore, winningCombos) {
    for (var i = 0; i < winningCombos.length; i++) {
      if (this.currentBoard[winningCombos[i][0]] + this.currentBoard[winningCombos[i][1]] + 
          this.currentBoard[winningCombos[i][2]] === winningScore) {
        this.winner = player;
      }
    }
    this.winCounter();
    this.checkForGameDraw(game, this.winner);
    this.convertWinBoardToEmojis(this.winner, this.currentBoard);
    this.disableAllButtons(this.winner);
    this.resetWinnerAndCurrentBoard();
    this.restartGame(this.winner, this.currentPlayer);
  }

  convertWinBoardToEmojis(winner, board) {
    var emojiBoard = {zero: "", one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: ""};
    var boardKeys = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    for (var i = 0; i < boardKeys.length; i++) {
      if (board[boardKeys[i]] === 5) {
        emojiBoard[boardKeys[i]] = this.player2.token;
      } else if (board[boardKeys[i]] === 1) {
        emojiBoard[boardKeys[i]] = this.player1.token;
      }
    }
    this.winHistory(emojiBoard);
  }

  winHistory(emojiBoard) {
    if (this.winner === 'player1' || this.winner === 'player2') {
      this[this.winner].historicalWins.unshift(emojiBoard);
      this[this.winner].saveWinsToLocalStorage();
      createMiniWinBoards(this.winner);
    }
  }

  disableAllButtons() { //put in mainjs?
    //TODO: adjust boolean?
    if (this.winner === 'player1' || this.winner === 'player2') {
      for (var i = 0; i < gameTile.length; i++) {
        gameTile[i].classList.add('disable');
      }
    }
  }

  checkForGameDraw(game, winner) {
    if(!winner && (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two
      + this.currentBoard.three + this.currentBoard.four + this.currentBoard.five
      + this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight > 24)) {
        console.log('draw');
        this.winner = 'draw';
        renderDrawMessage() 
      }
      this.restartGame(this.winner);
  }

  winCounter() {
    if (this.winner) {
      this[this.winner].wins ++;
      renderWinScore(this[this.winner].wins, this.winner);
      renderWinMessage(this.winner);
      console.log('winner', this.winner, 'w1', this.player1.wins, 'w2', this.player2.wins);
    }
  }

  resetWinnerAndCurrentBoard() {
    if (this.winner) {
      this.winner = undefined;
      this.currentBoard = {zero: 0, one: 0, two: 0, 
        three: 0, four: 0, five: 0, 
        six: 0, seven: 0, eight: 0};
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
      for (var i = 0; i < gameTile.length; i++) {
        gameTile[i].innerText = "";     //clear dom
        gameTile[i].classList.remove('disable');
        }
      }
    }, 2000);
  }

}