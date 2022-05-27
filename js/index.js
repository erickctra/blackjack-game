class Player {
  constructor(name, myTurn) {
    this.name = name;
    this.myTurn = myTurn;
  }
  deck = [];
  score = 0;
  increaseScore(score) {
    this.score = this.score + score;
  }

  decreaseScore(score) {
    this.score = this.score - score;
  }
}

const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
let discartedCard = [];
let gameStarted = true;

let newPlayer;
let computer;

// START GAME

function startGame() {
  if (gameStarted) {
    newPlayer = new Player('player', true);
    computer = new Player('computer', false);

    takeHand(newPlayer);
    takeHand(computer);

    console.log(newPlayer.score);
    console.log(computer.score);

    if (newPlayer.score == 21 || computer.score == 21) {
      resetGame();

      console.log('velha');
      startGame();
      return;
    }
    gameStarted = false;

    console.log('---------------');
    console.log('player turn');
    console.log('---------------');
  } else {
    // TODO - vez do jogador puxar uma carta e darcartar outra
    if (computer.myTurn) {
      setTimeout(function(){
        computerPlay();
      }, 1500);

      return;
    }
    console.log('maos dadas');
  }
}

function takeHand(player) {
  while (player.deck.length < 3) {
    const card = generateCard(player);
    player.deck.push(card);

    player.increaseScore(formatScore(card[1]));

    document.getElementById('scoreDisplay').innerHTML = newPlayer.score;
  }
}

function pushCard(player) {
  if (gameStarted == true) {
    startGame();
    return;
  }

  if (!player.myTurn) {
    console.log('espera sua vez');
    return;
  }

  if (player.deck.length == 3) {
    console.log('---------------');
    console.log('player turn drafted');
    console.log('---------------');
    card = generateCard(player);

    player.increaseScore(formatScore(card[1]));

    document.getElementById('scoreDisplay').innerHTML = newPlayer.score;

    player.deck.push(card);
    discartedCard = [];
  } else {
    console.log('discard one card');
  }
}

function takeDiscarted(player) {
  if (player.deck.length == 3 && discartedCard.length > 0) {
  document.getElementById('discartedCard').innerHTML = '';

    player.deck.push(discartedCard);
    player.increaseScore(formatScore(discartedCard[1]));
    document.getElementById('scoreDisplay').innerHTML = newPlayer.score;
    

  } else {
    console.log('discard one card');
  }
}

function removeCard(player, card) {
  if (player.deck.length == 4) {
    let cardIndex = player.deck.indexOf(
      player.deck.find((v) => v[0] === card[0] && v[1] === card[1])
    );

    if (cardIndex >= 0) {
      discartedCard = player.deck[cardIndex];
      renderDiscarded(discartedCard);

      player.decreaseScore(formatScore(player.deck[cardIndex][1]));
      if (player.score == 21) {

        renderWinner(player);

        resetGame();

        return;
      }

      player.deck.splice(cardIndex, 1);

      console.log(player.deck);
      console.log('---------------');
      console.log(`discarted card: ${discartedCard}`);
      console.log('---------------');
      
    document.getElementById('arrow').style.alignSelf = 'flex-start';
      setPlayerRound(player);
      // TODO PC TURN
      startGame();
    } else {
      console.log('no');
    }
  }
}

function setPlayerRound(player) {
  if (player.name == 'computer') {
    player.myTurn = false;
    newPlayer.myTurn = true;
  } else {
    player.myTurn = false;
    computer.myTurn = true;
  }
}

function generateCard(player) {
  const cardValue = getValue();
  const suitValue = getSuit();

  const card = [suitValue, cardValue];

  renderCard(player, suitValue, cardValue);

  return card;
}

function formatScore(score) {
  if (score > 10) {
    return 10;
  } else {
    return score;
  }
}

function resetGame() {
  newPlayer = '';
  computer = '';
  discartedCard = [];
  gameStarted = true;

  document.getElementById('computer').innerHTML = '';
  document.getElementById('deck').innerHTML = '';
  document.getElementById('discartedCard').innerHTML = '';
  document.getElementById('scoreDisplay').innerHTML = '';


}

// RANDOM VALUES

function getSuit() {
  var randomValue = Math.floor(Math.random() * suits.length);
  return suits[randomValue];
}

function getValue() {
  var randomValue = Math.floor(Math.random() * 13) + 1;
  return randomValue;
}

// can win

