// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var userModel = new Schema({
//     name:       {type: String},
//     email:      {type: String, required:true},
//     username:   {type: String, required:true},
//     password:   {type: String, required:true}
// });

// module.exports = mongoose.model('Users',userModel);


function Room(id){
    this.id = id;
    this.name = "Sala " + id;
}

module.exports = Room;
