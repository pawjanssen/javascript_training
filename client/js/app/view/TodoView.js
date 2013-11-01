define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
    }

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("TodoList");
        var _this = this;
        $('#page').load("todoPage.html", function() {
            _this.clickhandlersTodoPageToepassen();

            callBackWhenReady.call();
        });
        $('#myModal').load("todoTonenBewerken.html", function() {
            _this.eventHandlersTodoTonenBewerkenToepassen();
        });
    }

    TodoView.prototype.renderTodos = function(todos) {
        var templateLI = $("#todolijst li:first").clone();
        $("#todolijst").empty();
        $.map(todos, function (value, index) {
            var liClone = templateLI.clone();
            liClone.find("span.todoTitle").text(value.titel);
            liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + value.created);
            liClone.find("div.alert").addClass(value.priority);
            liClone.find("a").click(function() {
                $("#myModal").data("clickedTodo", value)
            });
            liClone.appendTo("#todolijst");
        })
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
        })
    }

    TodoView.prototype.renderError = function() {

    }

    TodoView.prototype.clickhandlersTodoPageToepassen = function () {};

    TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
        $('#myModal').on('show.bs.modal', function () {
            var todo = $("#myModal").data("clickedTodo");
            $('#todoTitle').val(todo.titel);
            $('#todoPriority').val(todo.priority);
            $('#todoOmschrijving').val(todo.description);
        })
    };

    var todoViewInstance = new TodoView(undefined);

    return {
        renderTemplate: function(todoController, callBackWhenReady) {
            todoViewInstance = new TodoView(todoController);
            todoViewInstance.renderTemplate(callBackWhenReady);
        },

        renderTodos: todoViewInstance.renderTodos,

        renderGebruikers: todoViewInstance.renderGebruikers,

        renderError: todoViewInstance.renderError
    };
});