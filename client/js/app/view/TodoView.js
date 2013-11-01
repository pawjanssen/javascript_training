define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
    }

    TodoView.prototype.renderTemplate = function() {
        $('#pageTitle').text("TodoList");
        $('#page').load("todoPage.html");
        $('#myModal').load("todoTonenBewerken.html");
    }

    TodoView.prototype.renderTodos = function(todos) {
        console.log(todos);
        var clone = $("#todolijst li").clone();
        $.map(todos, function (value, index) {
            console.log(clone);
            var liClone = $("#todolijst li").clone();
            liClone.find("span.todoTitle").text(value.titel);
            liClone.appendTo("#todolijst");

            console.log(value.titel);
        })
    }

    TodoView.prototype.renderError = function() {

    }

    var todoViewInstance = new TodoView(undefined);

    return {
        renderTemplate: function(todoController) {
            todoViewInstance = new TodoView(todoController);
            todoViewInstance.renderTemplate();
        },

        renderTodos: todoViewInstance.renderTodos,

        renderError: todoViewInstance.renderError
    };
});