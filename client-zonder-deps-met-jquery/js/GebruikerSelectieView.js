function GebruikerSelectieView(gebruikerStorageInstance, settingsInstance) {
    this.gebruikerStorageInstance = gebruikerStorageInstance;
    this.settingsInstance = settingsInstance;
}

GebruikerSelectieView.prototype.renderTemplate = function() {
    var _this = this;
    $('#pageTitle').text("Gebruiker Selectie");
    $('#page').load("gebruikerSelectiePage.html", function() {
        _this.eventHandlersToepassen();

        _this.gebruikerStorageInstance.getAll(function (gebruikers) {
            _this.renderGebruikers(gebruikers);
        }, function() {
            _this.renderError();
        });
    });
};

GebruikerSelectieView.prototype.renderGebruikers = function(gebruikers) {
    $.map(gebruikers, function (gebruiker, index) {
        $("<option></option>")
            .val(gebruiker.id)
            .text(gebruiker.naam)
            .appendTo("#gebruikersdropdown");
    });
};

GebruikerSelectieView.prototype.renderError = function() {};

GebruikerSelectieView.prototype.eventHandlersToepassen = function () {
    var _this = this;
    $('#selecteergebruiker').click(function() {
        _this.settingsInstance.currentUser = $("#gebruikersdropdown").val();
        loadView(historyState.todos, true);
    });
};
