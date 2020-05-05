"use strict";

class viewManager {
    displayRanking(array) {
        let sorted = array.sort(function(a, b) {
            return b.winCount - a.winCount;
        });

        let scoreboard = document.querySelector("#scoreboard");
        scoreboard.innerHTML = "";

        let maxDisplayCount = 10;
        let displayCount = 0;

        sorted.forEach((entry) => {
            if (displayCount >= maxDisplayCount) {
                return;
            }

            let node = document.createElement("li");
            node.textContent = "Rank " + entry.name + ": " + entry.winCount + " wins";
            scoreboard.appendChild(node);
            displayCount++;
        });
    }

    printHistory(playerHand, cpuHand, result) {
        let history = document.querySelector("#history");
        history.insertBefore(
            this.createNode(
                "p",
                "Player: " +
                playerHand +
                " | CPU: " +
                cpuHand +
                " => outcome: " +
                result
            ),
            document.querySelector("#history p")
        );
    }

    deleteHistory() {
        document.getElementById("history").innerHTML = "<h3>History</h3>";
    }

    switchMode(playLocal) {
        if (playLocal) {
            document.getElementById("scoreTitle").innerText = "Server Rangking";
            document.getElementById("switchToServer").value = "Switch to Local";
            document.getElementById("radioBasic").disabled = true;
            document.getElementById("radioExtended").checked = true;
        } else {
            document.getElementById("scoreTitle").innerText = "Lokale Ranking";
            document.getElementById("switchToServer").value = "Switch to Server";
            document.getElementById("radioBasic").disabled = false;
        }
    }

    showGame(value) {
        let gameContainer = document.querySelector("#game");
        let form = document.querySelector("#mode");

        if (value) {
            gameContainer.style.display = "inline";
            form.style.display = "none";
        } else {
            gameContainer.style.display = "none";
            form.style.display = "inline";
        }
    }

    displayPlayerScore(player) {
        console.log("score " + player.winCount);
        let playerScore = document.querySelector("#playerScore");
        playerScore.childNodes.forEach((node) => node.remove());
        playerScore.appendChild(
            this.createNode(
                "h3",
                "Win: " + player.winCount + " | Lose: " + player.loseCount
            )
        );
    }

    createNode(type, content) {
        let node = document.createElement(type);
        node.textContent = content;
        return node;
    }

    enableHandButtons(value) {
        console.log("enable hands: " + value);
        for (let el of document.querySelectorAll(".circleButton")) {
            el.disabled = !value;
        }
    }

    addHandButton(classname, type) {
        let buttons = document.querySelector("#handButton");
        buttons.appendChild(this.createButton(classname, type));
    }

    removeHandButtons() {
        let buttons = document.querySelector("#handButton");
        buttons.innerHTML = ""; //remove child nodes
    }

    createButton(className, type) {
        let button = document.createElement("button");
        button.className = "circleButton";
        button.addEventListener("click", () => playHand(type));
        button.innerHTML = "<i class='" + className + "'></i>";

        return button;
    }

    muchachoMode() {
        document.getElementById("username").value = "Der maskierte Muchacho";
        for (let el of document.querySelectorAll(".muchacho")) {
            console.log(
                "Hier kommt er, der maskierte Muchacho. Mächtig, mutig und Muchomacho."
            );
            el.style.display = "block";
        }
    }
}