/**
 * Controller for groups endpoints.
 */

'use strict';

const groupsService = require('../services/groups-service'),
    userService = require('../services/user-service');
/**
 * Returns a list of groups in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    let callback = function (groups) {
        response.status(200);
        response.json(groups);
    };
    groupsService.search({}, callback);
};

/**
 * Creates a new group with the request JSON and
 * returns group JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    let newgroup = Object.assign({}, request.body),
        callback = function (group) {
            let success = addNewGroupToUsers(group, request, response); // add group name to user
            if(success){
                response.status(200);
                response.json(group);
            }else{
                response.status(400);
                response.send("Failed");
            }
        }; 
        groupsService.save(newgroup, callback)
};

function addNewGroupToUsers(group,request, response) {
    try{
        let groupMembers = group.members;
        for (let i = 0; i < groupMembers.length; i++) {
            userService.get(groupMembers[i], function (user) {
                user.groups.push(group._id);
                userService.update(user, function (result) {
                    console.log(result);
                }, function (errMsg) {
                   return false;
                });
            }, function (errMsg) {
                return false;
            });
        }
        return true;
    }
   catch(e){
       response.status(400).json({"msg":'Bad request'});
       return false;
   }
}

/**
 * Returns a group object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    let callback = function (group) {
        response.status(200);
        response.json(group);
    };
    groupsService.get(request.params.groupId, callback);
};

/**
 * Updates and returns a group object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    let group = Object.assign({}, request.body),
        callback = function (group) {
            response.status(200);
            response.json(group);
        };
    group._id = request.params.groupId;
    groupsService.update(group, callback);
};

/**
 * Deletes a group object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    
    deleteGroupFromUsers(request.params.groupId,request, response);
    
    
};

function deleteGroupFromUsers(groupId,request, response) {
    let resultcallback = function (group) {
        response.status(200);
        response.json({
            message: 'group Successfully deleted'
        });
    };
    let callback = function (group) {
        let groupMembers = group.members;
        for (let i = 0; i < groupMembers.length; i++) {
            userService.get(groupMembers[i], function (user) {
                user.groups.slice({ name: group.name }, 1);
                userService.update(user, function (result) {
                    console.log(result);
                }, function (errMsg) {
                    response.status(400).send(errMsg);
                });
            }, function (errMsg) {
                response.status(400).send(errMsg);
            });
        }
        groupsService.delete(groupId, resultcallback);
    };
    groupsService.get(groupId, callback);

}

exports.check = function (request, response) {
    let callback = function (group) {
        response.status(200);
        response.json(group);
    };
    console.log("request  : " + request.body.members);
    groupsService.check(request.body, callback);
};
