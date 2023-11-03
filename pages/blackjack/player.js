export class Player {
    constructor(name) {
        this.name = name
        this.stand = false;
        this.cards = [];
        this.sum = 0;
        this.blackjack = false;
        this.getSum();
    }
    addCard(card) {
        this.cards.push(card);
        this.getSum();
        if(this.sum === 21) this.blackjack = true;
    }
    done() {
        this.getSum()
        this.stand = true;
    }
    getSum() {
        this.sum = 0;
        let sum = 0;
        this.cards.forEach((card) => {

            const val = card.value === "KING" ? 10 :  card.value === "QUEEN" ? 10 :  card.value === "JACK" ? 10 : card.value === "ACE" ? 1 : Number(card.value)
            sum += val;
            
        })
        this.sum = sum;
        return sum
    }
   
}
