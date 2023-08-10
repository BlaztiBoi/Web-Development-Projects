let cardsList = {    
    1 : ["A",11],
    2 : ["2",2],
    3 : ["3",3],
    4 : ["4",4],
    5 : ["5",5],
    6 : ["6",6],
    7 : ["7",7],
    8 : ["8",8],
    9 : ["9",9],
    10 : ["10",10],
    11 : ["J",10],
    12 : ["Q",10],
    13 : ["K",10]
}
let suit_ids = ["♣", "♦", "♥", "♠"]

let player = { name: "Player", chips: 190  , cards: [] , sum : 0 , isAlive : false , hasBlackJack : false }

let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let UISettings = {
    hideStartGame(){
        let startGame = document.getElementById("start-game")
        startGame.style.display = "none"
    },
    hideNewCard(){
        let newCard = document.getElementById("new-card")
        newCard.style.display = "none"
    },
    showStartGame(){
        let startGame = document.getElementById("start-game")
        startGame.style.display = ""
    },
    showNewCard(){
        let newCard = document.getElementById("new-card")
        newCard.style.display = ""
    }
}
// playerEl.textContent = player.name + ": " + player.chips + " chips"

function getRandomCard() {
    let randomCard = cardsList[Math.floor(Math.random()* Object.keys(cardsList).length) +1]
    let randomSuit = suit_ids[Math.floor(Math.random()* suit_ids.length)]
    let card = {
        name : randomCard[0],
        value : randomCard[1],
        suit : randomSuit

    }

    return card
    
}
function createNewCard(card){

    let span = document.createElement("span")
    span.textContent = card.suit +" "+ card.name
    cardsEl.appendChild(span)
}
function startGame() {
    player.hasBlackJack = false
    player.isAlive = true
    cardsEl.innerHTML = "Cards : "
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.cards = [firstCard, secondCard]
    player.sum = firstCard.value + secondCard.value
    UISettings.hideStartGame()
    UISettings.showNewCard()
    renderGame()
}
function renderGame() {
    cardsEl.innerHTML = "Cards : "
    for (let i = 0; i < player.cards.length; i++) {

       createNewCard(player.cards[i])
    }

    sumEl.textContent = "Sum: " + player.sum
    if (player.sum <= 20) {
        message = "Do you want to draw a new card?"
        UISettings.showNewCard()
    } else if (player.sum === 21) {
        message = "You've got Blackjack!"
        player.hasBlackJack = true
        UISettings.showStartGame() 
        UISettings.hideNewCard()
    } else {
        message = "You're out of the game!"
        player.isAlive = false
        UISettings.showStartGame()
        UISettings.hideNewCard()
    }
    messageEl.textContent = message

}

function newCard() {
    if (player.isAlive === true && player.hasBlackJack === false) {
        let card = getRandomCard()
        player.sum += card.value
        player.cards.push(card)
       
        renderGame()
    }
}