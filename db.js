// database
var Room = require("./models/Room.js");

var rooms = exports.rooms = [];

rooms.push( new Room(1) );
rooms.push( new Room(2) );
rooms.push( new Room(3) );
rooms.push( new Room(4) );

rooms[1].available = false;
// rooms.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  });

