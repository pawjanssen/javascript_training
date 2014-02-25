var GebruikerSelectieControllerModule = (function(GebruikerSelectieView, GebruikersStorage) {
    function GebruikerSelectieController() {}

    GebruikerSelectieController.prototype.getGebruikers = function() {
        GebruikersStorage.getAll(function (gebruikers) {
            GebruikerSelectieView.renderGebruikers(gebruikers);
        }, function() {
            GebruikerSelectieView.renderError();
        });
    };

    var gebruikerSelectieControllerInstance = new GebruikerSelectieController();

    return {
        init: function() {
            GebruikerSelectieView.renderTemplate(gebruikerSelectieControllerInstance, function() {
                gebruikerSelectieControllerInstance.getGebruikers();
            });
        }
    }
}(GebruikerSelectieViewModule, GebruikersStorageModule));