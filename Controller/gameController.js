"use strict";

class gameController {
    hands;
    view;
    rank;
    sound;
    playerObj;
    playLocal = true;

    muchachoModeEnabled = false;

    constructor() {
        this.view = new viewManager();
        this.hands = new handController(this.view);
        this.rank = new ranking();
        this.sound = new sound();

        this.view.showGame(false);
        this.loadRanking(true); //default load local ranking
    }

    initGame(value) {
        this.hands.initGame(value);

        this.playerObj = this.getOrCreatePlayer(
            document.getElementById("username").value
        );
        this.view.deleteHistory();
        this.view.showGame(true);
        this.view.displayPlayerScore(this.playerObj);
        this.sound.playSound();
    }

    stopGame() {
        this.view.showGame(false);
        this.sound.stopSound();
        this.loadRanking(this.playLocal);
    }

    switchMode() {
        this.view.switchMode(this.playLocal);
        this.playLocal = !this.playLocal;
        this.loadRanking(this.playLocal);
    }

    loadRanking(local) {
        console.log("loading ranking local: " + local);
        this.view.displayRanking(this.rank.loadRanking(local));
    }

    getOrCreatePlayer(username) {
        let rankingPlayer = this.rank.findPlayer(username);

        if (rankingPlayer === undefined) {
            return new player(username, 0, 0);
        } else {
            return rankingPlayer;
        }
    }

    playHand(value) {
        this.view.enableHandButtons(false);
        setTimeout(function() {
            this.view.enableHandButtons(true);
        }, 1000);

        console.log("Play local: " + this.playLocal);
        console.log("Player used: " + value);
        let player = this.hands.findHand(HandTypes[value]);

        let result;

        if (this.playLocal) {
            result = this.playHandLocal(player, value);
        } else {
            result = this.playHandServer(player, value);
        }

        console.log("play hand result: " + result);
        if (result === HandComparison.Win) {
            playerObj.winCount++;
        } else if (result === HandComparison.Lose) {
            playerObj.loseCount++;
        }

        displayPlayerScore(playerObj);
        updateRanking(playerObj);

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

                //TODO display win lose in game view

                result = this.getServerResult(data.win);
                console.log("outcome: " + this.getHandOutcome(result));
                printHistory(hand, data.choice, this.getHandOutcome(result));
            })
            .catch((error) => console.log(error));

        return result;
    }

    playHandLocal(player, hand) {
        let cpu = this.getRandomHand();
        let cpuHand = this.getHandType(cpu.hand);
        console.log("CPU used: " + cpuHand);

        let result = player.compareTo(cpu);
        console.log("outcome: " + this.getHandOutcome(result));

        printHistory(hand, cpuHand, this.getHandOutcome(result));

        return result;
    }

    enableMuchachoMode() {
        this.muchachoModeEnabled = true;
        this.view.muchachoMode();
    }
}