function computerPlay() {
  console.log('*****************');
  console.log('vez do computador');

  for (let index = 0; index < 3; index++) {
    let second = index + 1;
    let aux = second > 2 ? 0 : second;

    let cardOne = formatScore(computer.deck[index][1]);
    let cardTwo = formatScore(computer.deck[aux][1]);
    let formatedDiscartedCard = formatScore(discartedCard[1]);

    let absolute = cardOne + cardTwo + formatedDiscartedCard;

    console.log(
      `combination: ${index} ${second == 3 ? 0 : second} - ${absolute}`
    );

    if (absolute == 21) {
      renderWinner(computer);
      setPlayerRound(computer);
    document.getElementById('arrow').style.alignSelf = 'flex-end';

      resetGame();
      return;
    }
  }

  console.log('computer.score');
  console.log(computer.deck);
  console.log(computer.score);
  console.log('¨¨¨¨¨¨¨¨');

  // 
  var randomDecision = Math.floor(Math.random() * 2);

  console.log('A carta descartada não é decisiva, entao: ');

  document.getElementById('discartedCard').innerHTML = '';


  if (randomDecision == 1) {
    console.log('pegou a carta descartada');
    const pullCard = discartedCard;
    console.log('ultima carta descartada ' + pullCard);

    // choose random card from deck
    let randomCardChoose = Math.floor(Math.random() * 3);

    discartedCard = computer.deck[randomCardChoose];
    renderDiscarded(discartedCard);

    console.log('em troca, vai descartar:');
    console.log(discartedCard);
    console.log('¨¨¨¨¨¨¨¨');

    computer.decreaseScore(formatScore(discartedCard[1]));
    computer.deck.splice(randomCardChoose, 1);
    computer.deck.push(pullCard);
    computer.increaseScore(formatScore(pullCard[1]));
    document.getElementById('computer').childNodes.item(0).remove();

    renderCard(computer, pullCard[0], pullCard[1]);
    setPlayerRound(computer);
    document.getElementById('arrow').style.alignSelf = 'flex-end';

    return;
  } else {
    console.log('comprou uma carta');
    discartedCard = [];

    const cardPushed = generateCard(computer);

    for (let index = 0; index < 3; index++) {
      let second = index + 1;
      let aux = second > 2 ? 0 : second;

      let cardOne = formatScore(computer.deck[index][1]);
      let cardTwo = formatScore(computer.deck[aux][1]);
      let cardPushedValue = formatScore(cardPushed[1]);

      let absolute = cardOne + cardTwo + cardPushedValue;

      console.log(
        `combination: ${index} ${second == 3 ? 0 : second} - ${absolute}`
      );

      if (absolute == 21) {
        renderWinner(computer);
        resetGame();
        return;
      }
    }

    // choose random card from deck
    let randomCardChoose = Math.floor(Math.random() * 3);

    computer.decreaseScore(formatScore(discartedCard[1]));
    discartedCard = computer.deck[randomCardChoose];
    renderDiscarded(discartedCard);

    computer.deck.splice(randomCardChoose, 1);
    computer.deck.push(cardPushed);
    computer.increaseScore(formatScore(cardPushed[1]));

    document.getElementById('computer').childNodes.item(0).remove();

    setPlayerRound(computer);
    document.getElementById('arrow').style.alignSelf = 'flex-end';

    return;
  }
}



// PRINT IN CANVA

function renderDiscarded(card) {
  document.getElementById('discartedCard').innerHTML = '';

  const htmlCard = document.createElement('div');
  htmlCard.classList.add(card[0], card[1], 'animateDiscarted');
  htmlCard.style.zIndex = `${suits.length}`;
  htmlCard.style.width = '104px';
  htmlCard.style.height = '144px';
  htmlCard.style.background = 'url(./img/CuteCards.png)';
  htmlCard.style.backgroundPositionX = `${-100 * card[1] + 100}px`;
  htmlCard.onclick = () => {
    if(newPlayer.myTurn && newPlayer.deck.length == 3) {
      renderCard(newPlayer, discartedCard[0], discartedCard[1]);
      takeDiscarted(newPlayer);
    }
  };

  document.getElementById('discartedCard').appendChild(htmlCard);
}

function renderWinner(winner) {

  const winnerText = winner.name == "computer" ? 'PC win' : 'You win';

  document.getElementById('alert').style.display = "flex";
  document.getElementById('winnerText').innerHTML = winnerText;

  setTimeout(function(){
    document.getElementById('alert').style.display = "none";
          
        }, 2000);
}


function renderCard(player, suitValue, cardValue) {
  if (player.name == 'player') {
    const htmlCard = document.createElement('div');
    htmlCard.classList.add(suitValue, cardValue);
    htmlCard.style.zIndex = `${suits.length}`;
    htmlCard.style.backgroundPositionX = `${-100 * cardValue + 100}px`;
    htmlCard.onclick = () => {
      if (player.deck.length == 4) {
        htmlCard.remove();
        removeCard(player, [suitValue, cardValue]);
        document.getElementById('scoreDisplay').innerHTML = newPlayer.score;

      }
    };

    document.getElementById('deck').appendChild(htmlCard);
  } else {
    const htmlCard = document.createElement('div');
    htmlCard.classList.add('computerCardHidden');

    document.getElementById('computer').appendChild(htmlCard);
  }
}