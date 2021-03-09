class Player {
  constructor(playerId) {
    this.id = playerId;
    this.token = null;
    this.wins = 0;
    this.historicalWins = [];
    // this.emojiId = playerId;
    this.historicalEmojis = []; //TODO:
  }

  saveWinsToLocalStorage() {
    localStorage.setItem(this.id, JSON.stringify(this.historicalWins));

    //save emojis to local storage TODO:
    if (this.id === 1) {
      localStorage.setItem('a', JSON.stringify(this.historicalEmojis));
    } else {
      localStorage.setItem('b', JSON.stringify(this.historicalEmojis));
    }
  }

  getWinsFromLocalStorage(player, id) {
    var parsedWinHistory;
    var retrievedWinHistory = localStorage.getItem(id);
    parsedWinHistory = JSON.parse(retrievedWinHistory);
    this.restoreHistoricalWins(player, parsedWinHistory);
    // this.renderHistoricalWins(player, parsedWinHistory);
  }

  restoreHistoricalWins(player, parsedWinHistory) {
    if (parsedWinHistory !== null) {
      currentGame[player].historicalWins = parsedWinHistory;
      currentGame[player].wins = parsedWinHistory.length;
    }
  }

  // renderHistoricalWins(player, parsedWinHistory) {
  //   if (parsedWinHistory !== null) {
  //     renderWinScore(currentGame[player].wins, player); //renders the score //TODO:
  //     createMiniWinBoards(player); //renders mini cards //TODO:
  //   }
  // }

  // TODO:

  getEmojisFromLocalStorage(player, id) {
    console.log('get')
    var parsedPlayerOneEmojiHistory;
    var parsedPlayerTwoEmojiHistory;
    var retrievedPlayerOneEmojiHistory = localStorage.getItem('a');
    var retrievedPlayerTwoEmojiHistory = localStorage.getItem('b');

    parsedPlayerOneEmojiHistory = JSON.parse(retrievedPlayerOneEmojiHistory);
    parsedPlayerTwoEmojiHistory = JSON.parse(retrievedPlayerTwoEmojiHistory);


    console.log(parsedPlayerOneEmojiHistory)
    console.log(parsedPlayerTwoEmojiHistory)
    this.restoreHistoricalEmojis(player, parsedPlayerOneEmojiHistory, parsedPlayerTwoEmojiHistory);
    this.renderHistoricalEmojis(player, parsedPlayerOneEmojiHistory, parsedPlayerTwoEmojiHistory);
  }

  restoreHistoricalEmojis(player, parsedPlayerOneEmojiHistory, parsedPlayerTwoEmojiHistory) {
    console.log('restore')
    console.log(player)
    if (parsedPlayerOneEmojiHistory !== null || parsedPlayerTwoEmojiHistory !== null) {
      currentGame.player1.historicalEmojis = parsedPlayerOneEmojiHistory;
      currentGame.player2.historicalEmojis = parsedPlayerTwoEmojiHistory;
      // currentGame[player].wins = parsedWinHistory.length;
    }
    console.log(currentGame[player].historicalEmojis);

  }

  renderHistoricalEmojis(player, parsedEmojiHistory) {
    if (parsedEmojiHistory !== null) {
      renderWinScore(currentGame[player].wins, player); //renders the score //TODO:
      createMiniWinBoards(player); //renders mini cards //TODO:
    }
  }

}