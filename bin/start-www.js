#!/usr/bin/env node
//var debug = require('debug')('tot-swagger-express');
var config = require('config');

var port = config.get('www.http.port');
var hostname = config.get('www.hostname');

var server = require('../server')(hostname, port);
var http = require('http');

// Setup for http
server.set('port', port);
http.createServer(server).listen(port);
console.log('Running http server "%s" on port "%s".', hostname, port);

// Setup for https
// http://nodejs.org/api/https.html
var https = require('https');
var fs = require('fs');
var options = {
    key : fs.readFileSync(config.get('www.https.key_pem_file')),
    cert : fs.readFileSync(config.get('www.https.cert_pem_file'))
};
var portHttps = config.get('www.https.port');
https.createServer(options, server).listen(portHttps);
console.log('Running https server "%s" on port "%s".', hostname, portHttps );
