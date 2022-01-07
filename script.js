'use strict';

// Note 1: In PIG-GAME, player 1 on display in player 0 in code, player 2 on display is player 1 in code
// Note 2: 20 or over wins the game. Small for ease of demonstration.

let currentScore, currentPlayer; // currentScore is sum of dice rolls per turn
let scores = []; // Will hold total score of each player

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player0Settings = document.querySelector('.player--0');
const player1Settings = document.querySelector('.player--1');
const winner = document.querySelector('.player--winner');

// Starting conditions
const init = function () {
  // All scores are 0
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0; // player 0 starts

  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  diceImage.classList.add('hidden'); // No dice shown
  player0Settings.classList.add('player--active'); // Player 0 is active
  player1Settings.classList.remove('player--active');

  btnRollDice.disabled = false; // btnRollDice is not disabled
  btnHold.disabled = false;
  winner.style.display = 'none'; // Winner notice is hidden
};

init();

const switchPlayer = function () {
  currentScore = 0;
  // Display current player's current score (starts at 0)
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;
  // Switch current player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  // Toggle active player
  player0Settings.classList.toggle('player--active');
  player1Settings.classList.toggle('player--active');
};

// On clicking roll dice btn
btnRollDice.addEventListener('click', function () {
  const numberOnDie = Math.floor(Math.random() * 6) + 1;
  diceImage.classList.remove('hidden'); // Allow dice image to be shown...
  diceImage.src = `dice-${numberOnDie}.png`; // set image
  if (numberOnDie !== 1) {
    currentScore += numberOnDie;
    // Display current player's current score
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  }
  if (numberOnDie === 1) {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // Total score of current player updated
  scores[currentPlayer] += currentScore;
  // Total score displayed
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  // If current player has enough points to win
  if (scores[currentPlayer] >= 20) {
    // display winner alert
    winner.style.display = 'block';
    // with message
    winner.textContent = `Winner is...Player ${currentPlayer + 1}!!!`;
    // disable buttons
    btnRollDice.disabled = true;
    btnHold.disabled = true;
    // hide dice image
    diceImage.classList.add('hidden');
  }
  // If current player holds but cannot win
  if (scores[currentPlayer] < 20) {
    switchPlayer();
  }
});

// Click to start new game (initial settings are restored)
btnNewGame.addEventListener('click', init);
