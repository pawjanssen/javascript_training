define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function GebruikersView(gebruikersController) {
        this.gebruikersController = gebruikersController
    }

    GebruikersView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("Gebruikers");
        $('#page').load("gebruikersPage.html", function() {
            callBackWhenReady.call();
        });
    }

    GebruikersView.prototype.renderGebruikers = function(gebruikers) {
        var _this = this;
        var templateLI = $("#gebruikerslijst li:first").clone();
        $("#gebruikerslijst").empty();
        $.map(gebruikers, function (value, index) {
            var liClone = templateLI.clone();
            liClone.find("span.naam").text(value.naam);
            liClone.find("span.gebruikersnaam").text(value.gebruikersnaam);
            liClone.attr("userid", value.id);
            liClone.appendTo("#gebruikerslijst");
        })

    }

    GebruikersView.prototype.renderError = function() {

    }

    var gebruikersViewInstance = new GebruikersView(undefined);

    return {
        renderTemplate: function(gebruikersController, callBackWhenReady) {
            gebruikersViewInstance = new GebruikersView(gebruikersController);
            gebruikersViewInstance.renderTemplate(callBackWhenReady);
        },

        renderGebruikers: function(gebruikers) { gebruikersViewInstance.renderGebruikers(gebruikers) },

        renderSuccessMessage: function() { gebruikersViewInstance.renderSuccessMessage() },

        renderErrorMessage: function() { gebruikersViewInstance.renderErrorMessage() }
    };
});