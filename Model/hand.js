"use strict";

const HandTypes = { Rock: 1, Paper: 2, Scissors: 3, Lizard: 4, Spock: 5 };
const HandComparison = { Win: 1, Lose: 2, Draw: 3 };

class Hand {
    win = [];
    lose = [];
    hand;

    constructor(handType, wins, losses) {
        this.hand = handType;
        this.win = wins;
        this.lose = losses;
    }

    addWin(obj) {
        win.push(obj);
    }

    addLoss(obj) {
        lose.push(obj);
    }

    compareTo(otherHand) {
        //console.log("hand:" + this.hand);
        //console.log("other hand:" + otherHand.hand);

        if (this.hand === otherHand.hand) {
            return HandComparison.Draw;
        }

        if (this.win.includes(otherHand.hand)) {
            return HandComparison.Win;
        } else if (this.lose.includes(otherHand.hand)) {
            return HandComparison.Lose;
        } else {
            return "error comparing hands";
        }
    }
}