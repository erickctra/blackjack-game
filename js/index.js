const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
let computerDeck = [];
let deck = [];

let gameEnd = false;
let computerScore = 0;
let score = 0;

let playerRound = true;

function getSuit() {
  var randomValue = Math.floor(Math.random() * suits.length);
  return suits[randomValue];
}

function getValue() {
  var randomValue = Math.floor(Math.random() * 13) + 1;
  return randomValue;
}

function pushCard() {
  if (!gameEnd) {
    gameEnd = true;

    getHand();
    generateComputerHand();

    if (score == 21) {
      reset();
    }
    return;
  } else if (playerRound === false) {
    alert('voce ja jogou, espera ai');
  } else if (deck.length < 4) {
    const cardValue = getValue();
    const suitValue = getSuit();

    deck.push([suitValue, cardValue]);
    generateCard(suitValue, cardValue);
    updateCounter(cardValue);
  } else {
    alert('voce ja tem 4 cartas, descarte uma');
  }
}

function getHand() {
  while (deck.length < 3) {
    const cardValue = getValue();
    const suitValue = getSuit();

    deck.push([suitValue, cardValue]);
    generateCard(suitValue, cardValue);

    updateCounter(cardValue);
  }
}

function generateComputerHand() {
  while (computerDeck.length < 3) {
    const card = document.createElement('div');
    card.classList.add('computerCardHidden');

    const cardValue = getValue();
    const suitValue = getSuit();

    computerDeck.push([suitValue, cardValue]);
    document.getElementById('computer').appendChild(card);
    computerScore = computerScore + cardValue;
  }
  console.log('computer score ' + computerScore);
}

function generateCard(suit, cardValue) {
  const card = document.createElement('div');

  card.classList.add(suit, cardValue);
  card.style.zIndex = `${suits.length}`;
  card.style.backgroundPositionX = `${-100 * cardValue + 100}px`;

  card.addEventListener(
    'click',
    function () {
      if (deck.length > 3) {
        let index = deck.indexOf(
          deck.find(
            (cardDeck) => cardDeck[0] === suit && cardDeck[1] === cardValue
          )
        );
        deck.splice(index, 1);
        card.remove();
        releaseCard(cardValue);
        console.log(cardValue);
        stack.appendChild = card;
        document.getElementById('stack').style.backgroundPositionX = ` ${
          -100 * cardValue + 100
        }px`;
        document.getElementById('stack').classList.add(suit);
        playerRound = false;
      }
    },
    false
  );

  document.getElementById('deck').appendChild(card);
}

function updateCounter(cardValue) {
  if (cardValue > 10) {
    score = score + 10;
  } else {
    score = score + cardValue;
  }
  const counter = (document.getElementById('counter').innerHTML = score);
}

function formatValue(value) {
  if (value > 10) {
    return 10;
  } else {
    return value;
  }
}

function releaseCard(cardValue) {
  if (cardValue > 10) {
    score = score - 10;
  } else {
    score = score - cardValue;
  }
  const counter = (document.getElementById('counter').innerHTML = score);
}

function reset() {
  alert('quem embaralhou isso aqui?');
  gameEnd = false;
  deck = [];
  computerDeck = [];
  document.getElementById('deck').innerHTML = '';
  document.getElementById('counter').innerHTML = '';
  score = 0;
  return;
}
