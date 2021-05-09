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

avatars.push( new Avatar(1,'/images/1.png','Miguel Ángel', 'orange'));
avatars.push( new Avatar(2,'/images/2.png','Leonardo', 'blue'));
avatars.push( new Avatar(3,'/images/3.png','Donatello', 'violet'));
avatars.push( new Avatar(4,'/images/4.png','Rafael', 'red'));

rooms[1].available = false;
// rooms.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  });

