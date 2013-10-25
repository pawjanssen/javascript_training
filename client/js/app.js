/**
 * Applicatie initialisatie script
 */

require.config({
    baseUrl: "js/lib",
    paths:{
        app: "../app"
    }
});

requirejs(["app/main"]);