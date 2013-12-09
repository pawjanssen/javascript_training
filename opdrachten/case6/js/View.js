function View(viewNaam) {
    this.viewNaam = viewNaam;
}

View.prototype.logVariable = function (variableToLog) {
    if (!View.LOGGING_ENABLED || !View.isConsoleAvailable()) {
        return;
    }

    console.log(this.viewNaam + ' - ' + variableToLog);
};

View.LOGGING_ENABLED = true;

View.isConsoleAvailable = function () {
    return console !== undefined && console !== null;
};