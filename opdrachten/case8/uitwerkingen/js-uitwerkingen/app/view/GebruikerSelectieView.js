define(['app/view/ViewModule', 'app/util/Settings', 'jquery', 'jquery.bootstrap'], function(ViewModule, Settings, $) {

    function GebruikerSelectieView(gebruikersController) {
        this.gebruikersController = gebruikersController;
        ViewModule.superConstructor(this, "GebruikerSelectieView");
    }

    ViewModule.subclass(GebruikerSelectieView);


    GebruikerSelectieView.prototype.renderTemplate = function(callBackWhenReady) {
        var _this = this;
        $('#pageTitle').text("Gebruiker Selectie");
        $('#page').load("gebruikerSelectiePage.html", function() {
            _this.eventHandlersToepassen();
            callBackWhenReady.call();
        });
    }

    GebruikerSelectieView.prototype.renderGebruikers = function(gebruikers) {
        $.map(gebruikers, function (gebruiker) {
            $("<option></option>")
                .val(gebruiker.id)
                .text(gebruiker.naam)
                .appendTo("#gebruikersdropdown");
        });
    }

    GebruikerSelectieView.prototype.renderError = function(errorMessage) {
        this.log(errorMessage);
    }

    GebruikerSelectieView.prototype.eventHandlersToepassen = function () {
        $('#selecteergebruiker').click(function() {
            Settings.currentUser = parseInt($("#gebruikersdropdown").val());

            require(["app/util/Navigatie"], function(Navigatie) {
                Navigatie.loadController(Navigatie.historyState.todos, true);
            });

        });
    };

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