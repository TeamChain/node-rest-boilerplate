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

        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                jUnit: {
                    report: true,
                    savePath: "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['tests/']
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
            jasmine_node: {
                files: [jsFiles, 'config/*'],
                tasks: ['jasmine_node']
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
                tasks: ['watch:jshint', 'watch:jasmine_node'],
                options: {
                    logConcurrentOutput: true
                }
            }
        } // concurrent


    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('ci', '', function () {
        var taskList = [
            'watch:jshint', 'watch:jasmine_node'
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