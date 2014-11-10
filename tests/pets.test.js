(function () {
    'use strict';

    var request = require('supertest');
    var testPort = '3101';
    var hostname = 'localhost';
    var server = require('../server')(hostname, testPort);

    exports['/pets is not a valid datapoint'] = function (test) {
        request(server)
            .get('/pets')
            .set('Accept', 'application/json')
            .expect(404)
            .end(function (err) {
                if (err) {
                    return test.done(err);
                }
                test.done();
            });
    };

    exports['/pets/1 should return pet 1'] = function (test) {
        request(server)
            .get('/pets/1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect({id: 1,
                category: {id: 2, name: 'Cats'},
                name: 'Cat 1',
                urls: ['url1', 'url2'],
                tags: [
                    {id: 1, name: 'tag1'},
                    {id: 2, name: 'tag2'}
                ],
                status: 'available'})
            .end(function (err) {
                if (err) {
                    return test.done(err);
                }
                test.done();
            });
    };

})();
