'use strict';

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile)

const url = 'mongodb://localhost:27017/';

const { log } = console;

MongoClient.connect(url, function(error, db) {
    if (error) {
        throw error;
    }

    log('Connected to mongodb://localhost:27017/ \n');

    const dbo = db.db('ApollidonDB');

    readFile('data/users.json')
        .then(data => JSON.parse(data.toString()))
        .then((data) => {

            dbo.collection("users").insertMany(data, (error, res) => {
                if (error) {
                    throw error;
                }

                log(res.insertedCount, ' users inserted.');

                db.close();
            });
        })
        .catch(error => log('ERROR reading users.json', error))
});