"use strict";

class ranking {
    localRankings = [];

    loadRanking(playLocal) {
        if (playLocal) {
            return this.loadLocalRanking();
        } else {
            //let asdf = await loadScore_fetch();
            let asdf = this.loadServerRanking();
            console.log(asdf);
        }
    }

    loadServerRanking() {
        const request = async() => {
            const response = await fetch(
                "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking"
            );
            const json = await response.json();
            return json;
        };

        console.log("await " + request());

        /*

https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait

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

                                        console.log("players server: " + players.length);

                                        return players;
                                    })
                                    .catch((error) => console.log(error));*/
    }

    loadLocalRanking() {
        return this.localRankings;
    }

    updateRanking(player) {
        if (!playLocal) {
            return;
        }

        let rankingPlayer = findPlayer(player.name);
        if (rankingPlayer != undefined) {
            //console.log("player found");
            rankingPlayer.winCount = player.winCount;
            rankingPlayer.loseCount = player.loseCount;
        } else {
            //console.log("new player");
            localRankings.push(player);
        }
    }

    findPlayer(username) {
        return this.localRankings.find((rank) => rank.name === username);
    }
}