function Room(id, name, players) {
    this.id = id;
    this.name = "Sala " . this.id;
    this.players = players;
    this.matriz = null;
    this.activePlayer = null;
    this.winner = null;
    this.startPlayer = null;
    this.turn = null;
    this.status = false;

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
    
    this.getStatus = function(){
        return this.status;
    }
    this.setStatus = function(status){
        this.status = status;
    }
}