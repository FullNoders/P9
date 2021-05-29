// Room controller
const session = require('express-session');
var db = require('../db');

// Obtenemos schemas de mongoose para poder interactuar con la base de datos
const Room = require('../models/RoomSchema');
const {Avatar} = require('../models/AvatarSchema');
const {Player} = require('../models/PlayerSchema');

// llamada a ruta /rooms para cualquier tipo de petición
exports.list = function(req, res){
  // Obtenemos todas las salas ordenadas por id
  Room.find({}).sort('id').then(rooms=>{
    // Si la petición es post
    // Si tenemos username y avatar válidos 
    // Y si no tenemos guardada en sesión el player
    if(req.method == "POST" && req.body.name && req.body.avatar && !req.session.player){
      // User name: La respuesta con el username es guardada en esta variable
      let name = req.body.name;
      // User Avatar
      // Guardamos el avatar que nos llega de la request
      let avatarId = req.body.avatar;
      // El avatar seleccionado deja de estar disponible
      Avatar.findOneAndUpdate({ id: avatarId }, {available: false}, {new: true}).then(avatar => {
        // Creamos player
        // Generamos un id único con la fecha actual
        const player = new Player({ id: new Date().valueOf(), name: name, points: 0, percentageWin: 0, ready: false, avatar:avatar});
        // Hacemos persistencia en db del player
        player.save().then(() => {
          //En la sessión de la petición llamada player guardamos todo el (modelo) del player creado
          req.session.player = player;
          // Renderizamos vista de salas
          res.render('rooms', { 
            title: 'Salas', 
            rooms: rooms,
            player: req.session.player
          });
        });
      });  

    // Si la peticiòn no es post y no hay sesión de usuario
    }else if(!req.session.player){
      // Redirigimos a la portada
      res.redirect('/');
      //Si resulta que el player ya tenía una sala asignada... (pero salío)
    }else if(req.session.player.room){
      // Vaciamos sus datos de sala de sesión
      req.session.player.room = null;
      // quitar jugador de la partida que tenga en curso
      Room.find({'players.id': req.session.player.id}).then(tempRooms =>{
        if(tempRooms.length > 0){
          let tempPlayers = tempRooms[0].players;
          const playerIndex = tempPlayers.map(e => e.id).indexOf(req.session.player.id);
          tempPlayers.splice(playerIndex, 1);
          Room.findOneAndUpdate({ id: tempRooms[0].id }, {players: tempPlayers}, {new: true}).then(tempRoom => {
            // Obtenemos la sala de la db con los datos actualizados
            Room.find({}).sort('id').then(roomsUpdated=>{
              // Renderizamos vista
              res.render('rooms', { 
                title: 'Salas', 
                rooms: roomsUpdated,
                player: req.session.player
              });
            });
          });
        }else{
          // Si el jugador no está en ninaguna partida en curso
          // Renderizamos la selección de salas
          res.render('rooms', { 
            title: 'Salas', 
            rooms: rooms,
            player: req.session.player
          });
        }
      });
    }else{
        // Si el usuario no tenía ninguna sala asignada
        // Renderizamos vista selección de salas
        res.render('rooms', { 
        title: 'Salas', 
        rooms: rooms,
        player: req.session.player
      });
    }
  });
};

// Este método se ejecuta para cualquier tipo de request que pase por la ruta /rooms....
exports.load = function(req, res, next){
  // Obtenemos id de sala de los parámetros de la request
  var id = req.params.id;
  // Buscamos sala
  Room.find({id:id}).then(room => {
    // Devuelve un array
    // Guardamos en la request el primer elemento del array, la sala
    req.room = room[0];
    // Si contiene algo
    if (req.room) {
      // Continuamos
      next();
    } else {
      // Si el usuario logueado mete una room incorrecta por url dará error
      var err = new Error('No se ha encontrado la sala ' + id);
      err.status = 404;
      next(err);
    }
  })
};

