module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Default task(s).
    grunt.registerTask('default', ['clean', 'htmlhint', 'jshint:all']);

    grunt.initConfig({
        clean: ["target"],
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'style-disabled': true
                },
                src: ['*.html']
            }
        },
        watch: {
            html: {
                files: ['*.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['jshint']
            }
        },
        jshint: {
            options: {
                maxlen: 150,
                "curly": true,
                "eqnull": true,
                "eqeqeq": true,
                "camelcase": true,
                "forin": true,
                "freeze": true,
                "immed": true,
                "newcap": true,
                "noempty": true,
                "trailing": true,
                "asi": true,
                "browser": true,
                "globals": {
                    "require": true,
                    "define": true,
                    "console": true,
                    "jQuery": true
                },
                reporter: require('jshint-stylish')
            },
            all: ['js*/**/*.js', '!js/lib/**/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    paths: {
                        "jquery": "empty:",
                        "jquery.bootstrap": "empty:",
                        'jquery-ui': "empty:"
                    },
                    name: "init",
                    out: "target/build-AMD.js",
                    optimize: "none"//,
//                    optimize: "uglify"
                }
            }
        },
        jasmine: {
            pivotal: {
                src: ['js/**/*.js', 'lib/*.js'],
                options: {
                    specs: 'spec/*uitwerkingen.js'
                }
            }
        }
    });

}