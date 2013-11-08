define(['app/view/GebruikersView', 'app/service/GebruikersStorage', 'app/util/Settings'], function(GebruikersView, GebruikersStorage, Settings) {
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

    GebruikersController.prototype.onWebSocketMessage = function(websocketEvent) {
        console.log("poep");
        var websocketData = JSON.parse(websocketEvent.data);
        if (websocketData.eventtype === "gebruikertoegevoegd") {

            GebruikersView.renderGebruikers(websocketData.data);
        }
    };

    var gebruikersControllerInstance = new GebruikersController();
    Settings.webSocket.onmessage = gebruikersControllerInstance.onWebSocketMessage;

    return {
        init: function() {
            GebruikersView.renderTemplate(gebruikersControllerInstance, function() {
                gebruikersControllerInstance.getGebruikers();
            });
        }
    }
});