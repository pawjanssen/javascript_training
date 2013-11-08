function TodoView(todoStorageInstance, gebruikersStorageInstance) {
    this.todoStorageInstance = todoStorageInstance;
    this.gebruikersStorageInstance = gebruikersStorageInstance;
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;
    $('#pageTitle').text("TodoList");
    $('#page').load("todoPage.html", function() {
        _this.clickhandlersTodoPageToepassen();

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
    $('#myModal').load("todoTonenBewerken.html", function() {
        _this.eventHandlersTodoTonenBewerkenToepassen();
    });
}

TodoView.prototype.renderTodos = function(todos) {
    var _this = this;
    var templateLI = $("#todolijst li.clonable").clone();
    $("#todolijst li.todoLi").remove();
    $.map(todos, function (value, index) {
        var liClone = templateLI.clone();
        liClone.find("span.todoTitle").text(value.titel);
        liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + value.created);
        liClone.find("div.alert").addClass(value.priority).attr("todoid", value.id);
        liClone.removeClass("clonable").addClass("todoLi");
        liClone.find("a").click(function() {
            $("#myModal").data("clickedTodo", value)
        });
        liClone.appendTo("#todolijst");
    });
    _this.todosDraggable();
}

TodoView.prototype.renderGebruikers = function(gebruikers) {
    var _this = this;
    var templateLI = $("#gebruikerslijst li:first").clone();
    $("#gebruikerslijst").empty();
    $.map(gebruikers, function (value, index) {
        var liClone = templateLI.clone();
        liClone.find("span.naam").text(value.naam);
        liClone.find("span.gebruikersnaam").text(value.gebruikersnaam);
        liClone.attr("userid", value.id);
        liClone.appendTo("#gebruikerslijst");
        _this.gebruikersDroppable();
    })
};

TodoView.prototype.todosDraggable = function () {
    $("div.todoDrag").draggable({ revert: true ,
        helper: "clone"});
};

TodoView.prototype.gebruikersDroppable = function () {
    var _this = this;
    $("#gebruikerslijst li").droppable({
        hoverClass: "todoOverGebruiker",
        drop: function( event, ui ) {
            _this.todoStorageInstance.moveTodo($(this).attr("userid"), ui.draggable.attr("todoid"), function() {
                _this.renderSuccessMessage("Het assignen van de todo is gelukt");
            }, function(){
                _this.renderErrorMessage("Het assignen van de todo is mislukt");
            });
        }
    });
};

TodoView.prototype.clickhandlersTodoPageToepassen = function () {
    $("a.nieuwetodo").click(function() {
        console.log("test");
        $("#myModal").data("clickedTodo", "leeeeeeeeeeg");
    });
};

TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
    $('#myModal').on('show.bs.modal', function () {
        var todo = $("#myModal").data("clickedTodo");
        if(todo) {
            $('#todoTitle').val(todo.titel);
            $('#todoPriority').val(todo.priority);
            $('#todoOmschrijving').val(todo.description);
        }
    });

    $("#saveButton").click(function() {
        var todo = $("#myModal").data("clickedTodo");

        if (!todo) {
            todo = {};
        }

        todo.titel = $('#todoTitle').val();
        todo.priority = $('#todoPriority').val();
        todo.description = $('#todoOmschrijving').val();
        delete todo.created;

        _this.todoStorageInstance.saveTodo(todo, function() {
            _this.renderSuccessMessage("Het opslaan van de todo met titel '" + todo.titel + "' is gelukt.");
        }, function() {
            _this.renderErrorMessage("Het opslaan van de todo met titel '" + todo.titel + "' is mislukt, probeer opnieuw.");
        });

        $('#myModal').modal('hide');
    });
};

TodoView.prototype.renderSuccessMessage = function() {};
TodoView.prototype.renderErrorMessage = function() {};