module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Default task(s).
    grunt.registerTask('default', ['clean', 'htmlhint', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat']);

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
                maxlen: 140,
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
                    "$": true
                },
                reporter: require('jshint-stylish')
            },
            beforeconcat: ['js*/**/*.js', '!js/lib/**/*.js'],
            afterconcat: {
                options: {
                    "undef": true,
                    "unused": true,
                },
                files: {
                    src: ['target/*.js']
                }

            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            build: {
                files: [ {src: ['js/**/*.js'], dest: 'target/build.js' },
                    {src: ['js-*/**/*.js'], dest: 'target/build-.js' }
                ]
            }
        }
    });

}