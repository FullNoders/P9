var db = require('../db');
const Player = require('../models/Player');
var rooms = db.rooms;
var players = db.players;
var avatars = db.avatars;

exports.list = function(req, res){
  if(req.method == "POST"){
    // User name
    let name = req.body.name;
    // User Avatar
    let avatarId = req.body.avatar;
    let avatar = avatars.find(obj => {
      return obj.id == avatarId
    });
    avatar.available = false;
    // Player 
    player = new Player(req.session.secret,name,avatar);
    req.session.player = player;
    players.push(player);
  }else if(req.session.player){
    // quitar jugador de la partida que tenga en curso
    req.session.player.room = null;
    player = req.session.player;
  }else{
    res.redirect('/');
  }
  res.render('rooms', { 
    title: 'Salas', 
    rooms: rooms,
    player: player
  });
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
  if(!req.session.player){
    res.redirect('/');
  }
  if(!req.session.player.room){
    // Add player to room
    req.session.player.room = req.room.id;
    req.room.players.push(req.session.player);
  }
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
