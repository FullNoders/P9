import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {getTemplate, renderTemplate, routerUrl}

function getTemplate(template) {
    let value= fs.readFileSync(`${__dirname}/views/` + template + `.html`, 'utf8');
    return value
}

function renderTemplate(template, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //header
    const header = getTemplate('header');
    // container
    const container = getTemplate(template);
    //footer
    const footer = getTemplate('footer');
    //Unimos todas las piezas html
    let fullContent = header + container + footer;
    //renderizamos el contenido completo
    res.end(fullContent);
}

function routerUrl(path, res){
    switch (path) {
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
    }
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