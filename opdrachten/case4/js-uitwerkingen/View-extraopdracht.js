function View(viewNaam) {
    this.viewNaam = viewNaam;
}


// Opdracht 2 - stap 4 en stap 1212
// Onderstaand is de JSON notatie om het prototype te declareren op het View object
View.prototype = {
 "logVariable": function(variableToLog) {
     // Opdracht 2 - stap 7
     if (!View.LOGGING_ENABLED) {
        return;
     }

     // Opdracht 2 - stap 9
     if (!View.isConsoleAvailable()) {
        return;
     }

     console.log(this.viewNaam + ' - ' + variableToLog);
 }
};

// Opdracht 2 - stap 6
View.LOGGING_ENABLED = true;

/**
 * Opdracht 2 - stap 8
 */
View.isConsoleAvailable = function() {
    return console !== undefined && console !== null;
};