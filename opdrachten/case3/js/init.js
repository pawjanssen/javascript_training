function TodoView() {
}

TodoView.prototype.renderTodos = function(todos) {
    var templateLI = document.querySelector("#todolijst li.clonable");

    var bestaandeTodoLIs = document.querySelectorAll("#todolijst li.todoLi");

    [].forEach.call(bestaandeTodoLIs, function(node) {
        node.parentNode.removeChild(node);
    });

    var todoLijst = document.getElementById("todolijst");

    todos.map(function (value) {
        var liClone = templateLI.cloneNode(true);
        liClone.querySelector("span.todoTitle").innerHTML = value.titel;
        liClone.querySelector("span.todoCreated").innerHTML = liClone.querySelector("span.todoCreated").innerHTML + value.created;
        liClone.querySelector("div.alert").classList.add(value.priority);
        liClone.querySelector("div.alert").setAttribute("todoid", value.id);
        liClone.classList.remove("clonable");
        liClone.classList.add("todoLi");
        todoLijst.appendChild(liClone);
    });
};

TodoView.prototype.renderGebruikers = function(gebruikers) {
    var templateLI = document.querySelector("#gebruikerslijst li.clonable");
    var bestaandeGebruikerLIs = document.querySelectorAll("#gebruikerslijst li.gebruikerLi");

    [].forEach.call(bestaandeGebruikerLIs, function(node) {
        node.parentNode.removeChild(node);
    });

    var gebruikersLijst = document.getElementById("gebruikerslijst");

    gebruikers.map(function (value) {
        var liClone = templateLI.cloneNode(true);

        liClone.querySelector("span.naam").innerHTML = value.naam;
        liClone.querySelector("span.gebruikersnaam").innerHTML = value.gebruikersnaam;
        liClone.setAttribute("userid", value.id);
        liClone.classList.remove("clonable");
        liClone.classList.add("gebruikerLi");

        gebruikersLijst.appendChild(liClone);
    });
};

var todo1 = new Object();
todo1.id = 1;
todo1.titel = "Afmaken opdracht 1";
todo1.created = "22-11-2013";
todo1.priority = "high";

var todo2 = new Object();
todo2.id = 2;
todo2.titel = "Afmaken opdracht 2";
todo2.created = "22-11-2013";
todo2.priority = "low";

var todos = new Array(todo1, todo2);

var gebruiker1 = new Object();
gebruiker1.id = 1;
gebruiker1.naam = "J. Script";
gebruiker1.gebruikersnaam = "jscript";

var gebruiker2 = new Object();
gebruiker2.id = 2;
gebruiker2.naam = "C. Scherp";
gebruiker2.gebruikersnaam = "cscherp";

var gebruiker3 = new Object();
gebruiker3.id = 3;
gebruiker3.naam = "S. Cala";
gebruiker3.gebruikersnaam = "scala";

var gebruikers = new Array(gebruiker1, gebruiker2, gebruiker3);

var todoViewInstance = new TodoView();

window.addEventListener("load", function() {
    todoViewInstance.renderTodos(todos);
    todoViewInstance.renderGebruikers(gebruikers);
});
