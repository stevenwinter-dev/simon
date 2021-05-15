# Hearthstone Simon

## [Play Now](https://stevenwinter-dev.github.io/simon/)

![hearthstone simon](https://i.imgur.com/sfsyVNG.png)

## Introduction

Hearthstone Simon is a version of the popular 1970's electronic game featuring a few interesting twists. 

To play Hearthstone Simon, the computer will demonstrate a randomly generated pattern. The player must input the pattern perfectly to advance to the next round by clicking the correct buttons in the correct order. Each round features a new pattern and adds an extra button click. After successfully completing 5 levels the player will win the game. 

Hearthstone Simon adds a deck-building component to the game. After each successful round, the player may select 1 Hearthstone card from 3 possible choices to add to their deck. At the end of a successful 5 level game, the player will complete their deck.

## Technologies Used

- HTML
- CSS
- JavaScript
- 3rd Party API

## Install Instructions
```bash
git clone https://github.com/stevenwinter-dev/simon.git
```

## Initial Wireframe

![Wireframe](https://i.imgur.com/ROODFkf.jpg)
This wireframe displays the basic components of a Simon game. I spread out the 4 buttons for simplicities sake. Rather than cloning Simon from step one, I began with getting the core gameplay functionality and this simple layout helped acheive that.

## User Stories

### MVP
- As a player, I want the game to begin only when I am ready, so I can have a clean start.
- As a player, I want an obvious example of what to do, so I can easily understand the objective.
- As a player, I want a system of progression, so that I have a clear goal.
- As a player, I want to receive feedback when I have lost or beat the game, so I will know when to play again.

### Stretch Goals
- As a player, I want a themed version of Simon, so it is not a clone of every other Simon.
- As a player, I want a reward for completing each level, so finally beating a difficult level feels worth it.

## Major Hurdles

- Getting the timings for the button flashes was my first major hurdle. Adding `setTimeout()` methods provided control over these timing issues.

- The complexity of my function chaining was another challenge. Many functions, like the `youWin()` function envoke others, such as `showCardChoices() cardArrFunc() showDeck() hideCardChoices()`. The solution was to write clean, concise functions that interact easily with others. Having each function serve a very specific purpose rather than a few functions trying to do everything.

- The `cardArrFunc()` function was intended to add one card to the deck. There was a challenging bug that would frequently add duplicates of cards starting on level three. The fact that it wasn't consistent and that it didn't begin until a later level made solving this problem quite difficult. Ultimately, I decided to rework how I displayed the deck, only calling the `cardArrFunc()` function once, at the end of the game. Sacrificing some interesting complexity in favor of simplicity, in this case, made the game work better.

## Unsolved problems 

- Currently, their are many `setTimeout()` methods that should be converted to asynchronous functions. This would require a substantial rework but will provide cleaner code and improved scalability. Many functions, such as `levelChange() youWin()` were written based on the `setTimeout()` layout. This created some clutter in the code that is not ideal. Upon completion of the asynchronous converstion, many of these functions could be cleaned up. 

- Showing the deck throughout different points in the game. The fact that `nextLevel()` is a recursive function that, originially, called the `showDeck()` function created duplicate cards. The way the `nextLevel()` function is designed, which coordinates with much of the other logic of this game, makes fixing this issue difficult. A substantial redesign of game logic will be needed to correct this. Currently, as noted above, the `showDeck()` function is only showed at the end of the game to prevent this problem from occuring. 

![hearthstone simon](https://i.imgur.com/uReO3bX.png)