const WS = require('ws');
const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    let file = 'frontend/' + req.url.slice(1);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log('There was an error in the readfile');
        } else {
            res.end(data);
        }
    });
});

server.listen(3001);

let ws = new WS.Server({ 
    server: server
});

var generateId = function() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
}

ws.on('connection', client => {
    clientId = generateId();
    console.log('Hey there! Someone connnected');
    // client.send('What is your username?')
    client.on('message', message => {
        // messengerObject = {id: clientId, name: message};
        ws.clients.forEach((messenger) => {
            messenger.send(message);
        });
    });
});



