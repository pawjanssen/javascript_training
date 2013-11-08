function TodoStorage(settingsInstance) {
    this.settingsInstance = settingsInstance;
}

TodoStorage.prototype.getBaseUrl = function() {
    return "/gebruikers/" + this.settingsInstance.currentUser + "/todos";
};

TodoStorage.prototype.getAll = function (successCallBack, failCallBack) {
    this.settingsInstance.getJSON(this.getBaseUrl(), successCallBack, failCallBack);
};

TodoStorage.prototype.get = function (todoID, successCallBack, failCallBack) {
    this.settingsInstance.getJSON(this.getBaseUrl() + "/" + todoID, successCallBack, failCallBack);
};

TodoStorage.prototype.saveTodo = function (todo, successCallBack, failCallBack) {
    this.settingsInstance.sendJSONToServer("POST", this.getBaseUrl(), todo, successCallBack, failCallBack);
};

TodoStorage.prototype.moveTodo = function (nieuweGebruikerID, todoID, successCallBack, failCallBack) {
    this.settingsInstance.sendJSONToServer("PUT", this.getBaseUrl(), {
        "nieuweGebruikerID": nieuweGebruikerID,
        "todoID": todoID
    }, successCallBack, failCallBack);
};