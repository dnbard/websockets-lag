'use strict';

const protocol = location.href.indexOf('https://') !== -1 ? 'wss' : 'ws';

const ws = new WebSocket(`${protocol}://${location.host}`);
const counterElement = document.querySelector('#counter');

ws.onmessage = message => {
    var data = JSON.parse(message.data);

    if (data.type === 'first'){
        ws.send(data.id);
    } else {
        counterElement.textContent = `${data.latency}ms`;
    }
}
