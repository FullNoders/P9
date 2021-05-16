// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Definimos avatar Schema
const avatarSchema = new Schema({
    id: Number,
    image: String,
    available: Boolean
});

// Modelo Avatar
const  Avatar = mongoose.model('avatares', avatarSchema);

// Modelo Avatar
module.exports = {
    'Avatar': Avatar,
    'avatarSchema': avatarSchema
};