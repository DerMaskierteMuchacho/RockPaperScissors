"use strict";

class ranking {
    localRankings = [];
    serverRanking = [];

    async loadRanking(playLocal) {
        if (playLocal) {
            return this.loadLocalRanking();
        } else {
            return await this.loadServerRanking();
        }
    }

    async loadServerRanking() {
        this.serverRanking = [];

        let url =
            "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking";

        let data = await (
            await fetch(url).catch((error) => console.log(error))
        ).json();

        for (const [key, value] of Object.entries(data)) {
            this.serverRanking.push(new player(value.user, value.win, value.lost));
        }

        return this.serverRanking;
    }

    loadLocalRanking() {
        return this.localRankings;
    }

    updateRanking(player, playLocal) {
        if (!playLocal) {
            return;
        }

        let rankingPlayer = this.findPlayer(player.name);
        if (rankingPlayer != undefined) {
            //console.log("player found");
            rankingPlayer.winCount = player.winCount;
            rankingPlayer.loseCount = player.loseCount;
        } else {
            //console.log("new player");
            this.localRankings.push(player);
        }
    }

    findPlayer(username) {
        return this.localRankings.find((rank) => rank.name === username);
    }
}