function Room(id, name, players) {
    this.id = id;
    this.name = name;
    this.players = players;

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