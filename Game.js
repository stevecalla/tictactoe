class Game {
  constructor(player) {
    this.player1 = new Player(1);
    this.player2 = new Player(5);
    this.currentPlayer = player;
    this.winner = undefined;
    this.currentBoard = {zero: 0, one: 0, two: 0, 
      three: 0, four: 0, five: 0, 
      six: 0, seven: 0, eight: 0};
  }


  assignPlayerTurn(event, targetKey) {
    if (this.currentPlayer === 'player2' && event.target.innerText === '') {
      renderNextTurnMessage(this.currentPlayer, targetKey);
      this.currentPlayer = 'player1';
    } else if (event.target.innerText === '') {
        renderNextTurnMessage(this.currentPlayer, targetKey);
        this.currentPlayer = 'player2';
    }
    this.renderPlayerToken(targetKey, event);
  }

  renderPlayerToken(targetKey, event) {
    this.currentBoard[targetKey] = this[this.currentPlayer].id;
    renderTokenToBoard(this.currentPlayer, targetKey, event);
    this.setWinningScore();
  }

  setWinningScore() {
    var winningScore = 3;
    if (this.currentPlayer === 'player2') {
      var winningScore = 15;
    } 
    this.setWinnngCombinations(winningScore)
  }

  setWinnngCombinations(winningScore) {
    var winningCombos = [['zero', 'one', 'two'], ['three', 'four', 'five'], ['six', 'seven', 'eight'], 
                         ['zero', 'three', 'six'], ['one', 'four', 'seven'], ['two', 'five', 'eight'],
                         ['zero', 'four', 'eight'], ['two', 'four', 'six']];
    this.determineWinner(winningScore, winningCombos);
  }

  determineWinner(winningScore, winningCombos) {
    for (var i = 0; i < winningCombos.length; i++) {
      if (this.currentBoard[winningCombos[i][0]] + this.currentBoard[winningCombos[i][1]] + 
          this.currentBoard[winningCombos[i][2]] === winningScore) {
        this.winner = this.currentPlayer;
      }
    }
    this.endGameActions(this.winner);
  }
  
  endGameActions(winner) {
    this.winCounter();
    this.checkForGameDraw();
    this.createWinHistory(this.currentBoard);
    this.convertWinBoardToRenderEmojis(this.currentBoard);
    disableAllTilePointerEvents(this.winner);
    this.resetWinnerAndCurrentBoard();
    this.restartGame(winner);
  }

  winCounter() {
    if (this.winner) {
      this[this.winner].wins ++;
      renderWinScore(this[this.winner].wins, this.winner);
      renderWinMessage(this.winner);
    }
  }

  checkForGameDraw() {
    if(!this.winner && (this.currentBoard.zero + this.currentBoard.one + this.currentBoard.two
      + this.currentBoard.three + this.currentBoard.four + this.currentBoard.five
      + this.currentBoard.six + this.currentBoard.seven + this.currentBoard.eight > 24)) {
        this.winner = 'draw';
        renderDrawMessage();
      }
      this.restartGame(this.winner);
  }

  createWinHistory(winBoard) {
    if (this.winner === 'player1' || this.winner === 'player2') {
      this[this.winner].historicalWins.unshift(winBoard);
      this[this.winner].saveWinsToLocalStorage();
    }
  }

  convertWinBoardToRenderEmojis(board) {
    var emojiBoard = {zero: "", one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: ""};
    var boardKeys = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    for (var i = 0; i < boardKeys.length; i++) {
      if (board[boardKeys[i]] === 5) {
        emojiBoard[boardKeys[i]] = currentGame.player2.token;
      } else if (board[boardKeys[i]] === 1) {
        emojiBoard[boardKeys[i]] = currentGame.player1.token;
      }
    }
    this.createEmojiHistory(emojiBoard);
  }

  createEmojiHistory(emojiBoard) {
    if (this.winner === 'player1' || this.winner === 'player2') {
      this[this.winner].historicalEmojis.unshift(emojiBoard);
      this[this.winner].saveEmojisToLocalStorage();
      createMiniWinBoards(this.winner);
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
    startNewGameOnDelay(winner, nextPlayer);
  }

}