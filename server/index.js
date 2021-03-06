const express = require('express');
const { port } = require('../utils/horizonUtils');
const app = express();

app.get('/', (req, res) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(`Ping recebido as ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
    res.sendStatus(200);
});

app.listen(port);