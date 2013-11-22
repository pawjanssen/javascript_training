function TodoStorage(settingsInstance) {
    this.settingsInstance = settingsInstance;
}

TodoStorage.prototype.getBaseUrl = function() {
    return "/gebruikers/" + this.settingsInstance.currentUser + "/todos";
};

TodoStorage.prototype.getAll = function (successCallBack, failCallBack) {
    $.getJSON(this.getBaseUrl()).done(successCallBack).fail(failCallBack);
};

TodoStorage.prototype.get = function (todoID, successCallBack, failCallBack) {
    $.getJSON(this.getBaseUrl() + "/" + todoID)
        .done(successCallBack)
        .fail(failCallBack);
};

TodoStorage.prototype.saveTodo = function (todo, successCallBack, failCallBack) {
    $.ajax(this.getBaseUrl(), {
        data: todo,
        method: 'POST',
        dataType: 'json'
    }).done(successCallBack).fail(failCallBack);
};

TodoStorage.prototype.moveTodo = function (nieuweGebruikerID, todoID, successCallBack, failCallBack) {
    $.ajax(this.getBaseUrl(), {
        data: {
            "nieuweGebruikerID": nieuweGebruikerID,
            "todoID": todoID
        },
        method: 'PUT',
        dataType: 'json'
    }).done(successCallBack).fail(failCallBack);
};