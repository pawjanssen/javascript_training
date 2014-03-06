function View() {
}

/**
 * Opdracht 2 - stap 4
 *
 * @param variableToLog - De variable die gelogd moet worden.
/* */
View.prototype.logVariable = function(variableToLog) {
    // Opdracht 2 - stap 7
    if (!View.LOGGING_ENABLED) {
        return;
    }

    // Opdracht 2 - stap 9
    if (!View.isConsoleAvailable()) {
        return;
    }

    console.log(this.viewNaam);
    console.log(variableToLog);
};


// Opdracht 2 - stap 6
View.LOGGING_ENABLED = true;

/**
 * Opdracht 2 - stap 8
 */
View.isConsoleAvailable = function() {
    return console !== undefined && console !== null;
};