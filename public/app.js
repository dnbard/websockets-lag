'use strict';

const ws = new WebSocket(`ws://${location.host}`);
const counterElement = document.querySelector('#counter');

ws.onmessage = message => {
    let date = new Date(JSON.parse(message.data));
    counterElement.textContent = `${new Date() - date}ms`;
}
