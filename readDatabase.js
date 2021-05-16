// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Requerimos schemas
const { Avatar } = require('./models/AvatarSchema');
const { Player } = require('./models/PlayerSchema');
const Room = require('./models/RoomSchema');
// Conectamos a la base de datos
mongoose.connect('mongodb://p9p4-mongo:27017/p9p4', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
// we're connected!
console.log("Conectado por fin");

// Parámetros query 
const filter = {};

// Queries
var rooms = await Room.find(filter);
var avatars = await Avatar.find(filter);
var players = await Player.find(filter);

// Exportamos
module.exports = {
    'rooms': rooms,
    'avatars': avatars,
    'players': players
}

console.log(rooms);
console.log(avatars);
});