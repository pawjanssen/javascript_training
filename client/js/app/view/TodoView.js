define(['app/util/Settings', 'jquery', 'jquery.bootstrap', 'jquery-ui'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController;
    }

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        var _this = this;
        $('#pageTitle').text("TodoList");
        $('#page').load("todoPage.html", function() {
            callBackWhenReady.call();
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
                _this.selectedTodo = value;
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

    };
    
    TodoView.prototype.renderErrorMessage = function(errorMessage) {

    };

    TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
        var _this = this;
        $('#myModal').on('show.bs.modal', function (e) {
            if ($(e.relatedTarget).attr('id') == "nieuweTodoLink") {
                delete _this.selectedTodo;
            }

            if(_this.selectedTodo) {
                $('#todoTitle').val(_this.selectedTodo.titel);
                $('#todoPriority').val(_this.selectedTodo.priority);
                $('#todoOmschrijving').val(_this.selectedTodo.description);
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

        renderTodos: todoViewInstance.renderTodos,

        renderGebruikers: todoViewInstance.renderGebruikers,

        renderSuccessMessage: todoViewInstance.renderSuccessMessage,

        renderErrorMessage: todoViewInstance.renderErrorMessage
    };
});