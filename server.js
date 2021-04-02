import { routerUrl } from './router.js';
import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 1338;

const server = http.createServer((req, res) => {
    const path = req.url;

    routerUrl(path,res);
    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

