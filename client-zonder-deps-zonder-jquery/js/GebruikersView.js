function GebruikersView(gebruikersStorageInstance) {
    this.gebruikersStorageInstance = gebruikersStorageInstance
}

GebruikersView.prototype.renderTemplate = function() {
    var _this = this;
    document.getElementById("pageTitle").text = "Gebruikers";
    settingsInstance.loadTemplate(document.getElementById('page'), "gebruikersPage.html", function() {
        _this.gebruikersStorageInstance.getAll(function (gebruikers) {
            _this.renderGebruikers(gebruikers);
        }, function() {
            _this.renderError();
        });
    });
    settingsInstance.loadTemplate(document.getElementById('myModal'), "gebruikerToevoegen.html", function() {
        _this.eventHandlersgebruikerToevoegenToepassen();
    });
}

GebruikersView.prototype.renderGebruikers = function(gebruikers) {
    var templateLI = document.querySelector("#gebruikerslijst li.clonable");
    document.querySelectorAll("#gebruikerslijst li.gebruikerLi").remove();
    var gebruikersLijst = document.getElementById("gebruikerslijst");

    gebruikers.map(function (value) {
        var liClone = templateLI.cloneNode(true);
        liClone.querySelector("span.naam").innerHTML = value.naam;
        liClone.querySelector("span.gebruikersnaam").innerHTML = value.gebruikersnaam;
        liClone.setAttribute("userid", value.id);
        liClone.classList.remove("clonable");
        liClone.classList.add("gebruikerLi");

        gebruikersLijst.appendChild(liClone);
    })

}

GebruikersView.prototype.showGebruikerToevoegenModal = function() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("myModal").classList.add("in");
};

GebruikersView.prototype.hideGebruikerToevoegenModal = function() {
    document.getElementById("myModal").removeAttribute("style");
    document.getElementById("myModal").classList.remove("in");
};

GebruikersView.prototype.eventHandlersgebruikerToevoegenToepassen = function () {
    var _this = this;

    var closeModalElements = document.querySelectorAll(".closeModal");

    for (var i = 0; i < closeModalElements.length; ++i) {
        var item = closeModalElements[i];

        item.addEventListener("click", function(event) {
            _this.hideGebruikerToevoegenModal();
            event.preventDefault();
            return false;
        }, false);
    };

    document.getElementById("nieuwegebruikerLink").addEventListener("click", function(event) {
        _this.showGebruikerToevoegenModal();
        event.preventDefault();
    }, false);

    document.getElementById("saveButton").addEventListener("click", function(event) {
        var nieuweGebruiker = {};

        nieuweGebruiker.naam = document.getElementById('gebruikerNaam').value;
        nieuweGebruiker.gebruikersnaam = document.getElementById('gebruikerGebruikersnaam').value;

        _this.gebruikersStorageInstance.saveGebruiker(nieuweGebruiker, function() {
            _this.renderSuccessMessage("Het opslaan van de gebruiker met titel '" + nieuweGebruiker.naam + "' is gelukt.");
        }, function() {
            _this.renderErrorMessage("Het opslaan van de gebruiker met titel '" + nieuweGebruiker.naam + "' is mislukt, probeer opnieuw.");
        });

        _this.hideGebruikerToevoegenModal();
        event.preventDefault();
    }, false);
}

GebruikersView.prototype.renderSuccessMessage = function() {};
GebruikersView.prototype.renderErrorMessage = function() {};
