"use strict";

class ranking {
    localRankings = [];

    async loadRanking(playLocal) {
        if (playLocal) {
            return this.loadLocalRanking();
        } else {
            return await this.loadServerRanking();
        }
    }

    async loadServerRanking() {
        let url =
            "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking";

        let data = await (
            await fetch(url).catch((error) => console.log(error))
        ).json();

        let players = [];

        for (const [key, value] of Object.entries(data)) {
            players.push(new player(value.user, value.win, value.lost));
        }

        console.log("players server: " + players.length);

        return players;
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