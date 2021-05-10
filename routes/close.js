var express = require('express');
var router = express.Router();

var db = require('../db');
var avatars = db.avatars;
var rooms = db.rooms;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player){
    avatars[req.session.player.avatar.id-1].available = true;
    if(req.session.player.room){
        const index = rooms[req.session.player.room-1].players.map(e => e.id).indexOf(req.session.player.id);
        rooms[req.session.player.room-1].players.splice(index, 1);
    }
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
        res.redirect('/');
    });
  }else{
    res.redirect('/');
  }

});

module.exports = router;
