function Room(id, name, players, matriz, activePlayer, winner, firstPlayer, turn, isClosed) {
    this.id = id;
    this.name = name;
    this.players = players;
    this.matriz = matriz;
    this.activePlayer = activePlayer;
    this.winner = winner;
    this.firstPlayer = firstPlayer;
    this.turn = turn;
    this.isClosed = isClosed;

    this.getId = function() {
        return this.id;
    }
    this.getName = function() {
        return this.name;
    }
    this.getPlayers = function() {
        return this.players;
    }
}