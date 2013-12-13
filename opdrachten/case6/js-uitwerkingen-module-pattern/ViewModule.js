var ViewModule = (function() {
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

    function TodoView() {
        // Opdracht 1 - stap 5 - Super constructor aanroepen met viewNaam parameter
        View.call(this, "TodoView");
    }

    // Opdracht 1 - stap 1 - TodoView extend van View
    TodoView.prototype = Object.create(View.prototype);
    TodoView.prototype.constructor = TodoView;

    TodoView.prototype.renderTodos = function(todos) {
        // Opdracht 1 - stap 4 - Omdat TodoView extend van View, kunnen we de logVariable methode hier aanroepen
        this.logVariable(todos);

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
        // Opdracht 1 - stap 4 - Omdat TodoView extend van View, kunnen we de logVariable methode hier aanroepen
        this.logVariable(gebruikers);

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

    /**
     * Opdracht 1 - stap 7 - Overridden logVariable methode
     */
    TodoView.prototype.logVariable = function(variableToLog) {
        // Aanroepen logVariable op superclass
        View.prototype.logVariable.call(this, variableToLog);

        // Aantal elementen loggen
        if (View.LOGGING_ENABLED && variableToLog instanceof Array) {
            console.log("Aantal items gerenderd: " + variableToLog.length);
        }
    };

    return {
        "TodoView": TodoView
    }
}());
