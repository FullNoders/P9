/* import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

//import express from 'express';


//export {routerUrl}

const pug = require('pug');



//export {getTemplate, renderTemplate, routerUrl}

function getTemplate(template) {
    let value= fs.readFileSync(`${__dirname}/views/` + template + `.html`, 'utf8');
    return value
}

function renderTemplate() {
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html');
    //header
    const header = pug.compiledFile('header.pug');
    // container
    const container = pug.compiledFile('home.pug');
    //footer
    const footer = pug.compiledFile('footer.pug');
    //Unimos todas las piezas html
    let fullContent = header + container + footer;
    //renderizamos el contenido completo
    //res.end(fullContent);
    return fullContent;
}

function routerUrl(app){

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