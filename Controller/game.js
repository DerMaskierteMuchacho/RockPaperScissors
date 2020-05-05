"use strict";

let gameManager;

//TODO w3c validation

window.onload = function load() {
    gameManager = new gameController();
};

function startGame(value) {
    gameManager.initGame(
        document.querySelector('input[name="mode"]:checked').value
    );
}

function stopGame() {
    gameManager.stopGame();
}

function playHand(hand) {
    gameManager.playHand(hand);
}

function switchMode() {
    gameManager.switchMode();
}

function muchachoMode() {
    gameManager.enableMuchachoMode();
}