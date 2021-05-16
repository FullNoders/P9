// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Conectamos a la base de datos
mongoose.connect('mongodb://p9p4-mongo:27017/p9p4', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
console.log("Conectado por fin");


// Definimos avatar Schema
const avatarSchema = mongoose.model('avatarSchema', {
    image: String,
    available: Boolean
});

// Definimos player Schema
const playerSchema = mongoose.model('playerSchema', {
    name: String,
    avatar: [avatarSchema],
    points: Number,
    percentageWin: Number,
    ready: Boolean,
    position: String,
    room: String
});

// Creamos colección rooms
const Room = mongoose.model('rooms', { 
    name: String,
    players: [playerSchema],
    matriz: Array,
    activePlayer: Number,
    winner: String,
    startPlayer: String,
    turn: Number,
    available: Boolean
});

const room1 = new Room({ name: '1' });
const room2 = new Room({ name: '2' });
const room3 = new Room({ name: '3' });
const room4 = new Room({ name: '4' });
room1.save().then(() => console.log('Sala 1 creada'));
room2.save().then(() => console.log('Sala 2 creada'));
room3.save().then(() => console.log('Sala 3 creada'));
room4.save().then(() => console.log('Sala 4 creada'));

// Creamos colección avatares
const avatar2 = new avatarSchema({ image: '/images/1.png'});
const avatar1 = new avatarSchema({ image: '/images/2.png' });
const avatar3 = new avatarSchema({ image: '/images/3.png' });
const avatar4 = new avatarSchema({ image: '/images/4.png' });
const avatar5 = new avatarSchema({ image: '/images/5.png' });
const avatar6 = new avatarSchema({ image: '/images/6.png' });
const avatar7 = new avatarSchema({ image: '/images/7.png' });
const avatar8 = new avatarSchema({ image: '/images/8.png' });
const avatar9 = new avatarSchema({ image: '/images/9.png' });
const avatar10 = new avatarSchema({ image: '/images/10.png' });
avatar1.save().then(() => console.log('Avatar 1 creado'));
avatar2.save().then(() => console.log('Avatar 2 creado'));
avatar3.save().then(() => console.log('Avatar 3 creado'));
avatar4.save().then(() => console.log('Avatar 4 creado'));
avatar5.save().then(() => console.log('Avatar 5 creado'));
avatar6.save().then(() => console.log('Avatar 6 creado'));
avatar7.save().then(() => console.log('Avatar 7 creado'));
avatar8.save().then(() => console.log('Avatar 8 creado'));
avatar9.save().then(() => console.log('Avatar 9 creado'));
avatar10.save().then(() => console.log('Avatar 10 creado'));

});


