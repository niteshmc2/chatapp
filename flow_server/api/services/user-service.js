/**
 * Service for sticky operations.
 */

'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('Users');

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (err, callback, msg) {
    console.log(err);
    callback(msg);
};

/**
 * Returns an array of sticky object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function (params, callback, errCallback) {
    User.find(params, function (err, users) {
        console.log(params)
        if(err){
            throwError(err, errCallback, "Error searching user");
            return;
        }
        callback(users);
    });
};

/**
 * Saves and returns the new sticky object.
 *
 * @param {Object} sticky {Sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (user, callback, errCallback) {
    let newUser = new User(user);
    newUser.save(function (err, user) {
        if(err){
            throwError(err, errCallback, "Error saving user");
            return;
        } 
        callback(user);
    });
};

/**
 * Returns the sticky object matching the id.
 *
 * @param {string} userId {Id of the sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (username, callback, errCallback) {
    console.log('query is '+ username);
    User.findOne({email:username}, function (err, user) {
        if(err){ throwError(err, errCallback, "Error getting user");return}
        console.log('query result for '+username+' is ' +user);
        callback(user);
    });
};

/**
 * Updates and returns the sticky object.
 *
 * @param {Object} user {Sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function (user, callback, errCallback) {
    //user.modified_date = new Date();
    User.findOneAndUpdate({
        _id: user._id
    }, user, {
        new: true
    }, function (err, user) {
        if(err){
            throwError(err, errCallback, "Error updating user. Check logs");
            return;
        }
        callback(user);
    });
};

/**
 * Deletes the sticky object matching the id.
 *
 * @param {string} stickyId {Id of the sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.delete = function (userId, callback) {
    User.remove({
        _id: userId
    }, function (err, task) {
        if(err) {throwError(err, errCallback, "Error deleting user. Check logs");return}
        callback();
    });
};