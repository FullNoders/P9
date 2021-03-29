//'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');

var port = process.env.PORT || 1337;

const server = http.createServer((req, res) => {

    const path = req.url;
    console.log(`${__dirname}`);
    


    switch (path) {

        case '/':
            renderTemplate('home',res);
            break;
        case '/login':
            renderTemplate('login',res);
            break;
        case'/game':
            renderTemplate('game',res);
            break;
        case '/room':
            renderTemplate('room',res);
            break;
        default:
            res.writeHead(404);
            res.end('Pagina 404');
            break;
    }


}).listen(port);


function getTemplate(template) {
    
    let value= fs.readFileSync(`${__dirname}/template/` + template + `.html`, 'utf8');
    return value
}

function renderTemplate(template, res) {
    //header
    const header = getTemplate('header');
    
    //container
    const container = getTemplate(template);
    
    //footer
    const footer = getTemplate('footer');

    //Unimos todas las piezas html
    let fullContent = header + container + footer;

    //renderizamos el contenido completo
    res.end(fullContent);



}

