function Room(id){
    this.id = id;
    this.name = "Sala " + this.id;
    this.players = [];
    this.matriz = Array.from(Array(5), () => new Array(5));
    this.activePlayer = 0;
    this.winner = null;
    this.startPlayer = null;
    this.turn = 0;
    this.available = true;

    this.getId = function() {
        return this.id;
    }
    this.setId = function(id){
        this.id = id;
    }

    this.getName = function() {
        return this.name;
    }
    this.setNme = function(name){
        this.name = name;
    }

    this.getPlayers = function() {
        return this.players;
    }
    this.setPlayers = function(players){
        this.players = players;
    }

    this.getMatriz = function(){
        return this.matriz;
    }
    this.setMatriz = function(matriz){
        this.matriz = matriz;
    }

    this.getActivePlayer = function(){
        return this.activePlayer;
    }
    this.setActivePlayer = function(activePlayer){
        this.activePlayer = activePlayer;
    }

    this.getWinner = function(){
        return this.winner;
    }
    this.setWinner = function(winner){
        this.winner = winner;
    }

    this.getStartPlayer = function(){
        return this.startPlayer;
    }
    this.setStartPlayer = function(startPlayer){
        this.startPlayer = startPlayer;
    }

    this.getTurn = function(){
        return this.turn;
    }
    this.setTurn = function(turn){
        this.turn = turn;
    }
    
    this.getavailable = function(){
        return this.available;
    }
    this.setavailable = function(available){
        this.available = available;
    }
}

module.exports = Room;
