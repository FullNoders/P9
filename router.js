import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {getTemplate, renderTemplate}

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
    const css_cover = fs.readFileSync(`${__dirname}/public/css/cover.css`, 'utf-8');
    const css_styles = fs.readFileSync(`${__dirname}/public/css/style.css`, 'utf-8');
    const css = '<style>' + css_styles + '</style>' + '<style>' + css_cover + '</style>';
    //container
    const container = getTemplate(template);
    //footer
    const footer = getTemplate('footer');
    //Unimos todas las piezas html
    let fullContent = header + css + container + footer;
    //renderizamos el contenido completo
    res.end(fullContent);
}