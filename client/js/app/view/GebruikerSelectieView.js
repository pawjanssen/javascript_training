define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function GebruikerSelectieView(gebruikersController) {
        this.gebruikersController = gebruikersController
    }

    GebruikerSelectieView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("Gebruiker Selectie");
        $('#page').load("gebruikerSelectiePage.html", function() {
            callBackWhenReady.call();
        });
    }

    GebruikerSelectieView.prototype.renderGebruikers = function(gebruikers) {
        $.map(gebruikers, function (gebruiker, index) {
            $("<option></option>")
                .val(gebruiker.id)
                .text(gebruiker.naam)
                .appendTo("#gebruikersdropdown");
        });
    }

    GebruikerSelectieView.prototype.renderError = function() {

    }

    var gebruikerSelectieViewInstance = new GebruikerSelectieView(undefined);

    return {
        renderTemplate: function(gebruikersController, callBackWhenReady) {
            gebruikerSelectieViewInstance = new GebruikerSelectieView(gebruikersController);
            gebruikerSelectieViewInstance.renderTemplate(callBackWhenReady);
        },

        renderGebruikers: gebruikerSelectieViewInstance.renderGebruikers,

        renderError: gebruikerSelectieViewInstance.renderError
    };
});