"use strict";

function displayRanking(array) {
    let sorted = array.sort(function(a, b) {
        return b.wins - a.wins;
    });
    console.log(sorted);

    let scoreboard = document.querySelector("#scoreboard");
    scoreboard.innerHTML = "";

    let maxDisplayCount = 10;
    let displayCount = 0;

    array.forEach((entry) => {
        if (displayCount >= maxDisplayCount) {
            return;
        }

        let node = document.createElement("li");
        node.textContent = "Rang mit " + entry.wins + " Siegen: " + entry.name;
        scoreboard.appendChild(node);
        displayCount++;
    });
}

function printHistory(playerHand, cpuHand, result) {
    let history = document.querySelector("#history");
    history.insertBefore(
        createNode(
            "p",
            "Player: " + playerHand + " | CPU: " + cpuHand + " => outcome: " + result
        ),
        document.querySelector("#history p")
    );
}

function switchMode() {
    if (playLocal) {
        document.getElementById("scoreTitle").innerText = "Server Rangliste";
        document.getElementById("switchToServer").value = "Wechsle zu Lokal";
        document.getElementById("radioBasic").disabled = true;
        document.getElementById("radioExtended").checked = true;
        loadServerRanking();
    } else {
        document.getElementById("scoreTitle").innerText = "Lokale Rangliste";
        document.getElementById("switchToServer").value = "Wechsle zu Server";
        document.getElementById("radioBasic").disabled = false;
        loadLocalRanking();
    }

    playLocal = !playLocal;
}

function showGame(value) {
    let gameContainer = document.querySelector("#game");
    let form = document.querySelector("#mode");

    if (value) {
        gameContainer.style.display = "inline";
        form.style.display = "none";
    } else {
        gameContainer.style.display = "none";
        form.style.display = "inline";
        stopSound();
    }
}

function displayPlayerScore() {
    let playerScore = document.querySelector("#playerScore");
    playerScore.childNodes.forEach((node) => node.remove());
    playerScore.appendChild(
        createNode("h3", "Win: " + playerObj.wins + " | Lose: " + playerObj.losses)
    );
}