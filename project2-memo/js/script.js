// create 16 cards
document.body.onload = addCards;


let array1 = [['truck', 'blue'], ['truck', 'blue'], ['car-side', 'pink'],
['car-side', 'pink'], ['truck-monster', 'orange'], ['truck-monster', 'orange'], ['ship', 'navy'],
['ship', 'navy'], ['bus', 'purple'], ['bus', 'purple'], ['plane', 'grey'],
['plane', 'grey'], ['ambulance', 'red'], ['ambulance', 'red'],
['tractor', 'green'], ['tractor', 'green']];

// Shuffle function from http://stackoverflow.com/a/2450976
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
    var newDiv = document.createElement('div');
    newDiv.classList.add('card');
    newDiv.classList.add('not-played');
    var newContent = document.createTextNode('Hello');
    newDiv.appendChild(newContent);
    newDiv.id = 'card'.concat(i+1);
    newDiv.innerHTML = "<i class=\"fas fa-"+array1[i][0]+"\"></i>";
    newDiv.style.color= array1[i][1];
    var parentDiv = document.getElementById("deck");
    parentDiv.insertBefore(newDiv, null);
  }
}

shuffle(array1);

let cardsplayed = 0;
let card1;
let card1Id;

// inspired by https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('not-played')) return;

  cardsplayed +=1;
  console.log(cardsplayed);

  if (cardsplayed < 2) {
    event.target.classList.replace('not-played', 'ingame');
    card1 = event.target.children[0].classList;
    card1Id = event.target.id;
    console.log(card1, card1Id);
  } else {
    event.target.classList.replace('not-played', 'ingame');

    if(event.target.children[0].classList.value === card1.value) {
      event.target.classList.replace('ingame', 'played');
      document.getElementById(card1Id).classList.replace('ingame', 'played');
      cardsplayed = 0;
    } else {
      event.target.classList.replace('ingame', 'not-played');
      document.getElementById(card1Id).classList.replace('ingame', 'not-played');
      cardsplayed = 0;
    }
  }

});
