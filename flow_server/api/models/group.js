'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Group = new Schema({
    name: {
        type: String
    },
    members: {
        type: Array
    }
})

module.exports = mongoose.model('Groups', Group);