// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Requerimos avatar
const {Avatar, avatarSchema} = require('./AvatarSchema');
// Definimos player Schema
const playerSchema = new Schema({
    id: Number,
    name: String,
    avatar: avatarSchema,
    points: Number,
    percentageWin: Number,
    ready: Boolean,
    position: String,
    room: String
});

// Modelo Player
const Player = mongoose.model('players', playerSchema);

// Modelo Player
module.exports = {
    'Player': Player,
    'playerSchema': playerSchema
}