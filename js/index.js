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
    deck.push([getSuit(), cardValue]);

    scoreCounter(cardValue);
    console.log(deck);
    console.log(score);
}


function scoreCounter(cardValue) {
    score = score + cardValue;

    if(score > 21){
        console.log("you lost " + score)
    }
}