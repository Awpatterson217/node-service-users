'use strict';

/**
 * @author Adam Patterson <awpatterson217@gmail.com>
 */

const uuid = require('uuid');

/**
 * @typedef {Object} User
 * @property {string} name The user's first and last name.
 * @property {string} email The user's email address.
 * @property {string} uuid 32 Randomly generated hexidecimal characters.
 */

/**
 * Adds uuid property to user.
 * 
 * @function
 * @param {Object}
 * @returns {User}
 */
function addId({ email, name }) {
    const user = {
        email,
        name,
        uuid: uuid.v4()
    };

    return user;
}
/**
 * Handles JSON data from buffer (file stream).
 * 
 * @function
 * @param {Buffer} data - stream of binary data.
 * @returns {User[]}
 */
function parseBuffer(data) {
    return JSON.parse(data.toString());
}

module.exports = {
    addId,
    parseBuffer
}