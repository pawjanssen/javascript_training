function TodoStorage() {
}

TodoStorage.prototype.getBaseUrl = function() {
    return "/gebruikers/1/todos";
};

TodoStorage.prototype.getAll = function (successCallBack, failCallBack) {
    $.getJSON(this.getBaseUrl()).done(successCallBack).fail(failCallBack);
};

TodoStorage.prototype.saveTodo = function (todo, successCallBack, failCallBack) {
    $.ajax(this.getBaseUrl(), {
        data: todo,
        method: 'POST',
        dataType: 'json'
    }).done(successCallBack).fail(failCallBack);
};