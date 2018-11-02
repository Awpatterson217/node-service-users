'use strict';

/**
 * @author Adam Patterson <awpatterson217@gmail.com>
 */

const { log } = console;

/**
 * Represents a MongoDB collection called 'users'.
 * @constructor
 */
function Mongo() {
    /**
     * Returns a single user by id.
     * 
     * @function
     * @param {string} id
     * @returns {User}
     */
    this.get = function(id) {
        log('Mongo.get() called, id: ', id);
    }
    /**
     * Returns a list of users from MongoDB collection.
     * 
     * @function
     * @returns {User[]}
     */
    this.getAll = function() {
        log('Mongo.getAll() called');
    }
    /**
     * Inserts user into MongoDB collection.
     * 
     * @function
     * @param {User} user
     * @returns {Promise} 
     */
    this.insert = function(user) {
        log('Mongo.insert() called');
    }
}

module.exports = Mongo;