module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Default task(s).
    grunt.registerTask('default', ['clean', 'htmlhint', 'jshint', 'requirejs']);

    grunt.initConfig({
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
                    out: "target/build.js",
                    optimize: "none",
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        },
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
        'closure-compiler': {
            frontend: {
                closurePath: '/home/a166128/apps/closure-compiler',
                    js: ['target/build.js'],
                    jsOutputFile: 'target/build.min.js',
                    maxBuffer: 20000,
                    options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                        language_in: 'ECMASCRIPT3',
                        warning_level: 'VERBOSE',
                        summary_detail_level: 3
                }
            }
        },
        jshint: {
            all: {
                options: {
                    "curly": true,
                    "eqnull": true,
                    "eqeqeq": true,
                    "undef": true,
                    "camelcase": true,
                    "forin": true,
                    "freeze": true,
                    "immed": true,
                    "newcap": true,
                    "noempty": true,
                    "unused": true,
                    "trailing": true,
                    "maxcomplexity": 3,
                    "asi": true,
                    "browser": true,
                    "globals": {
                        "require": true,
                        "define": true
                    },
                    reporter: require('jshint-stylish')
                },
                src: ['js/**/*.js', '!js/lib/**/*.js']
            }
        }
    });
};
