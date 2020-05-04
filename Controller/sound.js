class sound {
    playSound(muchachoModeEnabled) {
        if (!muchachoModeEnabled) {
            return;
        }

        let gameAudio = document.querySelector("#sound");
        gameAudio.loop = true;
        gameAudio.volume = 0.2;
        gameAudio.play();
    }

    stopSound(muchachoModeEnabled) {
        if (!muchachoModeEnabled) {
            return;
        }

        let gameAudio = document.querySelector("#sound");
        gameAudio.load();
    }

    muteSound() {
        let gameAudio = document.querySelector("#sound");
        gameAudio.volume = gameAudio.volume > 0 ? 0 : 0.2;
    }
}