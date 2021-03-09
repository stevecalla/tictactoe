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

  getWinsFromLocalStorage(player, id) {
    var parsedWinHistory;
    var retrievedWinHistory = localStorage.getItem(id);
    parsedWinHistory = JSON.parse(retrievedWinHistory);
    this.restoreHistoricalWins(player, parsedWinHistory);
    this.renderHistoricalWins(player, parsedWinHistory);
  }

  restoreHistoricalWins(player, parsedWinHistory) {
    if (parsedWinHistory !== null) {
      currentGame[player].historicalWins = parsedWinHistory;
      currentGame[player].wins = parsedWinHistory.length;
    }
  }

  renderHistoricalWins(player, parsedWinHistory) {
    if (parsedWinHistory !== null) {
      renderWinScore(currentGame[player].wins, player);
      createMiniWinBoards(player);
    }
  }

}