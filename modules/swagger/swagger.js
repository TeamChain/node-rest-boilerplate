module.exports = function(app, redirectRootToSwagger) {
    'use strict';
    var express = require('express');
    var swagger = require('swagger-node-express');
    var validate = require('swagger-validation');
    var _ = require('lodash');
    var swaggerUiIndex = 'http://127.0.0.1:3100/swagger-ui/index.html';

    // Setup swagger-ui.
    function redirectToSwaggerDocs(res) {
        res.redirect(302, swaggerUiIndex);
        res.end();
    }
    if (redirectRootToSwagger) {
        app.get('/', function(req, res){
            redirectToSwaggerDocs(res);
        });
    }

    var swaggerUiLocation = 'node_modules/swagger-node-express/swagger-ui';
    var docsHandler = express.static(swaggerUiLocation);
    app.get(/^\/swagger-ui(\/.*)?$/, function(req, res, next) {
        if (req.url === '/swagger-ui' || req.url === '/swagger-ui/') { // express static barfs on root url w/o trailing slash
            redirectToSwaggerDocs(res);
            return;
        }
        // take off leading /swagger-ui so that connect locates file correctly
        req.url = req.url.substr('/swagger-ui'.length);
        return docsHandler(req, res, next);
    });

    swagger.configureSwaggerPaths('', 'api-docs', '');

    // The addMiddleware function is what I've added in https://github.com/darrin/swagger-node-express
    // var models = require('./models.js');
    swagger.addMiddleware(function(req, res, spec, models) {
        var ret = validate(spec, req, models);
        if(ret.length) {
            var errors = _.pluck(_.pluck(ret, 'error'), 'message');
            var message = 'validation failure - ' + errors.join();
            return { 'code' : 400, 'message': message };
        }
    });

    swagger.setAppHandler(app);

    swagger.setHeaders = function setHeaders(res) {
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
        res.header('Content-Type', 'application/json; charset=utf-8');
    };

    return swagger;
};