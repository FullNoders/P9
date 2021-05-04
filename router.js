/* import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

//import express from 'express';


//export {routerUrl}
const express = require('express');
const pug = require('pug');
const socketIO = require('socket.io');

const header=pug.compileFile('views/header.pug');
const footer=pug.compileFile('views/footer.pug');


function routerUrl(app){

    app.get('/',(req,res)=>{
        const content=pug.compileFile('views/home.pug');
        const total = header({}) + content({}) + footer({});
        res.send(total);
    });
    app.get('/login',(req,res)=>{
        const content=pug.compileFile('views/login.pug');
        const total = header({}) + content({}) + footer({});
        res.send(total);
    });
    app.get('/play',(req,res)=>{
        const content=pug.compileFile('views/play.pug');
        const total = header({}) + content({}) + footer({});
        res.send(total);
    });
    app.get('/room',(req,res)=>{
        const content=pug.compileFile('views/room.pug');
        const total = header({}) + content({}) + footer({});
        res.send(total);
    });

    app.use(express.static(__dirname + '/public'));


    
      
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

      


      /*  switch (path) {
        // Portada
        case '/':
            renderTemplate('home',res);
            break;
        // Login
        case '/login':
            renderTemplate('login',res);
            break;
        // Play    
        case'/play':
            renderTemplate('play',res);
            break;
        // Sala    
        case '/room':
            renderTemplate('room',res);
            break;
        // CSS    
        case '/public/css/style.css':
            readFileServer(path,'text/css',res);
            break;
        case '/public/css/cover.css':
            readFileServer(path,'text/css',res);
            break;
        //  JS
        case '/public/js/playFunctions.js':
            readFileServer(path,'text/javascript',res);
            break;  
        case '/public/js/loginFunctions.js':
            readFileServer(path,'text/javascript',res);
            break;    
        case '/public/js/footerFunctions.js':
            readFileServer(path,'text/javascript',res);
            break;     
        default:
            res.writeHead(404);
            res.end('Pagina 404');
            break;
    } */
}

//justo debajo de la función a exportar
module.exports = {
    "routerUrl": routerUrl
}

// Función para cargar archivos del servidor
function readFileServer(filePath, contentType, res){
    const file = fs.readFile(`${__dirname}`+filePath,'utf8',(err,data)=>{
        if(err){
            res.end('Error');
        }else{
            res.writeHead(200,{'Content-Type':contentType});
            res.write(data);
            res.end();
        }
    });
}