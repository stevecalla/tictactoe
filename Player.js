class Player {
  constructor(playerId) {
    this.id = playerId;
    this.token = null;
    this.wins = 0;
    this.historicalWins = [];
  }

  saveWinsToLocalStorage() {
    localStorage.setItem(this.id, JSON.stringify(this.historicalWins))
  }

  getWinsFromLocalStorage1() {
    var parsedWinHistory;
    var retrievedWinHistory = localStorage.getItem('1');
    parsedWinHistory = JSON.parse(retrievedWinHistory);
    if (parsedWinHistory !== null) {
      currentGame.player1.historicalWins = parsedWinHistory;
      currentGame.player1.wins = parsedWinHistory.length;
      renderWinScore(currentGame.player1.wins, 'player1');
    }
  }

  getWinsFromLocalStorage2() {
    var parsedWinHistory;
    var retrievedWinHistory = localStorage.getItem('5');
    parsedWinHistory = JSON.parse(retrievedWinHistory);
    if (parsedWinHistory !== null) {
      currentGame.player2.historicalWins = parsedWinHistory;
      currentGame.player2.wins = parsedWinHistory.length;
      renderWinScore(currentGame.player2.wins, 'player2');
    }
  }

  // maybe button to reset game?
  // deleteFromLocalStorage() {
  //   localStorage.clear();
  // }

}