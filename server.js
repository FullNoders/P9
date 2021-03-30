import { getTemplate, renderTemplate } from './router.js';
import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 1337;

const server = http.createServer((req, res) => {
    const path = req.url;

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
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

