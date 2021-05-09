function Avatar(id, image, name, color) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.color = color;

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

    this.getName = function() {
        return this.name;
    }
    this.setName = function(name) {
        this.name = name;
    }

    this.getColor = function(){
        return this.color;
    }
    this.setColor = function(){
        this.color = color;
    }


}


module.exports = Avatar;
