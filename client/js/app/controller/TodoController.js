define(['app/view/TodoView', 'app/service/TodoStorage'], function(TodoView, TodoStorage) {
    function TodoController() {}

    TodoController.prototype.getTodos = function() {
        TodoStorage.getAll(function (todos) {
            TodoView.renderTodos(todos);
        }, function() {
            TodoView.renderError();
        });
    };

    var todoControllerInstance = new TodoController();

    TodoView.renderTemplate(todoControllerInstance);
    todoControllerInstance.getTodos();
});