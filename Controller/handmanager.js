"use strict";

class handManager {
    hands = [];

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

        let buttons = document.querySelector("#handButton");
        buttons.innerHTML = ""; //remove child nodes
        buttons.appendChild(this.createButton("far fa-hand-rock", "Rock"));
        buttons.appendChild(this.createButton("far fa-hand-paper", "Paper"));
        buttons.appendChild(this.createButton("far fa-hand-scissors", "Scissors"));

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

        let buttons = document.querySelector("#handButton");
        buttons.innerHTML = ""; //remove child nodes
        buttons.appendChild(this.createButton("far fa-hand-rock", "Rock"));
        buttons.appendChild(this.createButton("far fa-hand-paper", "Paper"));
        buttons.appendChild(this.createButton("far fa-hand-scissors", "Scissors"));
        buttons.appendChild(this.createButton("far fa-hand-lizard", "Lizard"));
        buttons.appendChild(this.createButton("far fa-hand-spock", "Spock"));

        console.log("loaded extended set");
    }

    playHand(playLocal, value) {
        console.log("Play local: " + playLocal);
        console.log("Player used: " + value);
        let player = this.findHand(HandTypes[value]);

        let result;

        if (playLocal) {
            result = this.playHandLocal(player, value);
        } else {
            result = this.playHandServer(player, value);
        }

        return result;
    }

    playHandServer(player, hand) {
        let result;
        let url =
            "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/play?playerName=" +
            playerObj.name +
            "&playerHand=" +
            this.getServerHand(hand);
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(data.choice);
                console.log(data.win);

                result = data.win;
                printHistory(hand, data.choice, result);

            })
            .catch((error) => console.log(error));

        return result;
    }

    playHandLocal(player, hand) {
        let cpu = this.getRandomHand();
        let cpuHand = this.getHandType(cpu.hand);
        console.log("CPU used: " + cpuHand);

        let result = this.getHandOutcome(player.compareTo(cpu));
        console.log("outcome: " + result);

        printHistory(hand, cpuHand, result);

        return result;
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

    createButton(className, type) {
        let button = document.createElement("button");
        button.className = "circleButton";
        button.addEventListener("click", () => playHand(type));
        button.innerHTML = "<i class='" + className + "'></i>";

        return button;
    }

    getServerHand(value) {
        //TODO use enum
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
}