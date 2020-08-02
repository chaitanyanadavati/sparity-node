"use strict";

const mongodb = require('./mongodb.connection');

module.exports.init = () => {
    return new Promise(async (resolve, reject) => {
        await mongodb.connect();
        resolve('success');
    })
}