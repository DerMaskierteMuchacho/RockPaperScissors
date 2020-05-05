"use strict";

class handController {
    hands = [];
    view;

    constructor(viewController) {
        this.view = viewController;
    }

    initGame(value) {
        if (value == 3) {
            this.loadBasic();
        }
        if (value == 5) {
            this.loadExtended();
        }
    }

    loadBasic() {
        this.hands = [];

        this.hands.push(
            new Hand(HandTypes.Rock, [HandTypes.Scissors], [HandTypes.Paper])
        );
        this.hands.push(
            new Hand(HandTypes.Paper, [HandTypes.Rock], [HandTypes.Scissors])
        );
        this.hands.push(
            new Hand(HandTypes.Scissors, [HandTypes.Paper], [HandTypes.Rock])
        );

        this.view.removeHandButtons();
        this.view.addHandButton("far fa-hand-rock", "Rock");
        this.view.addHandButton("far fa-hand-paper", "Paper");
        this.view.addHandButton("far fa-hand-scissors", "Scissors");

        console.log("loaded basic set");
    }

    loadExtended() {
        this.hands = [];
        this.hands.push(
            new Hand(
                HandTypes.Rock, [HandTypes.Scissors, HandTypes.Lizard], [HandTypes.Paper, HandTypes.Spock]
            )
        );
        this.hands.push(
            new Hand(
                HandTypes.Paper, [HandTypes.Rock, HandTypes.Spock], [HandTypes.Scissors, HandTypes.Lizard]
            )
        );
        this.hands.push(
            new Hand(
                HandTypes.Scissors, [HandTypes.Paper, HandTypes.Lizard], [HandTypes.Rock, HandTypes.Spock]
            )
        );
        this.hands.push(
            new Hand(
                HandTypes.Lizard, [HandTypes.Paper, HandTypes.Spock], [HandTypes.Rock, HandTypes.Scissors]
            )
        );
        this.hands.push(
            new Hand(
                HandTypes.Spock, [HandTypes.Rock, HandTypes.Scissors], [HandTypes.Paper, HandTypes.Lizard]
            )
        );

        this.view.removeHandButtons();
        this.view.addHandButton("far fa-hand-rock", "Rock");
        this.view.addHandButton("far fa-hand-paper", "Paper");
        this.view.addHandButton("far fa-hand-scissors", "Scissors");
        this.view.addHandButton("far fa-hand-lizard", "Lizard");
        this.view.addHandButton("far fa-hand-spock", "Spock");

        console.log("loaded extended set");
    }

    findHand(handValue) {
        let i;
        for (i = 0; i < this.hands.length; i++) {
            let element = this.hands[i];
            if (element.hand === handValue) {
                return element;
            }
        }
    }

    getRandomHand() {
        let index = Math.round(Math.random() * (this.hands.length - 1));
        return this.hands[index];
    }

    getHandType(value) {
        return Object.keys(HandTypes).find((key) => HandTypes[key] === value);
    }

    getHandOutcome(value) {
        return Object.keys(HandComparison).find(
            (key) => HandComparison[key] === value
        );
    }

    getServerHand(value) {
        switch (value) {
            case "Rock":
                return "Stein";
            case "Paper":
                return "Papier";
            case "Scissors":
                return "Schere";
            case "Spock":
                return "Brunnen";
            case "Lizard":
                return "Streichholz";
            default:
                return "invalid";
        }
    }

    getServerHandTranslation(value) {
        switch (value) {
            case "Stein":
                return "Rock";
            case "Papier":
                return "Paper";
            case "Schere":
                return "Scissors";
            case "Brunnen":
                return "Spock";
            case "Streichholz":
                return "Lizard";
            default:
                return "invalid";
        }
    }

    getServerResult(value) {
        console.log("server result value: " + value);

        switch (value) {
            case true:
                return HandComparison.Win;
            case false:
                return HandComparison.Lose;
            case undefined:
                return HandComparison.Draw;
            default:
                console.log("error getting server result");
        }
    }
}