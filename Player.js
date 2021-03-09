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

  getWinsFromLocalStorage() {
    var parsedWinHistory;
    var playerIds = [1, 5];
    var players = ['player1', 'player2'];
    for (var i = 0; i < playerIds.length; i++) {
      var retrievedWinHistory = localStorage.getItem(playerIds[i]);
      parsedWinHistory = JSON.parse(retrievedWinHistory);
      this.restoreHistoricalWins(i, players, parsedWinHistory);
      this.renderHistoricalWins(i, players, parsedWinHistory)
    }
  }

  restoreHistoricalWins(i, players, parsedWinHistory) {
    if (parsedWinHistory !== null) {
      currentGame[players[i]].historicalWins = parsedWinHistory;
      currentGame[players[i]].wins = parsedWinHistory.length;
    }
  }

  renderHistoricalWins(i, players, parsedWinHistory) {
    if (parsedWinHistory !== null) {
      renderWinScore(currentGame[players[i]].wins, players[i]);
      createMiniWinBoards(players[i]);
    }
  }

  // maybe button to reset game?
  deleteFromLocalStorage() {
    localStorage.clear();
  }

}