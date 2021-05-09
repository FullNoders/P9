var db = require('./db');
var rooms = db.rooms;

exports.list = function(req, res){
  res.render('rooms', { title: 'Rooms', rooms: rooms });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  console.log(id);
  req.room = rooms[id-1];
  if (req.room) {
    next();
  } else {
    var err = new Error('cannot find room ' + id);
    err.status = 404;
    next(err);
  }
};

exports.view = function(req, res){
  res.render('rooms/view', {
    title: 'Viewing room ' + req.room.name,
    room: req.room
  });
};

exports.edit = function(req, res){
  res.render('rooms/edit', {
    title: 'Editing room ' + req.room.name,
    room: req.room
  });
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var room = req.body.room;
  req.room.name = room.name;
  req.room.email = room.email;
  res.redirect('back');
};
