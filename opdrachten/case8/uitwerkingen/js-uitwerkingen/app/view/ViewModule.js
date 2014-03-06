define(function() {
    function View(viewNaam) {
        this.viewNaam = viewNaam;
    }

    View.prototype.log = function (variableToLog) {
        if (!View.LOGGING_ENABLED || !View.isConsoleAvailable()) {
            return;
        }

        console.log(this.viewNaam + ' - ' + variableToLog);
    };

    View.isConsoleAvailable = function () {
        return console !== undefined && console !== null;
    };

    View.LOGGING_ENABLED = true;

    return {
        "subclass": function(constructorFunction) {
            constructorFunction.prototype = Object.create(View.prototype);
            constructorFunction.prototype.constructor = constructorFunction;
        },

        "superConstructor": function(viewInstance, viewNaam) {
            View.call(viewInstance, viewNaam);
        }
    }
});
