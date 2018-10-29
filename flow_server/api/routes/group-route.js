/**
 * Groups endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    const groupController = require('../controllers/groups-controllers');
   
    // Group Routes for search and create.
    app.route('/groups')
        .get(groupController.list)
        .post(groupController.post);

    // Group Routes for get, update and delete.
    app.route('/groups/:groupId')
        .get(groupController.get)
        .put(groupController.put)
        .delete(groupController.delete);

    app.route('/groups/check')
        .post(groupController.check);
};