(function () {
    'use strict';

    var config = require('config');

    exports.testSomething = function (test) {
        test.expect(1);
        test.ok(true, 'this assertion should pass');
        test.done();
    };

    exports['config for test is loaded'] = function (test) {
        test.ok(config, 'module loaded properly');
        test.done();
    };

    exports['default values work'] = function (test) {
        test.equal(config.get('www.hostname'), 'localhost');
        test.done();
    };

    exports['development overrides work'] = function (test) {
        test.equal(config.get('example'), 'development-override');
        test.done();
    };

    exports['Make sure that facebook appId is not checked in.'] = function (test) {
        test.equal(config.get('facebook.appSecret'), 'your facebook App Secret');
        test.done();
    };

    exports['Make sure that facebook application secret is not checked in.'] = function (test) {
        test.equal(config.get('facebook.appSecret'), 'your facebook App Secret');
        test.done();
    };

    exports['Make sure that facebook application id is not checked in.'] = function (test) {
        test.equal(config.get('facebook.appId'), 'your facebook App ID');
        test.done();
    };
})();
