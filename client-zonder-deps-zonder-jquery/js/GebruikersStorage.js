function GebruikerStorage(settingsInstance) {
    this.settingsInstance = settingsInstance;
    this.baseURL = "/gebruikers";
}

GebruikerStorage.prototype.getAll = function(successCallBack, failCallBack) {
    this.settingsInstance.getJSON(this.baseURL, successCallBack, failCallBack);
};

GebruikerStorage.prototype.get = function(gebruikersID, successCallBack, failCallBack) {
    this.settingsInstance.getJSON(this.baseURL + "/" + gebruikersID, successCallBack, failCallBack);
};
