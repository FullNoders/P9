function Player(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;

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