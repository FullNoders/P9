// Requerimos schemas
const { Avatar } = require('./models/AvatarSchema');
const { Player } = require('./models/PlayerSchema');
const Room = require('./models/RoomSchema');

Avatar.find({}).then(avatares => {
    module.exports = {
        'avatars': avatares
    }
 });

var rooms = exports.rooms = [];

/* rooms.push( new Room({id: 1}) );
rooms.push( new Room({id: 2}) );
rooms.push( new Room({id: 3}) );
rooms.push( new Room({id: 4}) );

avatars.push( new Avatar({id: 1, image: '/images/1.png'}));
avatars.push( new Avatar({id: 2, image: '/images/2.png'}));
avatars.push( new Avatar({id: 3, image: '/images/3.png'}));
avatars.push( new Avatar({id: 4, image: '/images/4.png'}));
avatars.push( new Avatar({id: 5, image: '/images/5.png'}));
avatars.push( new Avatar({id: 6, image: '/images/6.png'}));
avatars.push( new Avatar({id: 7, image: '/images/7.png'}));
avatars.push( new Avatar({id: 8, image: '/images/8.png'}));
avatars.push( new Avatar({id: 9, image: '/images/9.png'}));
avatars.push( new Avatar({id: 10, image: '/images/10.png'})); */