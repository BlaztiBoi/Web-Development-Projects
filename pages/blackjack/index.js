import { Player } from './player.js' 

const sumElement = document.getElementById("sum-el");
const messageElement = document.getElementById("message-el");
const cardsPlayer = document.getElementById("cards-player");
const cardsComputer = document.getElementById("cards-computer");
const sumComputer = document.getElementById("sum-el-com");
const startGameBtn = document.getElementById("start-game")
const standBtn = document.getElementById("stand");
const newCardBtn = document.getElementById("new-card")
messageElement.textContent = `Loading... Please Wait...`;

const winner = []

const newDeck = await getnewDeck()
const deckId = await newDeck.deck_id
const deckCards = await drawCards(deckId,52)
messageElement.textContent = `Want to play a round against computer?`
startGameBtn.classList.toggle("hide")


const player = new Player("You")
const computer = new Player("Computer")
startGameBtn.addEventListener("click", startGame)

newCardBtn.addEventListener("click", function(e) {
    drawCard(player,cardsPlayer)
    if(player.sum < 21) {

    }else if (player.sum == 21) {
        newCardBtn.classList.add("hide")
        standBtn.classList.add("hide")
        message(`${player.name} Got a BlackJack!`)
        winner.push(player.name)
        player.stand = true
        computerPlays()
        
    }else if (player.sum > 21) {
        newCardBtn.classList.add("hide")
        standBtn.classList.add("hide")
        message(`Oops ${player.name} went over 21!`)
        player.stand = true
        computerPlays()
    }
})



standBtn.addEventListener("click", ()=>{
    player.stand = true
    newCardBtn.classList.toggle("hide")
    standBtn.classList.toggle("hide")
    computerPlays()
})

function computerPlays(){
    message("Computer Drawing ....")
    drawCard(computer,cardsComputer,sumComputer)
    drawCard(computer,cardsComputer,sumComputer)
    while(!computer.blackjack && computer.stand === false){
        if(computer.sum < 17 && computer.blackjack === false){
            drawCard(computer,cardsComputer,sumComputer)
        }else computer.stand = true
    }
    if(computer.blackjack) winner.push(computer.name)
    console.log(computer)
    console.log(player)
    endGame()

}
function endGame(){
    if(winner.length > 1){
        message("Draw!")
    }else if(winner.length === 1){
        message(`${winner[0]} Won!`)
    }
    else if(winner.length === 0 ){
                if(computer.sum < 21 && player.sum < 21){
                    if(computer.sum > player.sum){
                        message("Computer Won!")
                    }else if(player.sum > computer.sum){
                        message("You Won!")
                    }
                }else if (computer.sum > 21 && player.sum < 21){
                    message("You Won!")
                }else if (player.sum > 21 && computer.sum < 21){
                    message("Computer Won!")
                }else message("Draw!")


    }
}
function message(msg){

    messageElement.textContent = `${msg}`

}
function drawCard(player,cardsContainer=cardsPlayer,sum=sumElement){
    const card = deckCards.cards[0]
    player.addCard(card)
    renderCard(card,cardsContainer)
    deckCards.cards.shift()
    sum.textContent = `Sum : ${player.sum}`
}

function startGame() {  
    deckCards.cards.forEach((c,index) => {
        if(index < 2){
            drawCard(player,cardsPlayer,sumElement)
        }
    })

    startGameBtn.classList.toggle("hide")
    standBtn.classList.toggle("hide")
    newCardBtn.classList.toggle("hide")

    
}
function renderCard(card,cards) {
const img = document.createElement("img")
    img.src = card.image
    cards.append(img)
}
async function getnewDeck(){
    const newDeck_cardsApi = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const response = await fetch(newDeck_cardsApi);
    const data = await response.json();
    return data;
}   

async function drawCards(deckId,card_amout) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${card_amout}`);
    const data = await response.json();
    return data;
    
}