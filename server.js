module.exports = function (hostname, port) {
    'use strict';
    var express = require('express');
    var path = require('path');
    var favicon = require('static-favicon');
    var morgan = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var app = express();

// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());

// Setup logging for development and production.
    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    var passport = require('passport');
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);

// Addition of the swagger module.
    var redirectRootToSwagger = true;
    var swagger = require('./modules/swagger')(app, redirectRootToSwagger);
    require('./modules/auth/facebook')(swagger, app);

// Add endpoints from swagger based RESTful modules.
    require('./modules/pets')(swagger);
    swagger.configure('http://' + hostname + ':' + port, '0.1');

/// catch 404 and forwarding to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// This middleware will be executed for every error...
    app.use(function (err, req, res, next) {
        var util = require('util');
        console.log(util.inspect(err));
        next();
    });

    return app;
};
