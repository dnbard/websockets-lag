var server = require('http').createServer(),
    path = require('path'),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: server }),
    express = require('express'),
    app = express(),
    port = process.env.PORT  || 8000;

app.use('/app.js', (req, res) => res.sendFile(path.join(__dirname, 'public/app.js')));
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(new Date()));

    var token = setInterval(() => {
        ws.send(JSON.stringify(new Date()));
    }, 100);

    ws.on('close', () => {
        clearInterval(token);
    });
});

server.on('request', app);

server.listen(port, () => console.log('Listening on ' + server.address().port));
