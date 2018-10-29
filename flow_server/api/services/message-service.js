
'use strict';
const mongoose = require('mongoose'),
    Message = mongoose.model('Messages');


let throwError = function (err, callback, msg) {
    console.log(err);
    callback(msg);
};


exports.search = function (params, callback, errCallback) {
    Message.find(params, function (err, messages) {
        if(err){
            throwError(err, errCallback, "Error finding message");
            return;
        }
        callback(messages);
    });
};


exports.save = function (msg, callback, errCallback) {
    let newMsg = new Message(msg);
    newMsg.save(function (err, msg) {
        if(err){
            throwError(err, errCallback, "Error saving message");
            return;
        }  
        callback(msg);
    });
};


exports.delete = function (msgId, callback, errCallback) {
    Message.remove({
        _id: msgId
    }, function (err, task) {
        if(err){ throwError(err, errCallback, "Error deleting message. Check logs"); return;}
        callback();
    });
};