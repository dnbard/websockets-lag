'use strict';

const protocol = location.href.indexOf('https://') !== -1 ? 'wss' : 'ws';

const ws = new WebSocket(`${protocol}://${location.host}`);

const counterElement = document.querySelector('#counter');
const averageElement = document.querySelector('#average');
const connectElement = document.querySelector('#connect');

ws.onopen = () => {
    connectElement.textContent = 'Connected.'
}

ws.onclose = () => {
    connectElement.textContent = 'Disconnected.'
}

const latencyData = [];

ws.onmessage = message => {
    var data = JSON.parse(message.data);

    if (data.type === 'first'){
        ws.send(data.id);
    } else {
        latencyData.push(data.latency);

        counterElement.textContent = `${data.latency}ms`;
        averageElement.textContent = `${(latencyData.reduce((a, b) => { return a + b; }) / latencyData.length).toFixed()}ms`;
    }
}
