define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
    }

    TodoView.prototype.renderTemplate = function() {
        $('title').text(Settings.pageTitle + " - TODO View");
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