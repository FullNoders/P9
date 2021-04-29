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

//router.routerUrl(app);

function renderTemplate() {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/html');
  //header
  const header = pug.compileFile('views/header.pug');
  // container
  const container = pug.compileFile('views/home.pug');
  //footer
  const footer = pug.compileFile('views/footer.pug');
  //Unimos todas las piezas html
  let fullContent = header + container + footer;
  //renderizamos el contenido completo
  //res.end(fullContent);
  return fullContent;
}

app.get('/',(req,res)=>{
  //res.type('text/html');
  //Funcion para renderizar plantillas desde vista
  //res.send(renderTemplate());
  //const content = renderTemplate();
  const content=pug.compileFile('views/home.pug');
  const header=pug.compileFile('views/header.pug');
  const footer=pug.compileFile('views/footer.pug');
  const total = header({}) + content({}) + footer({});
  res.send(total);
  //pug.renderFile('views/home.pug', {});
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

//     
    
// });

app.listen(port, () => {
  console.log(`Express running at http://localhost:${port}/`);
});

