function Avatar(id, image) {
    this.id = id;
    this.image = image;
    this.available = true;

    this.getId = function() {
        return this.id;
    }
    this.setId = function(id) {
        this.id = id;
    }

    this.getImage = function() {
        return this.image;
    }
    this.setImage = function(image) {
        this.image = image;
    }

    this.getAvailable = function() {
        return this.available;
    }
    this.setAvailable = function(available) {
        this.available = available;
    }
}


module.exports = Avatar;
