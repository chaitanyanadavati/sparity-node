"use strict";

const http_status = require('./../utils/http-status-codes');

const handler = (err, req, res, next) => {

    if (typeof (err) === 'string') {
        console.error('\x1b[33m%s\x1b[0m', err);
        return res.status(http_status.BAD_REQUEST).json({ message: err });
    }

    console.error('\x1b[36m%s\x1b[0m', err.stack);
    if (err.name === 'ValidationError' || err.name === 'CastError') { err.statusCode = http_status.BAD_REQUEST; }
    else { logger.error(err); }
    return res.status(err.statusCode || http_status.INTERNAL_SERVER_ERROR).json({
        message: err.statusCode ? err.message : 'something went wrong with server, please try later.',
        name: err.name,
        type: err.type
    });
};

module.exports = handler;