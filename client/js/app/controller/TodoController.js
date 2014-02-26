define(['app/view/TodoView', 'app/service/TodoStorage', 'app/service/GebruikersStorage', 'app/util/Settings'], function(TodoView, TodoStorage, GebruikersStorage, Settings) {
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

    TodoController.prototype.saveTodo = function(todo) {
        TodoStorage.saveTodo(todo, function() {
            TodoView.renderSuccessMessage("Het opslaan van de todo met titel '" + todo.titel + "' is gelukt.");
        }, function() {
            TodoView.renderErrorMessage("Het opslaan van de todo met titel '" + todo.titel + "' is mislukt, probeer opnieuw.");
        });
    };

    TodoController.prototype.onWebSocketMessage = function(websocketEvent) {
        var websocketData = JSON.parse(websocketEvent.data);
        if (websocketData.eventtype === "gebruiker-todos" &&
            websocketData.gebruikerid == Settings.currentUser) {

            TodoView.renderTodos(websocketData.data);
        }
    };

    TodoController.prototype.moveTodo = function(nieuweGebruikerID, todoID) {
        TodoStorage.moveTodo(nieuweGebruikerID, todoID, function() {
            TodoView.renderSuccessMessage("Het assignen van de todo is gelukt");
        }, function(){
            TodoView.renderErrorMessage("Het assignen van de todo is mislukt");
        });
    };

    var todoControllerInstance = new TodoController();
    Settings.webSocket.onmessage = todoControllerInstance.onWebSocketMessage;

    return {
        init: function() {
            TodoView.renderTemplate(todoControllerInstance, function() {
                todoControllerInstance.getTodos();
                todoControllerInstance.getGebruikers();
            });
        },

        saveTodo: todoControllerInstance.saveTodo
    };
});