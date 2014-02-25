var GebruikersStorageModule = (function(Settings, $) {
    function getBaseURL() {
        return "/gebruikers";
    }

    return {
        getAll: function(successCallBack, failCallBack) {
            $.getJSON(getBaseURL())
                .done(successCallBack)
                .fail(failCallBack);
        },

        get: function(gebruikersID, successCallBack, failCallBack) {
            $.getJSON(getBaseURL() + "/" + gebruikersID)
                .done(successCallBack)
                .fail(failCallBack);
        },

        saveGebruiker: function(gebruiker, successCallBack, failCallBack) {
            $.ajax(getBaseURL(), {
                data: gebruiker,
                method: 'POST',
                dataType: 'json'
            })
                .done(successCallBack)
                .fail(failCallBack);
        }
    };
}(SettingsModule, jQuery));