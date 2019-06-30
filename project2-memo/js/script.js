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
