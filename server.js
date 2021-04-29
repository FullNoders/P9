/* import { routerUrl } from './router.js';
import http from 'http';
import url from 'url'; */
//import { routerUrl } from './router.js';
//import express from 'express';
//const express = require('express');

const express = require('express');
const router = require ('./router.js');

const app = express();
const port = 1338;

const pug = require('pug');

router.routerUrl(app);






//const hostname = '127.0.0.1';

// const server = http.createServer((req, res) => {
//     const path = req.url;

//     
    
// });

app.listen(port, () => {
  console.log(`Express running at http://localhost:${port}/`);
});

