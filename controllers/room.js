var db = require('../db');
const Player = require('../models/Player');
var rooms = db.rooms;
var players = db.players;
var avatars = db.avatars;


exports.list = function(req, res){
  console.log("session");
  console.log(req.session);
  if(req.method == "POST" && req.body.name && req.body.avatar && !req.session.player){
    console.log("a1");
    // User name
    let name = req.body.name;
    // User Avatar
    let avatarId = req.body.avatar;
    let avatar = avatars.find(obj => {
      return obj.id == avatarId
    });
    avatar.available = false;
    // Player 
    player = new Player(new Date().valueOf(),name,avatar);
    req.session.player = player;
    players.push(player);
  }else if(!req.session.player){
    console.log("a2");
    res.redirect('/');
  }else if(req.session.player.room){
    console.log("a3");
    // quitar jugador de la partida que tenga en curso
    const index = rooms[req.session.player.room-1].players.map(e => e.id).indexOf(req.session.player.id);
    rooms[req.session.player.room-1].players.splice(index, 1);
    req.session.player.room = null;
  }
  res.render('rooms', { 
    title: 'Salas', 
    rooms: rooms,
    player: req.session.player
  });
};

exports.load = function(req, res, next){
  var id = req.params.id;
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
    if(!req.room.available){
      res.redirect('/');
    }
    // Add player to room
    req.session.player.room = req.room.id;
    req.room.players.push(req.session.player);
    if(req.room.players.length == 3){
      req.room.available = false;
    }
  }else if(req.session.player.room != req.room.id){
    res.redirect('/');
  }

// Test observable
/* const Rx = require('rxjs');
const RxOp = require('rxjs/operators');

const interval$ = Rx.interval(1000);
const items$ = Rx.from(req.room.players);

const itemsOverTime$ = Rx.zip(interval$, items$).pipe(RxOp.repeat());

itemsOverTime$.subscribe(([time, val]) => {
  console.log(val);
}); */
// Fin test observable
  console.log(req.session.player);
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
  // recogemos parámetros de la request
  // let row = req.body.row
  // let col = req.body.col
  // let playerId = req.body.playerId
  // guardamos datos de movimiento
  //room.matriz[row][col] = playerId
  req.room.name = room.name;
  req.room.email = room.email;
  res.redirect('back');
};
