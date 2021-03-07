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
    // this.determineWinner(player, game);
    this.setWinningScore(player, game);
  }

  setWinningScore(player, game) {
    var winner;
    var winningScore = 3;
    if (player === 'player2') {
      var winningScore = 15;
    } 
    this.setWinnngCombinations(player, game, winner, winningScore)
  }

  setWinnngCombinations(player, game, winner, winningScore) {
    var winningCombos = [['zero', 'one', 'two'], ['three', 'four', 'five'], ['six', 'seven', 'eight'], 
                         ['zero', 'three', 'six'], ['one', 'four', 'seven'], ['two', 'five', 'eight'],
                         ['zero', 'four', 'eight'], ['two', 'four', 'six']];
    this.determineWinner(player, game, winner, winningScore, winningCombos);
  }

  determineWinner(player, game, winner, winningScore, winningCombos) {
    for (var i = 0; i < winningCombos.length; i++) {
      if (this.currentBoard[winningCombos[i][0]] + this.currentBoard[winningCombos[i][1]] + 
          this.currentBoard[winningCombos[i][2]] === winningScore) {
        this.winner = player;
        winner = this.winner;
      }
    }
    this.winCounter();
    this.checkForGameDraw(game, this.winner);
    this.convertWinBoardToEmojis(winner, this.currentBoard);
    this.disableAllButtons(winner);
    this.resetWinnerAndCurrentBoard();
    this.restartGame(winner, this.currentPlayer);
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
    this.winHistory(winner, emojiBoard);
  }

  winHistory(winner, emojiBoard) {
    if (this.winner === 'player1' || this.winner === 'player2') {
      this[this.winner].historicalWins.push(emojiBoard);
      this[this.winner].saveWinsToLocalStorage();
      createMiniWinBoards(winner);
    }
  }

  disableAllButtons(winner) { //put in mainjs?
    if (winner === 'player1' || winner === 'player2') {
      var nodeList = document.querySelectorAll('button');
      for (var i = 0; i < nodeList.length; i++) {
        // nodeList[i].disabled = true;
        nodeList[i].classList.add('disable');
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
        // nodeList[i].disabled = false;  //enable buttons
        nodeList[i].classList.remove('disable');
        }
      }
    }, 2000);
  }

}