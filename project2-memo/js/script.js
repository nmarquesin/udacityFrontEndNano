// create 16 cards
document.body.onload = addCards;


let array1 = [['truck', 'blue'], ['truck', 'blue'], ['car-side', 'pink'],
['car-side', 'pink'], ['truck-monster', 'orange'], ['truck-monster', 'orange'], ['ship', 'navy'],
['ship', 'navy'], ['bus', 'purple'], ['bus', 'purple'], ['plane', 'grey'],
['plane', 'grey'], ['ambulance', 'red'], ['ambulance', 'red'],
['tractor', 'green'], ['tractor', 'green']];

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

// Add 16 cards with unique ids
function addCards() {
  for (let i=0; i<16; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('card');
    newDiv.classList.add('not-played');
    newDiv.id = 'card'.concat(i+1);
    newDiv.innerHTML = "<i class=\"fas fa-"+array1[i][0]+"\"></i>";
    newDiv.style.color= array1[i][1];
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

// Reset game
function reset() {
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
  document.body = addCards();
}

function starRating(moves) {
  let stars;
  if (moves < 25){
    stars = 3;
  } else if (moves < 32) {
    stars = 2;
  } else {
    stars = 1;
  }
  const fullStar = '<i class="fas fa-star"></i>';
  const emptyStar = '<i class="far fa-star"></i>';
  let rating = fullStar.repeat(stars).concat(emptyStar.repeat(3-stars));
  return [rating, stars];
}

function winMsg() {
  let stars = starRating(moves)[1];
  let msg = 'Congratulations!!\nYou won!\n\nGame duration: '
  +minutesLabel.innerHTML+':'+secondsLabel.innerHTML+
  '\nTotal moves: '+moves+'\nRating: '+stars+' stars'+
  '\n\nWould you like to play again?';
  return msg;
}

let minutesLabel;
let secondsLabel;
let totalSeconds = 0;


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

shuffle(array1);

let cardsplayed = 0;  // number of cards in play
let card1; // value of the first card of the pair
let card2; // value of the second card of the pair
let card1Id; // card ID of the first card of the pair
let card2Id; // card ID of the second card of the pair
let pairs = 0; // number of pairs matched
let gameTime = false;
let moves = 0; // number of moves the player has made
let refreshIntervalId;

// gameplay
// event listener inspired by https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('not-played')) return;

  if (moves === 0) { // starts timer for a new match
    refreshIntervalId = setInterval(setTime, 1000);
  }

  moves +=1;
  document.getElementById('moves').innerHTML = moves;

  // check star rating
  document.getElementById('stars').innerHTML = starRating(moves)[0];

  cardsplayed +=1;

  if (cardsplayed < 2) { //if it's the first card ever played
    event.target.classList.replace('not-played', 'ingame');
    card1 = event.target.children[0].classList;
    card1Id = event.target.id;
    console.log(card1, card1Id);
  } else if (cardsplayed < 3) { // if it's the second card played
    event.target.classList.replace('not-played', 'ingame');
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
      event.target.classList.replace('not-played', 'ingame');
      document.getElementById(card2Id).classList.replace('wrong-pair', 'not-played');
      document.getElementById(card1Id).classList.replace('wrong-pair', 'not-played');
      cardsplayed = 1;
      card1 = event.target.children[0].classList;
      card1Id = event.target.id;
  }

  // check end of gameplay
  if (pairs > 7) {  // change 1 to 7 for production
    stopTimer();
    if (window.confirm(winMsg())) {
      reset();
    }
  }

});
