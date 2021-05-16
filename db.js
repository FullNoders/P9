// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Requerimos schemas
const Avatar = require('./models/AvatarSchema');
const Player = require('./models/PlayerSchema');
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

// Exportamos
var rooms = exports.rooms = await Room.find(filter);
var avatars = exports.avatars = await Room.find(filter);
var players = exports.players = await Room.find(filter);
});