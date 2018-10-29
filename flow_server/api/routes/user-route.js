
'use strict';
module.exports = function (app) {
    const userController = require('../controllers/user-controller');
    // Sticky Routes for search and create.
    app.route('/users')
        .get(verify, userController.list)
        .post(userController.post);

    // Sticky Routes for get, update and delete.
    app.route('/users/:userId')
        .get(verify, userController.get)
        .put(verify, userController.put)
        .delete(verify, userController.delete);
    
    app.route('/login')
        .post(userController.login);

    app.route('/users/search')
        .post(verify, userController.search);

    function verify(req, res, next){
        //console.log("entering verify");
        //console.log(req.headers);
        const bearerHead = req.headers['authorization'];
        //console.log(bearerHead);
        if(bearerHead == undefined){
            res.status(403).send('Forbidden');
        }else{
            req.token = bearerHead;
            next();
        }
    }
};