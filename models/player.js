function Player(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.points = 0;
    this.percentageWin = 0;
    this.ready = false;
    this.position = null;

    this.getId = function() {
        return this.id;
    }
    this.setId = function(id) {
        this.id = id;
    }

    this.getName = function() {
        return this.name;
    }
    this.setName = function(name) {
        this.name = name;
    }

    this.getAvatar = function() {
        return this.avatar;
    }
    this.setAvatar = function(avatar) {
        this.avatar = avatar;
    }

    this.getPoints = function() {
        return this.points;
    }
    this.setPoints = function(points) {
        this.points = points;
    }

    this.getPercentageWin= function() {
        return this.percentageWin;
    }
    this.setPercentageWin = function(percentageWin) {
        this.percentageWin = percentageWin;
    }

    this.getReady = function() {
        return this.ready;
    }
    this.setReady = function(ready) {
        this.ready = ready;
    }

    this.getPosition = function() {
        return this.position;
    }
    this.setPosition = function(position) {
        this.position = position;
    }

}