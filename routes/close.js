var express = require('express');
var router = express.Router();

const {Avatar} = require('../models/AvatarSchema');
const Room = require('../models/RoomSchema');
const {Player} = require('../models/PlayerSchema');

/* GET para cerrar sesión */
router.get('/', function(req, res, next) {
  // Si el usuario tiene sesión player
  if(req.session.player){
    // El avatar del jugador que cierra sesión vuelve a estar disponible
    Avatar.findOneAndUpdate({ id: req.session.player.avatar.id }, {available: true}, {new: true}).then(avatar => {
      // Si el jugador estaba en una sala lo quitamos de allí
      Room.find({'players.id': req.session.player.id}).then(tempRooms =>{
        if(tempRooms.length > 0){
          let tempPlayers = tempRooms[0].players;
          const playerIndex = tempPlayers.map(e => e.id).indexOf(req.session.player.id);
          tempPlayers.splice(playerIndex, 1);
          Room.findOneAndUpdate({ id: tempRooms[0].id }, {players: tempPlayers}, {new: true}).then(tempRoom => {
          });
        }
        // Quitamos jugador de jugadores collection
        Player.findOneAndDelete({ 'id': req.session.player.id }, {}).then(player => {
        });
        // Destruimos la sesión del usuario
        req.session.destroy(function(){
          res.redirect('/');
        });
      });
    });
  }else{
    // Si el usuario no tiene sesión player
    // Redirigimos
    res.redirect('/');
  }
});

module.exports = router;
