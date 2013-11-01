define(['app/view/TodoView', 'app/service/TodoStorage', 'app/service/GebruikersStorage'], function(TodoView, TodoStorage, GebruikersStorage) {
    function TodoController() {}

    TodoController.prototype.getTodos = function() {
        TodoStorage.getAll(function (todos) {
            TodoView.renderTodos(todos);
        }, function() {
            TodoView.renderError();
        });
    };

    TodoController.prototype.getGebruikers = function() {
        GebruikersStorage.getAll(function (gebruikers) {
            TodoView.renderGebruikers(gebruikers);
        }, function() {
            TodoView.renderError();
        });
    };

    TodoController.prototype.moveTodo = function(nieuweGebruikerID, todoID) {
        TodoStorage.moveTodo(nieuweGebruikerID, todoID);
    };

    var todoControllerInstance = new TodoController();

    return {
        init: function() {
            TodoView.renderTemplate(todoControllerInstance, function() {
                todoControllerInstance.getTodos();
                todoControllerInstance.getGebruikers();
            });
        }
    }
});