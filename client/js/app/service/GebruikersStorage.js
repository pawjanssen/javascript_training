define(['app/util/Settings', 'jquery'], function(Settings, $) {
    var baseURL = "/gebruikers";

    return {
        getAll: function(successCallBack, failCallBack) {
            $.getJSON(baseURL)
                .done(successCallBack)
                .fail(failCallBack);
        },

        get: function(gebruikersID, successCallBack, failCallBack) {
            $.getJSON(baseURL + "/" + gebruikersID)
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