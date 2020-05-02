"use strict";

let gameManager;
let playerObj;
let playLocal = true;

window.onload = function load() {
    gameManager = new handManager();
    showGame(false);
    loadLocalRanking();
};

function startGame(value) {
    playerObj = new player(document.getElementById("username").value, 0, 0);
    document.getElementById("history").innerHTML = "<h3>History</h3>";

    gameManager.initGame(
        document.querySelector('input[name="mode"]:checked').value
    );

    showGame(true);
    playSound();
}

function playHand(hand) {
    let result = gameManager.playHand(playLocal, hand);
    if (result === "Win") {
        playerObj.wins++;
    } else if (result === "Loss") {
        playerObj.losses++;
    }

    displayPlayerScore();
    updateRanking(playerObj);
}

function createNode(type, content) {
    let node = document.createElement(type);
    node.textContent = content;
    return node;
}