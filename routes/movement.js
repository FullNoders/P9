var express = require('express');
var router = express.Router();
const rooms = require('../models/Room.js');
const controller = require('../controllers/room.js');
/* GET rooms listing. */

router.get('/', function(req, res, next) {
    
        controller.update(req,res);
        /* // Normally you would handle all kinds of
        // validation and save back to the db
        var room = req.body.room;
        // recogemos parámetros de la request
        let row = req.body.row;
        let col = req.body.col;
        let playerId = req.body.playerId;
        // guardamos datos de movimiento
        rooms[playerId].matriz[row][col] = req.session.player.playerId;
        req.room.name = room.name;
        req.room.email = room.email;
        //res.redirect('back');
        return req.session.player.avatar; */

});

module.exports = router;