function TodoView(todoStorageInstance, gebruikersStorageInstance) {
    this.todoStorageInstance = todoStorageInstance;
    this.gebruikersStorageInstance = gebruikersStorageInstance;
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;
    document.getElementById("pageTitle").text = "TodoList";
    settingsInstance.loadTemplate(document.getElementById('page'), "todoPage.html", function() {
        _this.todoStorageInstance.getAll(function (todos) {
            _this.renderTodos(todos);
        }, function() {
            _this.renderError();
        });

        _this.gebruikersStorageInstance.getAll(function (gebruikers) {
            _this.renderGebruikers(gebruikers);
        }, function() {
            _this.renderError();
        });
    });
    settingsInstance.loadTemplate(document.getElementById('myModal'), "todoTonenBewerken.html", function() {
        _this.eventHandlersTodoTonenBewerkenToepassen();
    });
};

TodoView.prototype.renderTodos = function(todos) {
    var _this = this;
    var templateLI = document.querySelector("#todolijst li.clonable");
    document.querySelectorAll("#todolijst li.todoLi").remove();
    var todoLijst = document.getElementById("todolijst");

    todos.map(function (value) {
        var liClone = templateLI.cloneNode(true);
        liClone.querySelector("span.todoTitle").innerHTML = value.titel;
        liClone.querySelector("span.todoCreated").innerHTML = liClone.querySelector("span.todoCreated").innerHTML + value.created;
        liClone.querySelector("div.alert").classList.add(value.priority);
        liClone.querySelector("div.alert").setAttribute("todoid", value.id);
        liClone.classList.remove("clonable");
        liClone.classList.add("todoLi");
        liClone.querySelector("a").addEventListener("click", function(event) {
            _this.selectedTodo = value;

            document.getElementById("myModal").style.display = "block";
            event.preventDefault();
        }, false);


        todoLijst.appendChild(liClone);
    });
    _this.todosDraggable();
};

TodoView.prototype.renderGebruikers = function(gebruikers) {
    var _this = this;
    var templateLI = document.querySelector("#gebruikerslijst li.clonable");
    document.querySelectorAll("#gebruikerslijst li.gebruikerLi").remove();
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

    _this.gebruikersDroppable();
};

TodoView.prototype.todosDraggable = function () {
    var draggableDivs = document.querySelectorAll("div.todoDrag");

    var _this = this;
    for (var i = 0; i < draggableDivs.length; ++i) {
        var item = draggableDivs[i];
        item.addEventListener("mousedown", function(event) {
            _this.selectedTodoId = event.currentTarget.getAttribute("todoid");
        }, false);
    }
};

TodoView.prototype.gebruikersDroppable = function () {
    var _this = this;

    var gebruikersLijstLIs = document.querySelectorAll("#gebruikerslijst li");

    for (var i = 0; i < gebruikersLijstLIs.length; ++i) {
        var item = gebruikersLijstLIs[i];

        item.addEventListener("dragover", function(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        }, false);

        item.addEventListener("drop", function(event) {
            event.preventDefault();
            var todoid = _this.selectedTodoId;

            _this.todoStorageInstance.moveTodo(this.getAttribute("userid"), todoid, function() {
                _this.renderSuccessMessage("Het assignen van de todo is gelukt");
            }, function(){
                _this.renderErrorMessage("Het assignen van de todo is mislukt");
            });
        }, false);
    }
};

TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
    var _this = this;
//    $('#myModal').on('show.bs.modal', function (e) {
//        if (e.relatedTarget.getAttribute('id') == "nieuweTodoLink") {
//            delete _this.selectedTodo;
//        }
//
//        if(_this.selectedTodo) {
//            document.getElementById('todoTitle').value = _this.selectedTodo.titel;
//            document.getElementById('todoPriority').value = _this.selectedTodo.priority;
//            document.getElementById('todoOmschrijving').value = _this.selectedTodo.description;
//        } else {
//            document.getElementById('todoToevoegenBewerkenForm').reset();
//        }
//    });

    document.getElementById("saveButton").addEventListener("click", function() {
        var todo = {};

        if (_this.selectedTodo) {
            todo = _this.selectedTodo;
        }

        todo.titel = document.getElementById('todoTitle').value;
        todo.priority = document.getElementById('todoPriority').value;
        todo.description = document.getElementById('todoOmschrijving').value;
        delete todo.created;

        _this.todoStorageInstance.saveTodo(todo, function() {
            _this.renderSuccessMessage("Het opslaan van de todo met titel '" + todo.titel + "' is gelukt.");
        }, function() {
            _this.renderErrorMessage("Het opslaan van de todo met titel '" + todo.titel + "' is mislukt, probeer opnieuw.");
        });

        $('#myModal').modal('hide');
    }, false);
};

TodoView.prototype.renderSuccessMessage = function() {};
TodoView.prototype.renderErrorMessage = function() {};