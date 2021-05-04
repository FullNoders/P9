function Player(id, name, avatar, points, percentage, isReady, currentPosition) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.points = points;
    this.percentage = percentage;
    this.isReady = isReady;
    this.currentPosition = currentPosition;

    this.getId = function() {
        return this.id;
    }
    this.getName = function() {
        return this.name;
    }
    this.getAvatar = function() {
        return this.avatar;
    }
}