'use strict';

/**
 * @author Adam Patterson <awpatterson217@gmail.com>
 */

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';

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
     * @param {Object} filter An object with the desired key, value to be found
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.get = (filter, callback) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                callback(error);
            }

            const dbo = db.db('ApollidonDB');

            dbo.collection(this.collection).find(filter).toArray((error, result) => {
                if (error) {
                    callback(error);
                }

                callback(null, result);
              db.close();
            });
        });
    }
    /**
     * Returns a list of objects.
     * 
     * @function
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.getAll = (callback) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                callback(error);
            }

            const dbo = db.db('ApollidonDB');

            dbo.collection(this.collection).find({}).toArray((error, result) => {
                if (error) {
                    callback(error);
                }

                callback(null, result);

                db.close();
            });
        });
    }
    /**
     * Inserts a single object.
     * 
     * @function
     * @param {Object} data
     * @param {Function} callback Node.js style callback function (error, data)
     */
    this.insert = (data, callback) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                callback(error);
            }

            const dbo = db.db('ApollidonDB');

            dbo.collection(this.collection).insertOne(data, function(error, result) {
                if (error) {
                    callback(error);
                }

                callback(null, result);

                db.close();
              });
        });
    }
}

module.exports = MongoDBCollection;