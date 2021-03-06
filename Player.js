class Player {
  constructor(playerId) {
    this.id = playerId;
    this.token = null;
    this.wins = 0;
    this.historicalWins = [];
  }

  saveWinsToLocalStorage() {
    localStorage.setItem(this.id, this.wins)
  }

  getWinsFromLocalStorage1() {
    var getWinsFromLocalStorage = localStorage.getItem('1');
    console.log('get', getWinsFromLocalStorage)
    if(getWinsFromLocalStorage === null) {
      getWinsFromLocalStorage = 0;
    }
    currentGame.player1.wins = getWinsFromLocalStorage;
    renderWinScore(currentGame.player1.wins, 'player1')
  }

  getWinsFromLocalStorage2() {
    var getWinsFromLocalStorage = localStorage.getItem('5');
    if(getWinsFromLocalStorage === null) {
      getWinsFromLocalStorage = 0;
    }
    currentGame.player2.wins = getWinsFromLocalStorage;
    renderWinScore(currentGame.player2.wins, 'player2')
  }

}