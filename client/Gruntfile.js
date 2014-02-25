module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-closure-compiler');


    // Default task(s).
    grunt.registerTask('default', ['closure-compiler']);

//    grunt.initConfig({
//        'closure-compiler': {
//            frontend: {
//                closurePath: '/home/a166128/apps/closure-compiler',
//                js: ['js/**/*.js', '!js/lib/*.js'],
//                jsOutputFile: 'target/build.js',
//                maxBuffer: 20000,
//                options: {
//                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
//                    language_in: 'ECMASCRIPT5_STRICT',
//                    common_js_entry_module: 'js/init.js',
//
//                    externs: ['js/lib/*.js']
//                }
//            }
//        }
//    });

    grunt.initConfig({
        'closure-compiler': {
            frontend: {
                closurePath: '/home/a166128/apps/closure-compiler',
                js: ['js/init.js'],
                jsOutputFile: 'target/build.js',
                maxBuffer: 20000,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    warning_level: 'VERBOSE',
                    summary_detail_level: 3
                }
            }
        }
    });
};
