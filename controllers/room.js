//import 'data base'
const session = require('express-session');
var db = require('../db');

// variables donde rescatamos los valores de la 'base de datos'
const Room = require('../models/RoomSchema');
const {Avatar} = require('../models/AvatarSchema');
const {Player} = require('../models/PlayerSchema');

//llamada desde routes/room. Para la raiz (/) desde cualquier petición http (all) 
exports.list = function(req, res){
  // Obtenemos todas las salas
  Room.find({}).sort('id').then(rooms=>{
    console.log(rooms);
    //Si la petición es post Y si tenemos username y avatar váidos Y si no tenemos guardada en sesión el player
    if(req.method == "POST" && req.body.name && req.body.avatar && !req.session.player){
      // User name: La respuesta con el username es guardada en esta variable
      let name = req.body.name;
      // User Avatar
      //Guardamos el avatar que nos llega de la request
      let avatarId = req.body.avatar;
      Avatar.findOneAndUpdate({ id: avatarId }, {available: false}, {returnOriginal: false}).then(avatar => {
        // Player: lo construimos. Metemos la fecha como identificador unívoco
        const player = new Player({ id: new Date().valueOf(), name: name, points: 0, percentageWin: 0, ready: false, avatar:avatar});
        player.save().then(() => {
          //En la sessión de la petición llamada player guardamos todo el (modelo) del player creado
          req.session.player = player;
          //renderizamos con sintaxis pug (variables)
          res.render('rooms', { 
            title: 'Salas', 
            rooms: rooms,
            player: req.session.player
          });
        });
      });  

    //Si resulta que no tenemos sesion de player enviamos al usuario al home (para evitar fallos)  
    }else if(!req.session.player){
      res.redirect('/');
      //Si resulta que el player ya tenía una sala asignada... (pero salío)
    }else if(req.session.player.room){
      // quitar jugador de la partida que tenga en curso
      Room.findOneAndDelete({ 'players.id': req.session.player.id }, {}).then(player => {
      //La room asignada al player se borra
      req.session.player.room = null;
      //renderizamos con sintaxis pug (variables)
      res.render('rooms', { 
        title: 'Salas', 
        rooms: rooms,
        player: req.session.player
      });
      });
    }
  });
};

//llamada desde routes/rooms para cualquier petición http ¿donde exista un parametro get?
exports.load = function(req, res, next){
  var id = req.params.id;
  Room.find({id:id}).then(room => {
    console.log(room);
    req.room = room[0];
    if (req.room) {
      next();
    } else {
      //Si el usuario logueado mete una room incorrecta por url dará error
      var err = new Error('No se ha encontrado la sala ' + id);
      err.status = 404;
      next(err);
    }
  })

};

//Para home (/) y para view. Desde routes/room. Consigue enviar al usuario al home (o al room. Ver if en routes/index)
exports.view = function(req, res){
  console.log("req.session.player ");
  console.log(req.session.player);
  console.log("req.room");
  console.log(req.room);
  if(!req.session.player){
    //Si no tenemos session de player enviamos al usuario al home (7/)
    res.redirect('/');
  }
  if(!req.session.player.room){
    //si el player no tiene room asignada...
    if(!req.room.available){
      //si la room no está disponible, redirección al home
      res.redirect('/');
    }
    //Como el player no tiene dirección asignada...
    // Add player to room
      //id de room se guarda en sesion
    //req.session.player.room = req.room.id;
    Player.findOneAndUpdate({ id: req.session.player.id }, {room: req.room.id}, {returnOriginal: false}).then(player => {

    console.log("guardamos sala a jugador ");
    console.log(req.session.player);
    //añadimos la sesión de player al array players de la request
    Room.find({id: req.room.id}).then(tempRooms =>{
      let tempPlayers = tempRooms[0].players;
      tempPlayers.push(req.session.player);
      Room.findOneAndUpdate({ id: tempRooms[0].id }, {players: tempPlayers}, {returnOriginal: false}).then(tempRoom => {
        
        //req.room.players.push(req.session.player);
        console.log("guardamos jugador en sala jugadores");
        console.log(req.room);
        // Añadimos usuario a la sala
        io.on('connection', (socket) => {
          // Usuario conectado
          console.log('a user connected');
          // añadimos usuario al grupo de la sala
          socket.join(req.room.id);
          // Usuario desconectado
          /*  socket.on('disconnect', () => {
            console.log('user disconnected');
            // sending to all clients in 'game' room(channel) except sender
            socket.broadcast.to(req.room.id).emit('desertor');
          }); */
        });

        if(tempRoom.players.length == 3){
          //Si la cantidad de player es igual a tres, la sala se bloquea (mediante pug)
          Room.findOneAndUpdate({ id: tempRoom.id }, {available: false}, {returnOriginal: false}).then(tempRoom2 => {
            //req.room.available = false;
            // Avisamos de que comienza la partida
            io.in(req.room.id).emit('start', { start: true}); // This will emit the event to all connected sockets
          })
        }

          //renderizamos view, recordemos que este funcion está siendo llamada desde el enrutamiento
          res.render('rooms/view', {
            title: req.room.name,
            room: tempRoom
          });

      })
    })

  })
     
  //Si sesion de player sí está definida y la room-id de la request no es la room de la session de player
  }else if(req.session.player.room != req.room.id){
    res.redirect('/'); //redirección
  }

};

//funcion comentada en routes/room
exports.edit = function(req, res){
  res.render('rooms/edit', {
    title: 'Editar sala ' + req.room.name,
    room: req.room
  });
};

//funcion llamada desde routes/rooms
exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  // recogemos parámetros de la request
  let row = req.body.row;
  let col = req.body.col;  
  // guardamos datos de movimiento
  req.session.player.position = row+"-"+col;
  var id = req.params.id;
  req.room = rooms[id-1];
  req.room.matriz[row][col] = req.session.player.avatar.id;
  req.room.turn++;

  // Hay ganador?
  // Condición para ganar
  if(gameboardFull(req.room.matriz)){
    req.room.winner = whoWin(req.room.matriz,req.room.players);
  }
  // req.room.winner = req.room.activePlayer;
  if(req.room.activePlayer == 2){
    req.room.activePlayer = 0;
  }else{
    req.room.activePlayer++;
  }
  // destruir casillero
  if(req.room.turn%5 == 0){
    randomrow = Math.round(getRandomArbitrary(0,4));
    randomcol = Math.round(getRandomArbitrary(0,4));
    req.room.matriz[randomrow][randomcol] = 11;
  }
  // devolvemos id usuario
  res.end(JSON.stringify({room:req.room,player:req.session.player}));
  io.in(req.room.id).emit('next');
  // res.redirect('back');
};


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function gameboardFull(matriz){
  for(i=0; i<matriz.length; i++){
    for(j=0; j<matriz[i].length; j++){
      if(!matriz[i][j]){
        return false;
      }
    }
  }
  return true;
}

function whoWin(matriz, players){
  console.log(players);
  let playerCells = {};
  for(i=0; i<matriz.length; i++){
    for(j=0; j<matriz[i].length; j++){
        playerAvatar = matriz[i][j];
        if(playerAvatar && playerAvatar != 11){
          console.log(playerAvatar);
          index = players.map(e => e.avatar.id).indexOf(playerAvatar);
          console.log(index);
          playerId = players[index].id;
          if(!playerCells[playerId]){
            playerCells[playerId] = 0;
          }
          playerCells[playerId]++; 
      }
    }
  }
  winnerPlayerId = Object.keys(playerCells).reduce((a, b) => playerCells[a] > playerCells[b] ? a : b);
  return winnerPlayerId;
}