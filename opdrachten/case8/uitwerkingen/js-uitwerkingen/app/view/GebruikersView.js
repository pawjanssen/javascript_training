define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {

    function GebruikersView(gebruikersController) {
        this.gebruikersController = gebruikersController
    }

    GebruikersView.prototype.renderTemplate = function(callBackWhenReady) {
        var _this = this;
        $('#pageTitle').text("Gebruikers");
        $('#page').load("gebruikersPage.html", function() {
            callBackWhenReady.call();
        });
        $('#myModal').empty();
        $('#myModal').load("gebruikerToevoegen.html", function() {
            _this.eventHandlersgebruikerToevoegenToepassen();
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

    GebruikersView.prototype.renderSuccessMessage = function(successMessage) {

    };

    GebruikersView.prototype.renderErrorMessage = function(errorMessage) {

    };

    GebruikersView.prototype.eventHandlersgebruikerToevoegenToepassen = function () {
        var _this = this;
        var nieuweGebruiker = {};
        $('#myModal').on('show.bs.modal', function (e) {
            $("#saveButton").click(function() {
                nieuweGebruiker.naam = $('#gebruikerNaam').val();
                nieuweGebruiker.gebruikersnaam = $('#gebruikerGebruikersnaam').val();
                _this.gebruikersController.saveGebruiker(nieuweGebruiker);

                $('#myModal').modal('hide');
            });
        });
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