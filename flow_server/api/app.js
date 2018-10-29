'use strict';
module.exports = function (app) {
    //Initialize models
    let userModel = require('./models/user');
    let groupModel = require('./models/group');
    let msgModel = require('./models/message');
    //Initialize routes

    let userRoutes = require('./routes/user-route');
    userRoutes(app);
    let groupRoutes = require('./routes/group-route');
    groupRoutes(app); 
    let msgRoutes = require('./routes/message-route');
    msgRoutes(app);
};