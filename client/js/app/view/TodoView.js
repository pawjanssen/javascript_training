define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
    }

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("TodoList");
        $('#page').load("todoPage.html", callBackWhenReady);
        $('#myModal').load("todoTonenBewerken.html");
    }

    TodoView.prototype.renderTodos = function(todos) {
        console.log(todos);
        var templateLI = $("#todolijst li").clone();
        $("#todolijst").empty();
        $.map(todos, function (value, index) {
            var liClone = templateLI.clone();
            liClone.find("span.todoTitle").text(value.titel);
            liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + value.created);
            liClone.find("div.alert").addClass(value.priority);
            liClone.appendTo("#todolijst");
        })
    }

    TodoView.prototype.renderError = function() {

    }

    var todoViewInstance = new TodoView(undefined);

    return {
        renderTemplate: function(todoController, callBackWhenReady) {
            todoViewInstance = new TodoView(todoController);
            todoViewInstance.renderTemplate(callBackWhenReady);
        },

        renderTodos: todoViewInstance.renderTodos,

        renderError: todoViewInstance.renderError
    };
});