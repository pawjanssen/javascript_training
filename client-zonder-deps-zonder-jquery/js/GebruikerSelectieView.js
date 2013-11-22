function GebruikerSelectieView(gebruikerStorageInstance, settingsInstance) {
    this.gebruikerStorageInstance = gebruikerStorageInstance;
    this.settingsInstance = settingsInstance;
}

GebruikerSelectieView.prototype.renderTemplate = function() {
    var _this = this;
    document.getElementById("pageTitle").text = "Gebruiker Selectie";
    settingsInstance.loadTemplate(document.getElementById('page'), "gebruikerSelectiePage.html", function() {
        _this.eventHandlersToepassen();

        _this.gebruikerStorageInstance.getAll(function (gebruikers) {
            _this.renderGebruikers(gebruikers);
        }, function() {
            _this.renderError();
        });
    });
};

GebruikerSelectieView.prototype.renderGebruikers = function(gebruikers) {
    var gebruikersSelect = document.getElementById("gebruikersdropdown");
    while (gebruikersSelect.options.length > 0) {
        gebruikersSelect.remove(0);
    }

    gebruikers.map(function (gebruiker) {
        var option = document.createElement("option");
        option.value = gebruiker.id;
        option.text = gebruiker.naam;
        gebruikersSelect.add(option);
    });
};

GebruikerSelectieView.prototype.renderError = function() {};

GebruikerSelectieView.prototype.eventHandlersToepassen = function () {
    var _this = this;
    document.getElementById("selecteergebruiker").addEventListener("click", function(){
        _this.settingsInstance.currentUser = document.getElementById("gebruikersdropdown").value;
        loadView(historyState.todos, true);
    }, false);
};
