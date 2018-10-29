'use strict';
const msgService = require('../services/message-service'),
      jwt = require('jsonwebtoken');


exports.post = function (request, response) {
    jwt.verify(request.token, 'icarus' , (err, data)=>{
        if(err) {
          console.log('unauthorized');
          response.status(403).send('Authorization failed')
        }
        else{
            console.log("authorized");
            let newMsg = Object.assign({}, request.body);
            msgService.save(newMsg, function (msg) {
                response.json(msg);
                response.status(200);
            },function(errMsg){
                response.status(400).send(errMsg);
            });
        }
    });
};


exports.search = function(req, res){
    jwt.verify(req.token, 'icarus' , (err, data)=>{
        if(err) {
          console.log('unauthorized');
          res.status(403).send('Authorization failed')}
        else{
          console.log("authorized" + req.body.conversationId);
            msgService.search({conversationId:req.body.conversationId}, function (messages) {            
                res.status(200).json(messages);
          },function(errMsg){
            res.status(400).send(errMsg);
        });
        }
    }); 
}

exports.delete = function (request, response) {
    jwt.verify(request.token, 'icarus' , (err, data)=>{
        if(err) {
          console.log('unauthorized');
          response.status(403).send('Authorization failed')}
        else{
            msgService.delete(request.params.msgId, function (msg) {
                response.json({
                    message: 'user Successfully deleted'
                });
            }, function(errMsg){
                response.status(400).send(errMsg);
            });
        }
    }); 
    
};

