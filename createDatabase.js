// Requerimos dependencia mongoose
const mongoose = require('mongoose');
// Schema
const { Schema } = mongoose;
// Conectamos a la base de datos
mongoose.connect('mongodb://p9p4-mongo:27017/p9p4', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
console.log("Conectado por fin");

// Requerimos schemas
const { Avatar } = require('./models/AvatarSchema');
const { Player } = require('./models/PlayerSchema');
const Room = require('./models/RoomSchema');

const room1 = new Room({ id: 1, name: 'Sala 1' });
const room2 = new Room({ id: 2, name: 'Sala 2' });
const room3 = new Room({ id: 3, name: 'Sala 3' });
const room4 = new Room({ id: 4, name: 'Sala 4' });
room1.save().then(() => console.log('Sala 1 creada'));
room2.save().then(() => console.log('Sala 2 creada'));
room3.save().then(() => console.log('Sala 3 creada'));
room4.save().then(() => console.log('Sala 4 creada'));

// Creamos colección avatares
const avatar1 = new Avatar({ id: 1, image: '/images/1.png'});
const avatar2 = new Avatar({ id: 2, image: '/images/2.png' });
const avatar3 = new Avatar({ id: 3, image: '/images/3.png' });
const avatar4 = new Avatar({ id: 4, image: '/images/4.png' });
const avatar5 = new Avatar({ id: 5, image: '/images/5.png' });
const avatar6 = new Avatar({ id: 6, image: '/images/6.png' });
const avatar7 = new Avatar({ id: 7, image: '/images/7.png' });
const avatar8 = new Avatar({ id: 8, image: '/images/8.png' });
const avatar9 = new Avatar({ id: 9, image: '/images/9.png' });
const avatar10 = new Avatar({ id: 10,  image: '/images/10.png' });
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


