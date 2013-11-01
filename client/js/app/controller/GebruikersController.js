define(['app/view/GebruikersView', 'app/service/GebruikersStorage'], function(GebruikersView, GebruikersStorage) {
    function GebruikersController() {}

    GebruikersController.prototype.getTodos = function() {
        GebruikersController.getAll(function (todos) {
            GebruikersView.renderTodos(todos);
        }, function() {
            GebruikersView.renderError();
        });
    };

    var gebruikersControllerInstance = new GebruikersController();

    GebruikersView.renderTemplate(gebruikersControllerInstance);
    gebruikersControllerInstance.getTodos();
});