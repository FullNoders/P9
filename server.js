/* import { routerUrl } from './router.js';
import http from 'http';
import url from 'url'; */
//import { routerUrl } from './router.js';
//import express from 'express';
//const express = require('express');
var conexiones = [];
const http = require('http');
const express = require('express');
const router = require ('./router.js');
const WebSocket = require('ws');

const app = express();
const port = 1338;

const pug = require('pug');

router.routerUrl(app);

server = app.listen(port, () => {
  console.log(`Express running at http://localhost:${port}/`);
});
//app.use(express.static('public'));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:1338",
  },
}); 


io.sockets.on('connection', (socket)=>{
  conexiones.push(socket);
  console.log("key");
  socket.on('key',(data)=>{
    console.log("Se ha conectado un usuario. Cantidad conexiones: "+conexiones.length);
  });
});



/*  io.on("key", (socket) => {
  //console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  conexiones.push(socket);
  console.log("key");
  socket.on('start',(data)=>{
    console.log("Se ha conectado un usuario. Cantidad conexiones: "+conexiones.length);
  }); 
});*/



/* io.on("open", (socket) => {
  console.log('UU user just connected.');
  socket.on('disconnect', () => {
      console.log('A user has DDdisconnected.');
  })
}); */
//const hostname = '127.0.0.1';

// const server = http.createServer((req, res) => {
//     const path = req.url;

//     
    
// });



