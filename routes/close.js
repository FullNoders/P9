var express = require('express');
var router = express.Router();

const {Avatar} = require('../models/AvatarSchema');
const Room = require('../models/RoomSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player){
    // El avatar del jugador que cierra sesión vuelve a estar disponible
    Avatar.findOneAndUpdate({ id: req.session.player.avatar.id }, {available: true}, {returnOriginal: false}).then(avatar => {
    // Si el jugador estaba en una sala lo quitamos de allí  User.find({'tags.text': {$in: tagTexts}}
      Room.findOneAndDelete({ 'players.id': req.session.player.id }, {}).then(player => {
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
