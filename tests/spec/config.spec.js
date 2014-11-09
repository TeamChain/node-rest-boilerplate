/* global describe, it, expect */

(function() {
    'use strict';
    var config = require('config');

    /*
        Really just here to demonstrate how node-config works as well as to ensure tests are plugged in properly.
     */
    describe('Demonstrate node-config', function () {
        it('module is loaded.', function () {
            expect(config).toBeDefined();
        });
        it('default values work', function () {
            expect(config.get('www.hostname')).toEqual('localhost');
        });
        it('development overrides work', function () {
            expect(config.get('example')).toEqual('development-override');
        });
    });

    describe('Make sure that facebook credentials are not checked in...', function () {
        it('appId is not checked in.', function () {
            expect(config.get('facebook.appSecret')).toEqual('your facebook App Secret');
        });
        it('appSecret is not checked in.', function () {
            expect(config.get('facebook.appId')).toEqual('your facebook App ID');
        });
    });
}());
