// database
var Room = require("./models/Room.js");
var Avatar = require("./models/Avatar.js");

var rooms = exports.rooms = [];
var avatars = exports.avatars = [];
var players = exports.players = [];

rooms.push( new Room(1) );
rooms.push( new Room(2) );
rooms.push( new Room(3) );
rooms.push( new Room(4) );

avatars.push( new Avatar(1,'/images/1.png'));
avatars.push( new Avatar(2,'/images/2.png'));
avatars.push( new Avatar(3,'/images/3.png'));
avatars.push( new Avatar(4,'/images/4.png'));
avatars.push( new Avatar(5,'/images/5.png'));
avatars.push( new Avatar(6,'/images/6.png'));
avatars.push( new Avatar(7,'/images/7.png'));
avatars.push( new Avatar(8,'/images/8.png'));
avatars.push( new Avatar(9,'/images/9.png'));
avatars.push( new Avatar(10,'/images/10.png'));

// rooms.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  });

