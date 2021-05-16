// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Requerimos player
const {Player, playerSchema} = require('./PlayerSchema');
// Creamos colección rooms
const roomSchema = new Schema({
    name: String,
    players: [playerSchema],
    matriz: Array,
    activePlayer: Number,
    winner: String,
    startPlayer: String,
    turn: Number,
    available: Boolean
});

// Modelo Room
const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;