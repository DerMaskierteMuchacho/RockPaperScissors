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
    playerObj = getOrCreatePlayer(document.getElementById("username").value);
    document.getElementById("history").innerHTML = "<h3>History</h3>";

    gameManager.initGame(
        document.querySelector('input[name="mode"]:checked').value
    );

    showGame(true);
    playSound();
    displayPlayerScore(playerObj);
}

function getOrCreatePlayer(username) {
    let rankingPlayer = localRankings.find((rank) => rank.name === username);

    if (rankingPlayer === undefined) {
        return new player(username, 0, 0);
    } else {
        return rankingPlayer;
    }
}

function playHand(hand) {
    let result = gameManager.playHand(playLocal, hand);
    console.log("play hand result: " + result);
    if (result === HandComparison.Win) {
        playerObj.winCount++;
    } else if (result === HandComparison.Lose) {
        playerObj.loseCount++;
    }

    displayPlayerScore(playerObj);
    updateRanking(playerObj);
}

function createNode(type, content) {
    let node = document.createElement(type);
    node.textContent = content;
    return node;
}