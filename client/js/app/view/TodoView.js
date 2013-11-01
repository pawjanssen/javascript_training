define(['app/util/Settings', 'jquery', 'jquery.bootstrap', 'jquery-ui'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController;
        _this = this;
    }

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("TodoList");
        $('#page').load("todoPage.html", function() {
            _this.clickhandlersTodoPageToepassen();

            callBackWhenReady.call();
        });
        $('#myModal').load("todoTonenBewerken.html", function() {
            _this.eventHandlersTodoTonenBewerkenToepassen();
        });
    }

    TodoView.prototype.renderTodos = function(todos) {
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
            _this.todoController.saveTodo(todo);

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