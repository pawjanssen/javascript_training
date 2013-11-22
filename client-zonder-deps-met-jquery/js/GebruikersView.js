function GebruikersView(gebruikersStorageInstance) {
    this.gebruikersStorageInstance = gebruikersStorageInstance
}

GebruikersView.prototype.renderTemplate = function() {
    var _this = this;
    $('#pageTitle').text("Gebruikers");
    $('#page').load("gebruikersPage.html", function() {
        _this.gebruikersStorageInstance.getAll(function (gebruikers) {
            _this.renderGebruikers(gebruikers);
        }, function() {
            _this.renderError();
        });
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

GebruikersView.prototype.eventHandlersgebruikerToevoegenToepassen = function () {
    var _this = this;
    var nieuweGebruiker = { "todos": [] };
    $('#myModal').on('show.bs.modal', function (e) {
        $("#saveButton").click(function() {
            nieuweGebruiker.naam = $('#gebruikerNaam').val();
            nieuweGebruiker.gebruikersnaam = $('#gebruikerGebruikersnaam').val();
            _this.gebruikersStorageInstance.saveGebruiker(nieuweGebruiker, function() {
                _this.renderSuccessMessage("Het opslaan van de gebruiker met naam '" + gebruikers.naam + "' is gelukt.");
            }, function() {
                _this.renderErrorMessage("Het opslaan van de gebruiker met naam '" + gebruikers.naam + "' is mislukt, probeer opnieuw.");
            });

            $('#myModal').modal('hide');
        });
    });
}

GebruikersView.prototype.renderSuccessMessage = function() {};
GebruikersView.prototype.renderErrorMessage = function() {};
