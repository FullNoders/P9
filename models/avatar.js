function Avatar(id, image, name) {
    this.id = id;
    this.image = image;
    this.name = name;

    this.getId = function() {
        return this.id;
    }
    this.getImage = function() {
        return this.image;
    }

    this.getName = function() {
        return this.name;
    }
}