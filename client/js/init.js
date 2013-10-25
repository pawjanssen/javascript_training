/**
 * Applicatie initialisatie script
 */

require.config({
    baseUrl: "js/lib",
    shim: {
        'bootstrap.min': {
            deps: ['jquery'],
            exports: 'bootstrap.min'
        }
    },
    paths: {
        app: "../app",
        jquery: "jquery-2.0.3.min"
    },
    map: {
        // Map jquery op jquery-amd-private
        '*': { 'jquery': 'jquery-amd-private' },
        // Map jquery-amd-private op jquery, hierdoor vermijden we de global vars '$' en 'jQuery'
        'jquery-amd-private': { 'jquery': 'jquery' }
    }
});

requirejs(["app/main"]);