// Método asociado a request de tipo GET a ruta /rooms/:id
exports.view = function(req, res){
  // Si no hay sesión de usuario player
  if(!req.session.player){
    // Es porque no ha iniciado sesión
    // Redirigimos a portada
    res.redirect('/');
  }
  // Si no tiene sala asignada
  if(!req.session.player.room){
    // Si la sala sala no está disponible
    if(!req.room.available){
      // La sala está llena
      // Redirigimos a la portada
      res.redirect('/');
    }
    // Asociamos la sala al player
    Player.findOneAndUpdate({ id: req.session.player.id }, {room: req.room.id}, {new: true}).then(player => {
      // Localizamos sala
      Room.find({id: req.room.id}).then(tempRooms =>{
        // Obtenemos jugadores de sala
        let tempPlayers = tempRooms[0].players;
        req.session.player = player;
        // Añadimos player al listado de players de la sala
        tempPlayers.push(player);
        // Actualizamos la sala con el nuevo listado de players
        Room.findOneAndUpdate({ id: tempRooms[0].id }, {players: tempPlayers}, {new: true}).then(tempRoom => {
          // players sala
          req.room.players = tempRoom.players;
          // Cuando un usuario se añade a la sala
          // Configuramos los comportamientos de socket
          // Al haber una nueva conexión
          io.on('connection', (socket) => {
            // Nuevo player en sala
            // Añadimos usuario al grupo de la sala
            socket.join(req.room.id);
            // Almacenamos algunas propiedades personalizadas en el socket
            socket.room = req.room.id;
            socket.name = req.session.player.name;
            socket.playerid = req.session.player.id;
            socket.avatarid = req.session.player.avatar.id;
            // En caso de que se desconecte
            socket.on("disconnect", (reason) => {
              // Avisamos a los jugadores de la sala de la desconexión del usuario
              // Así se gestionará la cancelación de la partida y los usuarios saldrán de la sala
              // Lo aplicamos a todos los métodos de desconexión (ej.: refrescar la página supone una desconexión)
              socket.to(socket.room).emit("user has left", socket.name);
              //Si el tablero está lleno: hay ganador
              //////
              // Si el jugador estaba en una sala lo quitamos de allí
              Room.find({'players.id': socket.playerid}).then(tempRooms =>{
                if(tempRooms.length > 0){
                  // Seteamos todos los valores de dicha sala a 0 para que vuelva a estar disponible para jugar
                  Room.findOneAndUpdate({ id: tempRooms[0].id }, {players: [], matriz: [[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]], activePlayer: 0, available:true, turn:0, winner:null}, {new: true}).then(tempRoom => {
                    // Desasociamos sala de player
                    Player.findOneAndUpdate({ id: socket.playerid }, {room: null}, {new: true}).then(player => {
                      Avatar.findOneAndUpdate({id: socket.avatarid}, {available:true}, {new: true}).then(avatar =>{});
                    });
                  });
                }
              });
            });
          });

            // Renderizamos vista de la sala
            res.render('rooms/view', {
              title: req.room.name,
              room: tempRoom
            });

            // En caso de que se alcancen los 3 usuarios en la sala
            if(tempRoom.players.length == 3){
              setTimeout(() => {
                // Bloqueamos la sala para que no esté disponible
                Room.findOneAndUpdate({ id: tempRoom.id }, {available: false}, {new: true}).then(tempRoom2 => {
                  // Avisamos de que comienza la partida a los jugadores de la sala
                  io.in(req.room.id).emit('start', { start: true});
                })
              }, 3000);
            }

        })
      })

    });
     
  //Si sesion de player sí está definida y la room-id de la request no es la room de la session de player
  }else if(req.session.player.room != req.room.id){
    res.redirect('/'); //redirección
  }else{
      // Si el usuario que pretende entrar en esta sala tiene sesiónd de una sala pero no pertenece realmente a esta sala
      Room.find({'players.id': req.session.player.id}).then(playerRooms =>{
        if(playerRooms.length == 0){
          // Vaciamos su sesión de sala
          req.session.player.room = null;
          // Redirigimos a la portada
          res.redirect('/');
        }else{
          // Si realmente pertenece a esta sala mostramos sala
          res.render('rooms/view', {
            title: req.room.name,
            room: req.room
          });
        }
      });
  }
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
  // req.room = rooms[id-1];
  // Obtenemos sala de base de datos
  Room.find({id: req.room.id}).then(rooms =>{
    room = rooms[0];

    // Obtenemos matriz y jugador activo
    let matriz = room.matriz;
    let activePlayer = room.activePlayer;
      // Almacenamos movimiento en la base de datos
    matriz[row][col] = req.session.player.avatar.id;
    Room.findOneAndUpdate({ id: req.room.id }, {matriz: matriz}, {new: true}).then(tempRoom => {
    });
      // Almacenamos un turno más
    let turnoActual = room.turn;
    turnoActual++;
    Room.findOneAndUpdate({ id: req.room.id }, {turn: turnoActual}, {new: true}).then(tempRoom => {
    });
    // Hay ganador?
    // Condición para ganar
    if(gameboardFull(req.room.matriz)){
      let winner = whoWin(req.room.matriz,req.room.players);
      Room.findOneAndUpdate({ id: req.room.id }, {winner: winner}, {new: true}).then(tempRoom0 => {
        //io.in(req.room.id).emit('winner',{ganador : playerwin.name});
      });
    }
    // Jugador activo
    if(req.room.activePlayer == 2){
      Room.findOneAndUpdate({ id: req.room.id }, {activePlayer: 0}, {new: true}).then(tempRoom => {
      });
    }else{
      activePlayer++;
      Room.findOneAndUpdate({ id: req.room.id }, {activePlayer: activePlayer}, {new: true}).then(tempRoom => {
      });
    }
    // destruir casillero
    if(req.room.turn%5 == 0){
      randomrow = Math.round(getRandomArbitrary(0,4));
      randomcol = Math.round(getRandomArbitrary(0,4));
      matriz[randomrow][randomcol] = 11;
      Room.findOneAndUpdate({ id: req.room.id }, {matriz: matriz}, {new: true}).then(tempRoom => {
      });
    }
    // devolvemos id usuario
    res.end(JSON.stringify({player:req.session.player}));
    io.in(req.room.id).emit('next');
  });
};

/* Función para obtener una celda aleatoria del tablero */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* Función para comprobar si el tablero está lleno */
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

/* Función para comprobar quien gana */
// Recibe como parámetros la matriz (tablero con las celdas ocupadas) y el listado de jugadores
function whoWin(matriz, players){
  let playerCells = {};
  for(i=0; i<matriz.length; i++){
    for(j=0; j<matriz[i].length; j++){
        playerAvatar = matriz[i][j];
        //si el jugador tiene avatar y ademas es diferente al juego
        if(playerAvatar && playerAvatar != 11){
          index = players.map(e => e.avatar.id).indexOf(playerAvatar);
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