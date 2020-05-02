"use strict";

const HandTypes = { Rock: 1, Paper: 2, Scissors: 3, Lizard: 4, Spock: 5 };
const HandComparison = { Win: 1, Loss: 2, Draw: 3 };

class Hand {
    win = [];
    loss = [];
    hand;

    constructor(handType, wins, losses) {
        this.hand = handType;
        this.win = wins;
        this.loss = losses;
    }

    addWin(obj) {
        win.push(obj);
    }

    addLoss(obj) {
        loss.push(obj);
    }

    compareTo(otherHand) {
        //console.log("hand:" + this.hand);
        //console.log("other hand:" + otherHand.hand);

        if (this.hand === otherHand.hand) {
            return HandComparison.Draw;
        }

        if (this.win.includes(otherHand.hand)) {
            return HandComparison.Win;
        } else if (this.loss.includes(otherHand.hand)) {
            return HandComparison.Loss;
        } else {
            return "error comparing hands";
        }
    }
}