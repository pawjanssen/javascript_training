define(['app/view/ViewModule', 'app/util/Settings', 'jquery', 'jquery.bootstrap', 'jquery-ui'], function(ViewModule, Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController;
        ViewModule.superConstructor(this, "TodoView");
    }

    ViewModule.subclass(TodoView);

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        var _this = this;
        $('#pageTitle').text("TodoList");
        $('#page').load("todoPage.html", function() {
            callBackWhenReady.call();
        });
        $('#myModal').empty();
        $('#myModal').load("todoTonenBewerken.html", function() {
            _this.eventHandlersTodoTonenBewerkenToepassen();
        });
    }

    TodoView.prototype.renderTodos = function(todos) {
        var _this = this;
        var templateLI = $("#todolijst li.clonable").clone();
        $("#todolijst li.todoLi").remove();
        $.map(todos, function (value) {
            var liClone = templateLI.clone();
            liClone.find("span.todoTitle").text(value.titel);
            liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + value.created);
            liClone.find("div.alert").addClass(value.priority).attr("todoid", value.id);
            liClone.removeClass("clonable").addClass("todoLi");
            liClone.find("a").click(function() {
                _this.selectedTodo = value;
            });
            liClone.appendTo("#todolijst");
        });
        _this.todosDraggable();

        this.renderSuccessMessage("Todos gerendered");
    }

    TodoView.prototype.renderGebruikers = function(gebruikers) {
        var _this = this;
        var templateLI = $("#gebruikerslijst li:first").clone();
        $("#gebruikerslijst").empty();
        $.map(gebruikers, function (value) {
            var liClone = templateLI.clone();
            liClone.find("span.naam").text(value.naam);
            liClone.find("span.gebruikersnaam").text(value.gebruikersnaam);
            liClone.attr("userid", value.id);
            liClone.appendTo("#gebruikerslijst");
            _this.gebruikersDroppable();
        });

        this.renderSuccessMessage("Gebruikers gerendered");
    };

    TodoView.prototype.todosDraggable = function () {
        $("div.todoDrag").draggable({ revert: true ,
            helper: "clone"});
    }

    TodoView.prototype.gebruikersDroppable = function () {
        var _this = this;
        $("#gebruikerslijst li").droppable({
            hoverClass: "todoOverGebruiker",
            drop: function( event, ui ) {
                _this.todoController.moveTodo($(this).attr("userid"), ui.draggable.attr("todoid"));
            }
        });
    }

    TodoView.prototype.renderSuccessMessage = function(successMessage) {
        this.log(successMessage);
    };

    TodoView.prototype.renderErrorMessage = function(errorMessage) {
        this.log(errorMessage);
    };

    TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
        var _this = this;
        $('#myModal').on('show.bs.modal', function (e) {
            if ($(e.relatedTarget).attr('id') === "nieuweTodoLink") {
                delete _this.selectedTodo;
            }

            if(_this.selectedTodo) {
                $('#todoTitle').val(_this.selectedTodo.titel);
                $('#todoPriority').val(_this.selectedTodo.priority);
                $('#todoOmschrijving').val(_this.selectedTodo.description);
            } else {
                $('#todoToevoegenBewerkenForm')[0].reset();
                _this.selectedTodo = {};
            }
        });

        $("#saveButton").click(function() {
            _this.selectedTodo.titel = $('#todoTitle').val();
            _this.selectedTodo.priority = $('#todoPriority').val();
            _this.selectedTodo.description = $('#todoOmschrijving').val();
            delete _this.selectedTodo.created;
            _this.todoController.saveTodo(_this.selectedTodo);

            $('#myModal').modal('hide');
        });
    };

    var todoViewInstance = new TodoView(undefined);

    return {
        renderTemplate: function(todoController, callBackWhenReady) {
            todoViewInstance = new TodoView(todoController);
            todoViewInstance.renderTemplate(callBackWhenReady);
        },

        renderTodos: function(todos) { todoViewInstance.renderTodos(todos) },

        renderGebruikers: function(gebruikers) { todoViewInstance.renderGebruikers(gebruikers) },

        renderSuccessMessage: function(successMessage) { todoViewInstance.renderSuccessMessage(successMessage) },

        renderErrorMessage: function(errorMessage) { todoViewInstance.renderErrorMessage(errorMessage) }
    };
});