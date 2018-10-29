'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groups: {
        type: Array
    }
});

module.exports = mongoose.model('Users', userSchema);