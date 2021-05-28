var express = require('express');
var router = express.Router();

var {Avatar} = require('../models/AvatarSchema');

/* GET portada. */
router.get('/', function(req, res, next) {
  // Si hay sesión de usuario
  if(req.session.player && req.session.player != null){
    // Es porque ya ha iniciado sesión
    // Por lo tanto redirigimos a selección de salas
    res.redirect('/rooms');
  }

  // Buscamos avatares y se lo pasamos a la vista
  Avatar.find({}).sort('id').then(avatars => {
    res.render('index', { 
      title: 'Juego por turnos multijugador',
      avatars: avatars
     });
  });
   
});

module.exports = router;
