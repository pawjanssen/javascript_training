define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function GebruikersView(gebruikersController) {
        this.gebruikersController = gebruikersController
    }

    GebruikersView.prototype.renderTemplate = function() {
        $('#pageTitle').text("Gebruikers");
        $('#page').load("gebruikersPage.html");
    }

    GebruikersView.prototype.renderGebruikers = function(gebruikers) {
        console.log(gebruikers);

    }

    GebruikersView.prototype.renderError = function() {

    }

    var gebruikersViewInstance = new GebruikersView(undefined);

    return {
        renderTemplate: function(gebruikersController) {
            gebruikersViewInstance = new GebruikersView(gebruikersController);
            gebruikersViewInstance.renderTemplate();
        },

        renderGebruikers: gebruikersViewInstance.renderGebruikers,

        renderError: gebruikersViewInstance.renderError
    };
});