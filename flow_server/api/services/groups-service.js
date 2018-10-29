/**
 * Service for group operations.
 */

'use strict';
const mongoose = require('mongoose'),
    Group = mongoose.model('Groups');

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

/**
 * Returns an array of group object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function (params, callback) {
    let resultCallback = function (err, groups) {
        throwError(err);
        callback(groups);
    };
    Group.find(params, resultCallback);
};

exports.check = function (params, callback) {
    let resultCallback = function (err, groups) {
        throwError(err);
        console.log('rESULT', groups);
        callback(groups);
    };
    console.log("members" + ":" + params.length);
    Group.find({$and: [{members: {$all: params.members}}, {members: {$size: params.members.length}}]}, resultCallback);
}

/**
 * Saves and returns the new group object.
 *
 * @param {Object} group {Group object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (group, callback) {
    let newGroup = new Group(group),
        resultCallback = function (err, group) {
            throwError(err);
            callback(group);
        };
    newGroup.save(resultCallback);
};


/**
 * Returns the group object matching the id.
 *
 * @param {string} groupId {Id of the group object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (groupId, callback) {
    let resultCallback = function (err, group) {
        throwError(err);
        callback(group);
    };
    Group.findById(groupId, resultCallback);
};

/**
 * Updates and returns the group object.
 *
 * @param {Object} group {Group object}
 * @param {function} callback {Success callback function}
 */
exports.update = function (group, callback) {
    let resultCallback = function (err, group) {
        throwError(err);
        callback(group);
    };
    Group.findOneAndUpdate({
        _id: group._id
    }, group, {
        new: true
    }, resultCallback);
};

/**
 * Deletes the group object matching the id.
 *
 * @param {string} groupId {Id of the group object}
 * @param {function} callback {Sucess callback function}
 */
exports.delete = function (groupId, callback) {
    let resultCallback = function (err, group) {
        throwError(err);
        callback();
    };
    Group.remove({
        _id: groupId
    }, resultCallback);
};