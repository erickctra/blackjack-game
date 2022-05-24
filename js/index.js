const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
let deck = [];
let score = 0;

function getSuit() {
    var randomValue = Math.floor(Math.random()*suits.length);
    return suits[randomValue];
}

function getValue(){
    var randomValue = Math.floor(Math.random() * 13) + 1;
    return randomValue;
}

function pushCard() {
    const cardValue = getValue();
    const suitValue = getSuit();
    deck.push([suitValue, cardValue]);

    generateCard(suitValue, cardValue);
    console.log(deck)
    scoreCounter(cardValue);
}

function generateCard(suit, cardValue) {
    const card = document.createElement("div");

    card.classList.add(suit, cardValue);
    card.style.backgroundPositionX = `${-100 * cardValue + 100}px`;
    document.getElementById("main").appendChild(card);
}


function scoreCounter(cardValue) {
    score = score + cardValue;

    if(score > 21){
        console.log("you lost " + score)
    }
}