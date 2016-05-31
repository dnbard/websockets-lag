'use strict';

const protocol = location.href.indexOf('https://') !== -1 ? 'wss' : 'ws';

const ws = new WebSocket(`${protocol}://${location.host}`);
const counterElement = document.querySelector('#counter');

ws.onmessage = message => {
    let date = new Date(JSON.parse(message.data));
    counterElement.textContent = `${new Date() - date}ms`;
}
