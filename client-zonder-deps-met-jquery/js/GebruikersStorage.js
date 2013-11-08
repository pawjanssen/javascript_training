function GebruikerStorage() {
    this.baseURL = "/gebruikers";
}

GebruikerStorage.prototype.getAll = function(successCallBack, failCallBack) {
    $.getJSON(this.baseURL).done(successCallBack).fail(failCallBack);
};

GebruikerStorage.prototype.get = function(gebruikersID, successCallBack, failCallBack) {
    $.getJSON(this.baseURL + "/" + gebruikersID).done(successCallBack).fail(failCallBack);
};

GebruikerStorage.prototype.saveGebruiker = function (gebruiker, successCallBack, failCallBack) {
    $.ajax(this.getBaseUrl(), {
        data: gebruiker,
        method: 'POST',
        dataType: 'json'
    }).done(successCallBack).fail(failCallBack);
};
