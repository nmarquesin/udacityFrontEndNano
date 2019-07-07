// Whole-script strict mode syntax
'use strict';

// create 16 cards
document.body.onload = addCards;

// variables
let minutesLabel;
let secondsLabel;
let totalSeconds = 0;
let cardsplayed = 0;  // number of cards in play
let card1; // value of the first card of the pair
let card2; // value of the second card of the pair
let card1Id; // card ID of the first card of the pair
let card2Id; // card ID of the second card of the pair
let pairs = 0; // number of pairs matched
let gameTime = false;
let moves = 0; // number of moves the player has made
let refreshIntervalId;
// possible to add different arrays to add card categories: transport (current), people, technology, etc
let array1 = [['truck', 'mediumvioletred'], ['truck', 'mediumvioletred'], ['car-side', 'pink'],
['car-side', 'pink'], ['truck-monster', 'orange'], ['truck-monster', 'orange'], ['ship', 'navy'],
['ship', 'navy'], ['bus', 'purple'], ['bus', 'purple'], ['plane', 'grey'],
['plane', 'grey'], ['ambulance', 'red'], ['ambulance', 'red'],
['tractor', 'deeppink'], ['tractor', 'deeppink']];

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  console.log(array);

  return array;
}

// add 16 cards with unique ids
function addCards() {
  for (let i=0; i<16; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('card');
    newDiv.classList.add('not-played');
    newDiv.classList.add('animated');
    newDiv.id = 'card'.concat(i+1);
    newDiv.innerHTML = "<i class=\"fas fa-"+array1[i][0]+"\"></i>";
    newDiv.style.color = array1[i][1];
    newDiv.tabIndex = 0;
    let parentDiv = document.getElementById("deck");
    parentDiv.insertBefore(newDiv, null);
  }
}

function stopTimer() {
  clearInterval(refreshIntervalId);
}

function clearTimer() {
  stopTimer();
  minutesLabel.innerHTML, secondsLabel.innerHTML = '00';
  totalSeconds = 0;
}

// restart game
function reset() {
  if (moves === 0) return;

  clearTimer();
  document.getElementById('moves').innerHTML = '0';
  shuffle(array1);
  cardsplayed = 0;
  pairs = 0;
  moves = 0;
  let stars = '<i class="far fa-star"></i>'
  stars = stars.repeat(3)
  document.getElementById('stars').innerHTML = stars;
  document.getElementById('deck').innerHTML = '';
  addCards();
  card1Id = 'foo';
  card2Id = 'foo';
}

// star rating conditions
function starRating(moves) {
  let stars;
  if (moves < 35){
    stars = 3;
  } else if (moves < 55) {
    stars = 2;
  } else {
    stars = 1;
  }
  const fullStar = '<i class="fas fa-star"></i>';
  const emptyStar = '<i class="far fa-star"></i>';
  let rating = fullStar.repeat(stars).concat(emptyStar.repeat(3-stars));
  return [rating, stars];
}

// popup message when winning
function winMsg() {
  let stars = starRating(moves)[1];
  let msg = 'Congratulations!!\nYou won!\n\nGame duration: '
  +minutesLabel.innerHTML+':'+secondsLabel.innerHTML+
  '\nTotal moves: '+moves+'\nStars: '+stars+
  '\n\nWould you like to play again?';
  return msg;
}

// setTime and pad functions from https://stackoverflow.com/a/5517836
function setTime() {
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// add animation to card selection
function flipCard(event) {
  if ((card1Id === event.target.id) || (card2Id === event.target.id)) return;

  event.target.classList.remove('flipInY');
  void event.target.offsetWidth; // -> trigger reflow to reload css animation
  event.target.classList.replace('not-played', 'ingame');
  event.target.classList.add('flipInY');
}

// check if the same card was selected twice
function isPreviousCard(e) {
  if ((card1Id === e.target.id) || (card2Id === e.target.id)) return true;
  else return false;
}

// prevent selecting a card in play again
function cardNotSelectable(card, e) {
    card.tabIndex = -1;
}

function makeAMove(e) {
  flipCard(e);
  cardNotSelectable(e.target, e);
}

// gameplay
function gamePlay(event) {

  if (!(cardsplayed === 0) && isPreviousCard(event)) return;

  if (moves === 0) { // starts timer for a new match
    refreshIntervalId = setInterval(setTime, 1000);
  }

  if (cardsplayed < 1) { //if it's the first card ever played
    makeAMove(event);
    card1 = event.target.children[0].classList;
    card1Id = event.target.id;
  } else if (cardsplayed < 2) { // if it's the second card played
    makeAMove(event);
    card2 = event.target.children[0].classList;
    card2Id = event.target.id;
    // if pair of cards match
    if(card2.value === card1.value) {
      event.target.classList.replace('ingame', 'played');
      document.getElementById(card1Id).classList.replace('ingame', 'played');
      pairs +=1;
    } else { // if pair of cards doesn't match
      event.target.classList.replace('ingame', 'wrong-pair');
      document.getElementById(card1Id).classList.replace('ingame', 'wrong-pair');
    }
  } else { // card played after pair that doesn't match
      makeAMove(event);
      document.getElementById(card2Id).classList.replace('wrong-pair', 'not-played');
      document.getElementById(card1Id).classList.replace('wrong-pair', 'not-played');
      document.getElementById(card2Id).tabIndex = 0;
      document.getElementById(card1Id).tabIndex = 0;
      cardsplayed = 0;
      card1 = event.target.children[0].classList;
      card1Id = event.target.id;
      card2Id = event.target.id;
  }

  moves +=1;
  document.getElementById('moves').innerHTML = moves;

  // check star rating
  document.getElementById('stars').innerHTML = starRating(moves)[0];

  cardsplayed +=1;

  // check end of gameplay
  if (pairs > 7) {  // change number to 7 for production
    stopTimer();
    setTimeout(function(){
      if (window.confirm(winMsg())) {
        reset();
      }
  }, 500);

  }
}

shuffle(array1);

// event listener inspired by https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('not-played')) return;
  gamePlay(event);
});

// event listenet for keyboard
document.addEventListener('keydown', function (event) {
  if (event.which === 13) { // 13 is key code for ENTER
    if (event.target.id === 'reset') {
      reset();
    }
    else if (event.target.classList.contains('not-played')){
      gamePlay(event);
    }
  }
});
