var server = require('http').createServer(),
    path = require('path'),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    uuid = require('node-uuid').v4,
    app = express(),
    port = process.env.PORT  || 8000;

app.use('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'public/app.js')));
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

var data = {};

function sendFirstMessage(ws){
    const id = uuid();

    ws.send(JSON.stringify({
        type: 'first',
        id: id
    }));

    data[id] = new Date();
}

function sendSecondMessage(ws, id){
    const latency = new Date() - data[id];

    ws.send(JSON.stringify({
        type: 'second',
        id: id,
        latency: latency
    }));

    data[id] = undefined;
}

wss.on('connection', (ws) => {
    sendFirstMessage(ws);

    ws.on('message', (message) => {
        sendSecondMessage(ws, message);
    });

    var token = setInterval(() => {
        try{
            sendFirstMessage(ws);
        } catch(e){
            clearInterval(token);
            token = null;
        }
    }, 100);

    ws.on('close', () => {
        if (token){
            clearInterval(token);
        }
    });
});

server.on('request', app);

server.listen(port, () => console.log('Listening on ' + server.address().port));
