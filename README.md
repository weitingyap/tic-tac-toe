# tic-tac-toe

This is a client-side app to play tic-tac-toe between two players. The app alternates between the players, keeps score, and allows players to reset the board and play a new game. The board also resets when there is a winner or a draw.

## Technology Used
**Tech Used**: HTML, CSS, JavaScript
* HTML
* CSS: flexbox, pseudoclasses for UI feedback
* JavaScript: factory functions, Immediately Invoked Function Expression modules, event listeners

## What I Learnt
* Arrays and objects are reference types, unlike strings and numbers which are primitives. I had to troubleshoot trying to manipulate variables passed at function declarations; due to closure (references are passed, primitive types are not), I was unable to manipulate primitive type variables directly. 
* Following from the above, I learnt that it is best practice to encapsulate and protect variable access by declaring a getter function, rather than passing a variable directly from the module

## Future Opportunities
* Refactor code by using ES6 Modules instead of IIFE modules, in line with today's conventions
* Improve UX by displaying a dialog that shows that a player has won or a game is drawn, without clearing the board immediately, so that players may reflect on their game play
* Allow players to enter their own names, or customize their own icons
* Extend the app to other client-side game possibilities, like chess