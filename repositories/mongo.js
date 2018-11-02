'use strict';

/**
 * @author Adam Patterson <awpatterson217@gmail.com>
 */

const { log } = console;

/**
 * Represents a MongoDB collection.
 * @constructor
 */
function MongoDBCollection(collection) {
    this.collection = collection;

    /**
     * Returns a single object by id.
     * 
     * @function
     * @param {Object} filter
     * @returns {Object}
     */
    this.get = function(filter) {
        log('Mongo.get() called, id: ', filter);
    }
    /**
     * Returns a list of objects.
     * 
     * @function
     * @returns {Object[]}
     */
    this.getAll = function() {
        log('Mongo.getAll() called');
    }
    /**
     * Inserts a single object.
     * 
     * @function
     * @param {Object} data
     * @returns {Promise} 
     */
    this.insert = function(data) {
        log('Mongo.insert() called');
    }
}

module.exports = MongoDBCollection;