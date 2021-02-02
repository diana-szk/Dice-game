'use strict';

//Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0')
const current1EL = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Start game
let scores, currentScore, activePlayer, playing;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    playing = true;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //change players
    activePlayer = activePlayer === 0 ? 1 : 0;
    //change the player interface
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling the dice
btnRoll.addEventListener('click', function(){
if (playing){
// 1. Generate number
const dice = Math.trunc(Math.random()* 6) + 1;
console.log(dice);
 // 2. Show the image by the random number
 diceEl.classList.remove('hidden');
 diceEl.src = `dice-${dice}.png`;

 //check if the dice rolled 1
 if ( dice !== 1){
     //Change the score of the current player
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
 }else{
     // if dice is 1, change current score to 0
    switchPlayer()
 }
}
})


//Hold button
btnHold.addEventListener('click', function(){
    if (playing){
 // change the score of active player after holding points
 scores[activePlayer] += currentScore;
 document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
 //check if player's score is >= 100
 if(scores[activePlayer] >= 10){  
 //finish game
 playing = false;
     document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
     document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
     diceEl.classList.add('hidden');
 }else{
//switch player
switchPlayer();
 }
}
})
   
btnNew.addEventListener('click', init);

