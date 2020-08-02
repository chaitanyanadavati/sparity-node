"use strict";

const express = require('express');
const app = express();
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');

const connections = require('./src/connections');
const routes = require('./src/routes');

// Helmet helps you secure Express apps by setting various HTTP headers.
app.use(helmet());

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
// app.use(cors()); // Access-Control-Allow-Origin => Open Cors

app.use((req, res, next) => {
    const begin = Date.now();
    res.setHeader('Access-Control-Allow-Origin', req.header('Origin') ? req.header('Origin') : '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

    res.on('finish', () => {
        const t = Date.now() - begin;
        console.log(req.method, res.statusCode, res.statusMessage, req.originalUrl, t + 'ms');
    });

    if (req.method === 'OPTIONS') res.send(200); else next();
});

// Initiating database/mail Connections
connections.init();

// Initiating Routes
app.use('', routes.init());

// Creating Http Server with Express
const server = http.createServer(app);

const PORT = 9632;
// Create a server that listens on port {{PORT}} of HOST
server.listen(PORT, () => {
    console.log(`Server is listening on ${server.address().address !== '::' ? 'http://' + server.address().address : 'http://localhost'}:${server.address().port}/`);
});
