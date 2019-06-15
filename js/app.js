"use strict"
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}
//required variables are declared here
var mCards = [...document.querySelectorAll(".card")];
console.log(mCards);
var i = 0;
var mov = 0;
var ar = []; //comparing array
var sec = 0;
var min = 0;
var timeflag = 0;
var interval;
var counter = 0;
var starRating = document.querySelector(".stars");
var deck = document.querySelector(".deck");
var cards = shuffle(mCards);
var m = document.querySelector(".model");
var p = document.querySelector(".playagain");
var c = document.querySelector(".close");
p.onclick = function() {
  playAgain()
};
c.onclick = function() {
  m.style.display = "none";
}
//to shuffle the cards
console.log(deck);
cards.map(() => {
  [].forEach.call(mCards, (list) => {
    deck.appendChild(list);
  });
});

//starts the game
//to access each and every card
while (i < mCards.length) {
  mCards[i].addEventListener("click", bindClick(i));
  i += 1;
}

function bindClick(index) {
  return function() {
    mCards[index].getAttributeNode("class").value += " open" + " show" + " disable";
    console.log("you clicked region number " + index);
    ar.push(mCards[index]);
    setTimeout(matchcard, 200);
    if (timeflag == 0) {
      timer();
      timeflag++;
    }
  };
}
//compares two cards
function matchcard() {
  if (ar.length == 2) {
    move();
    if (ar[0].children[0].className == ar[1].children[0].className) {
      //ar[0].classList.add("match","disable");
      //ar[1].classList.add("match","disable");
      ar[0].getAttributeNode("class").value += " match " + " disable";
      ar[1].getAttributeNode("class").value += " match " + " disable";
      console.log("matched");
      ar = [];
      counter += 1;
      if (counter == 8) {
        stoptimer();
      }
    } else {
      ar[0].className = ("card"); //when cards are not equal
      ar[1].className = ("card");
      ar = [];
    }
  } else {
    var className = "card";
  }
}
//it gives moves count and star rating
function move() {
  mov = mov + 1;
  document.querySelector(".moves").innerHTML = mov;
  if (mov == 9) {
    console.log(document.querySelector(".stars"));
    console.log(document.querySelector(".stars").children[2]);
    console.log(document.querySelector(".stars").children[2].innerHTML);

    document.querySelector(".stars").children[2].innerHTML = '<i class="fa fa-star-o"></i>';
  }
  if (mov == 15) {
    document.querySelector(".stars").children[1].innerHTML = '<i class="fa fa-star-o"></i>';
  }
}
//to restart the game
function restart() {
  window.location.reload();
}
//to start timer when game starts
function timer() {
  var p = document.querySelector(".min");
  var q = document.querySelector(".sec");
  interval = setInterval(() => {
    p.innerHTML = min;
    q.innerHTML = sec;
    sec += 1;
    if (sec == 60) {
      min += 1;
      sec = 0;
    }
  }, 1000);
}
//to stop timer after matching all cards
function stoptimer() {
  clearInterval(interval);
  popup();
}
//popup message after completing the game and displays star rating , timer
function popup() {
  m.style.display = "block";
  document.querySelector(".totaltime").innerHTML = min + "min" + (sec - 1) + "sec";
  console.log(starRating.innerHTML);
  console.log(document.querySelector(".finalstars").innerHTML);
  document.querySelector(".finalstars").children[0].className = starRating.children[0].children[0].className;
  document.querySelector(".finalstars").children[1].className = starRating.children[1].children[0].className;
  document.querySelector(".finalstars").children[2].className = starRating.children[2].children[0].className;
}

function playAgain() { //after completing the game are you willing to play again then restart the game
  restart();
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
