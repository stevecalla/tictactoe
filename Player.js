class Player {
  constructor(playerId) {
    this.id = playerId;
    this.token = {1: 'TBD', 5: 'TBD' };
    this.wins = null;
  }

  saveToLocalStorage() {
    //
  }

  retrieveFromLocalStorage() {
    //
  }

}

//PLAYER CLASS
// PROPERTIES:
// 1) id (ex: 'one'), 
// 2) token (ex: '⭐️'), 
// 3) wins (ex: [])

// METHODS:
// 1) saveWinsToStorage
// 2) retrieveWinsFromStorage