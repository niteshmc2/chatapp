'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Message = new Schema({
    conversationId:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
      },
    from: {
        type: String,
        required:true
    },
    timestamp:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Messages', Message);