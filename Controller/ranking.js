"use strict";

let localRankings = [];

function loadServerRanking() {
    fetch(
            "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking"
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            let players = [];

            for (const [key, value] of Object.entries(data)) {
                players.push(new player(value.user, value.win, value.lost));
            }

            displayRanking(players);
        })
        .catch((error) => console.log(error));
}

function loadLocalRanking() {
    displayRanking(localRankings);
}

function updateRanking(player) {
    if (!playLocal) {
        return;
    }

    if (localRankings.find((rank) => rank.name === player.name)) {
        console.log("player found");
    } else {
        console.log("new player");
    }
}