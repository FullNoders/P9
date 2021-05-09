var db = require('../db');
var rooms = db.rooms;

exports.list = function(req, res){
  res.render('rooms', { title: 'Salas', rooms: rooms });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  console.log(id);
  req.room = rooms[id-1];
  if (req.room) {
    next();
  } else {
    var err = new Error('No se ha encontrado la sala ' + id);
    err.status = 404;
    next(err);
  }
};

exports.view = function(req, res){
  res.render('rooms/view', {
    title: req.room.name,
    room: req.room
  });
};

exports.edit = function(req, res){
  res.render('rooms/edit', {
    title: 'Editar sala ' + req.room.name,
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
