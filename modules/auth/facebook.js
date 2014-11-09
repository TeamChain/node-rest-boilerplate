module.exports = function (swagger, app) {
    'use strict';

    var config = require('config');
    var port = config.get('www.http.port');
    var hostname = config.get('www.hostname');

    var resources = {};
    var resourcePath = '/auth/facebook';

    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    var FACEBOOK_ACCESS_TOKEN = null;
    var FACEBOOK_REFRESH_TOKEN = null;

    passport.use(new FacebookStrategy({
        clientID: config.get('facebook.appId'),
        clientSecret: config.get('facebook.appSecret'),
        callbackURL: 'http://' + hostname + ':' + port + resourcePath + '/callback'
    }, function (accessToken, refreshToken, profile, done) {
        FACEBOOK_ACCESS_TOKEN = accessToken;
        FACEBOOK_REFRESH_TOKEN = refreshToken;

        process.nextTick(function () {
            //Assuming user exists
            done(null, profile);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    resources.getUserAuth = {
        'spec': {
            description: 'Authorize Facebook user.',
            path: resourcePath,
            method: 'GET',
            summary: 'Authorize Facebook user.',
            notes: 'Authorizes user using Facebook.  WARNING: the "Try it Now" button does not work to try this click this link: <a href="/auth/facebook">Sign in with Facebook</a> <br>',
            type: 'UserAuth',
            nickname: 'getUserAuth',
            produces: ['application/json'],
            parameters: [],
            responseMessages: []
        },
        'action': passport.authenticate('facebook', { scope: [' public_profile', 'user_friends', 'email', 'user_likes', 'user_location', 'read_friendlists'] })
    };

    swagger.addGet(resources.getUserAuth)    // /auth/facebook
    ;

    // Add additional non-documented routes directly to the express app.
    app.get(resourcePath + '/callback', passport.authenticate('facebook', {
        successRedirect: resourcePath + '/success',
        failureRedirect: resourcePath + '/error'
    }));

    app.get(resourcePath + '/success', function (req, res) {
        res.send('Successfully logged in.');
    });

    app.get(resourcePath + '/error', function (req, res) {
        res.send('Error logging in.');
    });
};






