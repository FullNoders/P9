var express = require('express');
var router = express.Router();

const {Avatar} = require('../models/AvatarSchema');
const Room = require('../models/RoomSchema');
const {Player} = require('../models/PlayerSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player){
    // El avatar del jugador que cierra sesión vuelve a estar disponible
    Avatar.findOneAndUpdate({ id: req.session.player.avatar.id }, {available: true}, {new: true}).then(avatar => {
      // Si el jugador estaba en una sala lo quitamos de allí  User.find({'tags.text': {$in: tagTexts}}
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
        // destroy the user's session to log them out
        // will be re-created next request
        req.session.destroy(function(){
          res.redirect('/');
        });
      });

    });
  }else{
    res.redirect('/');
  }
});

module.exports = router;
