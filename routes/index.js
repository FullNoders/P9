var express = require('express');
var router = express.Router();

var {Avatar} = require('../models/AvatarSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.player && req.session.player != null){
    res.redirect('/rooms');
  }

  Avatar.find({}).sort('id').then(avatars => {
    res.render('index', { 
      title: 'Juego por turnos multijugador',
      avatars: avatars
     });
  });
   
});

module.exports = router;
