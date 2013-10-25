/**
 * Applicatie initialisatie script
 */

require.config({
    baseUrl: "js/lib",
    shim: {
        "jquery.bootstrap": {
            deps: ['jquery']
        }
    },
    paths: {
        app: "../app",
        'jquery': "jquery-2.0.3.min",
        'jquery.bootstrap': 'bootstrap.min'
    }
});

requirejs(["app/main"]);