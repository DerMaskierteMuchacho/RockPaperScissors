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

    let rankingPlayer = findPlayer(player.name);
    //console.log("player wins " + player.wins);
    if (rankingPlayer != undefined) {
        //console.log("player found");
        rankingPlayer.winCount = player.winCount;
        rankingPlayer.loseCount = player.loseCount;
    } else {
        //console.log("new player");
        localRankings.push(player);
    }
}

function findPlayer(username) {
    return localRankings.find((rank) => rank.name === username);
}