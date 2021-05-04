function Avatar(id, image, name, color) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.color = color;

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