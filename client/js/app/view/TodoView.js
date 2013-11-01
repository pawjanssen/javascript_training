define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
    }

    TodoView.prototype.renderTemplate = function() {
        $('#pageTitle').text(Settings.pageTitle + " - TODO View");
        $('#page').load("todoPage.html");
        $('#myModal').load("todoTonenBewerken.html");
    }

    TodoView.prototype.renderTodos = function(todos) {
        console.log(todos);
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