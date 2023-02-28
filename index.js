const http = require('http');
const checkRoute = require('./routing.js');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    checkRoute(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});