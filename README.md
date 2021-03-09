## Title: IdeaBox

A [Front-End Project] by: [Steve Calla](https://github.com/stevecalla)

## Index

1. [Overview](#overview)
2. [Wave Score](#accessibility)
3. [Functionality](#functionality)
4. [Technologies](#technologies)
5. [Contributors](#contributors)
6. [Resources](#resources)

## Overview

Play Tic Tac Toe. Built from scratch using vanilla javascript, CSS and HTML.

## Website Preview - Basic Functionality

<img src="https://media.giphy.com/media/CrMXnfKeOY4yPH08C5/giphy.gif" width="100%" height="500"/>

## Website Preview - Responsive View

<img src="https://media.giphy.com/media/OIQhmHcQgIQYflc0d1/giphy.gif" width="100%" height="500"/>

## Main Page View

<img width="1255" alt="Blank Board" src="https://user-images.githubusercontent.com/72281855/110523549-7e457980-80cf-11eb-93ef-937ce54949a6.png">

## Game Play View

<img width="1253" alt="Full Board" src="https://user-images.githubusercontent.com/72281855/110523546-7dace300-80cf-11eb-8519-f632af0899fe.png">

## Accessibility

<img width="1259" alt="Wave Score" src="https://user-images.githubusercontent.com/72281855/110523541-7c7bb600-80cf-11eb-8b95-c117f66b2fb5.png">


## Functionality

* Game: Fully functional tic tac toe game.
* Mobile Responsive: Layout responsiveness for small and large screens.
* Architecture: Data Model and DOM are separate entities.
* Classes: Game.js contains game play, Player.js contains player properties/methods, main.js file that contains the DOM related JavaScript.

* Game Play:
    * Alternates between player 1 & player 2.
    * Message indicating the players turn.
    * Determines win or draw. Message indicates which player won the game.
    * Tracks and renders count for each player.
    * Game automatically reset after 3 seconds.

* Layout: Displays all prior games. Allows a player to restart the game or clear win history.

* Local Storage:
    * Automatically saves win, retrieves and renders win count from local storage.
    * Automatically saves game history and displays wins for each player.

* Future Enhancements:
    * Allow for multiple games by adding an id to the game class.
    * Allow players to select or customize tokens.
    * Provide countdown information to the next game.
    * Provide functionality to allow user to determine which player goes first.
    * Allow for multiple players beyond a two person game.
    * Enhance draw calculation do determine draw prior to full game board.

* Known Issues/Bugs:
    * None at this time.

## Technologies

1. HTML
2. CSS
3. JavaScript
4. GitHub (website hosting and source code management)

## Contributors

* Creators: [Steve Calla](https://github.com/stevecalla)

* Project Manager: [Heather Faerber](https://github.com/hfaerber)

## Resources
* Project Description: https://frontend.turing.io/projects/module-1/tic-tac-toe-solo.html
* GitHub Repo: https://github.com/stevecalla/tictactoe
* Project Board: https://github.com/stevecalla/tictactoe/projects/1?add_cards_query=is%3Aopen
* GitHub Hosted URL: TBD

