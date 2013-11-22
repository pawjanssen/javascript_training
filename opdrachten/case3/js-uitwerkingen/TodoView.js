function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    document.getElementById("pageTitle").text = "TodoList";
    this.eventHandlersTodoTonenBewerkenToepassen();
};

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