"use strict";
const router = require('express').Router();
const http_status = require('../utils/http-status-codes');

const index = (req, res) => {
    return res.send({
        "message": "Welcome to sparity API Server",
    });
};

const notFound = (req, res) => {
    return res.status(http_status.NOT_FOUND).send({
        'status': 'not_found',
        'message': `4😟4, The requested URL '${req.originalUrl}' with '${req.method}' method was not found on this server.`
    });
};

router.get('/', index);

router.use('', require('./employee.route'));

router.use('**', notFound);

module.exports.init = () => router;