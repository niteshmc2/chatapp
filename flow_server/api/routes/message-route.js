
'use strict';
module.exports = function (app) {
const msgController = require('../controllers/messages-controller');
// Sticky Routes for search and create.
app.route('/messages')
    .post(verify, msgController.post);

// Sticky Routes for get, update and delete.
app.route('/messages/:msgId')
    .delete(verify, msgController.delete);

app.route('/messages/search')
    .post(verify,msgController.search);

function verify(req, res, next){
    const bearerHead = req.headers['authorization'];
    if(bearerHead == undefined){
        res.status(403).send('Forbidden');
    }else{
        req.token = bearerHead;
        next();
    }
}
};