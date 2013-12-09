function Todo(id, titel, created, priority) {
    this.id = id;
    this.titel = titel;
    this.created = created;
    this.priority = priority;
}

Todo.prototype.toString = function() {
    return JSON.stringify(this);
};

var todos = [
    new Todo(1, "Afmaken opdracht 1", "22-11-2013", "high"),
    new Todo(2, "Afmaken opdracht 2", "22-11-2013", "low")
];