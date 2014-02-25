var GebruikerSelectieViewModule = (function(Settings, $) {

    function GebruikerSelectieView(gebruikersController) {
        this.gebruikersController = gebruikersController
    }

    GebruikerSelectieView.prototype.renderTemplate = function(callBackWhenReady) {
        var _this = this;
        $('#pageTitle').text("Gebruiker Selectie");
        $('#page').load("gebruikerSelectiePage.html", function() {
            _this.eventHandlersToepassen();
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

    GebruikerSelectieView.prototype.eventHandlersToepassen = function () {
        $('#selecteergebruiker').click(function() {
            Settings.currentUser = $("#gebruikersdropdown").val();

            NavigatieModule.loadController(NavigatieModule.historyState.todos, true);
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
}(SettingsModule, jQuery));