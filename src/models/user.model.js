"use strict";
const mongoose = require('mongoose');


const schema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        maxlength: 50,
        minlength: 2,
        index: true
    },
    lastName: {
        type: String,
        require: true,
        maxlength: 50,
        minlength: 2,
        index: true
    },
    employeeName: {
        type: String,
        require: true,
        maxlength: 50,
        minlength: 2,
        index: true
    },
    age: {
        type: Number,
        require: true,
    },
    doj: {
        type: Date,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    },
    __v: {
        type: Number,
        select: false
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Users', schema, 'Users');