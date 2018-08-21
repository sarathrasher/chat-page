const WS = require('ws');
const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    let file = 'frontend/' + req.url.slice(1);
    fs.readFile(file, 'utf8', (err, data) => {
         res.end(data);
    });
});

server.listen(3001);

let ws = new WS.Server({ 
    server: server
});

ws.on('connection', client => {
    client.on('message', message => {
        ws.clients.forEach((messenger) => {
            messenger.send(message);
        });
    });
});



