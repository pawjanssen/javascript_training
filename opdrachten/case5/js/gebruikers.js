function Gebruiker(id, naam, gebruikersnaam) {
    this.id = id;
    this.naam = naam;
    this.gebruikersnaam = gebruikersnaam;
}

Gebruiker.prototype.toString = function() {
    return JSON.stringify(this);
};

var gebruikers = [
    new Gebruiker(1, "J. Script", "jscript"),
    new Gebruiker(2, "C. Scherp", "cscherp"),
    new Gebruiker(3, "S. Cala", "scala")
];