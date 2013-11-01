define(['app/util/Settings', 'jquery'], function(Settings, $) {
    function getBaseURL() {
        return "/gebruikers/" + Settings.currentUser + "/todos";
    }

    return {
        getAll: function(successCallBack, failCallBack) {
            $.getJSON(getBaseURL())
                .done(successCallBack)
                .fail(failCallBack);
        },

        get: function(todoID, successCallBack, failCallBack) {
            $.getJSON(getBaseURL() + "/" + todoID)
                .done(successCallBack)
                .fail(failCallBack);
        },

        saveTodo: function(todo, successCallBack, failCallBack) {
            $.ajax(getBaseURL(), {
                data: todo,
                method: 'POST',
                dataType: 'json'
            })
                .done(successCallBack)
                .fail(failCallBack);
        },

        moveTodo: function(nieuweGebruikerID, todoID, successCallBack, failCallBack){
            $.ajax(getBaseURL(), {
                data: {
                    "nieuweGebruikerID": nieuweGebruikerID,
                    "todoID": todoID
                },
                method: 'PUT',
                dataType: 'json'
            })
                .done(successCallBack)
                .fail(failCallBack);
        }
    };
});