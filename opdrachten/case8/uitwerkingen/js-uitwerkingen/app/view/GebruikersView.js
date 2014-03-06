define(['app/view/ViewModule', 'app/util/Settings', 'jquery', 'jquery.bootstrap'], function(ViewModule, Settings, $) {

    function GebruikersView(gebruikersController) {
        this.gebruikersController = gebruikersController;
        ViewModule.superConstructor(this, "GebruikersView");
    }

    ViewModule.subclass(GebruikersView);

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
        var templateLI = $("#gebruikerslijst li:first").clone();
        $("#gebruikerslijst").empty();
        $.map(gebruikers, function (value) {
            var liClone = templateLI.clone();
            liClone.find("span.naam").text(value.naam);
            liClone.find("span.gebruikersnaam").text(value.gebruikersnaam);
            liClone.attr("userid", value.id);
            liClone.appendTo("#gebruikerslijst");
        })

    }

    GebruikersView.prototype.renderError = function() {
        this.log(errorMessage);
    }

    GebruikersView.prototype.renderSuccessMessage = function(successMessage) {
        this.log(successMessage);
    };

    GebruikersView.prototype.renderErrorMessage = function(errorMessage) {
        this.log(errorMessage);
    };

    GebruikersView.prototype.eventHandlersgebruikerToevoegenToepassen = function () {
        var _this = this;
        var nieuweGebruiker = {};
        $('#myModal').on('show.bs.modal', function () {
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

        renderSuccessMessage: function(successMessage) { gebruikersViewInstance.renderSuccessMessage(successMessage) },

        renderErrorMessage: function(errorMessage) { gebruikersViewInstance.renderErrorMessage(errorMessage) }
    };
});