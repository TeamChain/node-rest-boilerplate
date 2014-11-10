// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {
    'use strict';

    var jsFiles = ['Grunfile.js', 'server.js', 'modules/**/*.js', 'services/**/*.js', 'tests/**/*.js', 'bin/*.js', '!modules/swagger/swagger-ui/**'];

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    //noinspection JSHint
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        nodeunit: {
            all: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
            options: {
                reporter: 'junit',
                reporterOptions: {
                    output: "./build/reports/nodeunit/"
                }
            }
        },

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: jsFiles
        },

        watch: {
            options: {
                atBegin : true
            },
            jshint: {
                files: [jsFiles],
                tasks: ['jshint']
            },
            nodeunit: {
                files: [jsFiles, 'config/*'],
                tasks: ['nodeunit']
            }
        }, // watch

        nodemon: {
            dev: {
                script: 'bin/start-www.js',
                options : {
                    ext: 'js,json',
                    delay: 100,
                    legacyWatch: false,
                    cwd: __dirname
                }
            }
        }, // nodemon

        concurrent: {
            // Restart the server
            dev: {
                tasks: ['watch:jshint', 'watch:nodeunit'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }, // concurrent

        doctoc: {
            options: {
                bitbucket: false,
                removeAd: true,
                header: "## Table of Contents"
            },
            readme : {
                target: "./readme.md"
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('ci', '', function () {
        var taskList = [
            'concurrent:dev'
        ];
        grunt.task.run(taskList);
    });

    var serve = function () {
        var taskList = [
            'nodemon:dev'
        ];
        grunt.task.run(taskList);
    };
    grunt.registerTask('default', '', serve);
    grunt.registerTask('serve', '', serve);

};