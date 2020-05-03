function playSound() {
    if (!muchachoModeEnabled) {
        return;
    }

    let gameAudio = document.querySelector("#sound");
    gameAudio.loop = true;
    gameAudio.volume = 0.2;
    gameAudio.play();
}

function stopSound() {
    if (!muchachoModeEnabled) {
        return;
    }

    let gameAudio = document.querySelector("#sound");
    gameAudio.load();
}

function muteSound() {
    let gameAudio = document.querySelector("#sound");
    gameAudio.volume = gameAudio.volume > 0 ? 0 : 0.2;
}