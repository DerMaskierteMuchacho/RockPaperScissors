function playSound() {
    let gameAudio = document.querySelector("#sound");
    gameAudio.loop = true;
    gameAudio.volume = 0.2;
    gameAudio.play();
}