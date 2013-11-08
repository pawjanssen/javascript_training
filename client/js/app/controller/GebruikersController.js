define(['app/view/GebruikersView', 'app/service/GebruikersStorage'], function(GebruikersView, GebruikersStorage) {
    function GebruikersController() {}

    GebruikersController.prototype.getGebruikers = function() {
        GebruikersStorage.getAll(function (gebruikers) {
            GebruikersView.renderGebruikers(gebruikers);
        }, function() {
            GebruikersView.renderError();
        });
    };

    var gebruikersControllerInstance = new GebruikersController();

    return {
        init: function() {
            GebruikersView.renderTemplate(gebruikersControllerInstance, function() {
                gebruikersControllerInstance.getGebruikers();
            });
        }
    }
});