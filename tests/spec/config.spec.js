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
            expect(config.get('www.hostname')).toEqual('127.0.0.1');
        });
        it('development overrides work', function () {
            expect(config.get('example')).toEqual('development-override');
        });
    });
}());
