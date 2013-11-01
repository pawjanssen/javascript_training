define(['app/util/Settings', 'jquery'], function(Settings, $) {
    var baseURL = "/gebruikers/" + Settings.currentUser + "/todos";

    return {
        getAll: function(successCallBack, failCallBack) {
            $.getJSON(baseURL)
                .done(successCallBack)
                .fail(failCallBack);
        },

        get: function(todoID, successCallBack, failCallBack) {
            $.getJSON(baseURL + "/" + todoID)
                .done(successCallBack)
                .fail(failCallBack);
        },

        put: function(todo, successCallBack, failCallBack) {
            $.ajax(baseURL, {
                data: todo,
                method: 'POST',
                dataType: 'json'
            })
                .done(successCallBack)
                .fail(failCallBack);
        }
    };
});