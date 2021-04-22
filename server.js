/* import { routerUrl } from './router.js';
import http from 'http';
import url from 'url'; */

import express from 'express';
//const express = require('express');
const app = express();
const port = 1338;


app.get('/',(req,res)=>{
  res.type('text/plain');
  res.send('Esto es la home');
});


//500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server error');
});


//404
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});





//const hostname = '127.0.0.1';

// const server = http.createServer((req, res) => {
//     const path = req.url;

//     //routerUrl(path,res);
    
// });

app.listen(port, () => {
  console.log(`Express running at http://localhost:${port}/`);
});

