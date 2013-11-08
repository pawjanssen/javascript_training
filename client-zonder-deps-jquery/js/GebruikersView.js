function GebruikersView(gebruikersStorageInstance) {
    this.gebruikersStorageInstance = gebruikersStorageInstance
}

GebruikersView.prototype.renderTemplate = function() {
    $('#pageTitle').text("Gebruikers");
    $('#page').load("gebruikersPage.html");
};

GebruikersView.prototype.renderGebruikers = function(gebruikers) {
    console.log(gebruikers);

};

GebruikersView.prototype.renderError = function() {

};
