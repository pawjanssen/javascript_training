define(['app/view/GebruikersView', 'app/service/GebruikersStorage'], function(GebruikersView, GebruikersStorage) {
    function GebruikersController() {}

    GebruikersController.prototype.getGebruikers = function() {
        GebruikersStorage.getAll(function (gebruikers) {
            GebruikersView.renderGebruikers(gebruikers);
        }, function() {
            GebruikersView.renderError();
        });
    };

    GebruikersController.prototype.saveGebruiker = function(gebruikers) {
        GebruikersStorage.saveGebruiker(gebruikers, function() {
            GebruikersView.renderSuccessMessage("Het opslaan van de gebruiker met naam '" + gebruikers.naam + "' is gelukt.");
        }, function() {
            GebruikersView.renderErrorMessage("Het opslaan van de gebruiker met naam '" + gebruikers.naam + "' is mislukt, probeer opnieuw.");
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