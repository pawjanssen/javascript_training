/**
 * Extra opdracht - stap 1
 * Onderstaande constructor function definieert het Gebruiker object met de verplichtte velden.
 */
function Gebruiker(id, naam, gebruikersnaam) {
    this.id = id;
    this.naam = naam;
    this.gebruikersnaam = gebruikersnaam;
}

/**
 * Extra opdracht - stap 5
 * overridden toString (overridden van Object.prototype)
 */
Gebruiker.prototype.toString = function() {
    return "[ID: " + this.id + " - Gebruikersnaam: " + this.gebruikersnaam + "]";
};

/**
 * Extra opdracht - stap 1
 * In onderstaande Array wordt voor iedere gebruiker een Gebruiker instance gemaakt.
 */
var gebruikers = [
    new Gebruiker(1, "J. Script", "jscript"),
    new Gebruiker(2, "C. Scherp", "cscherp"),
    new Gebruiker(3, "S. Cala", "scala")
];