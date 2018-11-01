'use strict';

const request = require('request-promise-native');

class SampleRepository {
    getSampleObject() {
        return {
            sample: 'This is a sample message.',
            sampleId: 1,
            sampleDescription: 'This is a sample repository object to demonstrate a response.'
        };
    }

    getTestObject() {
        return {

        };
    }

    getAllPosts() {
        return request.get({
            url: 'https://jsonplaceholder.typicode.com/posts'
        });
    }

    getPost(postId) {
        return request.get({
            url: 'https://jsonplaceholder.typicode.com/posts/' + postId
        });
    }
}

module.exports = new SampleRepository;