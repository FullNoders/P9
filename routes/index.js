var express = require('express');
var router = express.Router();

var db = require('../db');
var avatars = db.avatars;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player){
    res.redirect('/rooms');
  }
  res.render('index', { 
    title: 'Juego por turnos multijugador',
    avatars: avatars
   });
});

module.exports = router;
