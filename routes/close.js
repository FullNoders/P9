var express = require('express');
var router = express.Router();

var db = require('../db');
var avatars = db.avatars;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player){
    avatars[req.session.player.avatar.id-1].available = true;
    const index = req.rooms[req.session.player.room-1].players.map(e => e.id).indexOf(req.session.player.id);
    req.rooms[req.session.player.room-1].players.splice(index, 1);
    req.session = null;
  }
  res.redirect('/');
});

module.exports = router;
