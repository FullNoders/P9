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
    // CSS
    //const css_cover = fs.readFileSync(`${__dirname}/public/css/cover.css`, 'utf-8');
    //const css_styles = fs.readFileSync(`${__dirname}/public/css/style.css`, 'utf-8');
    //const css = '<style>' + css_styles + '</style>' + '<style>' + css_cover + '</style>';
    //container
    const container = getTemplate(template);
    //footer
    const footer = getTemplate('footer');
    //Unimos todas las piezas html
    //let fullContent = header + css + container + footer;
    let fullContent = header + container + footer;
    //renderizamos el contenido completo
    res.end(fullContent);
}

function routerUrl(path, res){
    switch (path) {
        case '/':
            renderTemplate('home',res);
            break;
        case '/login':
            renderTemplate('login',res);
            break;
        case'/play':
            renderTemplate('play',res);
            break;
        case '/room':
            renderTemplate('room',res);
            break;
        case '/public/css/style.css':
            const styles = fs.readFile(`${__dirname}/public/css/style.css`,'utf8',(err,data)=>{
                if(err){
                    res.end('Error');
                }else{
                    res.writeHead(200,{'Content-Type':'text/css'});
                    res.write(data);
                    res.end();
                }
            });
            break;
        case '/public/css/cover.css':
            const cover = fs.readFile(`${__dirname}/public/css/cover.css`,'utf8',(err,data)=>{
                if(err){
                    res.end('Error');
                }else{
                    res.writeHead(200,{'Content-Type':'text/css'});
                    res.write(data);
                    res.end();
                }
            });
            break;
        default:
            res.writeHead(404);
            res.end('Pagina 404');
            break;
    }
}