var DataModule = (function() {
    function Gebruiker(id, naam, gebruikersnaam) {
        this.id = id;
        this.naam = naam;
        this.gebruikersnaam = gebruikersnaam;
    }

    Gebruiker.prototype.toString = function() {
        return JSON.stringify(this);
    };

    function Todo(id, titel, created, priority) {
        this.id = id;
        this.titel = titel;
        this.created = created;
        this.priority = priority;
    }

    Todo.prototype.toString = function() {
        return JSON.stringify(this);
    };

    return {
        "gebruikers": [
            new Gebruiker(1, "J. Script", "jscript"),
            new Gebruiker(2, "C. Scherp", "cscherp"),
            new Gebruiker(3, "S. Cala", "scala")
        ],

        "todos": [
            new Todo(1, "Afmaken opdracht 1", "22-11-2013", "high"),
            new Todo(2, "Afmaken opdracht 2", "22-11-2013", "low")
        ]
    }
}());
