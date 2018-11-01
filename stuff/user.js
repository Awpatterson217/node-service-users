'use strict';

const fs   = require('fs');
const uuid = require('uuid');

class User {
    get(id) {
        console.log('user.get() called');

        fs.readFile('data/users.json', function(error, data) {
            console.log(data.toString());
        });
    }

    getAll() {
        console.log('user.getAll() called');

        fs.readFile('data/users.json', function(error, data) {
            console.log(data.toString());
        });
    }

    create(user = {}) {
        console.log('user.create() called');

        const { email, name } = user;

        if(!email || !name) {
            return false;
        }

        console.log('test uuid: ', uuid.v4());

        const newUser = {
            email,
            name,
            uuid: uuid.v4()
        }

        // TODO: Change callbacks to promise chain if time available
        fs.readFile('data/users.json', function(error, data) {
            console.log(buf.toString());

            // fs.writeFile('data/users.json', newUser, function(err, data){
            //     if (err) console.log(err);
            //     console.log("Successfully Written to File.");
            // });
        });
    }
}

module.exports = new User;